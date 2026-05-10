import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
    Loader2,
    Search,
    Mail,
    GraduationCap,
    Clock,
    User,
    Sparkles,
    Phone,
    UserMinus,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Button } from "@/components/codestarters/Button";

type VolunteerApplication = {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    interest?: string | null;
    school?: string | null;
    grade_level?: string | null;
    availability?: string | null;
    reason_for_joining?: string | null;
    previous_experience?: string | null;
    social_links?: string | null;
    created_at: string;
};

export const Route = createFileRoute("/admin/team")({
    component: TeamPage,
});

function TeamPage() {
    const [members, setMembers] = useState<VolunteerApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const fetchMembers = async () => {
        setIsLoading(true);
        setFetchError(null);
        const res = await fetch("/api/admin/volunteers?scope=team");
        const data = await res.json().catch(() => null);
        if (!res.ok) {
            setMembers([]);
            setFetchError(typeof data?.error === "string" ? data.error : "Could not load team.");
        } else {
            setMembers(Array.isArray(data) ? (data as VolunteerApplication[]) : []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        void fetchMembers();
    }, []);

    const removeFromTeam = async (id: string) => {
        const res = await fetch("/api/admin/volunteers", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "rejected" }),
        });
        if (!res.ok) return;
        setMembers(members.filter((m) => m.id !== id));
    };

    const filteredMembers = members.filter((m) =>
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.interest?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Team</h1>
                    <p className="text-slate-500">
                        <span className="text-emerald-600 font-bold">{members.length}</span> approved volunteers on the CodeStarters team.
                    </p>
                </div>
                <Button onClick={fetchMembers} variant="secondary" className="bg-white border-slate-200">
                    Refresh
                </Button>
            </div>

            {fetchError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {fetchError}
                </div>
            )}

            {members.length > 3 && (
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                    />
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 border-dashed">
                    <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading team...</p>
                </div>
            ) : filteredMembers.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-medium">
                        {members.length === 0 ? "No approved volunteers yet. Approve applications to build your team." : "No results found."}
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredMembers.map((m) => {
                        const isExpanded = expandedId === m.id;
                        return (
                            <div key={m.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <User className="w-7 h-7 text-emerald-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-black text-slate-900 truncate">{m.name}</h3>
                                            {m.interest && (
                                                <span className="flex items-center gap-1 text-sm text-brand-600 font-bold">
                                                    <Sparkles className="w-3 h-3" /> {m.interest}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm text-slate-500 mb-4">
                                        <p className="flex items-center gap-2 truncate"><Mail className="w-3.5 h-3.5 shrink-0" /> {m.email}</p>
                                        {m.phone && <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" /> {m.phone}</p>}
                                        {m.school && (
                                            <p className="flex items-center gap-2">
                                                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                                {m.school}{m.grade_level && ` · ${m.grade_level}`}
                                            </p>
                                        )}
                                        {m.availability && (
                                            <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 shrink-0" /> {m.availability}</p>
                                        )}
                                    </div>

                                    {isExpanded && (
                                        <div className="space-y-3 mb-4">
                                            {m.reason_for_joining && (
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Why they joined</p>
                                                    <p className="text-slate-700 text-xs leading-relaxed">{m.reason_for_joining}</p>
                                                </div>
                                            )}
                                            {m.previous_experience && (
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                                                    <p className="text-slate-700 text-xs leading-relaxed">{m.previous_experience}</p>
                                                </div>
                                            )}
                                            {m.social_links && (
                                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Links</p>
                                                    <p className="text-slate-700 text-xs break-all">{m.social_links}</p>
                                                </div>
                                            )}
                                            <p className="text-xs text-slate-400">
                                                Joined {new Date(m.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                        <button onClick={() => removeFromTeam(m.id)} className="flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold transition-colors">
                                            <UserMinus className="w-3.5 h-3.5" /> Remove
                                        </button>
                                        <button onClick={() => setExpandedId(isExpanded ? null : m.id)} className="ml-auto flex items-center gap-1.5 px-3 py-2 text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest transition-colors">
                                            {isExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> More</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
