import { NextResponse, type NextRequest } from "next/server";
import { generateChapterPreview } from "@/lib/ai/generate";
import { generateMockPreview } from "@/lib/preview";
import { features } from "@/lib/features";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = {
  toLabel?: string;
  answers?: Record<string, string>;
  person?: "first" | "third";
  style?: "simple" | "rich";
  mode?: "self" | "other";
};

/**
 * Returns 1-chapter preview. Real Claude call when configured, else mock.
 *
 * Response shape (always the same):
 * { source: "real" | "mock", title, subtitle, paragraphs }
 */
export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const toLabel = body.toLabel?.trim();
  const answers = body.answers ?? {};
  if (!toLabel) {
    return NextResponse.json({ error: "Missing toLabel" }, { status: 400 });
  }

  const person = body.person === "first" ? "first" : "third";
  const style = body.style === "rich" ? "rich" : "simple";
  const mode = body.mode === "self" ? "self" : "other";

  if (features.hasAnthropic()) {
    try {
      const result = await generateChapterPreview({
        toLabel,
        answers,
        person,
        style,
        mode,
      });
      // Convert markdown body to paragraphs for client uniformity.
      const paragraphs = result.bodyMarkdown
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p && !p.startsWith("##") && !p.startsWith(">"));
      return NextResponse.json({
        source: "real",
        title: result.title,
        subtitle: result.subtitle,
        chapterLabel: "1장 — 어린 시절",
        paragraphs,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[/api/preview] real call failed, falling back:", err);
    }
  }

  const preview = generateMockPreview({ toLabel, answers });
  return NextResponse.json({
    source: "mock",
    ...preview,
  });
}
