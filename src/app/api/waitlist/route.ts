import { NextResponse, type NextRequest } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { waitlistEmailHtml } from "@/lib/emails/waitlist";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { features } from "@/lib/features";

export const runtime = "nodejs";

type Body = {
  email?: string;
  source?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Persist to Supabase if configured (table: print_waitlist).
  if (features.hasSupabase()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("print_waitlist").insert({
        email,
        source: body.source ?? "buy_page",
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[waitlist] supabase insert failed:", err);
    }
  }

  // Confirmation email (no-op without RESEND_API_KEY).
  try {
    await sendEmail({
      to: email,
      subject: "한권 양장 인쇄본 알림 신청 완료",
      html: waitlistEmailHtml({ recipientEmail: email }),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[waitlist] email send failed:", err);
  }

  return NextResponse.json({ ok: true });
}
