import { NextResponse, type NextRequest } from "next/server";
import { generateBook } from "@/lib/ai/generate";
import { renderBookToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/email/send";
import { bookReadyEmailHtml } from "@/lib/emails/book-ready";
import { getResponseBySlug, answersAsRecord } from "@/lib/supabase/responses";
import { saveBook, markResponseStatus } from "@/lib/supabase/books";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * 결제 우회 테스트용 — 실제 LemonSqueezy 웹훅 없이 책 생성 파이프라인을 돌립니다.
 *
 * POST /api/test-generate  { slug: string, email?: string }
 *   → responses + answers 조회 → generateBook → saveBook → status 'generated'
 *   → PDF 렌더 → book-ready 이메일 (email 미지정 시 RESEND 없으면 콘솔 mock).
 *
 * 로컬 전용: NODE_ENV === "production"이면 404. 웹훅과 달리 서명 검증·멱등성 없음.
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: { slug?: string; email?: string };
  try {
    body = (await req.json()) as { slug?: string; email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = body.slug?.trim();
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const email = body.email?.trim() || "test@example.com";

  try {
    const stored = await getResponseBySlug(slug);
    if (!stored) {
      return NextResponse.json(
        { error: `No response found for slug=${slug}` },
        { status: 404 },
      );
    }

    const orderId = `test-${slug}`;

    // 같은 흐름: paid → 생성 → save → generated.
    await markResponseStatus(stored.response.id, "paid");

    const book = await generateBook({
      toLabel: stored.response.to_label,
      answers: answersAsRecord(stored.answers),
      mode: stored.response.mode ?? "other",
      style: stored.response.style ?? "simple",
      person: stored.response.person ?? "third",
      introData: stored.response.intro_data ?? undefined,
    });

    await saveBook({ responseId: stored.response.id, orderId, book });
    await markResponseStatus(stored.response.id, "generated");

    const pdf = await renderBookToPdf(book);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const shareLink = `${siteUrl}/book/${slug}`;

    await sendEmail({
      to: email,
      subject: `${stored.response.to_label}의 한 권이 도착했어요`,
      html: bookReadyEmailHtml({
        recipientName: stored.response.from_name,
        toLabel: stored.response.to_label,
        pdfUrl: shareLink,
        shareUrl: shareLink,
      }),
      attachments: [{ filename: `${book.title}.pdf`, content: pdf }],
    });

    return NextResponse.json({
      ok: true,
      slug,
      shareLink,
      title: book.title,
      subtitle: book.subtitle,
      chapters: book.chapters.length,
      pdfBytes: pdf.length,
      emailedTo: email,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error("[/api/test-generate] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
