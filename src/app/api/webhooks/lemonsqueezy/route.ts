import { NextResponse, type NextRequest } from "next/server";
import {
  verifyWebhookSignature,
  type LemonsqueezyWebhookEvent,
} from "@/lib/payment/lemonsqueezy";
import { generateBook } from "@/lib/ai/generate";
import { renderBookToPdf } from "@/lib/pdf/render";
import { sendEmail } from "@/lib/email/send";
import { receiptEmailHtml } from "@/lib/emails/receipt";
import { bookReadyEmailHtml } from "@/lib/emails/book-ready";
import { getResponseBySlug, answersAsRecord } from "@/lib/supabase/responses";

export const runtime = "nodejs";
export const maxDuration = 300; // book generation + PDF can be slow

/**
 * LemonSqueezy webhook entry point.
 *
 * Flow on `order_created`:
 *   1. verify signature
 *   2. read slug from custom_data → look up answers in Supabase
 *   3. send receipt email immediately
 *   4. generate book → render PDF → email PDF
 *
 * Steps 4 should ideally run in a background queue (Inngest, QStash, etc.)
 * but for Phase 0.5 we let the webhook block until done. LS retries on 5xx.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("X-Signature") ?? "";

  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: LemonsqueezyWebhookEvent;
  try {
    event = JSON.parse(raw) as LemonsqueezyWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.meta.event_name !== "order_created") {
    return NextResponse.json({ ignored: event.meta.event_name });
  }

  const orderId = event.data.id;
  const email = event.data.attributes.user_email ?? "";
  const customerName = event.data.attributes.user_name ?? "고객";
  const totalCents = event.data.attributes.total ?? 0;
  const slug = event.meta.custom_data?.slug;

  if (!email) {
    return NextResponse.json(
      { error: "No user_email on order" },
      { status: 400 },
    );
  }

  // Receipt email — fire immediately so user sees confirmation.
  try {
    await sendEmail({
      to: email,
      subject: "한권 결제 완료",
      html: receiptEmailHtml({
        recipientName: customerName,
        recipientEmail: email,
        toLabel: "부모님",
        amount: Math.round(totalCents / 100),
        orderId,
        paidAt: new Date(),
      }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[webhook] receipt send failed:", err);
  }

  if (!slug) {
    return NextResponse.json({
      received: true,
      note: "No slug in custom_data — skipping book generation",
    });
  }

  // Look up answers from Supabase, generate book, render PDF, email.
  try {
    const stored = await getResponseBySlug(slug);
    if (!stored) {
      // eslint-disable-next-line no-console
      console.error(`[webhook] no response found for slug=${slug}`);
      return NextResponse.json({ received: true, note: "Response not found" });
    }

    const book = await generateBook({
      toLabel: stored.response.to_label,
      childName: customerName,
      answers: answersAsRecord(stored.answers),
      mode: stored.response.mode ?? "other",
      style: stored.response.style ?? "simple",
      person: stored.response.person ?? "third",
      introData: stored.response.intro_data ?? undefined,
    });

    const pdf = await renderBookToPdf(book);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hankwon.com";
    const shareLink = `${siteUrl}/book/${slug}`;

    await sendEmail({
      to: email,
      subject: `${stored.response.to_label}의 한 권이 도착했어요`,
      html: bookReadyEmailHtml({
        recipientName: customerName,
        toLabel: stored.response.to_label,
        pdfUrl: shareLink,
        shareUrl: shareLink,
      }),
      attachments: [
        {
          filename: `${book.title}.pdf`,
          content: pdf,
        },
      ],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error("[webhook] book pipeline failed:", msg);
    return NextResponse.json(
      { error: "Book generation failed", detail: msg },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
