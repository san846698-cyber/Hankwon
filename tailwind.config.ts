import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ivory-warm bases (was: beige) — editorial / boutique-book tones
        beige: {
          DEFAULT: "#FAF7F2",
          50: "#FFFFFF",
          100: "#FAF7F2",
          200: "#F2ECE0",
          300: "#E5DDCD",
          400: "#C4B89F",
        },
        ink: {
          DEFAULT: "#1F1814",
          deep: "#0F0806",
          soft: "#4A3F38",
          mute: "#8A7E73",
          faint: "#B8AC9E",
        },
        accent: {
          DEFAULT: "#B8956A",
          dark: "#8B6F4D",
          deep: "#5A4530",
          light: "#D4B896",
          glow: "#EAE0D0",
        },
        wine: {
          DEFAULT: "#5C2424",
          deep: "#3D1818",
          light: "#8B4848",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "Nanum Myeongjo",
          "Noto Serif KR",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      fontSize: {
        "parent-base": ["18px", "1.7"],
        "parent-lg": ["20px", "1.6"],
        "parent-xl": ["28px", "1.4"],
        "parent-2xl": ["34px", "1.3"],
        "display-sm": ["44px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["60px", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-lg": ["80px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["104px", { lineHeight: "1.0", letterSpacing: "-0.022em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "8rem",
        "section-lg": "12rem",
      },
      boxShadow: {
        "soft": "0 1px 2px rgba(31, 24, 20, 0.04), 0 8px 24px -8px rgba(31, 24, 20, 0.06)",
        "lift": "0 4px 8px -2px rgba(31, 24, 20, 0.06), 0 24px 48px -16px rgba(31, 24, 20, 0.12)",
        "glow": "0 24px 64px -24px rgba(31, 24, 20, 0.18)",
        "book": "0 32px 64px -28px rgba(0, 0, 0, 0.5), 0 12px 24px -12px rgba(0, 0, 0, 0.2)",
        "hairline": "0 0 0 1px rgba(31, 24, 20, 0.06)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
