import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "이용약관",
};

const SECTIONS = [
  {
    title: "제1조 (목적)",
    body: “이 약관은 한권(이하 “회사”)이 제공하는 자서전 제작 서비스(이하 “서비스”)의 이용 조건과 절차, 회사와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.”,
  },
  {
    title: "제2조 (서비스 내용)",
    body: "회사는 이용자의 답변을 바탕으로 인공지능을 활용해 자서전 형식의 글을 생성하고, 이를 PDF 또는 인쇄본 형태로 제공합니다. 서비스의 구체적인 내용과 가격은 결제 화면에 표시된 바에 따릅니다.",
  },
  {
    title: "제3조 (이용료)",
    body: "이용료는 결제 시점에 표시된 금액에 따르며, 카드·카카오페이·네이버페이 등을 통해 결제할 수 있습니다. 결제는 결제 대행사(Toss Payments 등)를 통해 처리됩니다.",
  },
  {
    title: "제4조 (환불)",
    body: "결제 후 7일 이내, 디지털 콘텐츠를 다운로드하지 않으신 경우 전액 환불 가능합니다. 인쇄본 제작이 이미 시작된 경우엔 디지털 부분에 한해 환불되며, 인쇄·배송 비용은 환불 대상에서 제외됩니다.",
  },
  {
    title: "제5조 (저작권 및 콘텐츠)",
    body: "한권을 통해 생성된 자서전의 저작권은 결제하신 분에게 귀속됩니다. 회사는 운영 및 품질 개선 외 목적으로 이용자의 답변 내용을 사용하지 않으며, 제3자에게 제공하지 않습니다.",
  },
  {
    title: "제6조 (책임의 한계)",
    body: "회사는 인공지능을 활용해 자서전을 생성하나, 생성된 글의 모든 표현이 이용자의 의도와 정확히 일치함을 보장하지 않습니다. 이용자는 결제 전 미리보기를 통해 톤과 방향성을 확인하실 수 있습니다.",
  },
  {
    title: "제7조 (이용자의 의무)",
    body: "이용자는 타인의 명예를 훼손하거나 불법적인 내용을 답변에 포함시키지 않을 의무가 있습니다. 본인이 아닌 타인의 정보를 본인의 동의 없이 입력하지 않으셔야 합니다.",
  },
  {
    title: "제8조 (분쟁 해결)",
    body: "이 약관과 관련된 분쟁은 대한민국 법령에 따라 해결하며, 관할 법원은 회사 본점 소재지 관할 법원으로 합니다.",
  },
];

export default function TermsPage() {
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

          <h1 className="text-3xl font-semibold mb-3">이용약관</h1>
          <p className="text-sm text-ink-mute mb-12">시행일: 2026년 5월 1일</p>

          <div className="space-y-8 text-sm text-ink leading-[1.8]">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-base font-semibold mb-2 text-ink">
                  {s.title}
                </h2>
                <p className="text-ink-soft">{s.body}</p>
              </section>
            ))}

            <div className="pt-6 border-t border-beige-300">
              <p className="text-xs text-ink-mute leading-relaxed">
                본 약관과 관련된 문의는{" "}
                <a
                  href="mailto:contact@hankwon.com"
                  className="text-accent-dark underline underline-offset-2"
                >
                  contact@hankwon.com
                </a>
                으로 연락 부탁드립니다.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
