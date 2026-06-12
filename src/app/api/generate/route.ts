import { NextResponse, type NextRequest } from "next/server";
import { generateBook } from "@/lib/ai/generate";
import type { GenerateInput } from "@/lib/ai/types";
import { features } from "@/lib/features";

export const runtime = "nodejs";
export const maxDuration = 120;

type Body = {
  toLabel?: string;
  answers?: Record<string, string>;
  mode?: "self" | "other";
  style?: "simple" | "rich";
  person?: "first" | "third";
  introData?: GenerateInput["introData"];
};

export async function POST(req: NextRequest) {
  if (!features.hasAnthropic()) {
    return NextResponse.json(
      {
        error: "ANTHROPIC_API_KEY not configured",
        hint: "Add ANTHROPIC_API_KEY to .env.local to enable book generation",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const toLabel = body.toLabel?.trim();
  const answers = body.answers;
  if (!toLabel) {
    return NextResponse.json(
      { error: "Missing toLabel" },
      { status: 400 },
    );
  }
  if (!answers || typeof answers !== "object") {
    return NextResponse.json(
      { error: "Missing answers" },
      { status: 400 },
    );
  }

  // Optional params — same shape as the webhook path. Invalid values fall back
  // to the generateBook defaults (other / simple / no historical context).
  const mode = body.mode === "self" ? "self" : "other";
  const style = body.style === "rich" ? "rich" : "simple";
  const person = body.person === "first" ? "first" : "third";
  const introData =
    body.introData && typeof body.introData === "object"
      ? body.introData
      : undefined;

  try {
    const book = await generateBook({
      toLabel,
      answers,
      mode,
      style,
      person,
      introData,
    });
    return NextResponse.json({ book });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    // eslint-disable-next-line no-console
    console.error("[/api/generate] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
