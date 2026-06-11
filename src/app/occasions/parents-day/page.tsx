import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "어버이날 선물, 부모님의 인생을 한 권의 책으로",
  description:
    "올해 어버이날, 꽃과 봉투 대신 부모님의 인생 이야기를 한 권의 책으로 선물해보세요. 35가지 질문, 한 시간이면 평생의 책이 됩니다.",
  alternates: { canonical: "/occasions/parents-day" },
};

export default function ParentsDayPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="어버이날 선물"
          title={
            <>
              올해 어버이날엔
              <br />
              <span className="text-accent-dark">부모님의 인생</span>을 선물하세요
            </>
          }
          subtitle={
            <>
              꽃은 시들고 봉투는 잊혀지지만
              <br />
              한 권의 책은 평생 남습니다.
            </>
          }
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto prose-content">
            <h2 className="text-2xl font-bold mb-4 leading-tight">
              왜 어버이날엔 보통 같은 선물을 드릴까요?
            </h2>
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              매년 어버이날 우리는 비슷한 선물을 합니다. 카네이션 한 송이, 봉투
              한 장, 식사 한 끼. 부모님은 언제나 “고맙다”고 하시지만, 사실
              마음으로는 자녀와 함께 보낸 시간을 가장 오래 기억하십니다.
            </p>
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              한권은 이 시간을 한 권의 책으로 남기는 서비스예요. 부모님과 한
              시간 마주 앉아 35가지 질문을 나누면, AI가 부모님의 말씀을
              자연스러운 회고록으로 다듬어 50페이지 분량의 책으로 만들어
              드립니다.
            </p>

            <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 mb-10">
              <h3 className="text-lg font-bold mb-3">올해 어버이날 일정</h3>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <strong className="text-ink">5월 1~6일</strong> · 부모님과
                  마주 앉아 35가지 질문 인터뷰 (한 시간)
                </li>
                <li>
                  <strong className="text-ink">5월 7일</strong> · AI가 책으로
                  엮어 PDF 발송 (24시간 내)
                </li>
                <li>
                  <strong className="text-ink">5월 8일 어버이날</strong> ·
                  부모님께 책 선물 (PDF 또는 인쇄해서 직접 전달)
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-12 leading-tight">
              35가지 질문에서 부모님이 말씀해주시는 것들
            </h2>
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              어린 시절 살던 집의 마당, 학창 시절 단짝 친구, 청년기의 첫사랑,
              결혼식 날의 기억, 자녀 키우며 가장 행복했던 일상의 한 장면 —
              평소엔 듣기 어려운 이야기를 자녀가 직접 듣고 받아 적습니다.
            </p>
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              부모님은 휴대폰을 만지지 않으셔도 됩니다. 자녀가 한권 화면의 질문을
              부모님께 들려드리고, 부모님 말씀을 그대로 받아 적으면 끝.
            </p>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              어버이날 선물 비교
            </h2>
            <div className="space-y-3 mb-10">
              <div className="bg-white/70 border border-accent rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <strong className="text-accent-dark">한권 — 부모님 자서전</strong>
                  <span className="text-sm font-bold text-ink">₩29,900</span>
                </div>
                <p className="text-sm text-ink-soft">
                  한 시간 함께 + 평생 남는 책. 가족 모두 돌려보세요.
                </p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">카네이션 꽃다발</span>
                  <span className="text-sm text-ink-mute">₩30,000~50,000</span>
                </div>
                <p className="text-sm text-ink-mute">며칠 후 시들어요.</p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">현금 봉투</span>
                  <span className="text-sm text-ink-mute">₩100,000~</span>
                </div>
                <p className="text-sm text-ink-mute">
                  편하지만 마음은 잘 전해지지 않아요.
                </p>
              </div>
              <div className="bg-beige-200/30 border border-beige-300 rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-1">
                  <span className="text-ink-soft font-semibold">건강식품 / 안마기</span>
                  <span className="text-sm text-ink-mute">₩100,000~500,000</span>
                </div>
                <p className="text-sm text-ink-mute">
                  쓸모는 있지만 추억은 남지 않아요.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 leading-tight">
              자주 묻는 질문
            </h2>
            <div className="space-y-3 mb-8">
              <details className="group bg-white/70 border border-beige-300 rounded-2xl">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-medium text-ink">
                    어버이날까지 며칠 안 남았는데 가능한가요?
                  </span>
                  <span className="text-ink-mute text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-base text-ink-soft leading-relaxed">
                  네, 가능합니다. 부모님과의 한 시간 인터뷰 후 24시간 안에 PDF가
                  완성되어 이메일로 도착합니다. 어버이날 3일 전(5월 5일)까지
                  시작하시면 충분해요.
                </p>
              </details>
              <details className="group bg-white/70 border border-beige-300 rounded-2xl">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-medium text-ink">
                    부모님이 휴대폰을 잘 못 다루세요. 가능할까요?
                  </span>
                  <span className="text-ink-mute text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-base text-ink-soft leading-relaxed">
                  부모님은 휴대폰을 만지지 않으셔도 됩니다. 자녀가 자녀의
                  휴대폰으로 한권을 열고, 화면의 질문을 부모님께 읽어드린 후
                  부모님 말씀을 받아 적는 방식이에요.
                </p>
              </details>
              <details className="group bg-white/70 border border-beige-300 rounded-2xl">
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-medium text-ink">
                    인쇄본도 받을 수 있나요?
                  </span>
                  <span className="text-ink-mute text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-base text-ink-soft leading-relaxed">
                  양장 인쇄본은 어버이날 이후 출시 예정입니다. 결제 페이지에서
                  알림 신청을 해두시면 출시 즉시 안내드립니다. 올해 어버이날엔
                  PDF로 받으시고, 직접 인쇄해서 전달하시는 분들도 많으세요.
                </p>
              </details>
            </div>
          </div>
        </article>

        <PageCTA
          title="어버이날 8일 안, 충분합니다"
          description="지금 시작하시면 어버이날에 맞춰 부모님께 선물할 수 있어요."
        />
      </main>
      <Footer />
    </>
  );
}
