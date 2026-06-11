import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";
import { MILESTONES, getMilestone } from "@/data/milestones";

type Props = {
  params: Promise<{ age: string }>;
};

export async function generateStaticParams() {
  return MILESTONES.map((m) => ({ age: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { age } = await params;
  const m = getMilestone(age);
  if (!m) return {};
  return {
    title: `${m.name}(${m.age}) 선물, 부모님의 ${m.age}년을 한 권의 책으로`,
    description: `${m.name} 선물로 어떤 게 좋을까요? 한권은 부모님의 ${m.age}년 인생을 한 권의 책으로 만들어드립니다. ${m.meaning}.`,
    alternates: { canonical: `/occasions/milestone/${m.slug}` },
  };
}

export default async function MilestonePage({ params }: Props) {
  const { age } = await params;
  const m = getMilestone(age);
  if (!m) notFound();

  return (
    <>
      <main>
        <PageHero
          eyebrow={`${m.name} (${m.age}세) 선물`}
          title={
            <>
              {m.korean}을 맞이하시는
              <br />
              <span className="text-accent-dark">부모님께</span>
            </>
          }
          subtitle={m.meaning}
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-8">
              {m.intro}
            </p>

            <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 mb-10">
              <h2 className="text-xl font-bold mb-3">한권으로 남기는 {m.korean}</h2>
              <p className="text-base text-ink-soft leading-relaxed">{m.body}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              {m.korean} 선물 비교
            </h2>
            <div className="space-y-3 mb-12">
              <div className="bg-white/70 border border-accent rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <strong className="text-accent-dark">
                    한권 — 부모님 {m.age}년 자서전
                  </strong>
                  <span className="text-sm font-bold text-ink">₩29,900</span>
                </div>
                <p className="text-sm text-ink-soft">
                  부모님 평생의 이야기를 한 권의 책에 담아 평생 남기세요.
                </p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">{m.name} 잔치</span>
                  <span className="text-sm text-ink-mute">100~500만원</span>
                </div>
                <p className="text-sm text-ink-mute">하루로 끝나는 행사예요.</p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">전통 자서전 대필</span>
                  <span className="text-sm text-ink-mute">600~2,000만원</span>
                </div>
                <p className="text-sm text-ink-mute">
                  6개월~1년 작가 집필. 가격이 부담스러워요.
                </p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">금반지·시계</span>
                  <span className="text-sm text-ink-mute">50~300만원</span>
                </div>
                <p className="text-sm text-ink-mute">
                  쓰임은 좋지만 부모님 이야기는 남지 않아요.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              {m.korean}에 부모님께 들을 수 있는 이야기
            </h2>
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              한권의 질문들은 부모님 인생을 7개 챕터로 엮습니다:
            </p>
            <ul className="space-y-2 text-base text-ink mb-10 list-none">
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">1장</span>
                어린 시절 — 가장 오래된 기억, 살던 집의 마당, 형제자매와의 시간
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">2장</span>
                학창 시절 — 단짝 친구, 그 시절 갖고 싶었던 물건, 좋아한 노래
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">3장</span>
                청년기와 첫사랑 — 첫사랑, 무모했던 결정, 첫 직장 출근날
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">4장</span>
                결혼과 가정 — 배우자 첫 만남, 신혼집, 부부싸움 후 화해
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">5장</span>
                자녀 양육 — 자녀 태어난 날, 가장 행복했던 일상, 가장 자랑스러운 순간
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">6장</span>
                일과 성취 — 가장 자랑스러운 일, 가장 큰 실패, 잊을 수 없는 사람
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark font-bold w-12 shrink-0">7장</span>
                지금, 그리고 앞으로 — 일상의 즐거움, 자녀에게 못 한 말, 손주에게
                전하고 싶은 것
              </li>
            </ul>
          </div>
        </article>

        <PageCTA
          title={`${m.korean} 선물, 평생 남는 한 권의 책`}
          description="미리보기는 무료예요. 부모님과 마주 앉아 한 시간이면 됩니다."
        />
      </main>
      <Footer />
    </>
  );
}
