import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "한 권 미리보기",
  description: "가족이 정성껏 모은 30분이 한 권의 책으로 엮였어요.",
  robots: { index: false, follow: true },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
};

export default async function BookPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const toLabel = (sp.to ?? "엄마").trim() || "엄마";

  return (
    <main className="min-h-dvh bg-beige px-6 py-10">
      <div className="max-w-md mx-auto">
        <p className="fade-up text-sm tracking-[0.2em] text-accent font-semibold text-center mb-3">
          한 권 미리보기
        </p>
        <h1 className="fade-up fade-up-delay-1 text-2xl font-semibold leading-tight text-center mb-2">
          {toLabel}의 이야기로
          <br />
          만든 책이에요
        </h1>
        <p className="fade-up fade-up-delay-2 text-sm text-ink-mute text-center mb-10">
          가족이 정성껏 모은 시간이 한 권으로 엮였어요
        </p>

        <article className="fade-up fade-up-delay-2 bg-white/80 border border-beige-300 rounded-3xl p-7 shadow-sm mb-8">
          <header className="text-center pb-6 mb-6 border-b border-beige-300">
            <h2 className="text-parent-2xl font-semibold leading-tight mb-2">
              {toLabel}의 한 권
            </h2>
            <p className="text-sm text-ink-mute">
              한권이 정성껏 엮은 {toLabel}의 이야기
            </p>
          </header>

          <p className="text-xs tracking-wider text-accent-dark font-semibold mb-4">
            1장 — 어린 시절
          </p>

          <div className="space-y-4 text-parent-base leading-[1.85] text-ink">
            <p>
              {toLabel}의 이야기는 거창한 사건에서 시작되지 않는다. 한 줄기
              햇빛, 마당의 흙냄새, 식구들의 목소리 — 그 작은 것들이 모여 한
              사람의 인생이 된다.
            </p>
            <p>
              {toLabel}의 마음 어딘가에 평생 살아 있는 장면이 있다. 그날의 공기,
              그날의 사람들 — 사소했기에 더 또렷한 풍경이다.
            </p>
            <p>
              그 시절 살던 집은 {toLabel}에게 단순한 공간이 아니었다. 그곳의
              모든 모서리에 시간이 배어 있었다.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-beige-300 text-center">
            <p className="text-xs text-ink-mute italic">
              미리보기는 여기까지 — 본문은 약 50페이지 분량으로 이어져요
            </p>
          </div>
        </article>

        <div className="fade-up fade-up-delay-3 bg-accent/10 border border-accent/20 rounded-2xl p-5 mb-6 text-center">
          <p className="text-base text-ink leading-relaxed">
            완성된 책을 PDF로
            <br />
            지금 받아보세요
          </p>
        </div>

        <a
          href={`/buy?slug=${encodeURIComponent(slug)}`}
          className="fade-up fade-up-delay-3 block w-full h-14 rounded-2xl bg-accent text-white text-lg font-semibold leading-[3.5rem] text-center active:bg-accent-dark transition-colors shadow-sm mb-3"
        >
          책으로 받기
        </a>

        <button
          type="button"
          className="w-full h-12 rounded-2xl bg-white/60 border border-beige-300 text-ink-soft text-base font-medium flex items-center justify-center hover:bg-white"
        >
          가족에게 다시 공유
        </button>

        <p className="text-center text-xs text-ink-mute mt-10 leading-relaxed">
          이 미리보기 링크는 가족만 볼 수 있어요
        </p>
      </div>
    </main>
  );
}
