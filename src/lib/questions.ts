import { QUESTIONS, type HistoricalEvent } from "@/data/questions";
import { TIER_ORDER, type TierId } from "@/data/tiers";

export type IntroData = {
  gender: "male" | "female" | "prefer_not_to_say";
  birthYear: number;
  region: string;
  lifeExperiences: ("military" | "married" | "hasChildren" | "hasReligion")[];
  historicalEvents: HistoricalEvent[];
};

export type SessionQuestion = {
  id: number;
  chapterIndex: number;
  chapterName: string;
  questionIndex: number;
  text: string; // resolved per mode
  hint: string;
  prompts: string[];
};

export type HankwonMeta = {
  mode: "self" | "other";
  to: string; // honorific — empty string when mode==='self'
  tier: TierId;
  responseId: string | null;
  slug: string | null;
  style?: "simple" | "rich";
  person?: "first" | "third";
};

export const META_KEY = "hankwon:meta";
export const ANSWERS_KEY = "hankwon:answers";
export const QUESTIONS_KEY = "hankwon:questions";
export const INTRO_KEY = "hankwon:intro";

export function getQuestionsForSession(
  tier: TierId,
  introData: IntroData | null,
  mode: "self" | "other",
): SessionQuestion[] {
  const userTierLevel = TIER_ORDER[tier];

  return QUESTIONS.filter((q) => {
    if (TIER_ORDER[q.tier] > userTierLevel) return false;

    const c = q.conditions;
    if (!c) return true;

    if (c.military && !introData?.lifeExperiences.includes("military"))
      return false;
    if (c.married && !introData?.lifeExperiences.includes("married"))
      return false;
    if (c.hasChildren && !introData?.lifeExperiences.includes("hasChildren"))
      return false;
    if (c.hasReligion && !introData?.lifeExperiences.includes("hasReligion"))
      return false;
    if (c.historicalEvents && c.historicalEvents.length > 0) {
      const hasAny = c.historicalEvents.some((e) =>
        introData?.historicalEvents.includes(e),
      );
      if (!hasAny) return false;
    }

    return true;
  })
    .sort((a, b) => {
      if (a.chapterIndex !== b.chapterIndex)
        return a.chapterIndex - b.chapterIndex;
      return a.questionIndex - b.questionIndex;
    })
    .map((q) => ({
      id: q.id,
      chapterIndex: q.chapterIndex,
      chapterName: q.chapterName,
      questionIndex: q.questionIndex,
      text: mode === "self" ? q.textSelf : q.textOther,
      hint: q.hint,
      prompts: q.prompts,
    }));
}

/** sessionStorage에서 세션 메타 읽기 (클라이언트 전용) */
export function readMeta(): HankwonMeta | null {
  try {
    const raw = sessionStorage.getItem(META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<HankwonMeta>;
    if (!parsed.tier || !parsed.mode) return null;
    return {
      mode: parsed.mode,
      to: parsed.to ?? "",
      tier: parsed.tier,
      responseId: parsed.responseId ?? null,
      slug: parsed.slug ?? null,
      style: parsed.style,
      person: parsed.person,
    };
  } catch {
    return null;
  }
}

/** sessionStorage에서 질문 목록 읽기 */
export function readQuestions(): SessionQuestion[] {
  try {
    const raw = sessionStorage.getItem(QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SessionQuestion[];
  } catch {
    return [];
  }
}

/** sessionStorage에서 answers 읽기 */
export function readAnswers(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(ANSWERS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
}

/** sessionStorage에서 introData 읽기 */
export function readIntroData(): IntroData | null {
  try {
    const raw = sessionStorage.getItem(INTRO_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IntroData;
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    sessionStorage.removeItem(META_KEY);
    sessionStorage.removeItem(ANSWERS_KEY);
    sessionStorage.removeItem(QUESTIONS_KEY);
    sessionStorage.removeItem(INTRO_KEY);
  } catch {
    // ignore
  }
}
