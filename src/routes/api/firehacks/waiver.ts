import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseServerClient, jsonWithCookies } from "@/lib/supabase/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const ALLOWED_TYPES = new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/heic",
    "image/heif",
]);
const MAX_BYTES = 15 * 1024 * 1024;
const BUCKET = "firehacks-waivers";

function safeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 80) || "waiver";
}

export const Route = createFileRoute("/api/firehacks/waiver")({
    server: {
        handlers: {
            POST: async ({ request }) => {
                const bundle = getSupabaseServerClient(request);
                const { data: { user } } = await bundle.client.auth.getUser();
                if (!user) {
                    return jsonWithCookies(bundle, { error: "Not authenticated" }, { status: 401 });
                }

                const admin = getSupabaseAdminClient();
                const { data: participant, error: participantError } = await admin
                    .from("firehacks_participants")
                    .select("id, event_id, waiver_storage_path")
                    .eq("auth_user_id", user.id)
                    .maybeSingle();

                if (participantError) {
                    return jsonWithCookies(bundle, { error: participantError.message }, { status: 500 });
                }
                if (!participant) {
                    return jsonWithCookies(bundle, { error: "No participant record linked to this account" }, { status: 404 });
                }

                let formData: FormData;
                try {
                    formData = await request.formData();
                } catch {
                    return jsonWithCookies(bundle, { error: "Expected multipart form data" }, { status: 400 });
                }

                const file = formData.get("file");
                if (!(file instanceof File)) {
                    return jsonWithCookies(bundle, { error: "Missing file field" }, { status: 400 });
                }
                if (file.size === 0) {
                    return jsonWithCookies(bundle, { error: "File is empty" }, { status: 400 });
                }
                if (file.size > MAX_BYTES) {
                    return jsonWithCookies(bundle, { error: "File exceeds 15 MB limit" }, { status: 413 });
                }
                if (!ALLOWED_TYPES.has(file.type)) {
                    return jsonWithCookies(bundle, { error: `Unsupported file type: ${file.type || "unknown"}` }, { status: 415 });
                }

                const timestamp = Date.now();
                const path = `${participant.event_id}/${participant.id}/${timestamp}-${safeFileName(file.name)}`;
                const buffer = Buffer.from(await file.arrayBuffer());

                const { error: uploadError } = await admin.storage
                    .from(BUCKET)
                    .upload(path, buffer, { contentType: file.type, upsert: false });

                if (uploadError) {
                    return jsonWithCookies(bundle, { error: uploadError.message }, { status: 500 });
                }

                const uploadedAt = new Date().toISOString();
                const { error: updateError } = await admin
                    .from("firehacks_participants")
                    .update({ waiver_storage_path: path, waiver_uploaded_at: uploadedAt })
                    .eq("id", participant.id);

                if (updateError) {
                    await admin.storage.from(BUCKET).remove([path]);
                    return jsonWithCookies(bundle, { error: updateError.message }, { status: 500 });
                }

                if (participant.waiver_storage_path && participant.waiver_storage_path !== path) {
                    await admin.storage.from(BUCKET).remove([participant.waiver_storage_path]);
                }

                return jsonWithCookies(bundle, {
                    ok: true,
                    waiver_storage_path: path,
                    waiver_uploaded_at: uploadedAt,
                });
            },
        },
    },
});
