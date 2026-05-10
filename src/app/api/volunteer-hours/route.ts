import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { volunteer_name, volunteer_email, activity_description, hours, proof_url } = body as Record<string, string>;

  if (!volunteer_name || !volunteer_email || !activity_description || !hours) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const admin = getSupabaseAdminClient();
  const { error } = await admin.from("volunteer_hours").insert([{
    volunteer_name: volunteer_name.trim(),
    volunteer_email: volunteer_email.trim().toLowerCase(),
    activity_description: activity_description.trim(),
    hours: parseFloat(hours),
    proof_url: proof_url?.trim() || null,
    status: "pending",
  }]);

  if (error) {
    console.error("volunteer_hours insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
