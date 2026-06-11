"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  readMeta,
  readQuestions,
  getQuestionsForSession,
  META_KEY,
  QUESTIONS_KEY,
  INTRO_KEY,
  type IntroData,
} from "@/lib/questions";
import { trackEvent } from "@/lib/analytics";

type HistoricalEventKey =
  | "korean_war"
  | "vietnam_war"
  | "saemaul"
  | "may18"
  | "imf";

const HISTORICAL_EVENTS: { key: HistoricalEventKey; label: string; hint: string }[] = [
  { key: "korean_war", label: "6.25 전쟁", hint: "한국전쟁 경험" },
  { key: "vietnam_war", label: "베트남 파병", hint: "베트남전 파병 경험" },
  { key: "saemaul", label: "새마을 운동", hint: "새마을 운동 직접 참여" },
  { key: "may18", label: "5·18 민주화운동", hint: "5·18 직접 경험" },
  { key: "imf", label: "IMF 외환위기", hint: "직접적 영향 받음" },
];

const BIRTH_YEARS = Array.from({ length: 80 }, (_, i) => 1930 + i);

export default function IntroForm() {
  const [gender, setGender] = useState<"male" | "female" | "prefer_not_to_say" | "">("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [region, setRegion] = useState("");
  const [lifeExp, setLifeExp] = useState<Set<string>>(new Set());
  const [histEvents, setHistEvents] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [toLabel, setToLabel] = useState("부모님");
  const [isOtherMode, setIsOtherMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const meta = readMeta();
    if (!meta) {
      router.replace("/");
      return;
    }
    setIsOtherMode(meta.mode === "other");
    setToLabel(meta.mode === "other" && meta.to ? meta.to : "나");
  }, [router]);

  function toggleLifeExp(key: string) {
    setLifeExp((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function toggleHist(key: string) {
    setHistEvents((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  async function onSubmit() {
    setSubmitting(true);
    const introData: IntroData = {
      gender: (gender || "prefer_not_to_say") as IntroData["gender"],
      birthYear: birthYear ? Number(birthYear) : 0,
      region: region.trim(),
      lifeExperiences: [...lifeExp] as IntroData["lifeExperiences"],
      historicalEvents: [...histEvents] as IntroData["historicalEvents"],
    };

    try {
      sessionStorage.setItem(INTRO_KEY, JSON.stringify(introData));

      // Recompute question list now that introData is known
      const meta = readMeta();
      if (meta) {
        const questions = getQuestionsForSession(meta.tier, introData, meta.mode);
        sessionStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));

        // Save introData to server if we have a responseId
        if (meta.responseId) {
          fetch("/api/response", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              responseId: meta.responseId,
              introData,
            }),
          }).catch(() => {});
        }
      }
    } catch {
      // ignore storage errors
    }

    trackEvent("intro_completed", {
      has_historical: histEvents.size > 0,
      life_exp_count: lifeExp.size,
    });

    router.push("/q/1");
  }

  const subjectLabel = isOtherMode ? `${toLabel}의` : "나의";

  return (
    <main className="min-h-dvh surface-ivory px-6 py-12">
      <div className="max-w-md mx-auto">
        <a href="/" className="text-sm text-ink-soft hover:text-ink mb-8 inline-flex items-center gap-1.5">
          ← 처음으로
        </a>

        <div className="mb-12">
          <p className="eyebrow mb-5">인트로</p>
          <h1 className="font-display text-3xl text-ink mb-4 leading-tight" style={{ fontWeight: 800 }}>
            {subjectLabel} 배경을
            <br />
            알려주세요.
          </h1>
          <p className="text-base text-ink-soft leading-relaxed">
            AI가 더 맥락에 맞는 책을 만들기 위해 활용돼요.
            <br />
            모든 항목은 선택사항이에요.
          </p>
        </div>

        <div className="space-y-10">
          {/* 성별 */}
          <div>
            <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
              성별
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "male", label: "남성" },
                { value: "female", label: "여성" },
                { value: "prefer_not_to_say", label: "답변 안 함" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGender(value as typeof gender)}
                  className={`h-11 rounded-xl text-sm font-medium border transition-colors ${
                    gender === value
                      ? "bg-ink text-beige-100 border-ink"
                      : "bg-white/60 text-ink border-beige-300 hover:border-ink-mute"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 출생연도 */}
          <div>
            <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
              출생연도
            </p>
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full h-12 rounded-xl bg-white/60 border border-beige-300 px-4 text-base text-ink focus:outline-none focus:border-ink transition-colors"
            >
              <option value="">선택</option>
              {BIRTH_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
          </div>

          {/* 출생지·자란 지역 */}
          <div>
            <p className="font-display text-base text-ink mb-4" style={{ fontWeight: 700 }}>
              출생지 · 자란 지역
            </p>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예: 경상남도 진주, 서울 마포구"
              maxLength={40}
              className="w-full h-12 rounded-xl bg-white/60 border border-beige-300 px-4 text-base text-ink placeholder:text-ink-mute/60 focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          {/* 인생 경험 */}
          <div>
            <p className="font-display text-base text-ink mb-1.5" style={{ fontWeight: 700 }}>
              인생 경험
            </p>
            <p className="text-sm text-ink-mute mb-4">
              해당하는 항목을 모두 선택해주세요. (복수 선택 가능)
            </p>
            <div className="space-y-2.5">
              {[
                { key: "military", label: "군 복무 경험" },
                { key: "married", label: "결혼 경험" },
                { key: "hasChildren", label: "자녀 있음" },
                { key: "hasReligion", label: "종교 있음" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 rounded-xl border hairline bg-beige-50 px-4 py-3.5 cursor-pointer hover:bg-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={lifeExp.has(key)}
                    onChange={() => toggleLifeExp(key)}
                    className="w-4 h-4 rounded accent-ink"
                  />
                  <span className="text-base text-ink">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 시대적 경험 */}
          <div>
            <p className="font-display text-base text-ink mb-1.5" style={{ fontWeight: 700 }}>
              시대적 경험
            </p>
            <p className="text-sm text-ink-mute mb-4">
              직접 경험하셨거나 큰 영향을 받으신 사건을 선택해주세요.
            </p>
            <div className="space-y-2.5">
              {HISTORICAL_EVENTS.map(({ key, label, hint }) => (
                <label
                  key={key}
                  className="flex items-center gap-3 rounded-xl border hairline bg-beige-50 px-4 py-3.5 cursor-pointer hover:bg-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={histEvents.has(key)}
                    onChange={() => toggleHist(key)}
                    className="w-4 h-4 rounded accent-ink"
                  />
                  <div>
                    <span className="text-base text-ink">{label}</span>
                    <span className="text-xs text-ink-mute ml-2">{hint}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full h-14 rounded-2xl bg-ink text-beige-100 text-base font-semibold flex items-center justify-center hover:bg-ink-deep transition-all mt-14 disabled:opacity-60"
        >
          {submitting ? "잠깐만요…" : "질문 시작하기 →"}
        </button>

        <p className="text-center text-xs text-ink-mute mt-5 leading-relaxed">
          입력한 정보는 책 생성에만 사용되며 외부에 공개되지 않아요
        </p>
      </div>
    </main>
  );
}
