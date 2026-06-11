import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageCTA from "@/components/PageCTA";

export const metadata: Metadata = {
  title: "부모님 이야기 잘 듣는 법 — 인터뷰 가이드",
  description:
    "부모님과 마주 앉아 인생 이야기를 들을 때 도움되는 자녀의 마음가짐과 인터뷰 방법.",
  alternates: { canonical: "/guides/listening-to-parents" },
};

export default function ListeningGuide() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="가이드"
          title={
            <>
              부모님 이야기를
              <br />
              <span className="text-accent-dark">잘 듣는 법</span>
            </>
          }
          subtitle="자녀가 인터뷰를 진행할 때 도움되는 작은 마음가짐들"
        />

        <article className="px-6 py-16 bg-beige">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-ink-soft leading-relaxed mb-10">
              부모님께 인생 이야기를 여쭤보는 건 생각보다 어색합니다. 평생
              부모님은 자녀에게 묻기만 했지, 자녀가 부모님께 인생을 묻는 일은
              드물잖아요. 한권의 인터뷰 흐름이 자녀가 처음으로 부모님 이야기를
              듣는 자리를 자연스럽게 만들어드립니다. 시작 전에 알아두면 좋은
              몇 가지를 정리했어요.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  1. 시간과 장소를 잡아두세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  마주 앉는 한 시간이 가장 중요합니다. 식사 후 거실, 차 한 잔을
                  앞에 두고 — 평소보다 살짝 정성스러운 분위기. 부모님이
                  부담스러우시지 않도록 “엄마/아빠 이야기를 듣고 싶어서요”라고
                  미리 알려드리세요.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  2. 침묵을 두려워하지 마세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  부모님이 답을 떠올리시는 동안의 짧은 침묵은 자연스러운
                  과정입니다. 빨리 다음 질문으로 넘어가지 말고, 잠시 기다려
                  주세요. 그 침묵 안에서 더 깊은 기억이 떠오르는 경우가 많아요.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  3. 부모님 표현을 그대로 받아 적으세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  자녀가 듣기에 어색한 단어, 사투리, 옛 표현이 있더라도 그대로
                  받아 적어주세요. 그 표현이 그대로 책의 톤이 됩니다. 한권은
                  부모님 말투와 단어를 그대로 보존하도록 만들어져 있어요.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  4. 보조 질문을 활용하세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  답변이 짧으시면 “언제였어요?”, “누구와요?”, “어떤 기분이셨어요?”
                  같은 보조 질문으로 한 단계 깊이 들어가 보세요. 한권 화면에는
                  각 질문마다 4~5개의 보조 질문이 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  5. 답하기 어려운 질문은 건너뛰세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  자녀에게 미안한 일, 첫사랑, 가장 힘들었던 시간 같은 질문은
                  부모님이 답하지 않으셔도 됩니다. “기억 안 나” 또는 “말 안 할게”도
                  답입니다. 한권은 빈 답변을 자연스럽게 처리합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  6. 한 번에 다 못 들으셔도 괜찮아요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  부모님이 지치시거나, 분위기상 멈추는 게 좋다면 잠시 쉬세요.
                  답변은 자동 저장되어 다음에 이어서 진행할 수 있어요. 챕터별로
                  나눠 진행하시는 분들도 많으십니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 leading-tight">
                  7. 끝나면 ‘고맙다’고 해주세요
                </h2>
                <p className="text-base text-ink-soft leading-relaxed">
                  부모님은 자녀가 자기 이야기를 들어줬다는 사실 자체에 감동하십니다.
                  “들려줘서 고마워요” 한마디가 부모님께 큰 의미가 됩니다.
                </p>
              </section>
            </div>

            <div className="bg-white/70 border border-beige-300 rounded-2xl p-6 mt-12">
              <h3 className="text-lg font-bold mb-2">자주 일어나는 일</h3>
              <ul className="space-y-2 text-sm text-ink-soft leading-relaxed">
                <li>
                  · 인터뷰 도중 부모님이 우시는 경우 — 자연스러운 일이에요. 잠시
                  쉬셨다가 이어가시면 됩니다.
                </li>
                <li>
                  · 자녀도 함께 우는 경우 — 흔합니다. 그 자체가 인터뷰의 가장 큰
                  선물이에요.
                </li>
                <li>
                  · 부모님이 “이게 뭐야”라고 처음엔 부담스러워하시는 경우 — 한
                  질문, 두 질문 지나면 점점 신나서 답하시는 경우가 많아요.
                </li>
              </ul>
            </div>
          </div>
        </article>

        <PageCTA
          title="이제 부모님께 여쭤볼 차례예요"
          description="35가지 질문이 자녀의 인터뷰를 도와드립니다."
        />
      </main>
      <Footer />
    </>
  );
}
