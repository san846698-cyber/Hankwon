import { ImageResponse } from "next/og";

export const alt = "한 권 미리보기 — 가족이 정성껏 모은 30분이 한 권의 책으로";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #F8F4ED 0%, #EFE4D2 100%)",
          padding: 64,
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(255, 255, 255, 0.85)",
            border: "1px solid #E8DBC9",
            borderRadius: 32,
            padding: 64,
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#A67C5A",
                fontSize: 24,
                letterSpacing: 8,
                fontWeight: 700,
                marginBottom: 28,
              }}
            >
              한 권 미리보기
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#2C2826",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.25,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                부모님의 이야기로
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                만든 책이 도착했어요
              </div>
            </div>
            <div
              style={{
                display: "flex",
                color: "#5C544F",
                fontSize: 22,
                marginTop: 12,
              }}
            >
              가족이 정성껏 모은 시간이 한 권으로 엮였어요
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px dashed #E8DBC9",
              paddingTop: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#8B6444",
                fontSize: 18,
                letterSpacing: 4,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              1장 — 어린 시절
            </div>
            <div
              style={{
                display: "flex",
                color: "#2C2826",
                fontSize: 22,
                lineHeight: 1.7,
              }}
            >
              부모님의 이야기는 거창한 사건에서 시작되지 않는다. 한 줄기 햇빛, 마당의 흙냄새 —
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
