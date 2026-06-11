import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "한권에 대해 가장 많이 받는 질문들이에요.",
};

const FAQS = [
  {
    q: "부모님은 어떻게 답하시나요?",
    a: "한권은 자녀가 진행하는 인터뷰 방식이에요. 자녀가 휴대폰에 띄운 한권 화면의 질문을 부모님께 들려드리고, 부모님 말씀을 받아 적습니다. 부모님은 휴대폰을 직접 만지지 않으셔도 돼요.",
  },
  {
    q: "얼마나 걸리나요?",
    a: "35가지 질문에 부모님과 함께 답하는 데 보통 한 시간에서 한 시간 반 정도예요. 한 번에 다 못 하셔도 답변은 자동 저장되니 챕터별로 나눠서 진행하셔도 됩니다.",
  },
  {
    q: "결제 후 책은 언제 받나요?",
    a: "결제 후 24시간 이내에 PDF가 이메일로 발송됩니다. 어버이날 같은 시즌엔 트래픽이 몰릴 수 있어 조금 더 걸릴 수 있어요.",
  },
  {
    q: "인쇄본도 받을 수 있나요?",
    a: "양장 인쇄본은 어버이날 이후 출시될 예정이에요. 결제 페이지에서 알림 신청을 해두시면 출시되는 대로 가장 먼저 안내드립니다. 디지털 결제 후에 인쇄본이 출시되면 추가 결제로 인쇄본만 따로 주문하실 수 있게 준비하고 있어요.",
  },
  {
    q: "환불이 가능한가요?",
    a: "결제 후 7일 이내, 디지털 콘텐츠를 다운로드하지 않으신 경우 전액 환불 가능합니다. 자세한 내용은 이용약관을 확인해주세요.",
  },
  {
    q: "AI는 어떤 모델을 쓰나요?",
    a: "Anthropic의 Claude 모델을 사용해 한국어 자서전 톤에 맞춰 글을 엮습니다. 답변 내용을 임의로 꾸며내지 않고, 부모님 말씀을 자연스러운 회고록 문체로 다듬어요.",
  },
  {
    q: "답변 내용은 어떻게 보호되나요?",
    a: "답변은 결제하신 분만 볼 수 있도록 안전하게 저장되며, 모델 학습 등 다른 목적으로 사용되지 않습니다. 자세한 내용은 개인정보처리방침을 확인해주세요.",
  },
  {
    q: "답변을 수정할 수 있나요?",
    a: "각 질문 페이지에서 [← 이전] 버튼으로 돌아가 언제든 수정하실 수 있어요. 책으로 만들어진 후에도 수정 요청이 있으면 contact@hankwon.com으로 알려주세요.",
  },
  {
    q: "한 분이 아니라 부모님 두 분 책을 만들고 싶어요",
    a: "지금은 한 분씩 따로 만드는 방식이에요. 어머니와 아버지를 각각 인터뷰하셔서 두 권의 책으로 만드시는 분들이 많으세요.",
  },
  {
    q: "음성으로 받아 적을 수는 없나요?",
    a: "정식 출시 단계에서 음성 자동 받아쓰기 기능을 추가할 예정이에요. 지금은 부모님 말씀을 들으며 직접 입력하시면 됩니다.",
  },
];

export default function FAQPage() {
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
            FAQ
          </p>
          <h1 className="text-3xl font-semibold leading-tight mb-3">
            자주 묻는 질문
          </h1>
          <p className="text-base text-ink-soft mb-10 leading-relaxed">
            한권에 대해 가장 많이 받는 질문들이에요
          </p>

          <div className="space-y-2 mb-12">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white/70 border border-beige-300 rounded-2xl overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-medium text-ink">{faq.q}</span>
                  <span className="text-ink-mute text-xl group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-base text-ink-soft leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 text-center">
            <p className="text-base text-ink mb-2">더 궁금한 점이 있으세요?</p>
            <p className="text-sm text-ink-soft">
              <a
                href="mailto:contact@hankwon.com"
                className="text-accent-dark underline underline-offset-2"
              >
                contact@hankwon.com
              </a>
              으로 연락주세요
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
