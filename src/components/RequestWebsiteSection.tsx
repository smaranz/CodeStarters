"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const inputStyles = "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400";

export function RequestWebsiteSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            business_name: formData.get("businessName") as string,
            owner_name: formData.get("ownerName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            business_type: formData.get("businessType") as string,
            description: formData.get("description") as string,
            needs: formData.get("needs") as string,
            cupertino_consent: formData.get("cupertinoConsent") === "on",
        };

        try {
            const { error: submitError } = await supabase
                .from("website_requests")
                .insert([data]);

            if (submitError) throw submitError;

            setIsSubmitted(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to send request. Please try again.";
            console.error("Submission error:", err);
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="request-website" className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-3xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <p className="text-accent-500 font-barlow font-medium text-sm tracking-widest uppercase mb-4">Exclusively for Cupertino</p>
                    <h3 className="font-instrument italic text-5xl lg:text-6xl text-slate-900 mb-5">Need a website?</h3>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                        We build free professional websites for local Cupertino businesses. Fill out the form to get started.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm"
                >
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center py-12"
                        >
                            <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-8 h-8 text-brand-600" />
                            </div>
                            <h4 className="font-barlow text-2xl font-bold text-slate-900 mb-3">Request sent!</h4>
                            <p className="text-slate-600 max-w-sm mx-auto mb-8">
                                Our team will review your request and get back to you within 48 hours.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline" size="sm" className="text-slate-700 border-slate-200 hover:bg-slate-50">
                                Submit Another
                            </Button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="businessName" className="text-sm font-medium text-slate-700">Business Name *</label>
                                    <input required name="businessName" type="text" id="businessName" className={inputStyles} placeholder="Acme Corp" />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="ownerName" className="text-sm font-medium text-slate-700">Owner Name *</label>
                                    <input required name="ownerName" type="text" id="ownerName" className={inputStyles} placeholder="Jane Doe" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5 mb-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700">Email *</label>
                                    <input required name="email" type="email" id="email" className={inputStyles} placeholder="jane@acme.com" />
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone</label>
                                    <input name="phone" type="tel" id="phone" className={inputStyles} placeholder="(555) 123-4567" />
                                </div>
                            </div>

                            <div className="space-y-1.5 mb-5">
                                <label htmlFor="businessType" className="text-sm font-medium text-slate-700">Type of Business *</label>
                                <select required name="businessType" id="businessType" className={inputStyles + " [&>option]:bg-white [&>option]:text-slate-900"}>
                                    <option value="">Select a category</option>
                                    <option value="restaurant">Restaurant / Cafe</option>
                                    <option value="retail">Retail / Shop</option>
                                    <option value="service">Service Provider</option>
                                    <option value="nonprofit">Nonprofit</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 mb-5">
                                <label htmlFor="description" className="text-sm font-medium text-slate-700">About your business</label>
                                <textarea name="description" id="description" rows={3} className={inputStyles} placeholder="Tell us what your business does..." />
                            </div>

                            <div className="space-y-1.5 mb-6">
                                <label htmlFor="needs" className="text-sm font-medium text-slate-700">What do you need?</label>
                                <textarea name="needs" id="needs" rows={3} className={inputStyles} placeholder="Portfolio, landing page, booking system..." />
                            </div>

                            <div className="flex items-start gap-3 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <input required name="cupertinoConsent" type="checkbox" id="cupertinoConsent" className="mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 accent-brand-600 bg-white" />
                                <label htmlFor="cupertinoConsent" className="text-sm text-slate-600 leading-snug">
                                    I confirm my business is located in <span className="font-semibold text-slate-900">Cupertino, CA</span>. *
                                </label>
                            </div>

                            {error && <p className="text-red-500 text-sm font-medium mb-5">{error}</p>}

                            <Button type="submit" size="lg" className="w-full bg-brand-600 text-white hover:bg-brand-700" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </span>
                                ) : "Request a Free Website"}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
