import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

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

function loadLogoBase64(): string | null {
  try {
    const buf = fs.readFileSync(
      path.join(process.cwd(), "public", "logo-wordmark.png"),
    );
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [[bold, regular], logoSrc] = await Promise.all([
    Promise.all([loadFont(FONT_BOLD), loadFont(FONT_REGULAR)]),
    Promise.resolve(loadLogoBase64()),
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
        {/* 로고 워드마크 */}
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt="한권"
            style={{ height: 72, width: "auto", marginBottom: 48, objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              color: "#A67C5A",
              fontSize: 30,
              letterSpacing: 10,
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            한 권
          </div>
        )}

        {/* 메인 카피 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#2C2826",
            fontSize: 88,
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

        {/* 서브카피 */}
        <div
          style={{
            display: "flex",
            color: "#5C544F",
            fontSize: 28,
            marginTop: 48,
            fontWeight: 400,
          }}
        >
          부모님의 이야기를 · 한 권의 책으로 · 정성껏 엮어드려요
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
