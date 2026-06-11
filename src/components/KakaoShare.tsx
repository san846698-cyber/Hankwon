"use client";

import Script from "next/script";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (args: KakaoSendDefaultArgs) => void;
      };
    };
  }
}

type KakaoSendDefaultArgs = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons?: Array<{
    title: string;
    link: { mobileWebUrl: string; webUrl: string };
  }>;
};

/**
 * Mount the Kakao SDK once per session. Renders nothing if no key configured.
 */
export function KakaoScript() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!appKey) return null;
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onLoad={() => {
        if (
          typeof window !== "undefined" &&
          window.Kakao &&
          !window.Kakao.isInitialized()
        ) {
          window.Kakao.init(appKey);
        }
      }}
    />
  );
}

/**
 * Share a link to KakaoTalk if the SDK is loaded; otherwise fall back to
 * copying the link to the clipboard with a user-facing notice.
 */
export async function shareToKakao(args: {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}): Promise<void> {
  const kakao = typeof window !== "undefined" ? window.Kakao : undefined;

  if (kakao && kakao.isInitialized()) {
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: args.title,
        description: args.description,
        imageUrl: args.imageUrl,
        link: { mobileWebUrl: args.link, webUrl: args.link },
      },
      buttons: [
        {
          title: "한 권 미리보기",
          link: { mobileWebUrl: args.link, webUrl: args.link },
        },
      ],
    });
    return;
  }

  // Fallback: clipboard copy.
  try {
    await navigator.clipboard.writeText(args.link);
    alert("링크가 복사됐어요. 카톡 단톡방에 붙여넣어 주세요.");
  } catch {
    alert(`아래 링크를 복사해 카톡 단톡방에 보내주세요:\n\n${args.link}`);
  }
}
