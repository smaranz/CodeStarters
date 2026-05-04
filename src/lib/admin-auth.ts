import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/** Returns the signed-in user if they have a row in admin_users; otherwise null. */
export async function verifyAdminUser(): Promise<User | null> {
  const sessionClient = await getSupabaseServerClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();
  if (!user) return null;
  const { data: adminRow } = await sessionClient
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  return adminRow ? user : null;
}
