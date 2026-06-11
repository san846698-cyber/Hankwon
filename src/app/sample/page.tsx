import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { SAMPLE_BOOK, type BookPageData } from "@/data/sample-book";

export const metadata: Metadata = {
  title: "이런 책으로 만들어져요",
  description: "한권이 만드는 자서전의 분위기와 구성을 미리 보실 수 있어요.",
};

export default function SamplePage() {
  return (
    <>
      <main className="min-h-dvh bg-beige px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <a
            href="/"
            className="text-sm text-ink-soft hover:text-ink mb-6 inline-block"
          >
            ← 처음으로
          </a>

          <p className="text-sm tracking-[0.2em] text-accent font-semibold mb-3">
            책 샘플
          </p>
          <h1 className="text-3xl font-semibold leading-tight mb-3">
            이런 책으로 만들어져요
          </h1>
          <p className="text-base text-ink-soft mb-12 leading-relaxed">
            아래는 한 가족이 만든 책의 일부예요.
            <br />
            본문은 약 50페이지 분량으로 이어집니다.
          </p>

          <div className="space-y-8">
            {SAMPLE_BOOK.map((page, i) => (
              <BookPage key={i} page={page} pageNum={i + 1} />
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mt-14 text-center">
            <p className="text-base text-ink leading-relaxed mb-2">
              우리 부모님 책에는
              <br />
              어떤 이야기가 담길까요?
            </p>
            <p className="text-sm text-ink-mute">
              한 시간의 인터뷰가 50페이지의 책이 됩니다.
            </p>
          </div>

          <a
            href="/"
            className="block w-full h-14 rounded-2xl bg-accent text-white text-lg font-semibold leading-[3.5rem] text-center active:bg-accent-dark transition-colors shadow-sm mt-6"
          >
            지금 시작하기
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

function BookPage({
  page,
  pageNum,
}: {
  page: BookPageData;
  pageNum: number;
}) {
  const baseClass =
    "relative aspect-[1/1.35] bg-white rounded-xl shadow-[0_8px_24px_-12px_rgba(44,40,38,0.18)] border border-beige-300 overflow-hidden";

  if (page.kind === "cover") {
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
          <p className="text-xs tracking-[0.3em] text-accent-dark font-semibold mb-12">
            한 권
          </p>
          <div className="w-12 h-px bg-accent/40 mb-12" />
          <h2 className="text-3xl sm:text-4xl font-semibold text-ink leading-tight mb-6">
            {page.title}
          </h2>
          <p className="text-sm text-ink-mute leading-relaxed max-w-[80%]">
            {page.subtitle}
          </p>
          <div className="w-12 h-px bg-accent/40 mt-12" />
        </div>
      </div>
    );
  }

  if (page.kind === "dedication") {
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
          <p className="text-base text-ink leading-[2.2] whitespace-pre-line italic">
            {page.body}
          </p>
        </div>
      </div>
    );
  }

  if (page.kind === "toc") {
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 flex flex-col p-10">
          <p className="text-sm tracking-[0.3em] text-accent-dark font-semibold text-center mb-8">
            {page.title}
          </p>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {page.entries.map((e) => (
              <div
                key={e.num}
                className="flex items-baseline gap-3 text-sm text-ink"
              >
                <span className="font-semibold text-accent-dark w-12 shrink-0">
                  {e.num}
                </span>
                <span className="flex-1 border-b border-dotted border-beige-300 mx-2" />
                <span>{e.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (page.kind === "chapter") {
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
          <p className="text-sm tracking-[0.3em] text-accent-dark font-semibold mb-8">
            {page.num}
          </p>
          <div className="w-16 h-px bg-accent/40 mb-8" />
          <h3 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
            {page.title}
          </h3>
        </div>
      </div>
    );
  }

  if (page.kind === "body") {
    return (
      <div className={baseClass}>
        <div className="absolute inset-0 flex flex-col p-10">
          <div className="flex-1 space-y-4 text-base text-ink leading-[1.85] overflow-hidden">
            {page.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="text-center text-xs text-ink-mute mt-6">
            — {pageNum} —
          </div>
        </div>
      </div>
    );
  }

  // closing
  return (
    <div className={baseClass}>
      <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
        <p className="text-sm text-ink-soft leading-[2.2] whitespace-pre-line italic">
          {page.body}
        </p>
      </div>
    </div>
  );
}
