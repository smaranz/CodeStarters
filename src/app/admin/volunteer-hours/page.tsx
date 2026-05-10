"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, XCircle, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

type HoursRequest = {
  id: string;
  volunteer_name: string;
  volunteer_email: string;
  activity_description: string;
  hours: number;
  proof_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function VolunteerHoursAdminPage() {
  const [rows, setRows] = useState<HoursRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/volunteer-hours");
    const data = await res.json().catch(() => []);
    setRows(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const act = async (id: string, action: "approve" | "reject") => {
    setActing(id + action);
    const res = await fetch(`/api/admin/volunteer-hours/${id}/${action}`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      showToast(
        action === "approve"
          ? data.emailWarning ?? "Approved — certificate sent!"
          : "Submission rejected.",
        !data.emailWarning,
      );
      load();
    } else {
      showToast(data.error ?? "Action failed.", false);
    }
    setActing(null);
  };

  const pending = rows.filter((r) => r.status === "pending");
  const done = rows.filter((r) => r.status !== "pending");

  return (
    <div>
      {toast && (
        <div className={`fixed top-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-bold shadow-xl ${toast.ok ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>
          {toast.msg}
        </div>
      )}

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Volunteer Hours</h1>
          <p className="mt-1 text-sm text-slate-500">
            Approve requests to auto-send a PDF certificate with EIN 81-2908499.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-20 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading…</span>
        </div>
      )}

      {!loading && rows.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center text-sm text-slate-400">
          No volunteer hour submissions yet.
        </div>
      )}

      {!loading && pending.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Pending ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map((r) => (
              <RequestCard key={r.id} r={r} acting={acting} onAct={act} />
            ))}
          </div>
        </section>
      )}

      {!loading && done.length > 0 && (
        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Reviewed ({done.length})
          </h2>
          <div className="space-y-3">
            {done.map((r) => (
              <RequestCard key={r.id} r={r} acting={acting} onAct={act} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RequestCard({
  r,
  acting,
  onAct,
}: {
  r: HoursRequest;
  acting: string | null;
  onAct: (id: string, action: "approve" | "reject") => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-bold text-slate-900">{r.volunteer_name}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_COLOR[r.status]}`}>
              {r.status}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {r.hours}h
            </span>
          </div>
          <a
            href={`mailto:${r.volunteer_email}`}
            className="mt-1 text-sm text-brand-600 hover:underline"
          >
            {r.volunteer_email}
          </a>
          <p className="mt-3 text-sm text-slate-600">{r.activity_description}</p>
          {r.proof_url && (
            <a
              href={r.proof_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
            >
              <ExternalLink className="h-3 w-3" />
              View proof
            </a>
          )}
          <p className="mt-2 text-xs text-slate-400">
            Submitted {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {r.status === "pending" && (
          <div className="flex shrink-0 gap-2">
            <Button
              size="sm"
              onClick={() => onAct(r.id, "approve")}
              disabled={!!acting}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {acting === r.id + "approve" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><CheckCircle2 className="mr-1.5 h-4 w-4" />Approve & Send</>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAct(r.id, "reject")}
              disabled={!!acting}
              className="text-red-600 hover:bg-red-50 hover:border-red-200"
            >
              {acting === r.id + "reject" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <><XCircle className="mr-1.5 h-4 w-4" />Reject</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
