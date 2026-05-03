import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const ITEM_LIMITS: Record<string, number> = {
    pizza: 2,
    chips: 2,
    drink: 2,
    water: 3,
};

export async function POST(request: NextRequest) {
    const sessionClient = await getSupabaseServerClient();
    const { data: { user } } = await sessionClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { token } = await request.json().catch(() => ({}));
    if (!token) return NextResponse.json({ error: "token is required" }, { status: 400 });

    const admin = getSupabaseAdminClient();

    const { data: participant, error: pErr } = await admin
        .from("firehacks_participants")
        .select("id, full_name, pass_token")
        .eq("pass_token", token)
        .single();

    if (pErr || !participant) {
        return NextResponse.json({ error: "Participant not found" }, { status: 404 });
    }

    const { data: balanceRows } = await admin
        .from("firehacks_food_balance")
        .select("kind, count")
        .eq("participant_id", participant.id);

    const balances: Record<string, number> = { pizza: 0, chips: 0, drink: 0, water: 0 };
    for (const row of balanceRows ?? []) {
        balances[row.kind] = row.count;
    }

    return NextResponse.json({ ...participant, balances, limits: ITEM_LIMITS });
}
