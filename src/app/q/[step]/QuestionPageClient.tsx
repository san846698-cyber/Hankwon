"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readQuestions, readMeta, type SessionQuestion } from "@/lib/questions";
import QuestionForm from "./QuestionForm";
import TTSButton from "@/components/TTSButton";

type Props = { stepNum: number };

export default function QuestionPageClient({ stepNum }: Props) {
  const [question, setQuestion] = useState<SessionQuestion | null>(null);
  const [total, setTotal] = useState(0);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const questions = readQuestions();
    const meta = readMeta();

    if (!questions.length || !meta) {
      router.replace("/");
      return;
    }

    if (stepNum < 1 || stepNum > questions.length) {
      if (stepNum > questions.length) {
        router.replace("/done");
      } else {
        router.replace("/q/1");
      }
      return;
    }

    setQuestion(questions[stepNum - 1]);
    setTotal(questions.length);
    setReady(true);
  }, [stepNum, router]);

  if (!ready || !question) {
    return (
      <main className="min-h-dvh surface-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-ink/20 border-t-ink animate-spin mx-auto mb-4" />
          <p className="text-sm text-ink-mute">잠깐만요…</p>
        </div>
      </main>
    );
  }

  const progress = (stepNum / total) * 100;
  const isLast = stepNum === total;

  return (
    <main className="min-h-dvh flex flex-col surface-ivory">
      {/* Sticky progress header */}
      <header className="px-6 pt-6 pb-4 sticky top-0 surface-ivory/95 backdrop-blur-sm z-10 border-b hairline">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3 text-sm">
            {stepNum > 1 ? (
              <a
                href={`/q/${stepNum - 1}`}
                className="text-ink-soft hover:text-ink"
              >
                ← 이전
              </a>
            ) : (
              <a href="/intro" className="text-ink-soft hover:text-ink">
                ← 처음으로
              </a>
            )}
            <span className="text-ink-mute tabular-nums font-medium">
              {stepNum} / {total}
            </span>
          </div>
          <div className="h-0.5 bg-beige-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-ink transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col px-6 py-8">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          {/* Chapter label */}
          <p
            key={`chap-${stepNum}`}
            className="fade-up font-display text-xs text-accent tracking-widest uppercase mb-5"
            style={{ fontWeight: 700 }}
          >
            {question.chapterIndex}장 — {question.chapterName}
          </p>

          {/* Question text + TTS */}
          <div
            key={`q-${stepNum}`}
            className="fade-up fade-up-delay-1 flex items-start gap-3 mb-5"
          >
            <h1
              className="font-display text-2xl sm:text-3xl text-ink font-bold leading-snug whitespace-pre-line balanced flex-1"
              style={{ fontWeight: 700 }}
            >
              {question.text}
            </h1>
            <TTSButton text={question.text} className="mt-1" />
          </div>

          <p
            key={`hint-${stepNum}`}
            className="fade-up fade-up-delay-2 text-sm text-ink-mute mb-5 leading-relaxed"
          >
            {question.hint}
          </p>

          {/* Sub-prompts */}
          {question.prompts.length > 0 && (
            <details
              key={`prompts-${stepNum}`}
              open
              className="fade-up fade-up-delay-2 group bg-white/50 border hairline rounded-2xl mb-7 overflow-hidden"
            >
              <summary className="cursor-pointer list-none px-5 py-3.5 flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-accent-dark font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                  함께 떠올려보세요
                </span>
                <span className="text-ink-mute text-sm group-open:rotate-180 transition-transform">
                  ▾
                </span>
              </summary>
              <ul className="px-5 pb-4 space-y-2.5 text-sm text-ink-soft leading-relaxed">
                {question.prompts.map((p, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-accent-dark shrink-0 mt-0.5">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}

          <QuestionForm
            stepNum={stepNum}
            questionId={question.id}
            isLast={isLast}
            totalQuestions={total}
          />
        </div>
      </div>
    </main>
  );
}
