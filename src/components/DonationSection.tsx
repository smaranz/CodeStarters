"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight, ShieldCheck, MousePointerClick } from "lucide-react";

const HCB_DONATE_URL = "https://hcb.hackclub.com/donations/start/codestarters";

export function DonationSection() {
    const [isActive, setIsActive] = useState(false);

    return (
        <section id="donate" className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-5"
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
                        <p className="text-slate-600 font-barlow text-base sm:text-lg leading-relaxed mb-6">
                            Donations fund workshops, hackathons, tooling, and keep our programs free for students and small businesses. Gifts are processed securely through{" "}
                            <span className="text-slate-800 font-medium">Hack Club Bank</span>, our 501(c)(3) fiscal sponsor — your contribution is tax-deductible.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-barlow mb-6">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden />
                            Secure checkout via Stripe · 100% goes to CodeStarters
                        </div>
                        <motion.a
                            href={HCB_DONATE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 rounded-full font-barlow font-medium h-11 px-6 text-sm bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                        >
                            Open in new tab
                            <ArrowUpRight className="w-4 h-4 opacity-80" aria-hidden />
                        </motion.a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7"
                    >
                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                                <div className="flex items-center gap-2 text-xs font-barlow text-slate-500">
                                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                                    hcb.hackclub.com/codestarters
                                </div>
                                <a
                                    href={HCB_DONATE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-barlow text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    Open <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
                                </a>
                            </div>
                            <div className="relative">
                                <iframe
                                    src={HCB_DONATE_URL}
                                    title="Donate to CodeStarters via Hack Club Bank"
                                    loading="lazy"
                                    className={`w-full h-[760px] bg-white transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-95 pointer-events-none"}`}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation"
                                    tabIndex={isActive ? 0 : -1}
                                    aria-hidden={!isActive}
                                />
                                {!isActive && (
                                    <button
                                        type="button"
                                        onClick={() => setIsActive(true)}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-white/40 via-white/10 to-white/60 backdrop-blur-[1px] group cursor-pointer focus:outline-none"
                                        aria-label="Activate donation form"
                                    >
                                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white font-barlow font-medium text-sm h-11 px-6 shadow-lg group-hover:bg-slate-800 transition-colors">
                                            <MousePointerClick className="w-4 h-4" aria-hidden />
                                            Click to fill in donation
                                        </span>
                                        <span className="text-xs text-slate-700 font-barlow bg-white/80 rounded-full px-3 py-1">
                                            Page scrolling stays smooth until you do
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
