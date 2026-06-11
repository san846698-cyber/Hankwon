"use client";

import { useEffect, useState } from "react";

type Occasion = {
  label: string;
  date: Date;
};

function nextParentsDay(now: Date): Occasion {
  const year = now.getFullYear();
  const may8 = new Date(year, 4, 8, 23, 59, 59);
  const target = now <= may8 ? may8 : new Date(year + 1, 4, 8, 23, 59, 59);
  return { label: "어버이날", date: target };
}

function daysUntil(target: Date, now: Date): number {
  const ms = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export default function DDay() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const occasion = nextParentsDay(now);
    const d = daysUntil(occasion.date, now);
    if (d <= 60) setDays(d);
  }, []);

  if (days === null) return null;

  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border hairline bg-white text-ink">
      <span className="w-1.5 h-1.5 rounded-full bg-ink shimmer" />
      <span className="text-xs font-semibold tracking-wide tabular-nums">
        어버이날 D-{days}
      </span>
    </div>
  );
}
