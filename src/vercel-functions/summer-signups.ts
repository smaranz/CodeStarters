import type { IncomingMessage, ServerResponse } from "node:http";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

const BOOTCAMPS = new Set(["Advanced CS", "Basic CS", "AI Development", "Python"]);
const GRADES = new Set(["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade", "Other / above 12th"]);
const ADVANCED_CS_GRADES = new Set(["5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade", "Other / above 12th"]);

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function clean(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function getRequiredEnv() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!supabaseUrl || !serviceKey) throw new Error("MISSING_SUPABASE_CONFIG");
  if (!gmailUser || !gmailPass) throw new Error("MISSING_EMAIL_CONFIG");
  return { supabaseUrl, serviceKey, gmailUser, gmailPass };
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  try {
    const env = getRequiredEnv();
    const body = await readJson(req).catch(() => ({}));
    const name = clean(body.name, 120);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 80);
    const school = clean(body.school, 160);
    const grade = clean(body.grade, 80);
    const bootcamp = clean(body.bootcamp, 80);
    const notes = clean(body.notes, 1200);
    if (!name || !email || !school || !grade || !bootcamp) return json(res, 400, { error: "Please complete all required fields." });
    if (!BOOTCAMPS.has(bootcamp)) return json(res, 400, { error: "Please select a valid summer class." });
    if (!GRADES.has(grade)) return json(res, 400, { error: "Please select a valid grade." });
    if (bootcamp === "Advanced CS" && !ADVANCED_CS_GRADES.has(grade)) return json(res, 400, { error: "Advanced CS is only open to 5th grade and up." });

    const token = `summer_${crypto.randomBytes(18).toString("base64url")}`;
    const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://codestarters.org";
    const checkInUrl = `${siteUrl}/admin/summer-scanner?token=${encodeURIComponent(token)}`;
    const qrDataUrl = await QRCode.toDataURL(checkInUrl, { margin: 1, width: 720, errorCorrectionLevel: "M", color: { dark: "#0a0a0a", light: "#ffffff" } });
    const qrBuffer = Buffer.from((qrDataUrl.split(",")[1] ?? ""), "base64");

    const admin = createClient(env.supabaseUrl, env.serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { error: insertError } = await admin.from("volunteers").insert({
      name, email, phone, school, grade_level: grade, interest: `Summer Program: ${bootcamp}`,
      availability: "1-week bootcamp — dates TBD", social_links: token,
      reason_for_joining: notes || "Summer program signup",
      previous_experience: ["Summer program signup", `Class: ${bootcamp}`, `Grade: ${grade}`, "Format: 1-week bootcamp", "Dates: TBD", `QR token: ${token}`].join(" | "),
    });
    if (insertError) {
      console.error("Summer signup insert error:", insertError);
      return json(res, 500, { error: "Signup could not be saved. Please try again." });
    }

    const transport = nodemailer.createTransport({ host: "smtp.gmail.com", port: 587, secure: false, auth: { user: env.gmailUser, pass: env.gmailPass } });
    await transport.sendMail({
      from: `"CodeStarters Summer Program" <${env.gmailUser}>`, to: email,
      subject: `CodeStarters Summer ${bootcamp} Signup Confirmation`,
      text: [`Hi ${name},`, "", `Thanks for signing up for CodeStarters Summer ${bootcamp}.`, "", "Your confirmation QR code is attached to this email. Please bring it with you and show it at entry.", "", "Program details:", `  Class: ${bootcamp}`, "  Format: 1-week bootcamp", "  Dates: TBD", "", "We'll email you again once dates and final schedules are confirmed.", "", "If you don't see future updates, please check your spam or promotions folder.", "", "— CodeStarters"].join("\n"),
      html: [`<p>Hi ${escapeHtml(name)},</p>`, `<p>Thanks for signing up for <strong>CodeStarters Summer ${escapeHtml(bootcamp)}</strong>.</p>`, `<p>Your confirmation QR code is attached and shown below. Please bring it with you and show it at entry.</p>`, `<p><img src="cid:summer-pass" alt="CodeStarters Summer confirmation QR code" style="width:260px;max-width:100%;height:auto;border:1px solid #e5e7eb;border-radius:16px;padding:12px;" /></p>`, `<p><strong>Class:</strong> ${escapeHtml(bootcamp)}<br/><strong>Format:</strong> 1-week bootcamp<br/><strong>Dates:</strong> TBD</p>`, `<p>We'll email you again once dates and final schedules are confirmed. If you don't see future updates, please check spam or promotions.</p>`, `<p>— CodeStarters</p>`].join(""),
      attachments: [{ filename: "codestarters-summer-qr.png", content: qrBuffer, contentType: "image/png", cid: "summer-pass" }],
    });
    return json(res, 200, { ok: true, email });
  } catch (error) {
    console.error("Summer signup function error:", error);
    const message = error instanceof Error && error.message === "MISSING_EMAIL_CONFIG" ? "Email is not configured on the server." : "Signup failed. Please try again.";
    return json(res, 500, { error: message });
  }
}