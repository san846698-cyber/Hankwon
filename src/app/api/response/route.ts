import { NextResponse, type NextRequest } from "next/server";
import {
  createResponse,
  upsertAnswer,
  completeResponse,
  updateResponseMeta,
} from "@/lib/supabase/responses";
import { features } from "@/lib/features";

export const runtime = "nodejs";

type CreateBody = {
  fromName?: string;
  toLabel?: string;
  mode?: "self" | "other";
  tier?: string;
};

export async function POST(req: NextRequest) {
  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const fromName = (body.fromName ?? "가족").trim();
  const toLabel = body.toLabel?.trim();
  if (!toLabel) {
    return NextResponse.json({ error: "Missing toLabel" }, { status: 400 });
  }

  if (!features.hasSupabase()) {
    return NextResponse.json({
      configured: false,
      id: null,
      slug: null,
      hint: "Supabase not configured — client should use sessionStorage",
    });
  }

  try {
    const result = await createResponse({
      fromName,
      toLabel,
      mode: body.mode,
      tier: body.tier,
    });
    return NextResponse.json({ configured: true, ...result });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

type AnswerBody = {
  responseId?: string;
  questionId?: number;
  content?: string;
  done?: boolean;
  introData?: Record<string, unknown>;
  style?: "simple" | "rich";
  person?: "first" | "third";
};

export async function PATCH(req: NextRequest) {
  if (!features.hasSupabase()) {
    return NextResponse.json({ configured: false });
  }

  let body: AnswerBody;
  try {
    body = (await req.json()) as AnswerBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { responseId, questionId, content, done, introData, style, person } =
    body;
  if (!responseId) {
    return NextResponse.json({ error: "Missing responseId" }, { status: 400 });
  }

  try {
    if (typeof questionId === "number" && typeof content === "string") {
      await upsertAnswer({ responseId, questionId, content });
    }
    if (introData || style || person) {
      await updateResponseMeta({ responseId, introData, style, person });
    }
    if (done) {
      await completeResponse(responseId);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
