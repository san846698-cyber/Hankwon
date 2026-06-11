import {
  CHAPTERS,
  SYSTEM_PROMPT,
  buildChapterPrompt,
  buildClosingPrompt,
  buildDedicationPrompt,
  buildTitlePrompt,
} from "./prompts";
import type { GeneratedBook, GeneratedChapter, GenerateInput } from "./types";

const MODEL = "claude-sonnet-4-6";
const API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

const DEFAULT_MAX_TOKENS = 4096;

type AnthropicTextBlock = { type: "text"; text: string };
type AnthropicResponseBody = {
  content: Array<AnthropicTextBlock | { type: string }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
  };
};

/**
 * Claude API 호출 wrapper.
 *
 * - 시스템 프롬프트는 prompt caching(ephemeral) 적용 — 한 권 생성에 ~10번 호출되므로
 *   첫 호출만 캐시 작성 비용, 나머지는 ~90% 할인.
 * - 환경변수 ANTHROPIC_API_KEY 필요. 없으면 명확한 에러 throw.
 * - 모델은 claude-sonnet-4-6 default. 풀 인쇄본 출시 시 opus-4-7 검토.
 */
async function callClaude(
  userPrompt: string,
  options?: { maxTokens?: number },
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local before generating books.",
    );
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: options?.maxTokens ?? DEFAULT_MAX_TOKENS,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API ${res.status}: ${text}`);
  }

  const data = (await res.json()) as AnthropicResponseBody;
  const text = data.content
    .filter((b): b is AnthropicTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Claude returned empty content");
  }

  return text;
}

function parseTitleJson(raw: string, fallback: { toLabel: string }): {
  title: string;
  subtitle: string;
} {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    return {
      title: `${fallback.toLabel}의 한 권`,
      subtitle: `한권이 정성껏 엮은 ${fallback.toLabel}의 이야기`,
    };
  }
  try {
    const parsed = JSON.parse(match[0]) as {
      title?: string;
      subtitle?: string;
    };
    return {
      title:
        typeof parsed.title === "string" && parsed.title.trim()
          ? parsed.title.trim()
          : `${fallback.toLabel}의 한 권`,
      subtitle:
        typeof parsed.subtitle === "string" && parsed.subtitle.trim()
          ? parsed.subtitle.trim()
          : `한권이 정성껏 엮은 ${fallback.toLabel}의 이야기`,
    };
  } catch {
    return {
      title: `${fallback.toLabel}의 한 권`,
      subtitle: `한권이 정성껏 엮은 ${fallback.toLabel}의 이야기`,
    };
  }
}

/**
 * 한 권의 자서전을 통째로 생성합니다.
 *
 * 호출 횟수 (병렬):
 *   - 챕터 7개 (병렬)
 *   - 제목·부제 1개
 *   - 헌사 1개
 *   - closing 1개
 * 총 10번. 시스템 프롬프트는 prompt caching으로 재사용 → 비용 ~$0.50/권.
 *
 * 한 챕터에서 답변이 비어 있으면 "이 시기에 대해서는 답하지 않으셨다" 짧은 처리.
 */
export async function generateBook(
  input: GenerateInput,
): Promise<GeneratedBook> {
  const { toLabel, answers } = input;

  const { mode, style, introData } = input;

  // Build historical context string for Ch.6 if user has historical events
  const HISTORICAL_LABELS: Record<string, string> = {
    korean_war: "6.25 전쟁",
    vietnam_war: "베트남 파병",
    saemaul: "새마을 운동",
    may18: "5·18 민주화운동",
    imf: "IMF 외환위기",
  };
  const historicalContext =
    introData?.historicalEvents?.length
      ? introData.historicalEvents
          .map((e) => HISTORICAL_LABELS[e] ?? e)
          .join(", ")
      : undefined;

  const chapterPromises: Promise<GeneratedChapter>[] = CHAPTERS.map(
    async (c) => {
      const userPrompt = buildChapterPrompt({
        toLabel,
        chapterIndex: c.index,
        answers,
        style,
        mode,
        historicalContext: c.index === 6 ? historicalContext : undefined,
      });
      const body = await callClaude(userPrompt);
      return {
        index: c.index,
        name: c.name,
        bodyMarkdown: body,
      };
    },
  );

  const titlePromise = (async () => {
    const raw = await callClaude(buildTitlePrompt({ toLabel, answers }), {
      maxTokens: 256,
    });
    return parseTitleJson(raw, { toLabel });
  })();

  const dedicationPromise = (async () => {
    const closing: Record<string, string> = {};
    if (answers["31"]?.trim()) closing["Q31"] = answers["31"];
    if (answers["33"]?.trim()) closing["Q33"] = answers["33"];
    if (answers["32"]?.trim()) closing["Q32"] = answers["32"];

    const text = await callClaude(
      buildDedicationPrompt({ toLabel, closingAnswers: closing }),
      { maxTokens: 256 },
    );
    return text || undefined;
  })();

  const closingPromise = (async () => {
    const text = await callClaude(
      buildClosingPrompt({ toLabel, q35Answer: answers["35"] }),
      { maxTokens: 200 },
    );
    return text || undefined;
  })();

  const [chapters, titleResult, dedication, closing] = await Promise.all([
    Promise.all(chapterPromises),
    titlePromise,
    dedicationPromise.catch(() => undefined),
    closingPromise.catch(() => undefined),
  ]);

  return {
    title: titleResult.title,
    subtitle: titleResult.subtitle,
    dedication,
    chapters: chapters.sort((a, b) => a.index - b.index),
    closing,
  };
}

/**
 * 결제 전 미리보기용 — 1장(어린 시절)만 생성.
 *
 * 미리보기를 진짜 Claude로 만들면 결제 동기가 올라가지만, 모든 진입자에게
 * API 비용($0.10) 발생합니다. rate limit 또는 사용자 인증과 함께 도입을 권장.
 *
 * 결정 보류 중 — 현재 사이트는 src/lib/preview.ts의 mock generator를 사용.
 * 키 받으면 이 함수로 갈아끼우거나 mock과 진짜를 A/B로 비교 가능.
 */
export async function generateChapterPreview(input: GenerateInput): Promise<{
  bodyMarkdown: string;
  title: string;
  subtitle: string;
}> {
  const userPrompt = buildChapterPrompt({
    toLabel: input.toLabel,
    chapterIndex: 1,
    answers: input.answers,
  });

  const [chapterBody, titleResult] = await Promise.all([
    callClaude(userPrompt),
    callClaude(
      buildTitlePrompt({ toLabel: input.toLabel, answers: input.answers }),
      { maxTokens: 256 },
    ).then((raw) => parseTitleJson(raw, { toLabel: input.toLabel })),
  ]);

  return {
    bodyMarkdown: chapterBody,
    title: titleResult.title,
    subtitle: titleResult.subtitle,
  };
}
