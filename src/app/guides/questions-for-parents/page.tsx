import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "부모님께 물어볼 35가지 질문 — 인생 인터뷰 가이드",
  description:
    "부모님과 마주 앉아 어떤 질문을 드리면 좋을까요? 한권이 추천하는 35가지 인생 인터뷰 질문을 챕터별로 정리했습니다.",
  alternates: { canonical: "/guides/questions-for-parents" },
};

const QUESTION_GROUPS = [
  {
    chapter: "어린 시절",
    questions: [
      "가장 오래된 기억은 무엇인가요? 몇 살 때, 어디였나요?",
      "어린 시절 살던 집의 마당, 방, 부엌은 어떤 모습이었나요?",
      "형제자매와 가장 자주 했던 놀이나 다툼이 있나요?",
      "어렸을 때 가장 무서웠던 일은 무엇이었나요?",
      "어린 시절 동네 골목과 풍경이 어땠나요?",
    ],
  },
  {
    chapter: "학창 시절",
    questions: [
      "학창 시절 단짝 친구의 이름과, 함께한 가장 또렷한 장면은요?",
      "가장 좋아했던 선생님, 가장 무서웠던 선생님 이야기를 들려주세요.",
      "그 시절 가장 갖고 싶었던 물건은 무엇이었나요?",
      "학교를 마치고 집에 가는 길, 무엇을 보고 무슨 생각을 했나요?",
      "그 시절 가장 좋아하던 노래나 영화가 있다면요?",
    ],
  },
  {
    chapter: "청년기와 첫사랑",
    questions: [
      "첫사랑이 누구였는지, 어떻게 시작되고 끝났는지 들려주세요.",
      "20대에 가장 무모했던 결정 한 가지는요?",
      "첫 직장의 첫 출근날, 무엇을 입고 갔나요?",
      "그 시절 자주 가던 장소나 자주 부르던 노래가 있나요?",
      "처음 ‘어른이 됐다’고 느낀 순간은 언제였나요?",
    ],
  },
  {
    chapter: "결혼과 가정",
    questions: [
      "배우자를 처음 본 날의 기억을 말씀해 주세요.",
      "결혼식 날 가장 기억에 남는 장면은요?",
      "신혼집은 어떤 모습이었고, 어떤 마음으로 살았나요?",
      "부부싸움 후 화해는 보통 어떻게 하셨나요?",
      "배우자에게 가장 고마운 순간 하나를 꼽는다면요?",
    ],
  },
  {
    chapter: "자녀 양육",
    questions: [
      "자녀가 태어난 날의 병원, 날씨, 그날의 마음을 들려주세요.",
      "아이를 키우며 가장 행복했던 일상의 한 장면은요?",
      "자녀에게 가장 미안한 일이 있다면요?",
      "자녀에게 꼭 물려주고 싶은 한 가지는요?",
      "자녀가 처음 자랑스러웠던 순간은 언제였나요?",
    ],
  },
  {
    chapter: "일과 성취",
    questions: [
      "인생에서 가장 자랑스러운 일 한 가지를 꼽는다면요?",
      "가장 큰 실패와, 그것을 어떻게 견뎌냈나요?",
      "일을 통해 만난 사람 중 잊을 수 없는 사람이 있다면요?",
      "살면서 가장 힘들었던 시간을 어떻게 지나오셨나요?",
    ],
  },
  {
    chapter: "지금, 그리고 앞으로",
    questions: [
      "지금 가장 소중하게 여기는 일상의 작은 즐거움은요?",
      "자녀에게 꼭 전하고 싶지만 평소엔 말하지 못한 말이 있다면요?",
      "80세, 90세의 자신에게 한 줄을 남긴다면요?",
      "손주 또는 미래의 가족에게 전하고 싶은 한 가지가 있다면요?",
      "가족 중 가장 자랑스러운 한 사람을 떠올린다면요?",
      "인생을 다시 산다면 한 가지를 바꿀 수 있다면 무엇을 바꾸시겠어요?",
    ],
  },
];

export default function QuestionsGuide() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="인터뷰 가이드"
          title={
            <>
              부모님께 물어볼
              <br />
              <span className="text-accent-dark">35가지 질문</span>
            </>
          }
          subtitle="평소엔 묻기 어렵지만, 한 번 물으면 평생 잊지 못할 이야기들"
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-6">
              부모님과 마주 앉아 인생 이야기를 듣고 싶은데, 막상 어떤 질문을
              해야 할지 떠오르지 않으세요? 35가지 질문은 한권이 한국 부모님
              인터뷰에 가장 적합한 형태로 정리한 것입니다. 7개 챕터로 인생을
              따라가며, 한 챕터당 4~6개의 질문을 자연스럽게 이어나갑니다.
            </p>
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              아래 질문들을 그대로 사용하셔도 좋고, 한권에서 자녀가 진행하는
              인터뷰 흐름으로 한 권의 책을 만드실 수도 있습니다.
            </p>

            <div className="space-y-10">
              {QUESTION_GROUPS.map((group, gi) => (
                <section key={group.chapter}>
                  <h2 className="text-xl font-bold mb-4 flex items-baseline gap-3 leading-tight">
                    <span className="text-accent-dark">{gi + 1}장</span>
                    <span>{group.chapter}</span>
                  </h2>
                  <ol className="space-y-2.5 list-none">
                    {group.questions.map((q, qi) => (
                      <li
                        key={qi}
                        className="flex gap-3 bg-white/60 border border-beige-300 rounded-xl px-4 py-3"
                      >
                        <span className="text-sm text-accent-dark font-bold tabular-nums shrink-0 mt-0.5">
                          Q{gi * 5 + qi + 1}.
                        </span>
                        <span className="text-base text-ink leading-relaxed">
                          {q}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mt-12">
              <h3 className="text-lg font-bold mb-2">질문을 활용하는 팁</h3>
              <ul className="space-y-2 text-sm text-ink-soft leading-relaxed">
                <li>
                  · 답변이 짧으셔도 괜찮아요. 보조 질문(언제, 어디서, 누구와,
                  어떤 마음)으로 한 단계 더 깊이 물어보세요.
                </li>
                <li>
                  · 부모님 표현을 그대로 받아 적으세요. 부모님의 단어와 말투가
                  그대로 책의 톤이 됩니다.
                </li>
                <li>
                  · 한 번에 다 못 들어도 괜찮아요. 챕터별로 나눠서 진행하셔도
                  좋아요.
                </li>
                <li>
                  · 민감한 질문(첫사랑, 미안한 일)은 부모님이 답하지 않으셔도
                  존중해주세요.
                </li>
              </ul>
            </div>
          </div>
        </article>

        <PageCTA
          title="35가지 질문, 한 권의 책으로"
          description="자녀가 받아 적은 답변을 AI가 자연스러운 회고록으로 다듬어 드려요."
        />
      </main>
      <Footer />
    </>
  );
}
