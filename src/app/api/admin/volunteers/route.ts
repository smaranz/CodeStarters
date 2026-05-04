import { NextRequest, NextResponse } from "next/server";
import { verifyAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const VOLUNTEER_STATUSES = new Set([
  "pending",
  "contacted",
  "rejected",
  "completed",
]);

export async function GET(request: NextRequest) {
  const user = await verifyAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const scope = request.nextUrl.searchParams.get("scope");
  if (scope !== "applications" && scope !== "team") {
    return NextResponse.json(
      { error: "Invalid scope. Use applications or team." },
      { status: 400 },
    );
  }

  const admin = getSupabaseAdminClient();
  let q = admin.from("volunteers").select("*").order("created_at", { ascending: false });
  if (scope === "applications") {
    q = q.neq("status", "completed");
  } else {
    q = q.eq("status", "completed");
  }

  const { data, error } = await q;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function PATCH(request: NextRequest) {
  const user = await verifyAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { id?: string; status?: string };
  const { id, status } = body;
  if (!id || typeof id !== "string" || !status || !VOLUNTEER_STATUSES.has(status)) {
    return NextResponse.json(
      { error: "Invalid id or status." },
      { status: 400 },
    );
  }

  const admin = getSupabaseAdminClient();
  const { error } = await admin.from("volunteers").update({ status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
