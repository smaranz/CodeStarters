import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { getSupabaseAdminClient } from '@/lib/supabase/admin';

const ALLOWED_TYPES = new Set([
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/heic',
    'image/heif',
]);
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB
const BUCKET = 'firehacks-waivers';

function safeFileName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 80) || 'waiver';
}

export async function POST(request: Request) {
    const supabase = await getSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const admin = getSupabaseAdminClient();
    const { data: participant, error: participantError } = await admin
        .from('firehacks_participants')
        .select('id, event_id, waiver_storage_path')
        .eq('auth_user_id', user.id)
        .maybeSingle();

    if (participantError) {
        return NextResponse.json({ error: participantError.message }, { status: 500 });
    }
    if (!participant) {
        return NextResponse.json({ error: 'No participant record linked to this account' }, { status: 404 });
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400 });
    }

    const file = formData.get('file');
    if (!(file instanceof File)) {
        return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
    }
    if (file.size === 0) {
        return NextResponse.json({ error: 'File is empty' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'File exceeds 15 MB limit' }, { status: 413 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json({ error: `Unsupported file type: ${file.type || 'unknown'}` }, { status: 415 });
    }

    const timestamp = Date.now();
    const path = `${participant.event_id}/${participant.id}/${timestamp}-${safeFileName(file.name)}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await admin.storage
        .from(BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: false });

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const uploadedAt = new Date().toISOString();
    const { error: updateError } = await admin
        .from('firehacks_participants')
        .update({ waiver_storage_path: path, waiver_uploaded_at: uploadedAt })
        .eq('id', participant.id);

    if (updateError) {
        await admin.storage.from(BUCKET).remove([path]);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (participant.waiver_storage_path && participant.waiver_storage_path !== path) {
        await admin.storage.from(BUCKET).remove([participant.waiver_storage_path]);
    }

    return NextResponse.json({
        ok: true,
        waiver_storage_path: path,
        waiver_uploaded_at: uploadedAt,
    });
}
