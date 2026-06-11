import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { COMPARISONS, getComparison } from "@/data/comparisons";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.intro,
    alternates: { canonical: `/vs/${c.slug}` },
  };
}

export default async function VsPage({ params }: Props) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return (
    <>
      <main>
        <PageHero
          eyebrow="비교"
          title={
            <>
              한권 vs <span className="text-accent-dark">{c.competitor}</span>
            </>
          }
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-10 max-w-2xl mx-auto">
              {c.intro}
            </p>

            <div className="overflow-x-auto -mx-6 px-6 mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-beige-300">
                    <th className="text-left py-3 pr-4 font-bold text-ink-mute text-xs tracking-wider uppercase">
                      항목
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-accent-dark">
                      한권
                    </th>
                    <th className="text-left py-3 px-4 font-bold text-ink-soft">
                      {c.competitor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-b border-beige-300/60"
                    >
                      <td className="py-4 pr-4 font-semibold text-ink align-top">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-ink-soft leading-relaxed align-top">
                        {row.us}
                      </td>
                      <td className="py-4 px-4 text-ink-mute leading-relaxed align-top">
                        {row.them}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-bold mb-3">정리</h2>
              <p className="text-base text-ink-soft leading-relaxed">
                {c.conclusion}
              </p>
            </div>
          </div>
        </article>

        <PageCTA />
      </main>
      <Footer />
    </>
  );
}
