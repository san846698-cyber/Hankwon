import "server-only";
import { Resend } from "resend";

export type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer }>;
};

const FROM = process.env.RESEND_FROM_EMAIL ?? "한권 <noreply@hankwon.com>";

/**
 * Send transactional email via Resend.
 *
 * Without RESEND_API_KEY this no-ops with a console log so the rest of the
 * pipeline (book generation, payment, webhook handlers) can run end-to-end
 * locally without sending real mail.
 */
export async function sendEmail(args: SendEmailArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.log(
      `[email mock] to=${args.to} subject=${args.subject} attachments=${args.attachments?.length ?? 0}`,
    );
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: args.subject,
    html: args.html,
    attachments: args.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}
