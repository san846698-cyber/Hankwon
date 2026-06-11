import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuestionPageClient from "./QuestionPageClient";

export const metadata: Metadata = {
  title: "부모님과 함께 — 한권",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ step: string }>;
};

export default async function QuestionPage({ params }: Props) {
  const { step } = await params;
  const stepNum = Number(step);

  // Max 50 is a safe upper bound; actual limit comes from session in client
  if (!Number.isInteger(stepNum) || stepNum < 1 || stepNum > 50) {
    notFound();
  }

  return <QuestionPageClient stepNum={stepNum} />;
}
