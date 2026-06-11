import type { Metadata } from "next";
import BuyForm from "./BuyForm";

export const metadata: Metadata = {
  title: "책으로 받기",
  description: "부모님의 인생을 50페이지 분량의 책으로 받아보세요.",
  robots: { index: false, follow: true },
};

const PLAN = {
  id: "digital",
  title: "디지털 책",
  price: 29900,
  desc: "PDF로 받아보는 50페이지 분량의 책",
  perks: ["고화질 PDF", "이메일 즉시 발송", "평생 다시 다운로드"],
} as const;

export type Plan = typeof PLAN;

export default function BuyPage() {
  return <BuyForm plan={PLAN} />;
}
