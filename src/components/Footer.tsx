export default function Footer() {
  return (
    <footer className="border-t hairline surface-ivory px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-display text-3xl text-ink mb-4" style={{ fontWeight: 800 }}>
            한권
          </p>
          <p className="text-sm text-ink-mute leading-relaxed">
            부모님의 인생을 한 권의 책으로
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-sm max-w-5xl mx-auto">
          <div>
            <p className="eyebrow mb-5">시즌 / 행사</p>
            <ul className="space-y-3 text-ink-soft">
              <li><a href="/occasions/parents-day" className="hover:text-ink">어버이날 선물</a></li>
              <li><a href="/occasions/milestone/60" className="hover:text-ink">환갑 선물</a></li>
              <li><a href="/occasions/milestone/70" className="hover:text-ink">칠순 선물</a></li>
              <li><a href="/occasions/milestone/80" className="hover:text-ink">팔순 선물</a></li>
              <li><a href="/occasions/chuseok" className="hover:text-ink">추석 / 명절</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">가이드</p>
            <ul className="space-y-3 text-ink-soft">
              <li><a href="/guides/questions-for-parents" className="hover:text-ink">부모님께 묻는 질문들</a></li>
              <li><a href="/guides/listening-to-parents" className="hover:text-ink">잘 듣는 법</a></li>
              <li><a href="/guides/memoir-writing" className="hover:text-ink">자서전 만드는 4가지 방법</a></li>
              <li><a href="/sample" className="hover:text-ink">책 샘플</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">한권</p>
            <ul className="space-y-3 text-ink-soft">
              <li><a href="/about" className="hover:text-ink">한권 이야기</a></li>
              <li><a href="/faq" className="hover:text-ink">자주 묻는 질문</a></li>
              <li><a href="/vs/storyworth" className="hover:text-ink">Storyworth 비교</a></li>
              <li><a href="/vs/biography-ghostwriter" className="hover:text-ink">자서전 대필 비교</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">법적</p>
            <ul className="space-y-3 text-ink-soft">
              <li><a href="/terms" className="hover:text-ink">이용약관</a></li>
              <li><a href="/privacy" className="hover:text-ink">개인정보처리방침</a></li>
              <li><a href="mailto:contact@hankwon.com" className="hover:text-ink">문의</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t hairline max-w-5xl mx-auto">
          <div className="text-[11px] leading-relaxed text-ink-faint space-y-0.5 mb-6">
            <p>상호: 스튜디오포애니(studio4any) · 대표자: 홍유빈</p>
            <p>사업자등록번호: 799-02-03663</p>
            <p>주소: 경기도 용인시 기흥구 동백2로 11, 4206동 201호</p>
            <p>
              이메일:{" "}
              <a href="mailto:yubinhong2030@gmail.com" className="hover:text-ink-mute">
                yubinhong2030@gmail.com
              </a>{" "}
              · 전화:{" "}
              <a href="tel:01027750374" className="hover:text-ink-mute">
                010-2775-0374
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-ink-faint">
            <p>© 2026 한권 · 부모님의 인생을 한 권의 책으로</p>
            <p>contact@hankwon.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
