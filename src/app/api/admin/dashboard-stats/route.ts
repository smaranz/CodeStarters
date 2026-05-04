import { NextResponse } from "next/server";
import { verifyAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const user = await verifyAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdminClient();
  const [
    { count: requests, error: e1 },
    { count: pendingRequests, error: e2 },
    { count: pendingApps, error: e3 },
    { count: teamMembers, error: e4 },
  ] = await Promise.all([
    admin.from("website_requests").select("*", { count: "exact", head: true }),
    admin
      .from("website_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    admin
      .from("volunteers")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    admin
      .from("volunteers")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed"),
  ]);

  if (e1 || e2 || e3 || e4) {
    const msg = [e1, e2, e3, e4].find(Boolean)?.message ?? "Query failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({
    requests: requests ?? 0,
    pendingRequests: pendingRequests ?? 0,
    pendingApps: pendingApps ?? 0,
    teamMembers: teamMembers ?? 0,
  });
}
