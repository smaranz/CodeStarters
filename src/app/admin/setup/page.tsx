"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Loader2, Mail, UserPlus } from "lucide-react";
import Image from "next/image";

export default function AdminSetupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSetup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        // Security check - this page should be used cautiously
        if (secretKey !== "CsF0und3r_S3tup_2026_Zq7xK") {
            setMessage({ type: "error", text: "Invalid setup secret key." });
            setIsLoading(false);
            return;
        }

        try {
            // 1. Sign up the user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Add to admin_users table
                const { error: dbError } = await supabase
                    .from("admin_users")
                    .insert([{ id: authData.user.id, email: authData.user.email }]);

                if (dbError) throw dbError;

                setMessage({
                    type: "success",
                    text: `Founder account for ${email} created successfully! Please verify the email if required by Supabase settings.`
                });
            }
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border-8 border-slate-800">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 relative bg-brand-50 rounded-2xl flex items-center justify-center overflow-hidden p-1.5">
                        <Image src="/codestarterslogomain.png" alt="CodeStarters" fill className="object-contain" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Founder Setup</h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Initial Admin Provisioning</p>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8 italic text-sm text-amber-800">
                    "This page is for initially creating the founder accounts for Smaran, Amogh, and Arnav. Use the project initialization secret."
                </div>

                <form onSubmit={handleSetup} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Setup Secret Key</label>
                        <input
                            required
                            type="password"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-bold text-slate-900"
                            placeholder="Project Initializer Key"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Founder Email</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-bold text-slate-900"
                                placeholder="smaran@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">New Password</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-bold text-slate-900"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    {message && (
                        <div className={`p-5 rounded-2xl border text-sm font-bold ${message.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} size="lg" className="w-full h-16 text-xl rounded-2xl bg-slate-900 border-none hover:bg-black shadow-xl shadow-slate-200 flex gap-3">
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><UserPlus className="w-6 h-6" /> Create Admin Login</>}
                    </Button>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
                    <Button variant="secondary" onClick={() => window.location.href = '/admin/login'} className="text-xs uppercase font-black tracking-widest bg-transparent border-none text-slate-400 hover:text-brand-500">
                        Back to Login
                    </Button>
                </div>
            </div>
        </div>
    );
}
