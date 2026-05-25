import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/browser";

interface SummerSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUMMER_BOOTCAMPS = ["Advanced CS", "Basic CS", "AI Development", "Python"];

const GRADES = [
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "Other",
];

const inputCls =
  "w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-muted-foreground focus:border-white/30 focus:ring-2 focus:ring-white/20";

export function SummerSignupForm({ isOpen, onClose }: SummerSignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const bootcamp = formData.get("bootcamp") as string;
    const notes = (formData.get("notes") as string) || "Summer program signup";

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      school: formData.get("school") as string,
      grade_level: formData.get("grade") as string,
      interest: `Summer Program: ${bootcamp}`,
      availability: "1-week bootcamp — dates TBD",
      social_links: "",
      reason_for_joining: notes,
      previous_experience: `Summer program signup. Track: ${bootcamp}. Format: 1-week bootcamp. Dates: TBD.`,
    };

    try {
      const { error: submitError } = await supabase.from("volunteers").insert([data]);
      if (submitError) throw submitError;
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit signup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <button onClick={onClose} className="absolute right-5 top-5 z-20 rounded-full p-2 transition-colors hover:bg-white/10" aria-label="Close signup form">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex-1 overflow-y-auto p-8 md:p-10">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white">Signup received!</h3>
                  <p className="mx-auto mb-8 max-w-sm text-muted-foreground">
                    We&apos;ll email you once dates and final schedules are confirmed.
                  </p>
                  <button onClick={onClose} className="rounded-full bg-foreground px-8 py-3 font-medium text-background">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground">Summer 2026</p>
                    <h3 className="mb-2 text-3xl font-bold text-white">Summer bootcamp signup</h3>
                    <p className="text-muted-foreground">Choose a 1-week class. Dates are TBD.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <input required name="name" className={inputCls} placeholder="Student full name *" />
                      <input required name="email" type="email" className={inputCls} placeholder="Parent/student email *" />
                      <input name="phone" type="tel" className={inputCls} placeholder="Phone" />
                      <input required name="school" className={inputCls} placeholder="School *" />
                      <select required name="grade" className={inputCls} defaultValue="">
                        <option value="">Select grade *</option>
                        {GRADES.map((grade) => <option key={grade}>{grade}</option>)}
                      </select>
                      <select required name="bootcamp" className={inputCls} defaultValue="">
                        <option value="">Select bootcamp *</option>
                        {SUMMER_BOOTCAMPS.map((bootcamp) => <option key={bootcamp}>{bootcamp}</option>)}
                      </select>
                    </div>
                    <textarea name="notes" rows={3} className={inputCls} placeholder="Anything we should know? Prior experience, schedule constraints, etc." />
                    <label className="flex items-start gap-3 text-sm text-muted-foreground">
                      <input required type="checkbox" className="mt-1 h-4 w-4 accent-white" />
                      I understand these are 1-week bootcamps and dates are still TBD.
                    </label>
                    {error && <p className="text-sm font-medium text-red-400">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 font-medium text-background disabled:opacity-50">
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit Summer Signup"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}