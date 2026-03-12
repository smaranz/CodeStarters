import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "CodeStarters <no-reply@codestarters.xyz>";
const adminNotifyEmail = process.env.ADMIN_NOTIFY_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "Email not configured on server (missing RESEND_API_KEY)." },
      { status: 500 },
    );
  }

  const { email, name, interest } = (await request.json()) as {
    email?: string;
    name?: string;
    interest?: string;
  };

  if (!email || !name) {
    return NextResponse.json({ error: "Missing email or name." }, { status: 400 });
  }

  try {
    // Email to volunteer
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "You've been approved to volunteer with CodeStarters 🎉",
      text: [
        `Hi ${name},`,
        "",
        "Great news — your CodeStarters volunteer application has been approved.",
        interest ? `Role: ${interest}` : "",
        "",
        "We’ll follow up shortly with next steps and how to get started.",
        "",
        "Thank you for being part of CodeStarters!",
        "",
        "- CodeStarters Team",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Optional notification to founders/admins
    if (adminNotifyEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: adminNotifyEmail,
        subject: "New volunteer approved",
        text: [
          `A volunteer has just been approved:`,
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          interest ? `Interest: ${interest}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending approval email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}

