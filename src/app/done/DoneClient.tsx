"use client";

import { useEffect, useMemo, useState } from "react";
import { generateMockPreview, type Preview } from "@/lib/preview";
import { trackEvent } from "@/lib/analytics";
import { shareToKakao } from "@/components/KakaoShare";

const ANSWERS_KEY = "hankwon:answers";
const META_KEY = "hankwon:meta";

const STAGES = [
  "답변을 차분히 읽고 있어요",
  "이야기의 흐름을 잡고 있어요",
  "한 권의 책으로 엮고 있어요",
];

type Meta = { to: string };

export default function DoneClient() {
  const [phase, setPhase] = useState<"loading" | "ready">("loading");
  const [stage, setStage] = useState(0);
  const [meta, setMeta] = useState<Meta>({ to: "부모님" });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    let to = "부모님";
    try {
      const m = sessionStorage.getItem(META_KEY);
      if (m) {
        const parsed = JSON.parse(m) as Partial<Meta>;
        if (parsed.to) to = parsed.to;
      }
    } catch {
      // ignore
    }
    setMeta({ to });

    let loaded: Record<string, string> = {};
    try {
      const a = sessionStorage.getItem(ANSWERS_KEY);
      if (a) loaded = JSON.parse(a) as Record<string, string>;
    } catch {
      // ignore
    }
    setAnswers(loaded);

    const t1 = setTimeout(() => setStage(1), 2800);
    const t2 = setTimeout(() => setStage(2), 5800);
    const t3 = setTimeout(() => {
      setPhase("ready");
      trackEvent("preview_viewed", { to_label: to });
    }, 8600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const preview = useMemo<Preview | null>(() => {
    if (phase !== "ready") return null;
    return generateMockPreview({ toLabel: meta.to, answers });
  }, [phase, meta, answers]);

  if (phase === "loading") {
    return <LoadingView stage={stage} toLabel={meta.to} />;
  }

  return <PreviewView preview={preview!} meta={meta} />;
}

function LoadingView({ stage, toLabel }: { stage: number; toLabel: string }) {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12 bg-beige">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <div className="relative w-20 h-20 mb-10">
          <div className="absolute inset-0 rounded-full border-2 border-beige-300" />
          <div
            className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"
            style={{ animationDuration: "1.6s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            📖
          </div>
        </div>

        <p className="text-sm tracking-[0.2em] text-accent font-semibold mb-4">
          한권이 책을 만들고 있어요
        </p>

        <h1 className="text-parent-xl font-semibold leading-tight mb-10">
          {toLabel}의 이야기를
          <br />
          한 권으로 엮고 있어요
        </h1>

        <ul className="w-full space-y-3 text-left mb-12">
          {STAGES.map((label, i) => {
            const state =
              i < stage ? "done" : i === stage ? "active" : "pending";
            return (
              <li
                key={i}
                className={`flex items-center gap-3 transition-opacity duration-500 ${
                  state === "pending" ? "opacity-30" : "opacity-100"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    state === "done"
                      ? "bg-accent text-white"
                      : state === "active"
                        ? "bg-accent/20 text-accent-dark"
                        : "bg-beige-300 text-ink-mute"
                  }`}
                >
                  {state === "done" ? "✓" : state === "active" ? "•" : ""}
                </span>
                <span className="text-parent-base text-ink-soft">{label}</span>
              </li>
            );
          })}
        </ul>

        <p className="text-sm text-ink-mute">잠시만 기다려 주세요…</p>
      </div>
    </main>
  );
}

function PreviewView({ preview, meta }: { preview: Preview; meta: Meta }) {
  return (
    <main className="min-h-dvh bg-beige">
      <div className="max-w-md mx-auto px-6 py-10">
        <p className="fade-up text-sm tracking-[0.2em] text-accent font-semibold text-center mb-6">
          한 권 미리보기
        </p>

        <article className="fade-up fade-up-delay-1 bg-white/80 border border-beige-300 rounded-3xl p-7 shadow-sm mb-8">
          <header className="text-center pb-6 mb-6 border-b border-beige-300">
            <h1 className="text-parent-2xl font-semibold leading-tight mb-3 text-ink">
              {preview.title}
            </h1>
            <p className="text-sm text-ink-mute">{preview.subtitle}</p>
          </header>

          <p className="text-xs tracking-wider text-accent-dark font-semibold mb-4">
            {preview.chapterLabel}
          </p>

          <div className="space-y-4 text-parent-base leading-[1.85] text-ink">
            {preview.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-beige-300 text-center">
            <p className="text-xs text-ink-mute italic">
              미리보기는 여기까지 — 본문은 약 50페이지 분량으로 이어져요
            </p>
          </div>
        </article>

        <div className="fade-up fade-up-delay-2 bg-accent/10 border border-accent/20 rounded-2xl p-5 mb-4 text-center">
          <p className="text-base text-ink leading-relaxed">
            완성된 책은 PDF로 받아보실 수 있어요
            <br />
            <span className="text-sm text-ink-mute">(인쇄본은 곧 출시)</span>
          </p>
        </div>

        <a
          href="/buy"
          onClick={() => trackEvent("buy_viewed")}
          className="fade-up fade-up-delay-3 block w-full h-14 rounded-2xl bg-accent text-white text-lg font-semibold leading-[3.5rem] text-center active:bg-accent-dark transition-colors shadow-sm mb-3"
        >
          책으로 받기
        </a>

        <button
          type="button"
          onClick={() => {
            trackEvent("share_clicked", { surface: "done" });
            shareToKakao({
              title: `${meta.to}의 한 권 미리보기`,
              description: "가족이 정성껏 모은 시간이 한 권으로 엮였어요",
              imageUrl:
                (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hankwon.com") +
                "/opengraph-image",
              link:
                typeof window !== "undefined"
                  ? window.location.origin + "/"
                  : "https://hankwon.com",
            });
          }}
          className="fade-up fade-up-delay-3 w-full h-12 rounded-2xl bg-white/60 border border-beige-300 text-ink-soft text-base font-medium flex items-center justify-center active:bg-white transition-colors mb-3"
        >
          가족에게 미리보기 공유
        </button>

        <div className="flex gap-2 justify-center text-sm text-ink-mute mt-4">
          <a href="/q/1" className="hover:text-ink-soft px-2 py-1">
            답변 다시 보기
          </a>
          <span>·</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="hover:text-ink-soft px-2 py-1"
          >
            다시 만들기
          </button>
        </div>

        <p className="text-center text-xs text-ink-mute mt-10 leading-relaxed">
          이야기는 안전하게 보관되며,
          <br />
          동의 없이는 누구에게도 공유되지 않아요.
        </p>
      </div>
    </main>
  );
}
