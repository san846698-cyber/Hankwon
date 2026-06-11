"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ANSWERS_KEY, META_KEY } from "@/lib/questions";
import { trackEvent } from "@/lib/analytics";
import VoiceRecorder from "@/components/VoiceRecorder";

type Props = {
  stepNum: number;
  questionId: number;
  isLast: boolean;
  totalQuestions: number;
};

export default function QuestionForm({
  stepNum,
  questionId,
  isLast,
  totalQuestions,
}: Props) {
  const [value, setValue] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(ANSWERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, string>;
        if (typeof parsed[String(questionId)] === "string") {
          setValue(parsed[String(questionId)]);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [questionId]);

  useEffect(() => {
    if (!hydrated) return;
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 160)}px`;
  }, [value, hydrated]);

  function persistLocal(content: string) {
    try {
      const stored = sessionStorage.getItem(ANSWERS_KEY);
      const parsed = stored
        ? (JSON.parse(stored) as Record<string, string>)
        : {};
      parsed[String(questionId)] = content;
      sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }

  function persistServer(content: string, done = false) {
    try {
      const metaRaw = sessionStorage.getItem(META_KEY);
      if (!metaRaw) return;
      const meta = JSON.parse(metaRaw) as { responseId?: string | null };
      if (!meta.responseId) return;

      fetch("/api/response", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseId: meta.responseId,
          questionId,
          content,
          done,
        }),
      }).catch(() => {});
    } catch {
      // ignore — fire-and-forget
    }
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value;
    setValue(next);
    persistLocal(next);
  }

  function onNext() {
    persistLocal(value);
    persistServer(value, isLast);
    trackEvent("answer_completed", { step: stepNum, length: value.length });
    if (isLast) {
      trackEvent("interview_finished", { total: totalQuestions });
      router.push("/done");
    } else {
      router.push(`/q/${stepNum + 1}`);
    }
  }

  function onTranscription(text: string) {
    const next = value.trim() ? value.trimEnd() + "\n" + text : text;
    setValue(next);
    persistLocal(next);
    // Focus textarea so user can review/edit
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  const canContinue = value.trim().length > 0;

  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder="부모님의 답을 받아 적어주세요"
        rows={6}
        className="fade-up fade-up-delay-3 w-full resize-none rounded-2xl bg-white/70 border border-beige-300 px-5 py-4 text-base leading-relaxed text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-ink focus:bg-white transition-colors mb-3"
        spellCheck={false}
      />

      <VoiceRecorder onTranscription={onTranscription} />

      <div className="fade-up fade-up-delay-4 sticky bottom-6 mt-auto pt-4 bg-gradient-to-t from-beige via-beige to-transparent">
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="w-full h-14 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center hover:bg-ink-deep transition-all disabled:bg-beige-300 disabled:text-ink-mute disabled:cursor-not-allowed"
        >
          {isLast ? "마치기" : "다음"}
        </button>
        <p className="text-center text-xs text-ink-mute mt-3">
          답변은 자동 저장돼요
        </p>
      </div>
    </>
  );
}
