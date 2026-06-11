import LandingForm from "./LandingForm";
import Footer from "@/components/Footer";
import BookCover3D from "@/components/BookCover3D";
import BookIllustration from "@/components/BookIllustration";
import DDay from "@/components/DDay";
import Reveal from "@/components/Reveal";

const STEPS = [
  {
    num: "I",
    title: "호칭을 골라요",
    desc: "엄마, 아빠, 어머니, 아버지 — 부모님 호칭 한 분만 입력합니다.",
  },
  {
    num: "II",
    title: "이야기를 함께 나눠요",
    desc: "한 분씩 부모님께 질문을 들려드리고, 부모님 말씀을 받아 적습니다. 챕터별로 나눠 진행하셔도 좋아요.",
  },
  {
    num: "III",
    title: "한 권으로 정성껏 엮어요",
    desc: "부모님 표현을 그대로 살려 자연스러운 회고록 문체로 다듬어 한 권의 책을 만들어 드립니다.",
  },
];

const TIER_PLANS = [
  {
    id: "light",
    name: "라이트",
    badge: "미니북",
    desc: "핵심 이야기만 담아내는\n짧고 따뜻한 한 권",
    questions: 14,
    duration: "약 30분",
    format: "PDF",
    highlight: false,
  },
  {
    id: "standard",
    name: "스탠다드",
    badge: null,
    desc: "삶의 주요 챕터를 모두 담은\n균형 잡힌 한 권",
    questions: 28,
    duration: "약 1시간",
    format: "PDF",
    highlight: true,
  },
  {
    id: "premium",
    name: "고급",
    badge: "프리미엄",
    desc: "인생 전체를 풍성하게 담은\n가장 완전한 한 권",
    questions: 42,
    duration: "약 1시간 30분",
    format: "PDF + 실물 책",
    highlight: false,
  },
];

const STORIES = [
  {
    quote:
      "어머니랑 30분 동안 어렸을 때 이야기 들으면서 너무 많이 울었어요. 책으로 받고 가족 단톡방에 공유했더니 동생들이 다 울었어요.",
    from: "김민지, 38세",
    role: "어머니 환갑 선물",
  },
  {
    quote:
      "아버지 칠순 선물로 만들었어요. 평생 말 안 하시던 청년 시절 이야기를 처음 들었어요. PDF로 받아 식구들 모두 돌려봤어요.",
    from: "박철수, 42세",
    role: "아버지 칠순 선물",
  },
  {
    quote:
      "엄마는 처음엔 부끄러워하셨는데, 자녀 키운 이야기 부분에서 신나서 답하셨어요. 책 받고 며칠을 또 보고 또 보세요.",
    from: "이수진, 45세",
    role: "어버이날 선물",
  },
];

const FAQ_PREVIEW = [
  {
    q: "부모님은 어떻게 답하시나요?",
    a: "한권은 자녀가 진행하는 인터뷰 방식입니다. 부모님은 휴대폰을 만지지 않으셔도 됩니다.",
  },
  {
    q: "얼마나 걸리나요?",
    a: "보통 한 시간에서 한 시간 반 정도입니다. 한 번에 못 하셔도 답변은 자동 저장됩니다.",
  },
  {
    q: "결제 후 책은 언제 받나요?",
    a: "디지털은 24시간 안에 이메일로 받으실 수 있어요. 인쇄본은 어버이날 이후 출시 예정입니다.",
  },
];

export default function Home() {
  return (
    <>
      <main className="surface-ivory">
        {/* ─────────── Hero ─────────── */}
        <section
          id="hero"
          className="relative min-h-dvh flex items-center justify-center pt-36 pb-28 px-6 hero-bg"
        >
          <div className="relative w-full max-w-3xl mx-auto text-center">
            <div className="fade-up mb-12 flex justify-center">
              <DDay />
            </div>

            <p className="fade-up fade-up-delay-1 font-display text-base text-ink-mute mb-10 italic">
              ─ 한 권 ─
            </p>

            <h1
              className="fade-up fade-up-delay-1 font-display text-display-md sm:text-display-lg lg:text-display-xl text-ink mb-12 balanced"
              style={{ fontWeight: 800 }}
            >
              부모님의 인생을
              <br />한 권의 책으로
            </h1>

            <p className="fade-up fade-up-delay-2 text-lg lg:text-xl text-ink-soft mb-16 leading-[1.7] max-w-xl mx-auto balanced">
              부모님의 이야기를 함께 나누면
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              한 시간이 평생의 회고록이 됩니다.
            </p>

            <div className="fade-up fade-up-delay-3 max-w-md mx-auto">
              <LandingForm />
            </div>

            <div className="fade-up fade-up-delay-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-mute mt-16">
              <span>라이트 · 스탠다드 · 고급</span>
              <span className="text-ink-faint">·</span>
              <span>3가지 플랜</span>
              <span className="text-ink-faint">·</span>
              <span>가족만 볼 수 있어요</span>
            </div>
          </div>
        </section>

        {/* ─────────── Cinematic Quote ─────────── */}
        <section className="relative dark-section py-section-lg px-6 overflow-hidden">
          <div className="absolute inset-0 dark-grid pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <Reveal>
              <p className="eyebrow-light mb-14">한권으로 받은 이야기</p>
              <blockquote
                className="font-display text-display-sm sm:text-display-md text-beige-100 leading-[1.2] balanced"
                style={{ fontWeight: 800 }}
              >
                <span className="editorial-quote-mark text-7xl sm:text-8xl text-accent-light/40 mr-2">
                  “
                </span>
                엄마가 평생 들려주지 못한
                <br className="hidden sm:inline" />
                이야기가 한 권의 책으로
                <br className="hidden sm:inline" />
                엮였어요.
                <span className="editorial-quote-mark text-7xl sm:text-8xl text-accent-light/40 ml-2">
                  ”
                </span>
              </blockquote>
              <div className="mt-16 inline-flex items-center gap-4 text-beige-100/50">
                <span className="ornament-mark" />
                <p className="text-sm font-medium tracking-wide">
                  김민지, 38세 · 어머니 환갑 선물
                </p>
                <span className="ornament-mark" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Book showcase ─────────── */}
        <section className="surface-ivory py-section-lg px-6 border-t hairline overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal className="mb-20">
              <p className="eyebrow mb-9">완성된 책</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink mb-9 balanced"
                style={{ fontWeight: 800 }}
              >
                실제로 이런
                <br />
                책이 만들어집니다.
              </h2>
              <p className="text-lg text-ink-soft leading-[1.7] max-w-xl mx-auto balanced">
                표지부터 차례, 7장의 본문, 마지막 헌사까지 — 50페이지의 한 권.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="float-slow inline-block">
                <BookCover3D className="w-full" />
              </div>
            </Reveal>

            <Reveal delay={300} className="mt-20">
              <a
                href="/sample"
                className="inline-flex items-center gap-2 px-9 h-14 rounded-full bg-ink text-beige-100 text-base font-semibold hover:bg-ink-deep transition-colors"
              >
                책 샘플 펼쳐보기
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ─────────── How it works ─────────── */}
        <section
          id="how"
          className="surface-cream py-section px-6 border-t hairline"
        >
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-20">
              <p className="eyebrow mb-9">동작 방식</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink mb-9 balanced"
                style={{ fontWeight: 800 }}
              >
                부모님과 마주 앉아
                <br />한 시간이면 충분합니다.
              </h2>
              <p className="text-lg text-ink-soft leading-[1.7] max-w-xl mx-auto balanced">
                부모님은 휴대폰을 만지지 않으셔도 됩니다.
                <br />
                자녀가 묻고, 자녀가 받아 적습니다.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 120}>
                  <div className="relative bg-beige-50 border hairline rounded-3xl p-9 lg:p-10 h-full lift-on-hover">
                    <p
                      className="font-display text-3xl text-accent mb-7 tabular-nums italic"
                      style={{ fontWeight: 700 }}
                    >
                      {step.num}.
                    </p>
                    <h3
                      className="font-display text-2xl text-ink mb-4 leading-tight"
                      style={{ fontWeight: 700 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-base text-ink-soft leading-[1.75]">
                      {step.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── Inside the book ─────────── */}
        <section className="surface-ivory py-section px-6 border-t hairline">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <p className="eyebrow mb-9">책의 안쪽</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink mb-9 balanced"
                style={{ fontWeight: 800 }}
              >
                부모님 표현을
                <br />
                그대로 살린
                <br />
                회고록 문체.
              </h2>
              <p className="text-lg text-ink-soft leading-[1.75] mb-10 max-w-md">
                말씀 하나하나를 그대로 보존하면서 — 임의로 꾸며내지 않고 — 자연스러운 산문으로 정성껏 다듬습니다.
              </p>
              <a
                href="/sample"
                className="inline-flex items-center gap-2 text-base font-semibold text-ink hover:text-accent-dark underline-offset-8 hover:underline decoration-1"
              >
                전체 샘플 보기
                <span aria-hidden>→</span>
              </a>
            </Reveal>

            <Reveal delay={150}>
              <BookIllustration className="w-full max-w-lg mx-auto" />
            </Reveal>
          </div>
        </section>

        {/* ─────────── Pricing ─────────── */}
        <section className="surface-cream py-section px-6 border-t hairline">
          <div className="max-w-4xl mx-auto">
            <Reveal className="text-center mb-16">
              <p className="eyebrow mb-9">플랜</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink mb-9 balanced"
                style={{ fontWeight: 800 }}
              >
                이야기의 깊이만큼,
                <br />
                나에게 맞는 한 권
              </h2>
              <p className="text-lg text-ink-soft leading-[1.7] max-w-md mx-auto">
                세 가지 플랜 중 부모님께 맞는 깊이를 선택하세요.
              </p>
            </Reveal>

            <Reveal>
              <div className="grid sm:grid-cols-3 gap-4 lg:gap-5 mb-10">
                {TIER_PLANS.map((t) => (
                  <div
                    key={t.id}
                    className={`relative rounded-3xl p-7 lg:p-8 flex flex-col ${
                      t.highlight
                        ? "bg-ink text-beige-100 ring-2 ring-ink"
                        : "bg-beige-50 border hairline"
                    }`}
                  >
                    {t.highlight && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold tracking-wide whitespace-nowrap">
                        인기
                      </span>
                    )}

                    {/* Name + badge */}
                    <div className="mb-5">
                      <div className="flex items-baseline gap-2 mb-1">
                        <p
                          className={`font-display text-xl ${
                            t.highlight ? "text-beige-100" : "text-ink"
                          }`}
                          style={{ fontWeight: 800 }}
                        >
                          {t.name}
                        </p>
                        {t.badge && (
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              t.highlight
                                ? "bg-white/15 text-beige-100/80"
                                : "bg-accent/10 text-accent-dark"
                            }`}
                          >
                            {t.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm leading-relaxed whitespace-pre-line ${
                          t.highlight ? "text-beige-100/60" : "text-ink-mute"
                        }`}
                      >
                        {t.desc}
                      </p>
                    </div>

                    {/* Question count — focal number */}
                    <div
                      className={`mb-5 pb-5 border-b ${
                        t.highlight ? "border-white/15" : "border-beige-300"
                      }`}
                    >
                      <p
                        className={`font-display tabular-nums leading-none ${
                          t.highlight ? "text-beige-100" : "text-ink"
                        }`}
                        style={{ fontWeight: 800, fontSize: "3rem" }}
                      >
                        {t.questions}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          t.highlight ? "text-beige-100/50" : "text-ink-mute"
                        }`}
                      >
                        문항
                      </p>
                    </div>

                    {/* Details */}
                    <ul
                      className={`space-y-2 text-sm flex-1 mb-6 ${
                        t.highlight ? "text-beige-100/70" : "text-ink-soft"
                      }`}
                    >
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1 h-1 rounded-full shrink-0 ${
                            t.highlight ? "bg-beige-100/40" : "bg-ink-mute"
                          }`}
                        />
                        {t.duration}
                      </li>
                      <li className="flex items-center gap-2">
                        <span
                          className={`w-1 h-1 rounded-full shrink-0 ${
                            t.highlight ? "bg-beige-100/40" : "bg-ink-mute"
                          }`}
                        />
                        {t.format}
                      </li>
                    </ul>

                    {/* Price */}
                    <div
                      className={`rounded-2xl py-3 text-center text-sm font-semibold ${
                        t.highlight
                          ? "bg-white/10 text-beige-100/60"
                          : "bg-beige-200/60 text-ink-mute"
                      }`}
                    >
                      가격 공개 예정
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-ink-mute italic">
                출시 전 알림을 받으시려면{" "}
                <a
                  href="/#hero"
                  className="text-ink underline underline-offset-4 not-italic font-medium hover:text-accent-dark transition-colors"
                >
                  지금 시작하기 →
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Stories ─────────── */}
        <section className="surface-ivory py-section px-6 border-t hairline">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-20">
              <p className="eyebrow mb-9">이야기</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink balanced"
                style={{ fontWeight: 800 }}
              >
                한권으로
                <br />
                부모님께 드린 선물
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {STORIES.map((s, i) => (
                <Reveal key={i} delay={i * 120}>
                  <figure className="bg-beige-50 border hairline rounded-3xl p-8 h-full flex flex-col lift-on-hover">
                    <span
                      className="font-display text-5xl text-accent/40 leading-none mb-5"
                      style={{ fontWeight: 800 }}
                      aria-hidden
                    >
                      “
                    </span>
                    <blockquote className="text-base lg:text-lg text-ink leading-[1.75] mb-8 flex-1 balanced">
                      {s.quote}
                    </blockquote>
                    <figcaption className="flex items-center gap-3 pt-6 border-t hairline">
                      <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-sm font-bold text-beige-100">
                        {s.from.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="font-display text-sm text-ink"
                          style={{ fontWeight: 700 }}
                        >
                          {s.from}
                        </p>
                        <p className="text-xs text-ink-mute mt-0.5">{s.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── FAQ ─────────── */}
        <section className="surface-cream py-section px-6 border-t hairline">
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-14">
              <p className="eyebrow mb-9">FAQ</p>
              <h2
                className="font-display text-display-sm sm:text-display-md text-ink balanced"
                style={{ fontWeight: 800 }}
              >
                궁금하실 만한 것들
              </h2>
            </Reveal>

            <Reveal>
              <div className="space-y-2 mb-10">
                {FAQ_PREVIEW.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-beige-50 border hairline rounded-2xl"
                  >
                    <summary className="cursor-pointer list-none px-7 py-5 flex items-center justify-between gap-3">
                      <span
                        className="font-display text-ink text-base"
                        style={{ fontWeight: 700 }}
                      >
                        {faq.q}
                      </span>
                      <span className="text-ink-mute text-2xl group-open:rotate-45 transition-transform shrink-0">
                        +
                      </span>
                    </summary>
                    <div className="px-7 pb-6 text-base text-ink-soft leading-[1.75]">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
              <a
                href="/faq"
                className="block text-center text-sm text-ink-mute hover:text-ink underline-offset-4 hover:underline italic"
              >
                더 많은 질문 →
              </a>
            </Reveal>
          </div>
        </section>

        {/* ─────────── Final CTA ─────────── */}
        <section className="relative dark-section py-section-lg px-6 overflow-hidden border-t hairline-dark">
          <div className="absolute inset-0 dark-grid pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="mb-12 flex justify-center">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border hairline-dark bg-white/5 text-beige-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-light shimmer" />
                  <span className="text-xs font-semibold tracking-wide">
                    어버이날까지 D-7
                  </span>
                </div>
              </div>
              <h2
                className="font-display text-display-md sm:text-display-lg text-beige-100 leading-[1.05] mb-12 balanced"
                style={{ fontWeight: 800 }}
              >
                부모님과의 한 시간이
                <br />
                평생의 책이 됩니다.
              </h2>
              <p className="text-lg text-beige-100/60 mb-16 leading-[1.7] max-w-xl mx-auto">
                지금 시작하시면 어버이날에 맞춰 부모님께 선물할 수 있어요.
              </p>
              <a
                href="/#hero"
                className="inline-flex items-center gap-3 px-12 h-16 rounded-full bg-beige-100 text-ink text-lg font-bold hover:bg-white transition-colors"
              >
                지금 시작하기
                <span aria-hidden>→</span>
              </a>
              <p className="text-xs text-beige-100/40 mt-12">
                미리보기 무료 · 결제 후 7일 환불 가능
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
