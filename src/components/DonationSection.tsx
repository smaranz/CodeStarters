"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";

const HCB_DONATE_URL = "https://hcb.hackclub.com/donations/start/codestarters";

export function DonationSection() {
    return (
        <section id="donate" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 mb-6">
                        <Heart className="w-7 h-7" strokeWidth={1.75} aria-hidden />
                    </div>
                    <p className="text-brand-600 font-barlow font-medium text-sm tracking-widest uppercase mb-4">
                        Support CodeStarters
                    </p>
                    <h2 className="font-instrument italic text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.15] text-balance mb-5">
                        Help us teach CS &amp; AI and build free websites for local businesses
                    </h2>
                    <p className="text-slate-600 font-barlow text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                        Donations fund workshops, hackathons, tooling, and help us keep programs free for students and small businesses. Gifts are processed securely through{" "}
                        <span className="text-slate-800 font-medium">Hack Club Bank</span>.
                    </p>
                    <motion.a
                        href={HCB_DONATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 rounded-full font-barlow font-medium h-12 px-8 text-base bg-brand-900 text-white hover:bg-brand-800 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                    >
                        Donate now
                        <ArrowUpRight className="w-4 h-4 opacity-90" aria-hidden />
                    </motion.a>
                    <p className="mt-6 text-xs text-slate-400 font-barlow">
                        Opens our secure fiscal sponsor page in a new tab.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
