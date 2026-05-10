"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Upload } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-400";

export default function VolunteerHoursPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const body = {
      volunteer_name: form.get("name") as string,
      volunteer_email: form.get("email") as string,
      activity_description: form.get("description") as string,
      hours: form.get("hours") as string,
      proof_url: form.get("proof_url") as string,
    };

    try {
      const res = await fetch("/api/volunteer-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Submission failed.");
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-28">
      <div className="mx-auto max-w-xl px-4">
        {isSubmitted ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm border border-slate-100">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">Submission received!</h2>
            <p className="text-slate-500">
              We'll review your hours and email your official certificate to you shortly.
              It will include our EIN (81-2908499) so your school or program can verify it.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100 md:p-10">
            <h1 className="mb-1 text-3xl font-bold text-slate-900">Log Volunteer Hours</h1>
            <p className="mb-8 text-slate-500">
              Submit your hours and we'll send a PDF certificate to your email — includes our EIN so you can show your school.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                  <input required name="name" type="text" className={inputCls} placeholder="Alex Chen" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email *</label>
                  <input required name="email" type="email" className={inputCls} placeholder="alex@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">What did you do? *</label>
                <textarea
                  required
                  name="description"
                  rows={3}
                  className={inputCls}
                  placeholder="e.g. Taught Python basics to 6th graders at Lawson Middle School on May 5, 2026"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Number of Hours *</label>
                <input
                  required
                  name="hours"
                  type="number"
                  min="0.5"
                  max="200"
                  step="0.5"
                  className={inputCls}
                  placeholder="2.5"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  <span className="inline-flex items-center gap-1.5">
                    <Upload className="h-3.5 w-3.5" />
                    Proof Link (optional)
                  </span>
                </label>
                <input
                  name="proof_url"
                  type="url"
                  className={inputCls}
                  placeholder="Google Drive, Dropbox, or photo link showing your work"
                />
                <p className="text-xs text-slate-400">
                  Upload a screenshot or photo to your Google Drive and paste the shareable link.
                </p>
              </div>

              {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 py-3.5 font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit for Verification"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
