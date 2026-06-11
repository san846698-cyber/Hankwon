import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main className="min-h-dvh bg-beige flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <p className="text-sm tracking-[0.2em] text-accent font-semibold mb-4">
            404
          </p>
          <h1 className="text-3xl font-semibold leading-tight mb-4">
            페이지를 찾을 수 없어요
          </h1>
          <p className="text-base text-ink-soft mb-10 leading-relaxed">
            잘못된 주소이거나, 사라진 페이지일 수 있어요.
            <br />
            처음으로 돌아가서 다시 시작해 주세요.
          </p>
          <a
            href="/"
            className="inline-block px-10 h-14 leading-[3.5rem] rounded-2xl bg-accent text-white text-lg font-semibold active:bg-accent-dark transition-colors shadow-sm"
          >
            처음으로
          </a>
          <p className="text-xs text-ink-mute mt-10 leading-relaxed">
            문제가 계속되면{" "}
            <a
              href="mailto:contact@hankwon.com"
              className="text-accent-dark underline underline-offset-2"
            >
              contact@hankwon.com
            </a>
            으로 알려주세요
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
