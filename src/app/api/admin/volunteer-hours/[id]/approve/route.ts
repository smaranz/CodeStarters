import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateVolunteerCertificate } from "@/lib/volunteer-hours-pdf";
import { Resend } from "resend";
import nodemailer from "nodemailer";

async function sendCertificateEmail(opts: {
  to: string;
  name: string;
  hours: number;
  pdfBuffer: Buffer;
  approvedDate: string;
}) {
  const { to, name, hours, pdfBuffer, approvedDate } = opts;
  const subject = "Your CodeStarters Volunteer Hours Certificate";
  const text = [
    `Hi ${name},`,
    "",
    `Your volunteer hours have been verified by CodeStarters!`,
    "",
    `Hours verified: ${hours}`,
    `Date verified: ${approvedDate}`,
    "",
    "Please find your Volunteer Service Verification certificate attached to this email.",
    "You can present this letter to your school, scholarship program, or any organization",
    "requiring proof of volunteer service.",
    "",
    "Thank you for being part of CodeStarters!",
    "",
    "— CodeStarters Team",
    "codestarters26@gmail.com | EIN: 81-2908499",
  ].join("\n");

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: gmailUser, pass: gmailPass },
    });
    await transport.sendMail({
      from: `"CodeStarters" <${gmailUser}>`,
      to,
      subject,
      text,
      attachments: [{ filename: "CodeStarters-Volunteer-Certificate.pdf", content: pdfBuffer }],
    });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.RESEND_FROM_EMAIL ?? "CodeStarters <no-reply@codestarters.xyz>";
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      attachments: [{ filename: "CodeStarters-Volunteer-Certificate.pdf", content: pdfBuffer }],
    });
    if (error) throw new Error(error.message);
    return;
  }

  throw new Error("MISSING_EMAIL_CONFIG");
}

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = getSupabaseAdminClient();

  const { data, error: fetchErr } = await admin
    .from("volunteer_hours")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchErr || !data) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  const { error: updateErr } = await admin
    .from("volunteer_hours")
    .update({ status: "approved" })
    .eq("id", id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  const approvedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const pdfBuffer = generateVolunteerCertificate({
    volunteerName: data.volunteer_name,
    activityDescription: data.activity_description,
    hours: data.hours,
    approvedDate,
  });

  try {
    await sendCertificateEmail({
      to: data.volunteer_email,
      name: data.volunteer_name,
      hours: data.hours,
      pdfBuffer,
      approvedDate,
    });
  } catch (emailErr) {
    console.error("Certificate email failed:", emailErr);
    return NextResponse.json({ ok: true, emailWarning: "Approved but email failed — check email config." });
  }

  return NextResponse.json({ ok: true });
}
