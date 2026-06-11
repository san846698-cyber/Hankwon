"use client";

import { useEffect } from "react";
import { clearSession } from "@/lib/questions";

export default function ThanksClear() {
  useEffect(() => {
    clearSession();
  }, []);
  return null;
}
