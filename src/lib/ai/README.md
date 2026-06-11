# Hankwon AI generation

자서전 생성 파이프라인. 부모님 답변(35개) → AI가 7챕터 + 표지 + 헌사 + 마무리 생성.

## 파일

- `prompts.ts` — 시스템 프롬프트(절대 원칙) + 챕터/제목/헌사/마무리 user prompt 빌더
- `generate.ts` — Anthropic API 호출 wrapper, prompt caching 적용
- `types.ts` — `GeneratedBook`, `GeneratedChapter` 등

## 키 설정

`.env.local` (프로젝트 루트):

```
ANTHROPIC_API_KEY=sk-ant-...
```

키는 https://console.anthropic.com 에서 발급.

## 사용

```ts
import { generateBook } from "@/lib/ai/generate";

const book = await generateBook({
  toLabel: "엄마",
  answers: { "1": "...", "2": "...", ... },
});

// book.title, book.subtitle, book.dedication, book.chapters[], book.closing
```

## 비용

한 권당 약 $0.50. 모델 = `claude-sonnet-4-6`.

내역:
- 시스템 프롬프트(~2000 토큰)는 prompt caching(ephemeral) 적용
- 첫 호출에 캐시 작성(~25% premium), 이후 9번 호출은 캐시 히트(~90% 할인)
- 챕터당 답변 5개(평균 500토큰 input + 1500토큰 output) × 7장
- 제목/헌사/마무리 추가 호출 3번

마진: ₩29,900 매출 vs $0.50 비용 → 95%+

풀 인쇄본 출시 시 `claude-opus-4-7`로 모델 교체 검토 (품질↑, 비용 ~3배).

## 생성 흐름

```
부모님 답변 35개
    ↓
generateBook()
    ↓
병렬 호출:
  - 챕터 1~7 본문 (7회)
  - 책 제목·부제 (1회)
  - 헌사 (1회, Q31/Q32/Q33 활용)
  - closing (1회, Q35 활용)
    ↓
GeneratedBook 객체
    ↓
PDF 렌더링 (별도 작업, React-PDF 또는 Puppeteer)
```

## 핵심 원칙

시스템 프롬프트의 5가지 절대 원칙:
1. 사실 만들지 마세요 (hallucination 절대 금지)
2. 부모님의 표현을 보존하세요 (단어, 비유, 사투리 그대로)
3. 추측·해석 표현 금지
4. 시적 미화 자제
5. 번역체 피하기

이 5가지가 자서전 품질의 80%. 이걸 흔들면 책의 가치 무너짐.

## 미리보기 (결제 전)

`generateChapterPreview()` — 1장만 생성, 미리보기 페이지 노출.

현재 사이트는 `src/lib/preview.ts` mock generator 사용. 키 받으면 이 함수로 교체.
trade-off: 진짜 Claude 미리보기는 결제율↑, 모든 진입자에게 $0.10 비용 발생.
도입 시 rate limit / 호칭 입력 단계 인증 권장.
