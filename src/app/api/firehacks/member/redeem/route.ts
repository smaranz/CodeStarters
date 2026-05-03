import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { ITEM_LIMITS } from "../lookup/route";

export async function POST(request: NextRequest) {
    const sessionClient = await getSupabaseServerClient();
    const { data: { user } } = await sessionClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { participantId, kind, delta } = await request.json().catch(() => ({}));
    if (!participantId || !kind) {
        return NextResponse.json({ error: "participantId and kind are required" }, { status: 400 });
    }
    if (!(kind in ITEM_LIMITS)) {
        return NextResponse.json({ error: "Invalid item kind" }, { status: 400 });
    }

    const step = delta === -1 ? -1 : 1;
    const max = ITEM_LIMITS[kind];
    const admin = getSupabaseAdminClient();

    // Get current count
    const { data: existing } = await admin
        .from("firehacks_food_balance")
        .select("count")
        .eq("participant_id", participantId)
        .eq("kind", kind)
        .maybeSingle();

    const current = existing?.count ?? 0;
    const next = Math.max(0, Math.min(max, current + step));

    if (next === current) {
        return NextResponse.json({ count: current, max, atLimit: current >= max });
    }

    const { error } = await admin
        .from("firehacks_food_balance")
        .upsert(
            { participant_id: participantId, kind, count: next, updated_at: new Date().toISOString() },
            { onConflict: "participant_id,kind" }
        );

    if (error) {
        console.error("Balance upsert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: next, max, atLimit: next >= max });
}
