import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/browser";

interface VolunteerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = [
  "Web Developer",
  "UI/UX Designer",
  "CS & AI Instructor",
  "Outreach & Partnerships",
  "Marketing & Social Media",
  "Social Media Manager",
  "Vibe Coding",
];

const GRADES = [
  "9th Grade (Freshman)",
  "10th Grade (Sophomore)",
  "11th Grade (Junior)",
  "12th Grade (Senior)",
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
  "Other",
];

const inputCls =
  "w-full bg-input border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all text-white placeholder:text-muted-foreground text-sm";

export function VolunteerForm({ isOpen, onClose }: VolunteerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      school: formData.get("school") as string,
      grade_level: formData.get("grade") as string,
      interest: formData.get("interest") as string,
      availability: formData.get("availability") as string,
      social_links: formData.get("socialLinks") as string,
      reason_for_joining: formData.get("reason") as string,
      previous_experience: formData.get("experience") as string,
    };

    try {
      const { error: submitError } = await supabase.from("volunteers").insert([data]);
      if (submitError) throw submitError;
      setIsSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
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
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="flex-1 overflow-y-auto p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Application received!</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    We'll review your application and reach out via email shortly.
                  </p>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-foreground px-8 py-3 font-medium text-background"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2">Volunteer Application</h3>
                    <p className="text-muted-foreground">
                      Tell us about yourself and how you'd like to contribute.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="v-name" className="text-sm font-medium text-white/80">
                          Full Name *
                        </label>
                        <input
                          required
                          name="name"
                          id="v-name"
                          type="text"
                          className={inputCls}
                          placeholder="Alex Chen"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="v-email" className="text-sm font-medium text-white/80">
                          Email *
                        </label>
                        <input
                          required
                          name="email"
                          id="v-email"
                          type="email"
                          className={inputCls}
                          placeholder="alex@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="v-phone" className="text-sm font-medium text-white/80">
                          Phone
                        </label>
                        <input
                          name="phone"
                          id="v-phone"
                          type="tel"
                          className={inputCls}
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="v-school" className="text-sm font-medium text-white/80">
                          School *
                        </label>
                        <input
                          required
                          name="school"
                          id="v-school"
                          type="text"
                          className={inputCls}
                          placeholder="Cupertino High School"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label htmlFor="v-grade" className="text-sm font-medium text-white/80">
                          Grade *
                        </label>
                        <select required name="grade" id="v-grade" className={inputCls}>
                          <option value="">Select</option>
                          {GRADES.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="v-interest" className="text-sm font-medium text-white/80">
                          Area of Interest *
                        </label>
                        <select required name="interest" id="v-interest" className={inputCls}>
                          <option value="">Select a role</option>
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="v-avail" className="text-sm font-medium text-white/80">
                        Availability *
                      </label>
                      <textarea
                        required
                        name="availability"
                        id="v-avail"
                        rows={2}
                        className={inputCls}
                        placeholder="2–5 hours/week, weekends, etc."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="v-links" className="text-sm font-medium text-white/80">
                        Portfolio / GitHub / LinkedIn
                      </label>
                      <input
                        name="socialLinks"
                        id="v-links"
                        type="text"
                        className={inputCls}
                        placeholder="Links to your work"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="v-reason" className="text-sm font-medium text-white/80">
                        Why join CodeStarters? *
                      </label>
                      <textarea
                        required
                        name="reason"
                        id="v-reason"
                        rows={3}
                        className={inputCls}
                        placeholder="Your motivation and goals..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="v-exp" className="text-sm font-medium text-white/80">
                        Previous Experience
                      </label>
                      <textarea
                        name="experience"
                        id="v-exp"
                        rows={2}
                        className={inputCls}
                        placeholder="Any relevant experience..."
                      />
                    </div>

                    {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-foreground px-8 py-3.5 font-medium text-background disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Submit Application"
                      )}
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
