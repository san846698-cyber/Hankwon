"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TIERS, type TierId } from "@/data/tiers";
import {
  getQuestionsForSession,
  readMeta,
  readQuestions,
  clearSession,
  META_KEY,
  ANSWERS_KEY,
  QUESTIONS_KEY,
  type HankwonMeta,
} from "@/lib/questions";
import { trackEvent } from "@/lib/analytics";

type Step = "mode" | "honorific" | "tier";

const HONORIFICS_OTHER = ["엄마", "아빠", "어머니", "아버지", "할머니", "할아버지"];

export default function LandingForm() {
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<"self" | "other" | null>(null);
  const [toLabel, setToLabel] = useState("");
  const [tier, setTier] = useState<TierId | null>(null);
  const [starting, setStarting] = useState(false);
  const [resume, setResume] = useState<{
    to: string;
    answeredCount: number;
    total: number;
  } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const meta = readMeta();
      const questions = readQuestions();
      const answersRaw = sessionStorage.getItem(ANSWERS_KEY);
      const answers = answersRaw
        ? (JSON.parse(answersRaw) as Record<string, string>)
        : {};
      const filled = Object.values(answers).filter((v) => v?.trim()).length;

      if (meta && questions.length > 0 && filled > 0) {
        setResume({
          to: meta.mode === "self" ? "나의 이야기" : meta.to,
          answeredCount: filled,
          total: questions.length,
        });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  async function start() {
    if (!mode || !tier) return;
    const finalTo = mode === "self" ? "" : toLabel.trim();
    if (mode === "other" && !finalTo) return;

    setStarting(true);
    try {
      // POST /api/response to get slug — fire-and-forget on failure
      let responseId: string | null = null;
      let slug: string | null = null;
      try {
        const res = await fetch("/api/response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromName: "가족",
            toLabel: finalTo || "나",
            mode,
            tier,
          }),
        });
        const data = (await res.json()) as {
          configured?: boolean;
          id?: string;
          slug?: string;
        };
        if (data.configured && data.id && data.slug) {
          responseId = data.id;
          slug = data.slug;
        }
      } catch {
        // Supabase not configured — local-only mode
      }

      const meta: HankwonMeta = {
        mode,
        to: finalTo,
        tier,
        responseId,
        slug,
      };

      // Build and cache the question list
      const questionList = getQuestionsForSession(tier, null, mode);
      // (introData not yet known — will be recomputed after /intro)

      try {
        sessionStorage.setItem(META_KEY, JSON.stringify(meta));
        sessionStorage.removeItem(ANSWERS_KEY);
        sessionStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionList));
      } catch {
        // ignore
      }

      trackEvent("landing_started", { mode, tier, to_label: finalTo });
      router.push("/intro");
    } finally {
      setStarting(false);
    }
  }

  function onResume() {
    const meta = readMeta();
    const questions = readQuestions();
    const answersRaw = sessionStorage.getItem(ANSWERS_KEY);
    const answers = answersRaw
      ? (JSON.parse(answersRaw) as Record<string, string>)
      : {};
    const answeredIds = questions
      .map((q, i) => ({ q, step: i + 1 }))
      .filter(({ q }) => answers[String(q.id)]?.trim())
      .map(({ step: s }) => s);

    const lastStep = answeredIds.length > 0 ? Math.max(...answeredIds) : 0;
    const nextStep = Math.min(lastStep + 1, questions.length);
    router.push(`/q/${nextStep}`);
  }

  function onClearResume() {
    clearSession();
    setResume(null);
    setStep("mode");
  }

  // ─── Resume card ────────────────────────────────────────────────────────
  if (hydrated && resume) {
    return (
      <div className="w-full">
        <div className="fade-up fade-up-delay-3 bg-white/80 border border-accent/40 rounded-2xl p-6 mb-6">
          <p className="text-xs font-semibold text-accent-dark tracking-widest uppercase mb-3">
            진행 중인 답변
          </p>
          <p className="text-base text-ink leading-relaxed mb-1.5">
            <span className="font-semibold">{resume.to}</span>의 이야기,{" "}
            <span className="tabular-nums font-semibold">
              {resume.answeredCount}/{resume.total}
            </span>
            번째까지 답하셨어요.
          </p>
          <p className="text-sm text-ink-mute mb-6 leading-relaxed">
            이어서 답변하시거나 처음부터 새로 시작하실 수 있어요.
          </p>
          <button
            type="button"
            onClick={onResume}
            className="w-full h-13 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center mb-2 hover:bg-ink-deep transition-colors"
          >
            이어서 답변하기
          </button>
          <button
            type="button"
            onClick={onClearResume}
            className="w-full h-11 rounded-2xl bg-transparent border hairline text-ink-soft text-sm font-medium hover:border-ink-mute transition-colors"
          >
            처음부터 새로 시작
          </button>
        </div>
      </div>
    );
  }

  // ─── Step: mode ─────────────────────────────────────────────────────────
  if (step === "mode") {
    return (
      <div className="w-full fade-up fade-up-delay-3">
        <p className="text-sm text-ink-mute text-center mb-7 tracking-wide">
          누구의 이야기를 기록하시나요?
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode("other");
              setStep("honorific");
            }}
            className="w-full text-left rounded-2xl border hairline bg-beige-50 hover:border-ink-mute hover:bg-white px-6 py-5 transition-all group"
          >
            <p className="font-display text-lg text-ink mb-1 group-hover:text-ink-deep" style={{ fontWeight: 700 }}>
              소중한 분의 이야기를 기록할게요
            </p>
            <p className="text-sm text-ink-mute leading-relaxed">
              부모님·조부모님·배우자의 인생을 책으로
            </p>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("self");
              setToLabel("");
              setStep("tier");
            }}
            className="w-full text-left rounded-2xl border hairline bg-beige-50 hover:border-ink-mute hover:bg-white px-6 py-5 transition-all group"
          >
            <p className="font-display text-lg text-ink mb-1 group-hover:text-ink-deep" style={{ fontWeight: 700 }}>
              나의 이야기를 기록할게요
            </p>
            <p className="text-sm text-ink-mute leading-relaxed">
              내 인생을 직접 1인칭으로 기록하는 자서전
            </p>
          </button>
        </div>
      </div>
    );
  }

  // ─── Step: honorific ────────────────────────────────────────────────────
  if (step === "honorific") {
    return (
      <div className="w-full fade-up fade-up-delay-1">
        <button
          type="button"
          onClick={() => setStep("mode")}
          className="text-xs text-ink-mute mb-6 flex items-center gap-1.5 hover:text-ink"
        >
          ← 다시 선택
        </button>
        <p className="text-sm text-ink-mute text-center mb-6 tracking-wide">
          어떻게 부르시나요?
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {HONORIFICS_OTHER.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setToLabel(h)}
              className={`h-12 rounded-xl text-base font-medium border transition-colors ${
                toLabel === h
                  ? "bg-ink text-beige-100 border-ink"
                  : "bg-white/60 text-ink border-beige-300 hover:border-ink-mute"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={toLabel}
          onChange={(e) => setToLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && toLabel.trim()) setStep("tier");
          }}
          placeholder="또는 직접 입력 (예: 외할머니)"
          maxLength={12}
          className="w-full h-12 rounded-xl bg-white/60 border border-beige-300 px-4 text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-ink transition-colors mb-6"
        />
        <button
          type="button"
          onClick={() => setStep("tier")}
          disabled={!toLabel.trim()}
          className="w-full h-13 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center hover:bg-ink-deep transition-all disabled:bg-beige-300 disabled:text-ink-mute disabled:cursor-not-allowed"
        >
          다음
        </button>
      </div>
    );
  }

  // ─── Step: tier ─────────────────────────────────────────────────────────
  if (step === "tier") {
    return (
      <div className="w-full fade-up fade-up-delay-1">
        <button
          type="button"
          onClick={() =>
            setStep(mode === "self" ? "mode" : "honorific")
          }
          className="text-xs text-ink-mute mb-6 flex items-center gap-1.5 hover:text-ink"
        >
          ← 다시 선택
        </button>
        <p className="text-sm text-ink-mute text-center mb-6 tracking-wide">
          어느 정도 깊이로 기록하시겠어요?
        </p>
        <div className="space-y-2.5 mb-7">
          {(["light", "standard", "premium"] as TierId[]).map((id) => {
            const t = TIERS[id];
            const selected = tier === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTier(id)}
                className={`w-full text-left rounded-2xl border px-5 py-4 transition-all ${
                  selected
                    ? "bg-ink text-beige-100 border-ink"
                    : "bg-white/60 border-beige-300 hover:border-ink-mute hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-display text-base ${selected ? "text-beige-100" : "text-ink"}`}
                    style={{ fontWeight: 700 }}
                  >
                    {t.name}
                    {t.subname && (
                      <span
                        className={`ml-2 text-xs font-medium ${selected ? "text-beige-100/60" : "text-ink-mute"}`}
                      >
                        {t.subname}
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-xs tabular-nums ${selected ? "text-beige-100/70" : "text-ink-mute"}`}
                  >
                    {t.estimatedMinutes}분 · {t.questionCount}문항
                  </span>
                </div>
                <p
                  className={`text-sm leading-relaxed ${selected ? "text-beige-100/70" : "text-ink-mute"}`}
                >
                  {t.description}
                </p>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={start}
          disabled={!tier || starting}
          className="w-full h-13 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center hover:bg-ink-deep transition-all disabled:bg-beige-300 disabled:text-ink-mute disabled:cursor-not-allowed"
        >
          {starting ? "잠깐만요…" : "시작하기"}
        </button>
        <p className="text-center text-xs text-ink-mute mt-5 leading-relaxed">
          가격은 출시 후 확정됩니다 · 지금은 무료로 체험해보세요
        </p>
      </div>
    );
  }

  return null;
}
