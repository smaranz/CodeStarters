import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import nodemailer from "nodemailer";
import crypto from "crypto";

function generatePassword() {
    return crypto.randomBytes(12).toString("base64url");
}

function createTransport() {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return null;
    return nodemailer.createTransport({ host: "smtp.gmail.com", port: 587, secure: false, auth: { user, pass } });
}

async function verifyAdmin() {
    const sessionClient = await getSupabaseServerClient();
    const { data: { user } } = await sessionClient.auth.getUser();
    if (!user) return null;
    const { data: adminRow } = await sessionClient.from("admin_users").select("id").eq("id", user.id).maybeSingle();
    return adminRow ? user : null;
}

// GET — list all members
export async function GET() {
    const admin_user = await verifyAdmin();
    if (!admin_user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = getSupabaseAdminClient();
    const { data, error } = await admin
        .from("firehacks_members")
        .select("id, email, created_at")
        .order("created_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// POST — create a member account and email credentials
export async function POST(request: NextRequest) {
    const admin_user = await verifyAdmin();
    if (!admin_user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const transport = createTransport();
    if (!transport) {
        return NextResponse.json(
            { error: "Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD." },
            { status: 500 }
        );
    }

    const body = await request.json().catch(() => ({}));
    const email: string = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

    const admin = getSupabaseAdminClient();
    const password = generatePassword();

    // Create or reset auth user
    let authUserId: string;
    const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (createError) {
        if (!createError.message.toLowerCase().includes("already")) {
            return NextResponse.json({ error: "Failed to create account." }, { status: 500 });
        }
        const { data: list } = await admin.auth.admin.listUsers();
        const existing = list?.users?.find((u) => u.email?.toLowerCase() === email);
        if (!existing) return NextResponse.json({ error: "Could not locate existing account." }, { status: 500 });
        authUserId = existing.id;
        const { error: updateError } = await admin.auth.admin.updateUserById(authUserId, { password });
        if (updateError) return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
    } else {
        authUserId = created.user.id;
    }

    // Upsert into firehacks_members
    await admin.from("firehacks_members").upsert(
        { id: authUserId, email, created_by: admin_user.id },
        { onConflict: "id" }
    );

    // Send credentials
    const scannerUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://codestarters.xyz"}/firehacks/member/login`;
    try {
        await transport.sendMail({
            from: `"Fire Hacks 2026" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Your Fire Hacks Staff Scanner Access",
            text: [
                "You've been added as a Fire Hacks 2026 staff member.",
                "",
                "Use the link and credentials below to access the food scanner:",
                "",
                `  Scanner: ${scannerUrl}`,
                `  Email:   ${email}`,
                `  Password: ${password}`,
                "",
                "Do not share these credentials. Contact a Fire Hacks organizer if you have any issues.",
                "",
                "— Fire Hacks 2026 Organizers",
            ].join("\n"),
        });
    } catch (mailError) {
        console.error("Mail send error:", mailError);
        return NextResponse.json({ error: "Account created but email failed to send." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, email });
}

// DELETE — remove a member account
export async function DELETE(request: NextRequest) {
    const admin_user = await verifyAdmin();
    if (!admin_user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { memberId } = await request.json().catch(() => ({}));
    if (!memberId) return NextResponse.json({ error: "memberId is required" }, { status: 400 });

    const admin = getSupabaseAdminClient();

    // Delete auth user (cascade removes firehacks_members row)
    const { error } = await admin.auth.admin.deleteUser(memberId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
}
