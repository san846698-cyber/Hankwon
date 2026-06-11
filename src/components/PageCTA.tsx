export default function PageCTA({
  title = "지금 시작해보세요",
  description = "미리보기는 무료입니다. 부모님과 한 시간이면 한 권의 책이 됩니다.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="dark-section py-section px-6 border-t hairline-dark">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="font-display text-display-sm sm:text-display-md text-beige-100 mb-7 balanced"
          style={{ fontWeight: 800 }}
        >
          {title}
        </h2>
        <p className="text-lg text-beige-100/70 mb-12 leading-[1.7] balanced">
          {description}
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-10 h-14 rounded-full bg-beige-100 text-ink text-base font-semibold hover:bg-white transition-colors"
        >
          무료로 시작하기
          <span aria-hidden>→</span>
        </a>
        <p className="text-xs text-beige-100/50 mt-7">
          미리보기 무료 · 결제 후 7일 환불 가능
        </p>
      </div>
    </section>
  );
}
