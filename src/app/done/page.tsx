import type { Metadata } from "next";
import DoneClient from "./DoneClient";

export const metadata: Metadata = {
  title: "한 권이 완성됐어요",
  robots: { index: false, follow: false },
};

export default function DonePage() {
  return <DoneClient />;
}
