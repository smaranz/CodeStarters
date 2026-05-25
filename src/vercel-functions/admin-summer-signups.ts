import type { IncomingMessage, ServerResponse } from "node:http";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { parse } from "cookie";

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function getEnv() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) throw new Error("MISSING_SUPABASE_CONFIG");
  return { url, anonKey, serviceKey };
}

function extractToken(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const value = raw.trim();
  try { return new URL(value).searchParams.get("token")?.trim() ?? value; } catch { return value; }
}

async function verifyAdmin(req: IncomingMessage, url: string, anonKey: string) {
  const cookies = parse(req.headers.cookie ?? "");
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      get(name: string) { return cookies[name]; },
      set() {},
      remove() {},
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: adminRow } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  return Boolean(adminRow);
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });
  try {
    const env = getEnv();
    const isAdmin = await verifyAdmin(req, env.url, env.anonKey);
    if (!isAdmin) return json(res, 401, { error: "Unauthorized" });

    const body = await readJson(req).catch(() => ({}));
    const token = extractToken(body.token);
    const checkIn = body.action === "check-in";
    if (!token) return json(res, 400, { error: "QR token is required." });

    const admin = createClient(env.url, env.serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const selectCols = "id, name, email, phone, school, grade_level, interest, status, availability, reason_for_joining, created_at";
    const { data: signup, error: lookupError } = await admin.from("volunteers").select(selectCols).eq("social_links", token).like("interest", "Summer Program:%").maybeSingle();
    if (lookupError) return json(res, 500, { error: "Could not look up this QR code." });
    if (!signup) return json(res, 404, { error: "No summer signup found for this QR code." });

    if (checkIn && signup.status === "contacted") return json(res, 200, { ok: true, signup, checkedIn: true });
    if (checkIn && signup.status !== "pending") return json(res, 400, { error: `This signup is ${signup.status ?? "not pending"} and cannot be checked in.` });
    if (checkIn) {
      const { data: updated, error: updateError } = await admin.from("volunteers").update({ status: "contacted" }).eq("id", signup.id).select(selectCols).single();
      if (updateError) return json(res, 500, { error: "Could not mark this signup as checked in." });
      return json(res, 200, { ok: true, signup: updated, checkedIn: true });
    }

    return json(res, 200, { ok: true, signup, checkedIn: signup.status === "contacted" });
  } catch (error) {
    console.error("Admin summer signup function error:", error);
    return json(res, 500, { error: "Could not verify this QR code." });
  }
}