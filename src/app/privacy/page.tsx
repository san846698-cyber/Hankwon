import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

const SECTIONS = [
  {
    title: "1. 수집하는 개인정보",
    body: (
      <ul className="list-disc list-outside ml-5 space-y-1.5 text-ink-soft">
        <li>이름, 이메일 주소 — 결제 및 자서전 발송용</li>
        <li>인쇄본 신청 시 배송지 주소</li>
        <li>부모님의 답변 내용 — 자서전 생성을 위한 콘텐츠</li>
        <li>
          결제 정보(카드번호 등)는 결제 대행사(Toss Payments)에서 처리하며,
          한권은 별도로 저장하지 않습니다
        </li>
      </ul>
    ),
  },
  {
    title: "2. 개인정보 이용 목적",
    body: (
      <ul className="list-disc list-outside ml-5 space-y-1.5 text-ink-soft">
        <li>자서전 생성 및 전달</li>
        <li>결제 처리 및 환불</li>
        <li>고객 문의 응대</li>
        <li>서비스 개선을 위한 통계 (개인 식별 불가능한 형태로만)</li>
      </ul>
    ),
  },
  {
    title: "3. 개인정보 보유 기간",
    body: (
      <p className="text-ink-soft">
        자서전 콘텐츠는 결제하신 분이 삭제 요청하실 때까지 보관됩니다. 단,
        전자상거래법에 따라 결제·계약 정보는 5년, 소비자 분쟁 처리 정보는 3년간
        보관됩니다.
      </p>
    ),
  },
  {
    title: "4. 제3자 제공",
    body: (
      <p className="text-ink-soft">
        한권은 이용자의 답변 내용을 자서전 생성 외 어떤 목적으로도 제3자에게
        제공하지 않습니다. 원고 생성 처리는 Anthropic Claude API를 통해 이루어지며,
        Anthropic은 API 호출 데이터를 모델 학습에 사용하지 않는다고 명시하고
        있습니다.
      </p>
    ),
  },
  {
    title: "5. 이용자의 권리",
    body: (
      <p className="text-ink-soft">
        이용자는 언제든지 자신의 정보 조회·수정·삭제를 요청하실 수 있습니다.
        contact@hankwon.com으로 본인 확인이 가능한 정보와 함께 요청해주시면 7일
        이내 처리해드립니다.
      </p>
    ),
  },
  {
    title: "6. 보안",
    body: (
      <p className="text-ink-soft">
        모든 데이터는 암호화된 통신(HTTPS)을 통해 전송되며, 데이터베이스는
        업계 표준 보안 정책에 따라 관리됩니다. 비밀번호 등 민감한 인증 정보는
        평문으로 저장되지 않습니다.
      </p>
    ),
  },
  {
    title: "7. 개인정보 보호 책임자",
    body: (
      <p className="text-ink-soft">
        성명: 한권 개인정보보호 담당자
        <br />
        이메일: contact@hankwon.com
      </p>
    ),
  },
];

export default function PrivacyPage() {
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

          <h1 className="text-3xl font-semibold mb-3">개인정보처리방침</h1>
          <p className="text-sm text-ink-mute mb-12">시행일: 2026년 5월 1일</p>

          <div className="space-y-8 text-sm leading-[1.8]">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="text-base font-semibold mb-2 text-ink">
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
