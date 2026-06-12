export type BookPageData =
  | { kind: "cover"; title: string; subtitle: string }
  | { kind: "dedication"; body: string }
  | { kind: "toc"; title: string; entries: { num: string; title: string }[] }
  | { kind: "chapter"; num: string; title: string }
  | { kind: "body"; paragraphs: string[] }
  | { kind: "closing"; body: string };

export const SAMPLE_BOOK: BookPageData[] = [
  {
    kind: "cover",
    title: "엄마의 한 권",
    subtitle: "한권이 정성껏 엮은 이야기",
  },
  {
    kind: "dedication",
    body: "사랑하는 우리 가족에게.\n\n엄마의 시간이\n가족의 평생이 됩니다.",
  },
  {
    kind: "toc",
    title: "차례",
    entries: [
      { num: "1장", title: "어린 시절" },
      { num: "2장", title: "학창 시절" },
      { num: "3장", title: "청년기·사회 첫걸음" },
      { num: "4장", title: "사랑과 결혼" },
      { num: "5장", title: "부모가 된 날" },
      { num: "6장", title: "내 인생의 굴곡" },
      { num: "7장", title: "지금, 그리고 사랑하는 사람에게" },
    ],
  },
  { kind: "chapter", num: "1장", title: "어린 시절" },
  {
    kind: "body",
    paragraphs: [
      "엄마의 이야기는 거창한 사건에서 시작되지 않는다. 한 줄기 햇빛, 마당의 흙냄새, 식구들의 목소리 — 그 작은 것들이 모여 한 사람의 인생이 된다.",
      "엄마가 가장 오래도록 간직해온 기억은 다섯 살의 여름날이다. 외할머니가 부엌에서 김치를 담그시던 소리, 마당에 펴 둔 고추를 뒤집던 손길, 그 사이로 들리던 매미 소리.",
    ],
  },
  {
    kind: "body",
    paragraphs: [
      "그 시절 살던 집의 마당을 떠올리면, 엄마의 얼굴엔 늘 같은 표정이 떠오른다. 작은 우물이 있었고, 그 옆에 외할아버지가 심어둔 살구나무 한 그루.",
      "여름이면 그 살구가 익어 가지가 휘었다. 동네 아이들이 다 모여 살구를 따 먹었다고 한다. 엄마는 그 시절을 떠올릴 때면 입에 단맛이 도는 것 같다고 했다.",
    ],
  },
  { kind: "chapter", num: "3장", title: "청년기·사회 첫걸음" },
  {
    kind: "body",
    paragraphs: [
      "스무 살의 엄마는 작은 시골 학교를 떠나 서울로 향했다. 처음 본 서울역의 인파는 무서울 만큼 많았지만, 엄마는 그 안에서 자신의 자리를 찾아갔다.",
      "그 시절 엄마는 매주 금요일이면 명동 서점에 들렀다. 한 권 두 권 사 모은 책들이 자취방의 작은 책장을 채워갔다. 그곳에서 엄마는 첫 친구를 만났다.",
    ],
  },
  { kind: "chapter", num: "5장", title: "부모가 된 날" },
  {
    kind: "body",
    paragraphs: [
      "첫째가 태어나던 날, 엄마는 평생 잊지 못할 순간을 만났다. 작은 손이 엄마의 손가락을 꼭 쥐었을 때, 엄마는 자신의 인생이 완전히 바뀌었음을 알았다.",
      "아이가 자라는 동안 엄마는 매일 같은 길을 걸었다. 학교 앞 골목, 동네 약국, 시장으로 가는 길. 평범한 길이었지만 그 길 위에서 엄마는 가장 깊은 사랑을 배웠다.",
    ],
  },
  {
    kind: "closing",
    body: "이 책은\n사랑하는 자녀의 정성과\n한권의 도움으로\n2026년에 만들어졌습니다.\n\n— 끝 —",
  },
];
