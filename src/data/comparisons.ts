export type Comparison = {
  slug: string;
  competitor: string;
  title: string;
  intro: string;
  rows: { feature: string; us: string; them: string }[];
  conclusion: string;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "storyworth",
    competitor: "Storyworth",
    title: "한권 vs Storyworth — 한국 가족에게 맞는 자서전 서비스는?",
    intro:
      "Storyworth는 미국에서 100만권 이상이 판매된 가족 자서전 서비스입니다. 한국에서도 비슷한 서비스를 찾으시는 분들이 많은데, 한국 환경에서는 한권이 더 적합합니다. 두 서비스를 정면 비교했어요.",
    rows: [
      {
        feature: "언어",
        us: "한국어 (자연스러운 회고록 문체)",
        them: "영어 — 한국어 미지원",
      },
      {
        feature: "결제 방식",
        us: "₩29,900 일회성",
        them: "$99/년 + 인쇄본 $39",
      },
      {
        feature: "인터뷰 방식",
        us: "자녀가 부모님께 묻고 받아 적기 (한 시간)",
        them: "부모님이 매주 1년간 직접 글로 답변",
      },
      {
        feature: "부모님 부담",
        us: "휴대폰을 만지지 않으셔도 됨",
        them: "매주 이메일을 받고 직접 글을 써야 함",
      },
      {
        feature: "총 소요 시간",
        us: "한 시간",
        them: "1년",
      },
      {
        feature: "한국 결제 수단",
        us: "카드 (LemonSqueezy)",
        them: "미국 카드 위주",
      },
      {
        feature: "한국 배송",
        us: "PDF 즉시 (인쇄본 곧 출시)",
        them: "미국 배송 위주, 한국 직배 제한",
      },
    ],
    conclusion:
      "Storyworth는 미국 가족에게 잘 맞는 모델이지만, 1년 동안 부모님이 직접 영어로 글을 쓰셔야 한다는 점이 한국에서는 진입 장벽이 큽니다. 한권은 한국 가족 정서에 맞춰 자녀가 진행하는 한 시간 인터뷰로 단순화했고, 가격도 ₩29,900 일회성으로 결제 마찰을 줄였어요.",
  },
  {
    slug: "biography-ghostwriter",
    competitor: "전통 자서전 대필",
    title: "한권 vs 자서전 대필 — 가격 200분의 1 차이의 가치는?",
    intro:
      "전통 자서전 대필은 작가가 부모님을 6개월~1년 인터뷰하고 책을 직접 씁니다. 가격은 600만원에서 2,000만원 사이. 한권은 같은 결과를 ₩29,900에 만들어드려요. 두 방식의 차이점을 비교했습니다.",
    rows: [
      {
        feature: "가격",
        us: "₩29,900",
        them: "₩600만 ~ ₩2,000만",
      },
      {
        feature: "소요 기간",
        us: "한 시간 + 24시간 AI 생성",
        them: "6개월 ~ 1년",
      },
      {
        feature: "인터뷰 진행",
        us: "자녀가 직접 부모님과",
        them: "외부 작가가 부모님과",
      },
      {
        feature: "글쓰기",
        us: "AI가 부모님 표현 보존하며 다듬기",
        them: "작가의 풍부한 문체",
      },
      {
        feature: "수정 / 검토",
        us: "결제 전 미리보기 무료",
        them: "원고 검토 단계 있음",
      },
      {
        feature: "결과물 분량",
        us: "약 50페이지 PDF",
        them: "100~300페이지 양장본",
      },
      {
        feature: "적합한 가족",
        us: "합리적 가격에 평생 남는 책 원하는 가족",
        them: "예산 충분, 정식 출판 수준 원하는 가족",
      },
    ],
    conclusion:
      "전통 자서전 대필이 결과물 깊이는 더 풍부합니다. 다만 200~600배의 가격 차이가 그만큼의 가치를 제공하는지는 가족마다 다릅니다. 한권은 부모님의 핵심 이야기 35가지를 한 권의 책으로 압축해서, 가족 모두가 부담 없이 시작할 수 있는 가격대를 제공합니다.",
  },
  {
    slug: "repeto",
    competitor: "레페토AI",
    title: "한권 vs 레페토AI — 한국 AI 자서전 서비스 비교",
    intro:
      "레페토AI(엄마의인터뷰)는 한국에서 가장 먼저 시작된 AI 자서전 서비스입니다. 한권은 비슷한 모델이지만 가격대와 흐름이 다른 길을 선택했어요.",
    rows: [
      {
        feature: "가격",
        us: "₩29,900",
        them: "₩1,200,000",
      },
      {
        feature: "AI 모델",
        us: "Claude (Anthropic)",
        them: "비공개",
      },
      {
        feature: "인터뷰 방식",
        us: "자녀가 진행하는 한 시간 인터뷰",
        them: "전문 인터뷰어 동행",
      },
      {
        feature: "결과물",
        us: "PDF (인쇄본 곧 출시)",
        them: "양장 인쇄본 포함",
      },
      {
        feature: "타겟 시장",
        us: "일반 가족, 어버이날 / 명절 선물",
        them: "프리미엄 가족",
      },
    ],
    conclusion:
      "레페토AI는 한국 자서전 시장의 프리미엄 영역을 잡고 있습니다. 한권은 그 아래 — 일반 가족이 부담 없이 시작할 수 있는 가격대 — 를 채우는 서비스예요. 두 서비스는 사실 다른 시장을 겨냥하고 있고, 가족 상황에 따라 적합한 선택이 다릅니다.",
  },
];

export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug);
}
