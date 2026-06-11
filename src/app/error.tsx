"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[Hankwon] error:", error);
  }, [error]);

  return (
    <main className="min-h-dvh bg-beige flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center">
        <p className="text-sm tracking-[0.2em] text-accent font-semibold mb-4">
          앗
        </p>
        <h1 className="text-3xl font-semibold leading-tight mb-4">
          잠깐 문제가 발생했어요
        </h1>
        <p className="text-base text-ink-soft mb-10 leading-relaxed">
          일시적인 오류일 수 있어요.
          <br />
          다시 시도해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <button
            type="button"
            onClick={reset}
            className="px-8 h-14 leading-[3.5rem] rounded-2xl bg-accent text-white text-lg font-semibold active:bg-accent-dark transition-colors shadow-sm"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="px-8 h-14 leading-[3.5rem] rounded-2xl bg-white/60 border border-beige-300 text-ink-soft text-lg font-medium hover:bg-white"
          >
            처음으로
          </a>
        </div>
        <p className="text-xs text-ink-mute leading-relaxed">
          문제가 계속되면{" "}
          <a
            href="mailto:contact@hankwon.com"
            className="text-accent-dark underline underline-offset-2"
          >
            contact@hankwon.com
          </a>
          으로 알려주세요
          {error.digest && (
            <>
              <br />
              <span className="text-ink-mute/70">
                오류 코드: {error.digest}
              </span>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
