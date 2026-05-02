"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Calendar, Flame, MapPin } from "lucide-react";

const FIRE_HACKS_HREF = "/firehacks";

export function EventsSection() {
    return (
        <section id="events" className="py-20 lg:py-24 bg-white border-t border-slate-100 text-slate-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                        className="lg:col-span-7"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 border border-red-100 font-barlow font-semibold text-xs tracking-widest uppercase px-4 py-2 mb-5">
                            <Flame className="w-3.5 h-3.5" aria-hidden />
                            Flagship event
                        </span>
                        <h2 className="font-instrument italic text-4xl sm:text-5xl lg:text-[3.25rem] text-slate-900 text-balance leading-[1.12] mb-5">
                            Fire Hacks — our Bay Area high school hackathon
                        </h2>
                        <p className="text-slate-600 font-barlow text-lg leading-relaxed max-w-xl mb-8">
                            One day of building, workshops, and mentorship for hundreds of student hackers.
                            Hosted by CodeStarters — free to attend, sponsored by teams who believe in the next
                            generation of builders.
                        </p>
                        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-8 sm:gap-y-3 font-barlow text-slate-700 text-sm mb-10">
                            <li className="inline-flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600 shrink-0" aria-hidden />
                                <span>June 6, 2026</span>
                            </li>
                            <li className="inline-flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-600 shrink-0" aria-hidden />
                                <span>Bay Area</span>
                            </li>
                        </ul>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={FIRE_HACKS_HREF}
                                className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white font-barlow font-semibold text-sm px-7 py-3.5 shadow-md hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            >
                                Visit Fire Hacks site
                                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden />
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                        className="lg:col-span-5"
                    >
                        <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 lg:p-10 shadow-sm overflow-hidden">
                            <div
                                className="absolute top-0 right-0 w-40 h-40 rounded-full bg-red-500/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
                                aria-hidden
                            />
                            <p className="font-barlow font-medium text-xs uppercase tracking-widest text-slate-500 mb-3">
                                Why it matters
                            </p>
                            <ul className="space-y-4 font-barlow text-slate-600 leading-relaxed">
                                <li className="flex gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />
                                    <span>Hands-on software tracks: web, AI/ML, mobile, security, and games.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />
                                    <span>Industry and university mentors on site all day.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" aria-hidden />
                                    <span>Prizes, meals, and logistics covered — students just bring a laptop and ideas.</span>
                                </li>
                            </ul>
                            <Link
                                href={FIRE_HACKS_HREF}
                                className="mt-8 inline-flex text-sm font-barlow font-semibold text-red-700 hover:text-red-800 underline-offset-4 hover:underline"
                            >
                                Details, registration, and sponsorship →
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
