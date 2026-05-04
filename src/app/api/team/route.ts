import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const revalidate = 60;

export async function GET() {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin
    .from("volunteers")
    .select("id, name, interest, school, grade_level, created_at")
    .eq("status", "completed")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}
