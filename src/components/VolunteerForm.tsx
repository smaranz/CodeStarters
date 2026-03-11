"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";
import { supabase } from "@/lib/supabase";

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
    "Vibe Coding"
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
    "Other"
];

const inputStyles = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400";

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
            bio: formData.get("bio") as string,
        };

        try {
            const { error: submitError } = await supabase
                .from("volunteers")
                .insert([data]);

            if (submitError) throw submitError;

            setIsSubmitted(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to submit application. Please try again.";
            console.error("Submission error:", err);
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 transition-colors z-20"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="flex-1 overflow-y-auto p-8 md:p-10">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <CheckCircle2 className="w-8 h-8 text-brand-500" />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">Application received!</h3>
                                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                        We&apos;ll review your application and reach out via email shortly.
                                    </p>
                                    <Button onClick={onClose} size="md">Close</Button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h3 className="font-display text-3xl font-bold text-slate-900 mb-2">Volunteer Application</h3>
                                        <p className="text-slate-500">Tell us about yourself and how you&apos;d like to contribute.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name *</label>
                                                <input required name="name" id="name" type="text" className={inputStyles} placeholder="Alex Chen" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</label>
                                                <input required name="email" id="email" type="email" className={inputStyles} placeholder="alex@example.com" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone</label>
                                                <input name="phone" id="phone" type="tel" className={inputStyles} placeholder="(555) 000-0000" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="school" className="text-sm font-medium text-slate-700">School *</label>
                                                <input required name="school" id="school" type="text" className={inputStyles} placeholder="Cupertino High School" />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label htmlFor="grade" className="text-sm font-medium text-slate-700">Grade *</label>
                                                <select required name="grade" id="grade" className={inputStyles}>
                                                    <option value="">Select</option>
                                                    {GRADES.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label htmlFor="interest" className="text-sm font-medium text-slate-700">Area of Interest *</label>
                                                <select required name="interest" id="interest" className={inputStyles}>
                                                    <option value="">Select a role</option>
                                                    {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="availability" className="text-sm font-medium text-slate-700">Availability *</label>
                                            <textarea required name="availability" id="availability" rows={2} className={inputStyles} placeholder="2-5 hours/week, weekends, etc." />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="socialLinks" className="text-sm font-medium text-slate-700">Portfolio / GitHub / LinkedIn</label>
                                            <input name="socialLinks" id="socialLinks" type="text" className={inputStyles} placeholder="Links to your work" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="reason" className="text-sm font-medium text-slate-700">Why join CodeStarters? *</label>
                                            <textarea required name="reason" id="reason" rows={3} className={inputStyles} placeholder="Your motivation and goals..." />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label htmlFor="experience" className="text-sm font-medium text-slate-700">Previous Experience</label>
                                            <textarea name="experience" id="experience" rows={2} className={inputStyles} placeholder="Any relevant experience..." />
                                        </div>

                                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                                        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                                        </Button>
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
