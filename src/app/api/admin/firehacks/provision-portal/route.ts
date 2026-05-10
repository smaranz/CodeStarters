import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { emailNotConfiguredMessage, isEmailConfigured, sendPlainEmail } from "@/lib/server-email";
import crypto from "crypto";

async function verifyAdmin() {
    const sessionClient = await getSupabaseServerClient();
    const { data: { user }, error } = await sessionClient.auth.getUser();
    if (error || !user) return null;
    const { data: adminRow } = await sessionClient.from("admin_users").select("id").eq("id", user.id).maybeSingle();
    return adminRow ? user : null;
}

export async function GET() {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const admin = getSupabaseAdminClient();
    const { data, error } = await admin
        .from("firehacks_participants")
        .select("id, email, full_name, auth_user_id, waiver_uploaded_at")
        .eq("event_id", "fh2026")
        .order("email");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

function deriveFullName(email: string): string {
    const local = email.split("@")[0];
    return local
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
}

function generatePassword(): string {
    return crypto.randomBytes(12).toString("base64url");
}

export async function POST(request: NextRequest) {
    // 1. Verify admin session
    const sessionClient = await getSupabaseServerClient();
    const { data: { user }, error: authError } = await sessionClient.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: adminRow } = await sessionClient
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
    if (!adminRow) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. Parse + validate body
    const body = await request.json().catch(() => ({}));
    const email: string = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!email) {
        return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    if (!isEmailConfigured()) {
        return NextResponse.json({ error: emailNotConfiguredMessage() }, { status: 500 });
    }

    const admin = getSupabaseAdminClient();
    const password = generatePassword();
    const eventId = "fh2026";

    // 4. Ensure participant row exists BEFORE creating auth user (trigger links them on insert).
    //    Cannot use .upsert({ onConflict: "event_id,email" }): unique index is on (event_id, lower(email)).
    const fullName = deriveFullName(email);
    const { data: existingParticipant, error: selectPError } = await admin
        .from("firehacks_participants")
        .select("id")
        .eq("event_id", eventId)
        .ilike("email", email)
        .maybeSingle();

    if (selectPError) {
        console.error("Participant select error:", selectPError);
        return NextResponse.json({ error: "Failed to look up participant." }, { status: 500 });
    }

    if (existingParticipant) {
        const { error: updatePError } = await admin
            .from("firehacks_participants")
            .update({ full_name: fullName })
            .eq("id", existingParticipant.id);
        if (updatePError) {
            console.error("Participant update error:", updatePError);
            return NextResponse.json({ error: "Failed to update participant." }, { status: 500 });
        }
    } else {
        const { error: insertPError } = await admin.from("firehacks_participants").insert({
            event_id: eventId,
            email,
            full_name: fullName,
        });
        if (insertPError) {
            console.error("Participant insert error:", insertPError);
            return NextResponse.json({ error: "Failed to create participant." }, { status: 500 });
        }
    }

    // 5. Create or reset auth user
    let authUserId: string;
    const { data: created, error: createError } = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (createError) {
        if (!createError.message.toLowerCase().includes("already")) {
            console.error("Create user error:", createError);
            return NextResponse.json({ error: "Failed to create auth user." }, { status: 500 });
        }
        // User exists — find and reset password
        const { data: list } = await admin.auth.admin.listUsers();
        const existing = list?.users?.find((u) => u.email?.toLowerCase() === email);
        if (!existing) {
            return NextResponse.json({ error: "Could not locate existing auth user." }, { status: 500 });
        }
        authUserId = existing.id;
        const { error: updateError } = await admin.auth.admin.updateUserById(authUserId, { password });
        if (updateError) {
            console.error("Update user error:", updateError);
            return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
        }
    } else {
        authUserId = created.user.id;
    }

    // 6. Ensure participant row is linked to this auth user (existing-auth path skips trigger)
    const { error: linkError } = await admin
        .from("firehacks_participants")
        .update({ auth_user_id: authUserId })
        .eq("event_id", eventId)
        .ilike("email", email);
    if (linkError) {
        console.error("Participant link error:", linkError);
        return NextResponse.json({ error: "Failed to link participant to login." }, { status: 500 });
    }

    // 7. Send credentials email
    const portalUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://codestarters.xyz"}/firehacks/portal/login`;
    try {
        await sendPlainEmail({
            to: email,
            subject: "Your Fire Hacks Portal Login",
            text: [
                `Hi ${fullName},`,
                "",
                "Here are your credentials to access the Fire Hacks attendee portal:",
                "",
                `  Portal: ${portalUrl}`,
                `  Email:  ${email}`,
                `  Password: ${password}`,
                "",
                "You can use this to view your QR code for check-in and the food line.",
                "",
                "Security note: do not forward this email. If you received this in error, contact a Fire Hacks staff member immediately.",
                "",
                "— Fire Hacks 2026 Staff",
            ].join("\n"),
        });
    } catch (mailError: unknown) {
        console.error("Mail send error:", mailError);
        const msg = mailError instanceof Error ? mailError.message : "";
        if (msg === "MISSING_EMAIL_CONFIG") {
            return NextResponse.json({ error: emailNotConfiguredMessage() }, { status: 500 });
        }
        return NextResponse.json({ error: "Credentials created but email failed to send." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, email });
}
