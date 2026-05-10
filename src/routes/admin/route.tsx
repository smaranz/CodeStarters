import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/codestarters/AdminSidebar";
import { getSupabase } from "@/lib/supabase/browser";

export const Route = createFileRoute("/admin")({
    beforeLoad: async ({ location }) => {
        if (location.pathname === "/admin/login" || location.pathname === "/admin/setup") {
            return;
        }
        if (typeof window === "undefined") return;
        const supabase = getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            throw redirect({ to: "/admin/login" });
        }
        const { data: adminRow } = await supabase
            .from("admin_users")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();
        if (!adminRow) {
            await supabase.auth.signOut();
            throw redirect({ to: "/admin/login" });
        }
    },
    component: AdminLayout,
});

function AdminLayout() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/admin/login" || location.pathname === "/admin/setup";

    if (isAuthPage) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Outlet />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />
            <main className="flex-1 lg:ml-72 min-h-screen">
                <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
