"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Member = { id: string; email: string; created_at: string };

export default function FireHacksMembersPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [members, setMembers] = useState<Member[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [removingId, setRemovingId] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        setLoadingMembers(true);
        try {
            const res = await fetch("/api/admin/firehacks/provision-member", { credentials: "include" });
            if (res.ok) setMembers(await res.json());
        } finally {
            setLoadingMembers(false);
        }
    }, []);

    useEffect(() => { fetchMembers(); }, [fetchMembers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setMessage("");
        try {
            const res = await fetch("/api/admin/firehacks/provision-member", {
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
                setMessage(`Credentials sent to ${data.email}.`);
                setEmail("");
                fetchMembers();
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    const handleRemove = async (member: Member) => {
        if (!confirm(`Remove scanner access for ${member.email}?`)) return;
        setRemovingId(member.id);
        try {
            const res = await fetch("/api/admin/firehacks/provision-member", {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId: member.id }),
            });
            if (res.ok) setMembers((prev) => prev.filter((m) => m.id !== member.id));
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-2xl space-y-10">
            {/* Add member */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Fire Hacks Staff Access</h1>
                <p className="text-slate-500 mt-1 text-sm">
                    Create scanner login credentials for staff members. An email with the password is sent immediately.
                    Submitting again resets the password.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Staff Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="staff@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-brand-500 transition-all text-slate-900"
                            />
                        </div>
                    </div>

                    {status === "success" && (
                        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 text-sm">
                            <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            {message}
                        </div>
                    )}
                    {status === "error" && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                            {message}
                        </div>
                    )}

                    <Button type="submit" disabled={status === "loading"} size="lg" className="w-full h-14 text-base shadow-lg shadow-brand-200">
                        {status === "loading" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <><Send className="w-4 h-4 mr-2" />Send Scanner Credentials</>
                        )}
                    </Button>
                </form>
            </div>

            {/* Members list */}
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-slate-400" />
                    <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Current Members</h2>
                    {!loadingMembers && (
                        <span className="ml-auto text-xs text-slate-400 font-medium">{members.length} account{members.length !== 1 ? "s" : ""}</span>
                    )}
                </div>

                {loadingMembers ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                ) : members.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-slate-400 text-sm">No staff members yet.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between px-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{member.email}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        Added {new Date(member.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemove(member)}
                                    disabled={removingId === member.id}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-40"
                                >
                                    {removingId === member.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
