"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
    Users,
    Globe,
    Clock,
    TrendingUp,
    FileText,
    ArrowUpRight,
    Sparkles,
    X
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminOverview() {
    const [stats, setStats] = useState({
        requests: 0,
        volunteers: 0,
        pendingRequests: 0,
        pendingVolunteers: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { count: reqCount, error: reqErr },
                    { count: volCount, error: volErr },
                    { count: pendReqCount, error: pReqErr },
                    { count: pendVolCount, error: pVolErr }
                ] = await Promise.all([
                    supabase.from("website_requests").select("*", { count: "exact", head: true }),
                    supabase.from("volunteers").select("*", { count: "exact", head: true }),
                    supabase.from("website_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
                    supabase.from("volunteers").select("*", { count: "exact", head: true }).eq("status", "pending")
                ]);

                if (reqErr || volErr || pReqErr || pVolErr) {
                    throw new Error("Failed to fetch statistics. Please check your connection or permissions.");
                }

                setStats({
                    requests: reqCount || 0,
                    volunteers: volCount || 0,
                    pendingRequests: pendReqCount || 0,
                    pendingVolunteers: pendVolCount || 0
                });
            } catch (err: any) {
                console.error("Dashboard error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse text-center">
                    Initializing Dashboard...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-100 rounded-[2.5rem] p-12 text-center">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-6">
                    <X className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">{error}</p>
                <Button onClick={() => window.location.reload()} variant="primary">
                    Try Again
                </Button>
            </div>
        );
    }

    const statCards = [
        {
            label: "Website Requests",
            value: stats.requests,
            pending: stats.pendingRequests,
            icon: Globe,
            color: "brand",
            href: "/admin/requests"
        },
        {
            label: "Volunteer Apps",
            value: stats.volunteers,
            pending: stats.pendingVolunteers,
            icon: Users,
            color: "emerald",
            href: "/admin/volunteers"
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
                <p className="text-slate-500">Welcome back. Here's what's happening with CodeStarters today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="p-2 bg-slate-50 rounded-full group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-4">
                                    <h3 className="text-5xl font-black text-slate-900">{stat.value}</h3>
                                    {stat.pending > 0 && (
                                        <span className="text-amber-600 font-bold text-sm bg-amber-50 px-3 py-1 rounded-full border border-amber-100 italic">
                                            {stat.pending} Pending
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-brand-500" />
                            Quick Actions
                        </h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/admin/requests" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-brand-50 transition-colors border border-transparent hover:border-brand-100 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-brand-600">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">Review Requests</p>
                                <p className="text-xs text-slate-500">Respond to local businesses</p>
                            </div>
                        </Link>
                        <Link href="/admin/volunteers" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100 group">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:text-emerald-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">Vetting Volunteers</p>
                                <p className="text-xs text-slate-500">Expand the student team</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-brand-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-brand-100 relative overflow-hidden">
                    <Sparkles className="absolute top-[-20px] right-[-20px] w-40 h-40 text-brand-500/20 rotate-12" />
                    <h3 className="text-xl font-bold mb-4 relative z-10">Founder Tip</h3>
                    <p className="text-brand-50 font-medium leading-relaxed mb-6 relative z-10 italic">
                        "The goal isn't just to build websites, but to build a community of innovators."
                    </p>
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-full border-2 border-brand-400 p-0.5">
                            <div className="w-full h-full bg-brand-400 rounded-full" />
                        </div>
                        <p className="text-sm font-bold tracking-tight">CodeStarters Mission</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
