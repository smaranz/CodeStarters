"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
    Loader2,
    Search,
    Filter,
    Mail,
    GraduationCap,
    Clock,
    User,
    ExternalLink,
    Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function VolunteersPage() {
    const [volunteers, setVolunteers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [interestFilter, setInterestFilter] = useState("all");

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("volunteers")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setVolunteers(data || []);
        setIsLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from("volunteers")
            .update({ status: newStatus })
            .eq("id", id);

        if (!error) {
            setVolunteers(volunteers.map(v => v.id === id ? { ...v, status: newStatus } : v));
        }
    };

    const filteredVolunteers = volunteers.filter(vol => {
        const matchesSearch = vol.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vol.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesInterest = interestFilter === "all" || vol.interest === interestFilter;
        return matchesSearch && matchesInterest;
    });

    const roles = Array.from(new Set(volunteers.map(v => v.interest))).filter(Boolean);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Volunteer Applications</h1>
                    <p className="text-slate-500">Review and vet new student contributors.</p>
                </div>
                <Button onClick={fetchVolunteers} variant="secondary" className="bg-white border-slate-200">
                    Refresh
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                    />
                </div>
                <div className="relative min-w-[200px]">
                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={interestFilter}
                        onChange={(e) => setInterestFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all font-bold text-slate-700 appearance-none"
                    >
                        <option value="all">All Interests</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                    <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading applications...</p>
                </div>
            ) : filteredVolunteers.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-medium">No applications found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredVolunteers.map((vol) => (
                        <div key={vol.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex flex-col lg:flex-row gap-8">
                                <div className="flex-1 space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center shadow-inner">
                                                <User className="w-8 h-8 text-brand-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-900 mb-1">{vol.name}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500">
                                                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {vol.email}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-brand-600"><Sparkles className="w-3.5 h-3.5" /> {vol.interest}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <StatusBadge status={vol.status} />
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                <GraduationCap className="w-3.5 h-3.5" /> Education
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{vol.school || "Unspecified School"}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-1">{vol.grade_level || "Year not specified"}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                                <Clock className="w-3.5 h-3.5" /> Availability
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 truncate">{vol.availability || "Not provided"}</p>
                                        </div>
                                    </div>

                                    {vol.reason_for_joining && (
                                        <div className="p-5 bg-brand-50/30 rounded-2xl border border-brand-100">
                                            <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2 italic">Why join CodeStarters?</p>
                                            <p className="text-slate-700 text-sm leading-relaxed italic">"{vol.reason_for_joining}"</p>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:w-48 flex lg:flex-col justify-end gap-3 pt-6 border-t lg:border-t-0 lg:border-l lg:pl-8 border-slate-100">
                                    <p className="hidden lg:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Management</p>
                                    <select
                                        className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 flex-1 lg:flex-none appearance-none cursor-pointer text-center"
                                        value={vol.status}
                                        onChange={(e) => updateStatus(vol.id, e.target.value)}
                                    >
                                        <option value="pending">Set Pending</option>
                                        <option value="in_progress">Set In Progress</option>
                                        <option value="contacted">Set Contacted</option>
                                        <option value="completed">Set Approved</option>
                                        <option value="rejected">Set Rejected</option>
                                    </select>
                                    <Button variant="secondary" className="flex-1 lg:flex-none rounded-xl gap-2 h-10 text-xs shadow-sm bg-white">
                                        View Profile <ExternalLink className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
