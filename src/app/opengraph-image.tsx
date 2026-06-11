import { ImageResponse } from "next/og";

export const alt = "한권 — 부모님의 인생을 한 권의 책으로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_BOLD =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Bold.woff";
const FONT_REGULAR =
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Regular.woff";

async function loadFont(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const [bold, regular] = await Promise.all([
    loadFont(FONT_BOLD),
    loadFont(FONT_REGULAR),
  ]);

  const fonts = [
    bold && { name: "Pretendard", data: bold, weight: 700 as const },
    regular && { name: "Pretendard", data: regular, weight: 400 as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700 }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #F8F4ED 0%, #EFE4D2 100%)",
          padding: "80px",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#A67C5A",
            fontSize: 30,
            letterSpacing: 10,
            fontWeight: 700,
            marginBottom: 56,
          }}
        >
          한 권
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#2C2826",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.25,
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            부모님의 인생을
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            한 권의 책으로
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "#5C544F",
            fontSize: 30,
            marginTop: 56,
            fontWeight: 400,
          }}
        >
          35가지 질문 · 한 시간 · 한 권의 책으로 정성껏 엮어드려요
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
