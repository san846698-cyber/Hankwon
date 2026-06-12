import "server-only";
import { getSupabaseServerClient } from "./server";
import { generateSlug } from "./slug";

export type ResponseRow = {
  id: string;
  slug: string;
  from_name: string;
  to_label: string;
  parent_name: string | null;
  mode: "self" | "other" | null;
  tier: string | null;
  intro_data: Record<string, unknown> | null;
  style: "simple" | "rich" | null;
  person: "first" | "third" | null;
  status: "in_progress" | "completed" | "paid" | "generated";
  created_at: string;
  completed_at: string | null;
  paid_at: string | null;
};

export type AnswerRow = {
  question_id: number;
  content: string;
  updated_at: string;
};

export async function createResponse(args: {
  fromName: string;
  toLabel: string;
  mode?: "self" | "other";
  tier?: string;
}): Promise<{ id: string; slug: string }> {
  const supabase = getSupabaseServerClient();

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = generateSlug(8);
    const { data, error } = await supabase.rpc("create_response", {
      p_slug: slug,
      p_from_name: args.fromName,
      p_to_label: args.toLabel,
      p_mode: args.mode ?? null,
      p_tier: args.tier ?? null,
    });
    if (!error && data) {
      return { id: data as string, slug };
    }
    if (error && !error.message.toLowerCase().includes("duplicate")) {
      throw error;
    }
  }
  throw new Error("Failed to allocate unique slug after 5 attempts");
}

export async function upsertAnswer(args: {
  responseId: string;
  questionId: number;
  content: string;
}): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.rpc("upsert_answer", {
    p_response_id: args.responseId,
    p_question_id: args.questionId,
    p_content: args.content,
  });
  if (error) throw error;
}

export async function updateResponseMeta(args: {
  responseId: string;
  introData?: Record<string, unknown>;
  style?: "simple" | "rich";
  person?: "first" | "third";
}): Promise<void> {
  const supabase = getSupabaseServerClient();
  const updates: Record<string, unknown> = {};
  if (args.introData !== undefined) updates.intro_data = args.introData;
  if (args.style !== undefined) updates.style = args.style;
  if (args.person !== undefined) updates.person = args.person;
  if (Object.keys(updates).length === 0) return;

  const { error } = await supabase
    .from("responses")
    .update(updates)
    .eq("id", args.responseId);
  if (error) throw error;
}

export async function completeResponse(responseId: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.rpc("complete_response", {
    p_response_id: responseId,
  });
  if (error) throw error;
}

export async function getResponseBySlug(
  slug: string,
): Promise<{ response: ResponseRow; answers: AnswerRow[] } | null> {
  const supabase = getSupabaseServerClient();

  const { data: response, error: responseError } = await supabase
    .from("responses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (responseError || !response) return null;

  const { data: answers, error: answersError } = await supabase
    .from("answers")
    .select("question_id, content, updated_at")
    .eq("response_id", response.id)
    .order("question_id", { ascending: true });

  if (answersError) throw answersError;

  return {
    response: response as ResponseRow,
    answers: (answers ?? []) as AnswerRow[],
  };
}

export function answersAsRecord(rows: AnswerRow[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const r of rows) {
    result[String(r.question_id)] = r.content;
  }
  return result;
}
