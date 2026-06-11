import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "부모님 자서전 / 회고록 만드는 4가지 방법",
  description:
    "전통 자서전 대필부터 AI 자서전 서비스까지, 부모님의 인생을 책으로 남기는 방법을 비교했습니다.",
  alternates: { canonical: "/guides/memoir-writing" },
};

export default function MemoirGuide() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="가이드"
          title={
            <>
              부모님 자서전,
              <br />
              <span className="text-accent-dark">어떻게 만들까요?</span>
            </>
          }
          subtitle="전통 대필부터 AI까지, 부모님 인생을 책으로 남기는 4가지 방법"
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              부모님 인생을 책으로 남기고 싶은 마음은 자녀라면 누구나 한 번쯤
              가집니다. 그런데 막상 알아보면 가격대가 너무 다양하고 방법도 여러
              가지라 어디서부터 시작해야 할지 막막하지요. 한국에서 부모님
              자서전을 만드는 4가지 길을 솔직하게 비교했습니다.
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 leading-tight">
                1. 전통 자서전 대필 — ₩600~2,000만원
              </h2>
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                작가가 부모님을 6개월~1년 동안 인터뷰하고 글을 직접 씁니다.
                한국에는 524명 이상의 자서전 작가가 활동 중이고, 가장 전통적인
                방식이에요.
              </p>
              <ul className="space-y-2 text-sm text-ink-soft mb-3">
                <li>
                  <strong className="text-ink">장점:</strong> 작가의 풍부한 표현,
                  깊이 있는 인터뷰, 책 한 권의 완성도
                </li>
                <li>
                  <strong className="text-ink">단점:</strong> 가격이 매우 비쌈,
                  부모님이 작가와 따로 시간을 많이 보내야 함
                </li>
                <li>
                  <strong className="text-ink">적합:</strong> 가족이 충분한 자원이
                  있고, 평생 한 권의 정식 책을 원할 때
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 leading-tight">
                2. 프리미엄 AI 자서전 — ₩100~150만원
              </h2>
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                레페토AI(엄마의인터뷰) 같은 한국 서비스. AI를 활용하지만 가격은
                여전히 프리미엄대입니다. 누적 50권 정도가 만들어졌어요.
              </p>
              <ul className="space-y-2 text-sm text-ink-soft mb-3">
                <li>
                  <strong className="text-ink">장점:</strong> 인쇄·제본 포함,
                  컨설팅 서비스 포함
                </li>
                <li>
                  <strong className="text-ink">단점:</strong> 일반 가족이 부담하기
                  어려운 가격, 시장이 작아 사용자 수 적음
                </li>
                <li>
                  <strong className="text-ink">적합:</strong> 100만원 이상 예산이
                  있고, 인쇄본까지 한 번에 받고 싶을 때
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 leading-tight">
                3. 한권 — ₩29,900
              </h2>
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                한권의 길은 자녀가 직접 부모님을 인터뷰하고, AI가 그 답변을
                자연스러운 회고록으로 다듬는 모델입니다. 시간은 한 시간, 가격은
                ₩29,900.
              </p>
              <ul className="space-y-2 text-sm text-ink-soft mb-3">
                <li>
                  <strong className="text-ink">장점:</strong> 가장 저렴, 자녀가
                  직접 부모님과 시간을 보내며 만드는 과정 자체가 의미
                </li>
                <li>
                  <strong className="text-ink">단점:</strong> 인쇄본은 어버이날
                  이후 출시 예정 (현재 PDF만), 자녀가 한 시간을 직접 들여야 함
                </li>
                <li>
                  <strong className="text-ink">적합:</strong> 합리적 가격에
                  부모님과 시간도 보내고 책도 받고 싶은 자녀
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 leading-tight">
                4. 직접 쓰기 — 무료
              </h2>
              <p className="text-base text-ink-soft leading-relaxed mb-4">
                부모님이 직접 글을 쓰시거나, 자녀가 받아 적어 직접 책으로 만드는
                길. 하루북 같은 자가출판 도구를 활용할 수 있어요.
              </p>
              <ul className="space-y-2 text-sm text-ink-soft mb-3">
                <li>
                  <strong className="text-ink">장점:</strong> 무료, 가장 가족적인
                  방식
                </li>
                <li>
                  <strong className="text-ink">단점:</strong> 글쓰기 시간 매우
                  많이 필요, 결과물의 톤·문체 일관성 어려움, 시작은 했지만 완성
                  못 하는 경우 많음
                </li>
                <li>
                  <strong className="text-ink">적합:</strong> 글쓰기를 좋아하시는
                  부모님 또는 자녀
                </li>
              </ul>
            </section>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              어떤 길을 고르시면 좋을까요?
            </h2>
            <div className="space-y-3">
              <div className="bg-white/70 border border-beige-300 rounded-xl p-4">
                <p className="text-sm text-ink leading-relaxed">
                  <strong>1,000만원 이상 예산</strong> · 작가 대필이 가장 풍부한
                  결과물
                </p>
              </div>
              <div className="bg-white/70 border border-beige-300 rounded-xl p-4">
                <p className="text-sm text-ink leading-relaxed">
                  <strong>100만원 정도 예산 + 인쇄본 필수</strong> · 레페토AI
                  같은 프리미엄 AI 서비스
                </p>
              </div>
              <div className="bg-white/70 border border-accent rounded-xl p-4">
                <p className="text-sm text-ink leading-relaxed">
                  <strong>3만원 정도 예산 + 자녀가 시간 투자</strong> · 한권 —
                  대부분의 가족에게 적합
                </p>
              </div>
              <div className="bg-white/70 border border-beige-300 rounded-xl p-4">
                <p className="text-sm text-ink leading-relaxed">
                  <strong>비용 0 + 직접 쓰기</strong> · 부모님이나 자녀가 글쓰기
                  좋아하실 때
                </p>
              </div>
            </div>
          </div>
        </article>

        <PageCTA
          title="가장 합리적인 길로 시작해보세요"
          description="한권은 ₩29,900에 부모님 자서전을 만들어드립니다."
        />
      </main>
      <Footer />
    </>
  );
}
