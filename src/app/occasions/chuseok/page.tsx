import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "추석 선물, 부모님과 마주 앉는 한 시간",
  description:
    "추석에 부모님과 마주 앉아 인생 이야기를 들어보세요. 한권은 그 시간을 한 권의 책으로 남깁니다.",
  alternates: { canonical: "/occasions/chuseok" },
};

export default function ChuseokPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="추석 선물"
          title={
            <>
              추석에 부모님과
              <br />
              <span className="text-accent-dark">마주 앉는 한 시간</span>
            </>
          }
          subtitle="명절은 가족이 모이는 가장 자연스러운 자리. 그 시간을 한 권의 책으로 남기세요."
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              명절은 부모님 이야기를 듣기 가장 좋은 시간
            </h2>
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              평소엔 자녀도 바쁘고 부모님도 어색해서 쉽게 묻지 못하는 이야기들이
              있어요. 어린 시절 살던 집, 학창 시절 친구, 청년기의 사랑, 결혼식
              날의 기억. 명절 차례 후 잠깐의 여유 시간이 그 이야기들을 듣기
              가장 자연스러운 자리가 됩니다.
            </p>
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              한권은 그 한 시간을 한 권의 책으로 남기는 서비스예요. 자녀가
              한권의 35가지 질문을 부모님께 들려드리고, 부모님 말씀을 받아
              적기만 하면 됩니다.
            </p>

            <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 mb-10">
              <h3 className="text-lg font-bold mb-3">추석 활용 흐름</h3>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <strong className="text-ink">차례 직후</strong> · 가족이 다
                  모인 자리에서 한 시간 정도 마주 앉아 인터뷰
                </li>
                <li>
                  <strong className="text-ink">2~3일 후</strong> · 책으로
                  정성껏 엮어 PDF 발송
                </li>
                <li>
                  <strong className="text-ink">가족 단톡방 공유</strong> ·
                  형제자매와 부모님 책 함께 읽기
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              명절에 듣기 좋은 부모님 이야기 10가지
            </h2>
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              한권의 35가지 질문 중, 명절 가족 모임에서 특히 자연스럽게 나누기
              좋은 것들:
            </p>
            <ul className="space-y-3 text-base text-ink mb-10">
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                어린 시절 살던 집, 어떤 모습이었나요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                형제자매와 가장 자주 했던 놀이는요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                학창 시절 단짝 친구는 누구셨나요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                배우자를 처음 본 날의 기억은요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                결혼식 날 가장 기억에 남는 장면은요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                자녀가 태어난 날의 마음은 어떠셨나요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                인생에서 가장 자랑스러운 일 한 가지는요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                지금 가장 소중한 일상의 즐거움은요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                자녀에게 평소 못 한 말이 있다면요?
              </li>
              <li className="flex gap-3">
                <span className="text-accent-dark shrink-0">·</span>
                손주에게 전하고 싶은 한 가지는요?
              </li>
            </ul>
          </div>
        </article>

        <PageCTA
          title="이번 명절, 부모님 이야기를 책으로"
          description="가족이 다 모인 자리에서 한 시간이면 됩니다. 미리보기는 무료예요."
        />
      </main>
      <Footer />
    </>
  );
}
