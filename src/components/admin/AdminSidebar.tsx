"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Globe,
    ClipboardList,
    UserCheck,
    LogOut,
    Menu,
    X,
    ChevronRight,
    QrCode,
    Ticket,
    Users,
    Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

const MENU_ITEMS = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Scanner", href: "/admin/scanner", icon: QrCode },
    { name: "Fire Hacks Portal", href: "/admin/firehacks-portal", icon: Ticket },
    { name: "Fire Hacks Members", href: "/admin/firehacks-members", icon: Users },
    { name: "Website Requests", href: "/admin/requests", icon: Globe },
    { name: "Applications", href: "/admin/applications", icon: ClipboardList },
    { name: "Team", href: "/admin/team", icon: UserCheck },
    { name: "Volunteer Hours", href: "/admin/volunteer-hours", icon: Clock },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUserEmail(user?.email || null);
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-10 h-10 relative bg-brand-50 rounded-xl p-1.5">
                            <Image src="/codestarterslogomain.png" alt="CodeStarters" fill className="object-contain p-1" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 leading-none">CodeStarters</h2>
                            <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mt-1">Admin Panel</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        {MENU_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group
                                        ${isActive
                                            ? "bg-brand-500 text-white shadow-lg shadow-brand-100"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900 transition-colors"}`} />
                                        <span className="font-bold tracking-tight">{item.name}</span>
                                    </div>
                                    {isActive && <ChevronRight className="w-4 h-4" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto space-y-4 pt-6 border-t border-slate-100">
                        <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                            <p className="text-sm font-bold text-slate-700 truncate">{userEmail || "Admin"}</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all group"
                        >
                            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition-colors" />
                            <span className="font-bold tracking-tight">Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
                />
            )}
        </>
    );
}
