import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "한 권 이야기",
  description:
    "평범한 인생도 한 권의 책이 됩니다. 한권은 부모님의 인생을 책으로 엮어드리는 서비스예요.",
};

export default function AboutPage() {
  return (
    <>
      <main className="min-h-dvh bg-beige px-6 py-12">
        <div className="max-w-md mx-auto">
          <a
            href="/"
            className="text-sm text-ink-soft hover:text-ink mb-6 inline-block"
          >
            ← 처음으로
          </a>

          <p className="text-sm tracking-[0.2em] text-accent font-semibold mb-3">
            한 권 이야기
          </p>

          <h1 className="text-3xl font-semibold leading-tight mb-10">
            평범한 인생도
            <br />한 권의 책이 됩니다
          </h1>

          <div className="space-y-5 text-base text-ink leading-[1.85] mb-12">
            <p>
              한권은 부모님의 인생을 책으로 엮어드리는 서비스예요. 거창한 분만
              자서전을 갖는 게 아니라, 평범하게 살아오신 우리 부모님의
              이야기야말로 가족에게 가장 소중한 책이 된다고 믿어요.
            </p>
            <p>
              요즘은 부모님과 마주 앉아 옛이야기 듣는 시간도 흔치 않잖아요.
              한권은 자녀가 부모님의 이야기를 직접 듣고 받아 적는 인터뷰
              방식이에요. 부모님은 휴대폰을 만지지 않으셔도 되고, 자녀는 평생
              듣지 못했던 이야기를 듣게 돼요.
            </p>
            <p>
              한 시간의 시간이 가족 모두에게 평생의 책이 됩니다. AI는 부모님 말씀을
              임의로 꾸며내지 않고, 자연스러운 회고록 문체로 정성껏 다듬어 한
              권의 책으로 엮어요.
            </p>
            <p>
              저희는 한국의 부모님 세대를 위한 따뜻한 디지털 서비스를 만들고
              있어요. 어버이날, 환갑, 칠순, 팔순 — 그 어떤 날에도 가장 깊은
              선물이 되길 바랍니다.
            </p>
          </div>

          <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 mb-10">
            <p className="text-sm tracking-wider text-accent-dark font-semibold mb-2">
              한권은 2026년에 시작됐어요
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">
              부모님께 효도하고 싶지만 어디서부터 해야 할지 막막한 자녀들을
              위해, 작지만 정성스러운 서비스를 만들고 있습니다.
            </p>
          </div>

          <a
            href="/"
            className="block w-full h-14 rounded-2xl bg-accent text-white text-lg font-semibold leading-[3.5rem] text-center active:bg-accent-dark transition-colors shadow-sm"
          >
            시작하기
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
