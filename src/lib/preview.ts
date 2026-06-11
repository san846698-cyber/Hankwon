import { josa } from "./josa";

export type Preview = {
  title: string;
  subtitle: string;
  chapterLabel: string;
  paragraphs: string[];
};

function truncate(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + "…";
}

function pickHomeWord(answer: string): string {
  if (!answer) return "방";
  if (answer.includes("마당")) return "마당";
  if (answer.includes("부엌") || answer.includes("주방")) return "부엌";
  if (answer.includes("툇마루") || answer.includes("마루")) return "마루";
  return "방";
}

/**
 * Mock preview generator. Will be replaced by Claude API in D4.
 * Uses early answers to build a believable opening for the autobiography.
 */
export function generateMockPreview(args: {
  toLabel: string;
  answers: Record<string, string>;
}): Preview {
  const { toLabel, answers } = args;
  const a1 = (answers["1"] ?? "").trim();
  const a2 = (answers["2"] ?? "").trim();
  const a4 = (answers["4"] ?? "").trim();

  const title = `${toLabel}의 한 권`;
  const subtitle = `한권이 정성껏 엮은 ${toLabel}의 이야기`;

  const intro =
    `${toLabel}의 이야기는 거창한 사건에서 시작되지 않는다. ` +
    `한 줄기 햇빛, 마당의 흙냄새, 식구들의 목소리 — ` +
    `그 작은 것들이 모여 한 사람의 인생이 된다.`;

  const memoryParagraph = a1
    ? `${toLabel}${josa(toLabel, "은는")} 그 시절의 한 장면을 이렇게 기억한다. ` +
      `"${truncate(a1, 110)}" 그날의 공기가 ${toLabel}의 마음 어딘가에 ` +
      `여전히 살아 있다.`
    : `${toLabel}${josa(toLabel, "은는")} 어느 평범했던 하루의 풍경을 ` +
      `오래도록 간직해 왔다. 그날의 햇살, 그날의 사람들 — ` +
      `사소했기에 더 또렷한 장면이다.`;

  const homeParagraph = a2
    ? `그 시절 살던 집의 ${pickHomeWord(a2)}을 떠올리면, ` +
      `${toLabel}의 얼굴엔 늘 같은 표정이 떠오른다. ` +
      `${truncate(a2, 80)}`
    : `그 시절 살던 집은 ${toLabel}에게 단순한 공간이 아니었다. ` +
      `그곳의 모든 모서리에 시간이 배어 있었다.`;

  const friendHook = a4
    ? `학교를 마치고 친구의 손을 잡고 돌아오던 길, ` +
      `${toLabel}${josa(toLabel, "은는")} 그날을 평생 잊지 못했다.`
    : "";

  const paragraphs = [intro, memoryParagraph, homeParagraph];
  if (friendHook) paragraphs.push(friendHook);

  return {
    title,
    subtitle,
    chapterLabel: "1장 — 어린 시절",
    paragraphs,
  };
}
