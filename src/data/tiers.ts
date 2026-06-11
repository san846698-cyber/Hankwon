export type TierId = "light" | "standard" | "premium";

export type Tier = {
  id: TierId;
  name: string;
  subname: string;
  questionCount: number; // 조건 없는 full 기준
  chapterCount: number;
  estimatedMinutes: number;
  price: number; // 0 = TBD
  physical: boolean;
  description: string;
  perks: string[];
};

export const TIERS: Record<TierId, Tier> = {
  light: {
    id: "light",
    name: "라이트",
    subname: "미니북",
    questionCount: 14,
    chapterCount: 7,
    estimatedMinutes: 30,
    price: 0,
    physical: false,
    description: "챕터당 2가지 핵심 질문",
    perks: ["7챕터 × 2문항", "약 30분 소요", "PDF 디지털 북"],
  },
  standard: {
    id: "standard",
    name: "스탠다드",
    subname: "",
    questionCount: 28,
    chapterCount: 7,
    estimatedMinutes: 60,
    price: 0,
    physical: false,
    description: "챕터당 4가지 깊이 있는 질문",
    perks: ["7챕터 × 4문항", "약 1시간 소요", "PDF 디지털 북"],
  },
  premium: {
    id: "premium",
    name: "고급",
    subname: "프리미엄",
    questionCount: 42,
    chapterCount: 7,
    estimatedMinutes: 90,
    price: 0,
    physical: true,
    description: "챕터당 6가지 풍성한 질문 + 커스텀 질문",
    perks: ["7챕터 × 6문항", "약 1시간 30분 소요", "PDF 디지털 북", "양장 인쇄본 포함 (출시 예정)", "챕터별 커스텀 질문 추가 가능"],
  },
};

export const TIER_ORDER: Record<TierId, number> = {
  light: 0,
  standard: 1,
  premium: 2,
};
