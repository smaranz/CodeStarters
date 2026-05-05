import { Resend } from "resend";
import nodemailer from "nodemailer";

type SendPlainArgs = {
  to: string;
  subject: string;
  text: string;
  /** Display name for Gmail SMTP "from". Address is always GMAIL_USER. */
  gmailFrom?: string;
};

/**
 * Sends a plain-text email. Prefers Gmail (GMAIL_USER + GMAIL_APP_PASSWORD),
 * then Resend (RESEND_API_KEY) if Gmail is not configured.
 */
export async function sendPlainEmail({
  to,
  subject,
  text,
  gmailFrom = "Fire Hacks 2026",
}: SendPlainArgs): Promise<void> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (user && pass) {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: `"${gmailFrom}" <${user}>`,
      to,
      subject,
      text,
    });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from =
      process.env.RESEND_FROM_EMAIL ||
      "CodeStarters <no-reply@codestarters.xyz>";
    const { error } = await resend.emails.send({ from, to, subject, text });
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  throw new Error("MISSING_EMAIL_CONFIG");
}

export function emailNotConfiguredMessage(): string {
  return "Email not configured on the server. Set GMAIL_USER and GMAIL_APP_PASSWORD (recommended), or RESEND_API_KEY and RESEND_FROM_EMAIL, in your hosting environment (e.g. Vercel → Settings → Environment Variables).";
}

export function isEmailConfigured(): boolean {
  return Boolean(
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      process.env.RESEND_API_KEY,
  );
}
