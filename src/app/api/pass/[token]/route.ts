import { NextRequest, NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await context.params;

        // 1. Fetch participant from Supabase (bypassing RLS with service role)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: participant, error: dbError } = await supabase
            .from("firehacks_participants")
            .select("*")
            .eq("pass_token", token)
            .single();

        if (dbError || !participant) {
            console.error("DB Error fetching participant:", dbError);
            return NextResponse.json({ error: "Participant not found" }, { status: 404 });
        }

        // 2. Check for required certificates
        const wwdr = process.env.APPLE_WWDR_CERT;
        const signerCert = process.env.APPLE_SIGNER_CERT;
        const signerKey = process.env.APPLE_SIGNER_KEY;
        const signerKeyPassphrase = process.env.APPLE_SIGNER_KEY_PASSPHRASE;

        if (!wwdr || !signerCert || !signerKey) {
            return new NextResponse(
                "Missing Apple Developer Certificates. To enable Apple Wallet passes, please set APPLE_WWDR_CERT, APPLE_SIGNER_CERT, and APPLE_SIGNER_KEY in your environment variables.",
                { status: 500 }
            );
        }

        // 3. Construct the pass
        const pass = new PKPass(
            {}, 
            {
                wwdr,
                signerCert,
                signerKey,
                signerKeyPassphrase
            },
            {
                passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID || "pass.com.codestarters.firehacks",
                teamIdentifier: process.env.APPLE_TEAM_ID || "A1B2C3D4E5",
                organizationName: "CodeStarters",
                logoText: "FireHacks 2026",
                description: "FireHacks Attendee Pass",
                backgroundColor: "rgb(10, 10, 10)",
                foregroundColor: "rgb(255, 255, 255)",
                labelColor: "rgb(239, 68, 68)",
            }
        );
        pass.type = "eventTicket";

        // 4. Add pass fields
        pass.setBarcodes({
            message: token,
            format: "PKBarcodeFormatQR",
            messageEncoding: "iso-8859-1",
            altText: participant.full_name
        });

        // Primary field: Attendee Name
        pass.primaryFields.push({
            key: "attendee",
            label: "ATTENDEE",
            value: participant.full_name
        });

        // Secondary fields: Pass type or roles
        pass.secondaryFields.push({
            key: "event",
            label: "EVENT",
            value: "FireHacks 2026"
        });

        // 5. Load assets
        const publicDir = path.join(process.cwd(), "public");
        
        try {
            // Using existing logos as fallback for required pass assets
            const logoPath = path.join(publicDir, "logo_new_cropped.png");
            if (fs.existsSync(logoPath)) {
                const logoBuffer = fs.readFileSync(logoPath);
                pass.addBuffer("icon.png", logoBuffer);
                pass.addBuffer("icon@2x.png", logoBuffer);
                pass.addBuffer("logo.png", logoBuffer);
                pass.addBuffer("logo@2x.png", logoBuffer);
            }
        } catch (e) {
            console.warn("Failed to load pass assets:", e);
        }

        // 6. Generate the .pkpass buffer
        const buffer = await pass.getAsBuffer();

        // 7. Return with proper Apple Wallet headers
        return new NextResponse(buffer as any, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.apple.pkpass",
                "Content-Disposition": `attachment; filename="firehacks-${participant.id}.pkpass"`,
            },
        });

    } catch (error: any) {
        console.error("Pass generation error detailed:", error);
        return NextResponse.json({ 
            error: "Failed to generate pass", 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
