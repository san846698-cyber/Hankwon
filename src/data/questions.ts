import type { TierId } from "./tiers";

export type HistoricalEvent =
  | "korean_war"
  | "vietnam_war"
  | "saemaul"
  | "may18"
  | "imf";

export type QuestionConditions = {
  military?: boolean;
  married?: boolean;
  hasChildren?: boolean;
  hasReligion?: boolean;
  historicalEvents?: HistoricalEvent[]; // show if user checked ANY of these
};

export type Question = {
  id: number; // 1–42, sequential
  chapterIndex: number; // 1–7
  chapterName: string;
  questionIndex: number; // 1–6 within chapter
  tier: TierId; // minimum tier to include
  textOther: string; // 타인 모드
  textSelf: string; // 본인 모드
  hint: string;
  prompts: string[];
  conditions?: QuestionConditions;
};

export const QUESTIONS: Question[] = [
  // ─── Ch.1 뿌리와 어린 시절 ───────────────────────────────────────────────
  {
    id: 1,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 1,
    tier: "light",
    textOther:
      "어린 시절 집 문을 열고 나섰을 때 펼쳐지던 풍경을 묘사해주세요. 어떤 소리나 냄새가 났나요?",
    textSelf:
      "어린 시절 집 문을 열고 나섰을 때 펼쳐지던 풍경을 떠올려보세요. 어떤 소리나 냄새가 났나요?",
    hint: "골목, 마당, 들판 — 눈앞에 보이던 한 장면을 그대로 그려주세요.",
    prompts: [
      "문을 열면 가장 먼저 무엇이 보였나요?",
      "어떤 소리가 들렸나요? (사람, 동물, 자연)",
      "어떤 냄새가 기억에 남으세요?",
      "그 풍경 속에서 가장 좋아하던 곳은 어디였나요?",
    ],
  },
  {
    id: 2,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 2,
    tier: "light",
    textOther:
      "부모님 중 한 분의 모습이 지금도 선명하게 떠오르는 장면이 있다면 이야기해주세요.",
    textSelf:
      "부모님 중 한 분의 모습이 지금도 선명하게 떠오르는 장면이 있다면 이야기해주세요.",
    hint: "그분의 표정, 손짓, 자주 하시던 말 — 한 장면으로 떠올려주세요.",
    prompts: [
      "어떤 장면인가요? (어디서, 무엇을 하던 모습)",
      "그분의 표정이나 모습이 어땠나요?",
      "그때 무슨 말씀을 하셨나요?",
      "그 장면이 지금도 떠오르는 이유가 있을까요?",
    ],
  },
  {
    id: 3,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "형제자매와 함께했던 하루 중 지금도 웃음이 나오거나 마음이 따뜻해지는 장면을 이야기해주세요.",
    textSelf:
      "형제자매와 함께했던 하루 중 지금도 웃음이 나오거나 마음이 따뜻해지는 장면을 이야기해주세요.",
    hint: "외동이셨다면 사촌이나 가까운 친구 이야기도 좋아요.",
    prompts: [
      "형제자매가 몇 분이셨나요?",
      "어떤 하루였나요? 무슨 일이 있었나요?",
      "그때 누가 어떤 말이나 행동을 했나요?",
      "지금 그 장면을 떠올리면 어떤 마음이 드세요?",
    ],
  },
  {
    id: 4,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "지금도 그 시절로 돌아가게 만드는 냄새나 맛이 있나요? 그게 어떤 기억과 연결돼 있는지 이야기해주세요.",
    textSelf:
      "지금도 그 시절로 돌아가게 만드는 냄새나 맛이 있나요? 그게 어떤 기억과 연결돼 있는지 이야기해주세요.",
    hint: "어떤 음식, 어떤 냄새 한 가지를 구체적으로 떠올려주세요.",
    prompts: [
      "어떤 냄새나 맛인가요?",
      "누가 만들어 주셨거나, 어디서 맡으셨나요?",
      "그것이 어떤 기억과 연결되나요?",
      "지금도 가끔 그 맛이나 냄새를 찾게 되시나요?",
    ],
  },
  {
    id: 5,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "어른들한테 절대 들키면 안 됐던 일이 있었나요? 그날 어떤 일이 있었는지 이야기해주세요.",
    textSelf:
      "어른들한테 절대 들키면 안 됐던 일이 있었나요? 그날 어떤 일이 있었는지 이야기해주세요.",
    hint: "작은 장난이나 비밀 — 지금은 웃으며 말할 수 있는 것이면 좋아요.",
    prompts: [
      "어떤 일이었나요?",
      "혼자 했나요, 함께한 사람이 있었나요?",
      "들키셨나요? 어떻게 됐나요?",
      "지금 생각하면 어떤 마음이 드세요?",
    ],
  },
  {
    id: 6,
    chapterIndex: 1,
    chapterName: "뿌리와 어린 시절",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "그 시절 가장 힘들었던 하루를 떠올려보세요. 그날의 나에게 지금 뭐라고 해주고 싶으세요?",
    textSelf:
      "그 시절 가장 힘들었던 하루를 떠올려보세요. 그날의 나에게 지금 뭐라고 해주고 싶으세요?",
    hint: "따뜻한 한마디여도, 응원이어도 좋아요.",
    prompts: [
      "그날 어떤 일이 있었나요?",
      "그때 어떤 마음이었나요?",
      "지금의 내가 뭐라고 말해주고 싶으세요?",
      "그 말을 들은 어린 나는 어떻게 달라질까요?",
    ],
  },

  // ─── Ch.2 학창 시절 ──────────────────────────────────────────────────────
  {
    id: 7,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 1,
    tier: "light",
    textOther:
      "학교 다닐 때 선생님이 어떤 학생으로 기억하셨을지 이야기해주세요.",
    textSelf: "학교 다닐 때 선생님이 나를 어떤 학생으로 기억했을지 이야기해주세요.",
    hint: "공부, 생활태도, 친구 관계 — 어떤 모습이든 좋아요.",
    prompts: [
      "스스로는 어떤 학생이었다고 생각하세요?",
      "선생님께서 주로 뭐라고 하셨나요?",
      "가장 자신 있던 것은 무엇이었나요?",
      "지금 그 시절 자신을 보면 어떤 마음이 드세요?",
    ],
  },
  {
    id: 8,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 2,
    tier: "light",
    textOther:
      "학창 시절 가장 친했던 친구와 처음 친해지게 된 날 이야기를 들려주세요.",
    textSelf:
      "학창 시절 가장 친했던 친구와 처음 친해지게 된 날 이야기를 들려주세요.",
    hint: "이름이나 별명, 처음 친해진 계기가 있다면 같이 적어주세요.",
    prompts: [
      "그 친구의 이름이나 별명은 무엇이었나요?",
      "어디서, 어떻게 처음 친해졌나요?",
      "그날 무슨 일이 있었나요?",
      "지금도 연락하시나요?",
    ],
  },
  {
    id: 9,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "수업 시간 중 가장 기다려지던 시간과 가장 지루했던 시간을 각각 묘사해주세요.",
    textSelf:
      "수업 시간 중 가장 기다려지던 시간과 가장 지루했던 시간을 각각 묘사해주세요.",
    hint: "그 시간에 무엇을 하고 어떤 기분이었는지 함께 들려주세요.",
    prompts: [
      "가장 기다려지던 시간은 무엇이었나요? 왜요?",
      "그 시간에 무엇을 했나요?",
      "가장 지루했던 시간은요?",
      "그 시절 학교에서의 하루는 어땠나요?",
    ],
  },
  {
    id: 10,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "그 시절 친구들 사이에서 유행했던 것 중 지금 생각하면 웃음이 나는 게 있나요? 이야기해주세요.",
    textSelf:
      "그 시절 친구들 사이에서 유행했던 것 중 지금 생각하면 웃음이 나는 게 있나요? 이야기해주세요.",
    hint: "음악, 놀이, 말투, 옷차림 — 무엇이든 좋아요.",
    prompts: [
      "어떤 게 유행했나요?",
      "친구들과 같이 하던 건 무엇이었나요?",
      "지금 생각하면 왜 웃음이 나나요?",
      "그 시절이 그리울 때가 있으세요?",
    ],
  },
  {
    id: 11,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "지금도 기억에 남는 선생님이 계신가요? 그분이 했던 말씀이나 행동 중 지금도 잊히지 않는 장면을 이야기해주세요.",
    textSelf:
      "지금도 기억에 남는 선생님이 계셨나요? 그분이 했던 말씀이나 행동 중 지금도 잊히지 않는 장면을 이야기해주세요.",
    hint: "좋았던 분이어도, 무서웠던 분이어도 좋아요.",
    prompts: [
      "어떤 과목 선생님이셨나요?",
      "어떤 말씀이나 행동이 기억에 남으세요?",
      "그때 어떤 상황이었나요?",
      "그 가르침이 지금도 남아 있나요?",
    ],
  },
  {
    id: 12,
    chapterIndex: 2,
    chapterName: "학창 시절",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "그 시절 막연하게라도 되고 싶었던 것이 있었나요? 그 꿈이 어떻게 됐는지 이야기해주세요.",
    textSelf:
      "그 시절 막연하게라도 되고 싶었던 것이 있었나요? 그 꿈이 어떻게 됐는지 이야기해주세요.",
    hint: "장래희망이 여러 번 바뀌셨어도 괜찮아요.",
    prompts: [
      "그때 뭐가 되고 싶으셨나요?",
      "왜 그 꿈을 갖게 됐나요?",
      "그 꿈이 바뀐 계기가 있었나요?",
      "지금 돌아보면 그 꿈이 어떻게 느껴지세요?",
    ],
  },

  // ─── Ch.3 청년기·사회 첫걸음 ────────────────────────────────────────────
  {
    id: 13,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 1,
    tier: "light",
    textOther:
      "처음으로 직접 번 돈을 손에 쥐었던 날을 이야기해주세요. 그 돈으로 뭘 하셨나요?",
    textSelf:
      "처음으로 직접 번 돈을 손에 쥐었던 날을 이야기해주세요. 그 돈으로 뭘 했나요?",
    hint: "아르바이트, 첫 월급, 용돈 버는 일 — 어떤 것이든 좋아요.",
    prompts: [
      "어떤 일을 하셨나요?",
      "얼마를 버셨나요?",
      "그 돈으로 가장 먼저 한 일이 무엇이었나요?",
      "그때 기분이 어땠나요?",
    ],
  },
  {
    id: 14,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 2,
    tier: "light",
    textOther:
      "처음으로 혼자 살게 됐던 날 이야기를 들려주세요. 그날 밤 어떤 기분이었나요?",
    textSelf:
      "처음으로 혼자 살게 됐던 날 이야기를 들려주세요. 그날 밤 어떤 기분이었나요?",
    hint: "설레셨는지, 무서우셨는지 — 솔직한 마음이 좋아요.",
    prompts: [
      "어디로, 왜 떠나게 되셨나요?",
      "짐을 싸던 날이 기억나세요?",
      "첫날 밤 무슨 생각을 하셨나요?",
      "가장 그리웠던 것은 무엇이었나요?",
    ],
  },
  {
    id: 15,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "군대(또는 그 시절 가장 힘들었던 경험)에서 절대 잊을 수 없는 하루가 있다면 이야기해주세요.",
    textSelf:
      "군대(또는 그 시절 가장 힘들었던 경험)에서 절대 잊을 수 없는 하루가 있다면 이야기해주세요.",
    hint: "그날의 장면을 시간 순서대로 떠올려보세요.",
    prompts: [
      "어떤 하루였나요?",
      "무슨 일이 있었나요?",
      "그때 어떤 마음이었나요?",
      "그 경험이 지금까지 남긴 것이 있나요?",
    ],
    conditions: { military: true },
  },
  {
    id: 16,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "그 시절 잠도 줄여가며 열심히 했던 일이 있나요? 어떤 하루였는지 묘사해주세요.",
    textSelf:
      "그 시절 잠도 줄여가며 열심히 했던 일이 있나요? 어떤 하루였는지 묘사해주세요.",
    hint: "일, 공부, 취미 — 무엇이든 몰두하셨던 것이면 좋아요.",
    prompts: [
      "어떤 일이었나요?",
      "왜 그렇게 열심히 하셨나요?",
      "그때 하루가 어떻게 흘러갔나요?",
      "그 경험이 지금의 자신에게 어떤 영향을 줬나요?",
    ],
  },
  {
    id: 17,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "그 시절 했던 선택 중 지금도 잘했다고 생각하는 것과, 다시 돌아간다면 다르게 했을 것을 각각 이야기해주세요.",
    textSelf:
      "그 시절 했던 선택 중 지금도 잘했다고 생각하는 것과, 다시 돌아간다면 다르게 했을 것을 각각 이야기해주세요.",
    hint: "둘 다 하나씩 떠올려보시면 좋아요.",
    prompts: [
      "잘했다고 느끼는 선택은 무엇인가요?",
      "그 선택이 지금의 삶에 어떤 영향을 줬나요?",
      "다르게 하고 싶은 일이 있다면요?",
      "그것을 지금 돌아보면 어떤 마음이 드세요?",
    ],
  },
  {
    id: 18,
    chapterIndex: 3,
    chapterName: "청년기·사회 첫걸음",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "그때 마음속으로 닮고 싶었던 사람이 있었나요? 그 사람의 어떤 모습이 그랬는지 이야기해주세요.",
    textSelf:
      "그때 마음속으로 닮고 싶었던 사람이 있었나요? 그 사람의 어떤 모습이 그랬는지 이야기해주세요.",
    hint: "유명인이어도, 주변 사람이어도 좋아요.",
    prompts: [
      "누구였나요?",
      "그 사람의 어떤 모습을 닮고 싶었나요?",
      "그 사람을 보며 달라진 것이 있었나요?",
      "지금도 그 사람이 영향을 미치고 있나요?",
    ],
  },

  // ─── Ch.4 사랑과 결혼 [conditions: married] ─────────────────────────────
  {
    id: 19,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 1,
    tier: "light",
    textOther:
      "배우자를 처음 만난 날 이야기를 들려주세요. 어디서, 어떻게 만났고 첫인상이 어땠나요?",
    textSelf:
      "배우자를 처음 만난 날 이야기를 들려주세요. 어디서, 어떻게 만났고 첫인상이 어땠나요?",
    hint: "그날의 장소, 분위기, 첫마디까지 기억나는 대로 좋아요.",
    prompts: [
      "어디서 처음 만나셨나요?",
      "그날 어떤 상황이었나요?",
      "첫인상이 어땠나요?",
      "헤어지고 나서 어떤 생각을 하셨나요?",
    ],
    conditions: { married: true },
  },
  {
    id: 20,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 2,
    tier: "light",
    textOther:
      "이 사람이랑 결혼해야겠다고 마음먹게 된 순간이 있었나요? 그 장면을 이야기해주세요.",
    textSelf:
      "이 사람이랑 결혼해야겠다고 마음먹게 된 순간이 있었나요? 그 장면을 이야기해주세요.",
    hint: "어떤 순간에 '이 사람이다' 싶으셨는지 떠올려주세요.",
    prompts: [
      "언제쯤 결혼을 생각하게 됐나요?",
      "결정적인 순간이 있었나요?",
      "그때 어떤 마음이었나요?",
      "그 결정을 지금도 잘했다고 생각하세요?",
    ],
    conditions: { married: true },
  },
  {
    id: 21,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "결혼식 날 가장 선명하게 기억나는 순간을 묘사해주세요. 그때 어떤 기분이었나요?",
    textSelf:
      "결혼식 날 가장 선명하게 기억나는 순간을 묘사해주세요. 그때 어떤 기분이었나요?",
    hint: "웃겼던 일, 감동적인 장면 — 무엇이든 좋아요.",
    prompts: [
      "결혼식은 어디서 하셨나요?",
      "가장 선명하게 기억나는 장면은요?",
      "그때 어떤 기분이었나요?",
      "예상치 못했던 일이 있었나요?",
    ],
    conditions: { married: true },
  },
  {
    id: 22,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "함께 살기 시작하면서 예상과 가장 달랐던 순간이 있었나요? 이야기해주세요.",
    textSelf:
      "함께 살기 시작하면서 예상과 가장 달랐던 순간이 있었나요? 이야기해주세요.",
    hint: "좋은 쪽이든, 어려운 쪽이든 솔직하게 말씀해 주셔도 좋아요.",
    prompts: [
      "결혼 전 어떤 생활을 상상하셨나요?",
      "실제로는 어떻게 달랐나요?",
      "그 차이에 어떻게 적응하셨나요?",
      "지금은 그게 어떻게 느껴지세요?",
    ],
    conditions: { married: true },
  },
  {
    id: 23,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "배우자와 함께하면서 마음속으로 “이 사람이랑 살기 잘했다”고 느꼈던 순간을 이야기해주세요.",
    textSelf:
      "배우자와 함께하면서 마음속으로 “이 사람이랑 살기 잘했다”고 느꼈던 순간을 이야기해주세요.",
    hint: "작은 일상의 순간이어도 좋아요.",
    prompts: [
      "어떤 순간이었나요?",
      "배우자가 어떻게 해주셨나요?",
      "그 마음을 표현하신 적 있나요?",
      "그 일이 두 분 관계에 어떤 영향을 줬나요?",
    ],
    conditions: { married: true },
  },
  {
    id: 24,
    chapterIndex: 4,
    chapterName: "사랑과 결혼",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "배우자에게 살면서 차마 말로 못 했거나, 이 책을 통해 전하고 싶은 이야기가 있다면 들려주세요.",
    textSelf:
      "배우자에게 살면서 차마 말로 못 했거나, 이 책을 통해 전하고 싶은 이야기가 있다면 들려주세요.",
    hint: "평소에 못 하셨던 말이어도 좋아요.",
    prompts: [
      "어떤 말을 전하고 싶으세요?",
      "왜 평소엔 그 말을 못 하셨나요?",
      "그 말을 들은 배우자가 어떻게 반응할 것 같으세요?",
    ],
    conditions: { married: true },
  },

  // ─── Ch.5 부모가 된 날 [conditions: hasChildren] ─────────────────────────
  {
    id: 25,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 1,
    tier: "light",
    textOther:
      "아이가 처음 태어난 날 이야기를 들려주세요. 그 순간 어떤 기분이었나요?",
    textSelf:
      "자녀가 처음 태어난 날 이야기를 들려주세요. 그 순간 어떤 기분이었나요?",
    hint: "기쁨, 두려움, 뿌듯함 — 그 순간의 마음이 무엇이든 좋아요.",
    prompts: [
      "어느 병원이었나요? 그날 날씨가 어땠나요?",
      "처음 안았을 때 어떤 느낌이었나요?",
      "그 순간 가장 먼저 든 생각은요?",
      "곁에 누가 함께 있었나요?",
    ],
    conditions: { hasChildren: true },
  },
  {
    id: 26,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 2,
    tier: "light",
    textOther: "아이를 키우면서 가장 뿌듯했던 순간을 하나 떠올려 묘사해주세요.",
    textSelf: "자녀를 키우면서 가장 뿌듯했던 순간을 하나 떠올려 묘사해주세요.",
    hint: "큰 성취가 아닌 작은 일상의 장면도 좋아요.",
    prompts: [
      "그때 아이가 몇 살이었나요?",
      "어떤 일이 있었나요?",
      "그때 뭐라고 말씀해 주셨나요?",
      "지금도 그 장면이 선명하게 떠오르세요?",
    ],
    conditions: { hasChildren: true },
  },
  {
    id: 27,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "아이를 키우면서 가장 힘들었던 시기의 하루를 이야기해주세요. 그때 어떻게 버티셨나요?",
    textSelf:
      "자녀를 키우면서 가장 힘들었던 시기의 하루를 이야기해주세요. 그때 어떻게 버텼나요?",
    hint: "솔직한 이야기가 더 값져요.",
    prompts: [
      "어떤 시기가 가장 힘드셨나요?",
      "어떤 하루였나요?",
      "누가 또는 무엇이 힘이 됐나요?",
      "그 시간을 어떻게 지나오셨나요?",
    ],
    conditions: { hasChildren: true },
  },
  {
    id: 28,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "아이에게 꼭 가르쳐주고 싶었던 것이 있었나요? 그걸 어떻게 전하려 하셨는지 이야기해주세요.",
    textSelf:
      "자녀에게 꼭 가르쳐주고 싶었던 것이 있었나요? 그걸 어떻게 전하려 하셨는지 이야기해주세요.",
    hint: "가치관, 생활 습관, 삶의 지혜 — 무엇이든 좋아요.",
    prompts: [
      "무엇을 가르치고 싶으셨나요?",
      "그것이 왜 중요하다고 느끼셨나요?",
      "어떻게 전하려 하셨나요?",
      "자녀가 잘 받아들인 것 같나요?",
    ],
    conditions: { hasChildren: true },
  },
  {
    id: 29,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "지금 돌아보면 그때의 나에게 “이렇게 해줬으면 좋았을 텐데” 싶은 장면이 있나요? 이야기해주세요.",
    textSelf:
      "지금 돌아보면 그때의 나에게 “이렇게 해줬으면 좋았을 텐데” 싶은 장면이 있나요? 이야기해주세요.",
    hint: "아쉬움이 있으시면 솔직하게 말씀해주셔도 좋아요.",
    prompts: [
      "어떤 장면이 떠오르세요?",
      "그때 왜 그렇게 하지 못했나요?",
      "지금이라면 어떻게 하실 것 같으세요?",
      "자녀에게 이 마음을 전한 적 있나요?",
    ],
    conditions: { hasChildren: true },
  },
  {
    id: 30,
    chapterIndex: 5,
    chapterName: "부모가 된 날",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "부모가 되고 나서 내가 가장 크게 달라진 점이 있다면 어떤 건지 이야기해주세요.",
    textSelf:
      "부모가 되고 나서 내가 가장 크게 달라진 점이 있다면 어떤 건지 이야기해주세요.",
    hint: "성격, 가치관, 삶의 방식 어떤 것이든 좋아요.",
    prompts: [
      "어떤 면이 달라지셨나요?",
      "가장 많이 변했다고 느끼는 부분은요?",
      "자녀가 그 변화를 알고 있을 것 같으세요?",
      "그 변화가 지금 어떻게 느껴지세요?",
    ],
    conditions: { hasChildren: true },
  },

  // ─── Ch.6 내 인생의 굴곡 ─────────────────────────────────────────────────
  {
    id: 31,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 1,
    tier: "light",
    textOther:
      "살면서 가장 힘들었던 시기의 하루를 떠올려보세요. 그날 어떻게 버티셨는지 이야기해주세요.",
    textSelf:
      "살면서 가장 힘들었던 시기의 하루를 떠올려보세요. 그날 어떻게 버텼는지 이야기해주세요.",
    hint: "그때 곁에 있었던 사람이나 작은 위안도 함께 들려주세요.",
    prompts: [
      "언제, 어떤 일이었나요?",
      "그 하루가 어떻게 흘러갔나요?",
      "그때 곁에 누가 있어주셨나요?",
      "어떻게 그 시간을 지나오셨나요?",
    ],
  },
  {
    id: 32,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 2,
    tier: "light",
    textOther:
      "지금 돌아봤을 때 “그때 그 선택을 잘했다”고 느끼는 순간이 있다면 이야기해주세요.",
    textSelf:
      "지금 돌아봤을 때 “그때 그 선택을 잘했다”고 느끼는 순간이 있다면 이야기해주세요.",
    hint: "큰 결정이 아닌 작은 선택이어도 좋아요.",
    prompts: [
      "어떤 선택이었나요?",
      "왜 그 선택을 하셨나요?",
      "그 선택이 이후 어떤 영향을 줬나요?",
      "지금도 잘한 선택이라고 느끼세요?",
    ],
  },
  {
    id: 33,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "가장 힘들었던 시간을 버티게 해준 사람이나 말, 또는 습관이 있었나요? 그 이야기를 들려주세요.",
    textSelf:
      "가장 힘들었던 시간을 버티게 해준 사람이나 말, 또는 습관이 있었나요? 그 이야기를 들려주세요.",
    hint: "사람일 수도, 믿음일 수도, 작은 습관일 수도 있어요.",
    prompts: [
      "무엇이 힘이 됐나요?",
      "그것이 어떤 식으로 도움이 됐나요?",
      "지금도 그것이 힘이 되나요?",
      "다른 사람에게도 권하고 싶으세요?",
    ],
  },
  {
    id: 34,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "그 시대를 직접 겪으시면서 가장 선명하게 기억나는 하루의 장면을 이야기해주세요.",
    textSelf:
      "그 시대를 직접 겪으면서 가장 선명하게 기억나는 하루의 장면을 이야기해주세요.",
    hint: "그 시절 이야기를 후손들에게 꼭 전하고 싶은 것이 있다면요.",
    prompts: [
      "그때 어떤 상황이셨나요?",
      "그날 어떤 일이 있었나요?",
      "그때 어떤 마음이었나요?",
      "그 시대를 살지 않은 사람들에게 전하고 싶은 말이 있으신가요?",
    ],
    conditions: {
      historicalEvents: ["korean_war", "vietnam_war", "saemaul", "may18", "imf"],
    },
  },
  {
    id: 35,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "그 힘든 시간들을 지나고 나서 내가 어떻게 달라졌는지, 전과 후를 비교해서 이야기해주세요.",
    textSelf:
      "그 힘든 시간들을 지나고 나서 내가 어떻게 달라졌는지, 전과 후를 비교해서 이야기해주세요.",
    hint: "더 강해진 것, 더 부드러워진 것 — 무엇이든 좋아요.",
    prompts: [
      "그 전의 나는 어떤 사람이었나요?",
      "그 시간을 지나며 무엇이 달라졌나요?",
      "지금의 나는 어떤가요?",
      "그 시간이 없었다면 지금 어땠을 것 같으세요?",
    ],
  },
  {
    id: 36,
    chapterIndex: 6,
    chapterName: "내 인생의 굴곡",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "살면서 가장 후회되는 선택이 있다면 이야기해주세요. 지금은 그걸 어떻게 바라보고 계신가요?",
    textSelf:
      "살면서 가장 후회되는 선택이 있다면 이야기해주세요. 지금은 그걸 어떻게 바라보고 있나요?",
    hint: "후회가 없다고 하셔도 그것이 답이에요.",
    prompts: [
      "어떤 선택이 떠오르시나요?",
      "그때 왜 그런 선택을 하셨나요?",
      "지금이라면 어떻게 달리 하시겠어요?",
      "그 경험이 지금의 자신에게 어떤 의미인가요?",
    ],
  },

  // ─── Ch.7 지금 그리고 사랑하는 사람에게 ────────────────────────────────
  {
    id: 37,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 1,
    tier: "light",
    textOther: "요즘 하루 중 가장 마음이 편안하고 행복한 순간을 묘사해주세요.",
    textSelf: "요즘 하루 중 가장 마음이 편안하고 행복한 순간을 묘사해주세요.",
    hint: "아주 작은 일상의 즐거움이어도 좋아요.",
    prompts: [
      "하루 중 언제인가요?",
      "그때 무엇을 하고 계세요?",
      "혼자 즐기시나요, 누구와 함께하시나요?",
      "왜 그 순간이 가장 좋으세요?",
    ],
  },
  {
    id: 38,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 2,
    tier: "light",
    textOther:
      "자녀에게, 또는 사랑하는 사람에게 살면서 차마 말로 못 했던 이야기가 있다면 지금 전해주세요.",
    textSelf:
      "자녀에게, 또는 사랑하는 사람에게 살면서 차마 말로 못 했던 이야기가 있다면 지금 전해주세요.",
    hint: "한 줄이어도 충분해요.",
    prompts: [
      "누구에게 전하고 싶으세요?",
      "어떤 이야기인가요?",
      "왜 평소엔 못 하셨나요?",
      "이 말을 들은 사람이 어떻게 살았으면 하세요?",
    ],
  },
  {
    id: 39,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 3,
    tier: "standard",
    textOther:
      "살아오면서 “이것만큼은 정말 중요하다”고 느꼈던 순간이 있다면 그 장면을 이야기해주세요.",
    textSelf:
      "살아오면서 “이것만큼은 정말 중요하다”고 느꼈던 순간이 있다면 그 장면을 이야기해주세요.",
    hint: "인생 전체를 돌아봤을 때 가장 귀하다고 느끼는 것이요.",
    prompts: [
      "어떤 순간이었나요?",
      "무엇이 가장 중요하다고 느끼셨나요?",
      "그 생각이 언제 확실해졌나요?",
      "자녀나 가족도 같은 생각을 갖길 바라세요?",
    ],
  },
  {
    id: 40,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 4,
    tier: "standard",
    textOther:
      "지금의 나를 만든 사람이나 경험, 또는 말 한마디가 있다면 그 이야기를 들려주세요.",
    textSelf:
      "지금의 나를 만든 사람이나 경험, 또는 말 한마디가 있다면 그 이야기를 들려주세요.",
    hint: "사람, 경험, 말 한마디 — 무엇이든 좋아요.",
    prompts: [
      "가장 큰 영향을 준 것은 무엇인가요?",
      "어떤 일이 있었나요?",
      "그것이 나를 어떻게 바꿨나요?",
      "그 영향이 없었다면 지금 어떤 사람이 됐을까요?",
    ],
  },
  {
    id: 41,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 5,
    tier: "premium",
    textOther:
      "내 인생을 딱 한 문장으로 표현한다면 어떤 문장이 될 것 같으세요? 왜 그 문장인지도 이야기해주세요.",
    textSelf:
      "내 인생을 딱 한 문장으로 표현한다면 어떤 문장이 될 것 같으세요? 왜 그 문장인지도 이야기해주세요.",
    hint: "어떤 문장이어도 좋아요. 천천히 생각해주세요.",
    prompts: [
      "어떤 문장이 떠오르세요?",
      "왜 그 문장이 떠올랐나요?",
      "그 문장에 담기지 못한 것이 있다면요?",
    ],
  },
  {
    id: 42,
    chapterIndex: 7,
    chapterName: "지금, 그리고 사랑하는 사람에게",
    questionIndex: 6,
    tier: "premium",
    textOther:
      "아직 해보지 못했지만 꼭 해보고 싶은 것이 있다면, 아무리 작은 것이라도 이야기해주세요.",
    textSelf:
      "아직 해보지 못했지만 꼭 해보고 싶은 것이 있다면, 아무리 작은 것이라도 이야기해주세요.",
    hint: "크든 작든, 현실적이든 아니든 좋아요.",
    prompts: [
      "어떤 것을 해보고 싶으세요?",
      "왜 그것을 하고 싶으신가요?",
      "그것을 위해 지금 무언가 하고 계신가요?",
      "그것을 이루면 어떤 기분일 것 같으세요?",
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length; // 42
