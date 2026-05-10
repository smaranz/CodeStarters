"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Users, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Participant = {
    id: string;
    email: string;
    full_name: string;
    auth_user_id: string | null;
    waiver_uploaded_at: string | null;
};

export default function FireHacksPortalPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loadingParticipants, setLoadingParticipants] = useState(true);

    const fetchParticipants = useCallback(async () => {
        setLoadingParticipants(true);
        try {
            const res = await fetch("/api/admin/firehacks/provision-portal", { credentials: "include" });
            if (res.ok) setParticipants(await res.json());
        } finally {
            setLoadingParticipants(false);
        }
    }, []);

    useEffect(() => { fetchParticipants(); }, [fetchParticipants]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/admin/firehacks/provision-portal", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim().toLowerCase() }),
            });
            const data = await res.json();
            if (!res.ok) {
                setStatus("error");
                setMessage(data.error ?? "Something went wrong.");
            } else {
                setStatus("success");
                setMessage(`Portal credentials sent to ${data.email}.`);
                setEmail("");
                fetchParticipants();
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    const waiverCount = participants.filter((p) => p.waiver_uploaded_at).length;

    return (
        <div className="p-6 md:p-10 max-w-2xl space-y-10">
            {/* Provision form */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Fire Hacks Portal Access</h1>
                <p className="text-slate-500 mt-1 text-sm">
                    Provision or reset a participant&apos;s portal login. An email with credentials is sent immediately.
                    Submitting again resets the password.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Participant Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="participant@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 transition-all text-slate-900"
                            />
                        </div>
                    </div>

                    {status === "success" && (
                        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 text-sm">
                            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={status === "loading"}
                        size="lg"
                        className="w-full h-14 text-base shadow-lg shadow-brand-200"
                    >
                        {status === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Send Portal Credentials
                            </>
                        )}
                    </Button>
                </form>
            </div>

            {/* Participants list */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-slate-400" />
                    <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Provisioned Participants</h2>
                    {!loadingParticipants && (
                        <span className="ml-auto text-xs text-slate-400 font-medium">
                            {participants.length} sent &middot; {waiverCount} waiver{waiverCount !== 1 ? "s" : ""}
                        </span>
                    )}
                </div>

                {loadingParticipants ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                ) : participants.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-sm">No participants provisioned yet.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {participants.map((p) => (
                            <div key={p.id} className="flex items-center justify-between px-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{p.email}</p>
                                    {p.full_name && (
                                        <p className="text-xs text-slate-400 mt-0.5">{p.full_name}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {p.waiver_uploaded_at ? (
                                        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                                            <FileCheck className="w-3.5 h-3.5" />
                                            Waiver
                                        </span>
                                    ) : (
                                        <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                                            No waiver
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
