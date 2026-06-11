import type { Metadata, Viewport } from "next";
import Analytics from "@/components/Analytics";
import { KakaoScript } from "@/components/KakaoShare";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hankwon.com"),
  title: {
    default: "한권 — 부모님의 인생을 한 권의 책으로",
    template: "%s — 한 권",
  },
  description:
    "35가지 질문을 부모님과 함께 나누면 AI가 한 권의 책으로 엮어드려요. 어버이날, 환갑, 칠순 — 가족 모두에게 평생의 선물.",
  keywords: [
    "한권",
    "한권 자서전",
    "AI 자서전",
    "부모님 자서전",
    "어버이날 선물",
    "효도 선물",
    "회고록",
  ],
  openGraph: {
    title: "한권 — 부모님의 인생을 한 권의 책으로",
    description:
      "35가지 질문을 부모님과 함께 나누면 AI가 한 권의 책으로 엮어드려요.",
    type: "website",
    locale: "ko_KR",
    siteName: "한 권",
  },
  twitter: {
    card: "summary_large_image",
    title: "한권 — 부모님의 인생을 한 권의 책으로",
    description:
      "35가지 질문을 부모님과 함께 나누면 AI가 한 권의 책으로 엮어드려요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F8F4ED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
        />
      </head>
      <body className="font-sans antialiased bg-beige text-ink">
        <Header />
        {children}
        <Analytics />
        <KakaoScript />
      </body>
    </html>
  );
}
