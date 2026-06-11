import type { Metadata } from "next";
import IntroForm from "./IntroForm";

export const metadata: Metadata = {
  title: "시작하기 — 한권",
  robots: { index: false, follow: false },
};

export default function IntroPage() {
  return <IntroForm />;
}
