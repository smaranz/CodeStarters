import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { CheckCircle2, Mail, QrCode, Search, X, type LucideIcon } from "lucide-react";
import { Button } from "@/components/codestarters/Button";

type SummerSignup = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    school?: string | null;
    grade_level?: string | null;
    interest?: string | null;
    status?: string | null;
    availability?: string | null;
    reason_for_joining?: string | null;
    created_at?: string | null;
};

export const Route = createFileRoute("/admin/summer-scanner")({
    component: SummerScannerPage,
});

function extractToken(raw: string): string {
    const value = raw.trim();
    try {
        const parsed = new URL(value);
        return parsed.searchParams.get("token")?.trim() ?? value;
    } catch {
        return value;
    }
}

function SummerScannerPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [tokenInput, setTokenInput] = useState("");
    const [lastToken, setLastToken] = useState("");
    const [signup, setSignup] = useState<SummerSignup | null>(null);
    const [checkedIn, setCheckedIn] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const lookupToken = async (rawToken: string, action: "lookup" | "check-in" = "lookup") => {
        const token = extractToken(rawToken);
        if (!token) {
            setError("Enter or scan a QR token first.");
            return;
        }
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const res = await fetch("/api/admin/summer-signups", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, action }),
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) throw new Error(data?.error || "Could not verify this QR code.");
            setSignup(data.signup);
            setCheckedIn(Boolean(data.checkedIn));
            setLastToken(token);
            setTokenInput(token);
            if (action === "check-in") setSuccessMessage(`${data.signup.name} is checked in.`);
        } catch (err: unknown) {
            setSignup(null);
            setCheckedIn(false);
            setError(err instanceof Error ? err.message : "Could not verify this QR code.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) void lookupToken(token);
    }, []);

    useEffect(() => {
        let controls: { stop: () => void } | null = null;
        if (isScanning && videoRef.current) {
            const codeReader = new BrowserMultiFormatReader();
            codeReader.decodeFromVideoDevice(undefined, videoRef.current, async (result, err) => {
                if (result) {
                    controls?.stop();
                    setIsScanning(false);
                    await lookupToken(result.getText());
                }
                if (err && err.name !== "NotFoundException") console.error(err);
            }).then((c) => {
                controls = c;
            }).catch((err) => {
                setError("Camera error: " + (err instanceof Error ? err.message : String(err)));
                setIsScanning(false);
            });
        }
        return () => controls?.stop();
    }, [isScanning]);

    const startScan = () => {
        setSignup(null);
        setError(null);
        setSuccessMessage(null);
        setIsScanning(true);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div>
                <h1 className="mb-2 text-4xl font-bold text-slate-900">Summer QR Scanner</h1>
                <p className="text-slate-500">Scan CodeStarters summer confirmation QR codes at entry.</p>
            </div>

            {error && <Alert tone="red" title="Error" message={error} Icon={X} />}
            {successMessage && <Alert tone="emerald" title="Success" message={successMessage} Icon={CheckCircle2} />}

            {!isScanning && (
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            value={tokenInput}
                            onChange={(e) => setTokenInput(e.target.value)}
                            placeholder="Paste QR token or URL"
                            className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 font-medium text-slate-900 outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                        <Button onClick={() => lookupToken(tokenInput)} disabled={isSubmitting} variant="outline" className="gap-2">
                            <Search className="h-4 w-4" /> Lookup
                        </Button>
                        <Button onClick={startScan} className="gap-2">
                            <QrCode className="h-4 w-4" /> Open Camera
                        </Button>
                    </div>
                </div>
            )}

            {isScanning && (
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
                    <div className="relative aspect-video bg-black">
                        <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="pointer-events-none absolute inset-0 border-[40px] border-black/40">
                            <div className="relative h-full w-full rounded-xl border-2 border-white/50" />
                        </div>
                    </div>
                    <div className="p-6 text-center">
                        <p className="mb-4 font-medium text-slate-500">Looking for QR code...</p>
                        <Button variant="outline" onClick={() => setIsScanning(false)}>Cancel Scanning</Button>
                    </div>
                </div>
            )}

            {signup && (
                <div className="animate-in fade-in slide-in-from-bottom-4 rounded-[2rem] border border-brand-100 bg-white p-8 shadow-xl shadow-brand-500/5 duration-500">
                    <div className="mb-8 flex flex-col gap-4 border-b border-slate-100 pb-8 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="mb-1 text-sm font-bold uppercase tracking-widest text-brand-500">Signup Found</p>
                            <h2 className="text-3xl font-black text-slate-900">{signup.name}</h2>
                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><Mail className="h-4 w-4" /> {signup.email}</p>
                        </div>
                        <span className={`rounded-full px-4 py-2 text-sm font-bold ${checkedIn ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                            {checkedIn ? "Checked in" : "Not checked in"}
                        </span>
                    </div>
                    <div className="mb-8 grid gap-4 sm:grid-cols-2">
                        <Info label="Class" value={signup.interest?.replace("Summer Program: ", "") || "—"} />
                        <Info label="Grade" value={signup.grade_level || "—"} />
                        <Info label="School" value={signup.school || "—"} />
                        <Info label="Phone" value={signup.phone || "—"} />
                        <Info label="Format" value={signup.availability || "1-week bootcamp — dates TBD"} />
                        <Info label="Submitted" value={signup.created_at ? new Date(signup.created_at).toLocaleString() : "—"} />
                    </div>
                    {signup.reason_for_joining && (
                        <div className="mb-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">Notes</p>
                            {signup.reason_for_joining}
                        </div>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button onClick={() => lookupToken(lastToken, "check-in")} disabled={isSubmitting || checkedIn} className="flex-1">
                            {checkedIn ? "Already Checked In" : "Mark Checked In"}
                        </Button>
                        <Button variant="outline" onClick={startScan} className="flex-1">Scan Different QR</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
            <p className="font-bold text-slate-900">{value}</p>
        </div>
    );
}

function Alert({ tone, title, message, Icon }: { tone: "red" | "emerald"; title: string; message: string; Icon: LucideIcon }) {
    const cls = tone === "red" ? "border-red-100 bg-red-50 text-red-600" : "border-emerald-100 bg-emerald-50 text-emerald-700";
    return (
        <div className={`flex items-start gap-3 rounded-xl border p-4 ${cls}`}>
            <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm">{message}</p>
            </div>
        </div>
    );
}