import { createFileRoute } from "@tanstack/react-router";
import crypto from "node:crypto";
import QRCode from "qrcode";
import { getSupabaseServerClient, jsonWithCookies } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { emailNotConfiguredMessage, isEmailConfigured, sendPlainEmail } from "@/lib/server-email";

const BOOTCAMPS = new Set(["Advanced CS", "Basic CS", "AI Development", "Python"]);
const GRADES = new Set(["5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade", "Other"]);

function clean(value: unknown, max = 500): string {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function randomToken(): string {
    return `summer_${crypto.randomBytes(18).toString("base64url")}`;
}

function qrPngBuffer(dataUrl: string): Buffer {
    const base64 = dataUrl.split(",")[1] ?? "";
    return Buffer.from(base64, "base64");
}

function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

export const Route = createFileRoute("/api/summer-signups")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const bundle = getSupabaseServerClient(request);
                if (!isEmailConfigured()) {
                    return jsonWithCookies(bundle, { error: emailNotConfiguredMessage() }, { status: 500 });
                }

                const body = await request.json().catch(() => ({}));
                const name = clean(body.name, 120);
                const email = clean(body.email, 180).toLowerCase();
                const phone = clean(body.phone, 80);
                const school = clean(body.school, 160);
                const grade = clean(body.grade, 80);
                const bootcamp = clean(body.bootcamp, 80);
                const notes = clean(body.notes, 1200);

                if (!name || !email || !school || !grade || !bootcamp) {
                    return jsonWithCookies(bundle, { error: "Please complete all required fields." }, { status: 400 });
                }
                if (!BOOTCAMPS.has(bootcamp)) {
                    return jsonWithCookies(bundle, { error: "Please select a valid summer class." }, { status: 400 });
                }
                if (!GRADES.has(grade)) {
                    return jsonWithCookies(bundle, { error: "Please select a valid grade." }, { status: 400 });
                }

                const token = randomToken();
                const siteUrl = process.env.PUBLIC_SITE_URL ?? "https://codestarters.org";
                const checkInUrl = `${siteUrl}/admin/summer-scanner?token=${encodeURIComponent(token)}`;
                const safeName = escapeHtml(name);
                const safeBootcamp = escapeHtml(bootcamp);
                const qrDataUrl = await QRCode.toDataURL(checkInUrl, {
                    margin: 1,
                    width: 720,
                    errorCorrectionLevel: "M",
                    color: { dark: "#0a0a0a", light: "#ffffff" },
                });

                const admin = getSupabaseAdminClient();
                const { error: insertError } = await admin.from("volunteers").insert({
                    name,
                    email,
                    phone,
                    school,
                    grade_level: grade,
                    interest: `Summer Program: ${bootcamp}`,
                    availability: "1-week bootcamp — dates TBD",
                    social_links: token,
                    reason_for_joining: notes || "Summer program signup",
                    previous_experience: [
                        "Summer program signup",
                        `Class: ${bootcamp}`,
                        `Grade: ${grade}`,
                        "Format: 1-week bootcamp",
                        "Dates: TBD",
                        `QR token: ${token}`,
                    ].join(" | "),
                });

                if (insertError) {
                    console.error("Summer signup insert error:", insertError);
                    return jsonWithCookies(bundle, { error: "Signup could not be saved. Please try again." }, { status: 500 });
                }

                try {
                    await sendPlainEmail({
                        to: email,
                        subject: `CodeStarters Summer ${bootcamp} Signup Confirmation`,
                        gmailFrom: "CodeStarters Summer Program",
                        text: [
                            `Hi ${name},`,
                            "",
                            `Thanks for signing up for CodeStarters Summer ${bootcamp}.`,
                            "",
                            "Your confirmation QR code is attached to this email. Please bring it with you and show it at entry.",
                            "",
                            "Program details:",
                            `  Class: ${bootcamp}`,
                            "  Format: 1-week bootcamp",
                            "  Dates: TBD",
                            "",
                            "We'll email you again once dates and final schedules are confirmed.",
                            "",
                            "If you don't see future updates, please check your spam or promotions folder.",
                            "",
                            "— CodeStarters",
                        ].join("\n"),
                        html: [
                            `<p>Hi ${safeName},</p>`,
                            `<p>Thanks for signing up for <strong>CodeStarters Summer ${safeBootcamp}</strong>.</p>`,
                            `<p>Your confirmation QR code is attached and shown below. Please bring it with you and show it at entry.</p>`,
                            `<p><img src="cid:summer-pass" alt="CodeStarters Summer confirmation QR code" style="width:260px;max-width:100%;height:auto;border:1px solid #e5e7eb;border-radius:16px;padding:12px;" /></p>`,
                            `<p><strong>Class:</strong> ${safeBootcamp}<br/><strong>Format:</strong> 1-week bootcamp<br/><strong>Dates:</strong> TBD</p>`,
                            `<p>We'll email you again once dates and final schedules are confirmed. If you don't see future updates, please check spam or promotions.</p>`,
                            `<p>— CodeStarters</p>`,
                        ].join(""),
                        attachments: [{ filename: "codestarters-summer-qr.png", content: qrPngBuffer(qrDataUrl), contentType: "image/png", cid: "summer-pass" }],
                    });
                } catch (mailError: unknown) {
                    console.error("Summer signup email error:", mailError);
                    const msg = mailError instanceof Error ? mailError.message : "";
                    if (msg === "MISSING_EMAIL_CONFIG") {
                        return jsonWithCookies(bundle, { error: emailNotConfiguredMessage() }, { status: 500 });
                    }
                    return jsonWithCookies(bundle, { error: "Signup saved, but the confirmation email failed to send. Please contact CodeStarters." }, { status: 500 });
                }

                return jsonWithCookies(bundle, { ok: true, email });
            },
        },
    },
});