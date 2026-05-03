"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FireHacksPortalPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

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
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Fire Hacks Portal Access</h1>
                <p className="text-slate-500 mt-1 text-sm">
                    Provision or reset a participant&apos;s portal login. An email with credentials is sent immediately.
                    Submitting again resets the password.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
    );
}
