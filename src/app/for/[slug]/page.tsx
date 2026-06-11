import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { FOR_PAGES, getForPage } from "@/data/for-pages";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return FOR_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getForPage(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.intro,
    alternates: { canonical: `/for/${p.slug}` },
  };
}

export default async function ForPage({ params }: Props) {
  const { slug } = await params;
  const p = getForPage(slug);
  if (!p) notFound();

  return (
    <>
      <main>
        <PageHero
          eyebrow={`${p.label} 자서전`}
          title={
            <>
              {p.label}의 인생을
              <br />
              <span className="text-accent-dark">한 권의 책</span>으로
            </>
          }
          subtitle={p.hero}
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-10">{p.intro}</p>

            <div className="space-y-4 mb-12">
              {p.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/70 border border-beige-300 rounded-2xl p-6"
                >
                  <h2 className="text-lg font-bold mb-2 text-ink">{h.q}</h2>
                  <p className="text-base text-ink-soft leading-relaxed">{h.a}</p>
                </div>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
              <p className="text-base text-ink leading-relaxed">{p.closingCopy}</p>
            </div>
          </div>
        </article>

        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
