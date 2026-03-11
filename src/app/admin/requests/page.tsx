"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
    Loader2,
    Search,
    Filter,
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function WebsiteRequestsPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setIsLoading(true);
        let query = supabase
            .from("website_requests")
            .select("*")
            .order("created_at", { ascending: false });

        const { data, error } = await query;
        if (!error) setRequests(data || []);
        setIsLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from("website_requests")
            .update({ status: newStatus })
            .eq("id", id);

        if (!error) {
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        }
    };

    const filteredRequests = requests.filter(req => {
        const matchesSearch = req.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.owner_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2 font-display">Website Requests</h1>
                    <p className="text-slate-500">Manage intake requests from local businesses.</p>
                </div>
                <Button onClick={fetchRequests} variant="secondary" className="bg-white border-slate-200">
                    Refresh
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by business or owner..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                    />
                </div>
                <div className="relative min-w-[160px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all font-bold text-slate-700 appearance-none"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                    <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading requests...</p>
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-medium">No requests found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredRequests.map((req) => (
                        <div key={req.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row gap-8">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{req.business_name}</h3>
                                        <p className="text-slate-500 font-bold flex items-center gap-2">
                                            {req.owner_name} • {req.business_type}
                                        </p>
                                    </div>
                                    <StatusBadge status={req.status} />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-brand-600">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 truncate">{req.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-brand-600">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{req.phone || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description & Needs</p>
                                    <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">"{req.description}"</p>
                                    <div className="flex flex-wrap gap-2 uppercase text-[10px] font-black">
                                        {req.needs?.split(',').map((need: string) => (
                                            <span key={need} className="px-2 py-1 bg-white rounded flex items-center gap-1.5 border border-slate-200">
                                                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                                                {need.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-48 flex lg:flex-col justify-end gap-3 pt-4 border-t lg:border-t-0 lg:border-l lg:pl-8 border-slate-100">
                                <p className="hidden lg:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Action</p>
                                <select
                                    className="px-4 py-2 bg-brand-50 border border-brand-100 text-brand-700 text-sm font-bold rounded-xl outline-none focus:ring-2 focus:ring-brand-500 flex-1 lg:flex-none appearance-none cursor-pointer text-center"
                                    value={req.status}
                                    onChange={(e) => updateStatus(req.id, e.target.value)}
                                >
                                    <option value="pending">Set Pending</option>
                                    <option value="in_progress">Set In Progress</option>
                                    <option value="contacted">Set Contacted</option>
                                    <option value="completed">Set Completed</option>
                                    <option value="rejected">Set Rejected</option>
                                </select>
                                <Button variant="secondary" className="flex-1 lg:flex-none rounded-xl gap-2 h-10 text-xs">
                                    Email <ExternalLink className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
