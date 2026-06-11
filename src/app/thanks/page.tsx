import type { Metadata } from "next";
import ThanksClear from "./ThanksClear";

export const metadata: Metadata = {
  title: "결제 완료",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="min-h-dvh bg-beige flex items-center justify-center px-6 py-10">
      <ThanksClear />
      <div className="max-w-md w-full text-center">
        <div className="fade-up w-20 h-20 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-8">
          <span className="text-4xl">🎁</span>
        </div>

        <p className="fade-up fade-up-delay-1 text-sm tracking-[0.2em] text-accent font-semibold mb-4">
          결제가 완료됐어요
        </p>

        <h1 className="fade-up fade-up-delay-2 text-3xl font-semibold leading-tight mb-4">
          정말 고맙습니다
        </h1>

        <p className="fade-up fade-up-delay-2 text-base text-ink-soft mb-12 leading-relaxed">
          한권이 본격적으로 책을 엮기 시작했어요.
          <br />
          완성된 책은 24시간 안에
          <br />
          이메일로 보내드려요.
        </p>

        <div className="fade-up fade-up-delay-3 bg-white/70 border border-beige-300 rounded-2xl p-6 mb-8 text-left">
          <p className="text-sm font-semibold text-accent-dark mb-3">
            다음 단계
          </p>
          <ol className="space-y-2 text-base text-ink leading-relaxed">
            <li className="flex gap-3">
              <span className="text-accent-dark">①</span>
              <span>한권이 50페이지 분량으로 책을 엮어요</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-dark">②</span>
              <span>완성되면 이메일로 PDF가 도착해요</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent-dark">③</span>
              <span>가족과 단톡방에서 함께 보세요</span>
            </li>
          </ol>
        </div>

        <a
          href="/"
          className="fade-up fade-up-delay-4 block w-full h-14 rounded-2xl bg-accent text-white text-lg font-semibold leading-[3.5rem] active:bg-accent-dark transition-colors shadow-sm mb-3"
        >
          또 다른 부모님 책 만들기
        </a>

        <button
          type="button"
          className="fade-up fade-up-delay-4 w-full h-12 rounded-2xl bg-white/60 border border-beige-300 text-ink-soft text-base font-medium hover:bg-white"
        >
          가족에게 알리기
        </button>

        <p className="fade-up fade-up-delay-4 text-xs text-ink-mute mt-10 leading-relaxed">
          영수증과 결제 내역은 이메일로 보내드렸어요
          <br />
          문의: contact@hankwon.com
        </p>
      </div>
    </main>
  );
}
