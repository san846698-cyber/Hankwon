"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/sample", label: "샘플" },
  { href: "/guides/questions-for-parents", label: "가이드" },
  { href: "/occasions/parents-day", label: "어버이날" },
  { href: "/faq", label: "FAQ" },
];

const HIDE_ON = ["/q/", "/done", "/buy", "/book/", "/thanks"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname && HIDE_ON.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
        scrolled
          ? "bg-beige/85 backdrop-blur-xl border-b hairline"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <a
          href="/"
          className="font-display text-2xl text-ink leading-none"
          style={{ fontWeight: 800 }}
        >
          한권
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.04em] text-ink-soft hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/#hero"
          className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-ink text-beige-100 text-[13px] font-semibold tracking-wide hover:bg-ink-deep transition-colors"
        >
          시작하기
        </a>
      </div>
    </header>
  );
}
