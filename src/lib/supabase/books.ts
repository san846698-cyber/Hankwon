import "server-only";
import { getSupabaseServerClient } from "./server";
import type { GeneratedBook } from "@/lib/ai/types";

export type BookRow = {
  id: string;
  response_id: string;
  title: string | null;
  subtitle: string | null;
  body_md: string | null;
  book_json: GeneratedBook | null;
  pdf_url: string | null;
  order_id: string | null;
  generated_at: string | null;
  created_at: string;
};

/**
 * 생성된 책을 books 테이블에 저장 (response당 1권, upsert).
 * book_json에 전체 구조(title/subtitle/dedication/chapters/closing)를 보존하고,
 * body_md에는 챕터 본문을 이어붙여 검색·백업용으로 둡니다.
 */
export async function saveBook(args: {
  responseId: string;
  orderId: string;
  book: GeneratedBook;
}): Promise<void> {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from("books").upsert(
    {
      response_id: args.responseId,
      order_id: args.orderId,
      title: args.book.title,
      subtitle: args.book.subtitle,
      body_md: args.book.chapters.map((c) => c.bodyMarkdown).join("\n\n"),
      book_json: args.book,
      generated_at: new Date().toISOString(),
    },
    { onConflict: "response_id" },
  );
  if (error) throw error;
}

/** 웹훅 멱등성 체크 — 이 주문으로 이미 책이 생성됐는지. */
export async function hasBookForOrder(orderId: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("books")
    .select("id")
    .eq("order_id", orderId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

/** /book/[slug] 페이지용 — slug로 생성된 책과 호칭을 함께 조회. */
export async function getBookBySlug(
  slug: string,
): Promise<{ book: GeneratedBook; toLabel: string; fromName: string } | null> {
  const supabase = getSupabaseServerClient();

  const { data: response, error: responseError } = await supabase
    .from("responses")
    .select("id, to_label, from_name")
    .eq("slug", slug)
    .single();
  if (responseError || !response) return null;

  const { data: row, error: bookError } = await supabase
    .from("books")
    .select("book_json")
    .eq("response_id", response.id)
    .maybeSingle();
  if (bookError || !row?.book_json) return null;

  return {
    book: row.book_json as GeneratedBook,
    toLabel: response.to_label as string,
    fromName: response.from_name as string,
  };
}

/** 결제(paid)·생성(generated) 단계 전환. paid 전환 시 paid_at도 기록. */
export async function markResponseStatus(
  responseId: string,
  status: "paid" | "generated",
): Promise<void> {
  const supabase = getSupabaseServerClient();
  const updates: Record<string, unknown> = { status };
  if (status === "paid") updates.paid_at = new Date().toISOString();
  const { error } = await supabase
    .from("responses")
    .update(updates)
    .eq("id", responseId);
  if (error) throw error;
}
