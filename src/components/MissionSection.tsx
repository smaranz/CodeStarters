"use client";

import { motion } from "framer-motion";

export function MissionSection() {
    return (
        <section id="mission" className="py-28 lg:py-36 relative overflow-hidden bg-white text-slate-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl"
                >
                    <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
                        <div className="w-12 h-[2px] bg-brand-500 mt-5 shrink-0 hidden sm:block opacity-50" />
                        <div>
                            <p className="text-brand-600 font-barlow font-medium text-sm tracking-widest uppercase mb-6">Our Mission</p>
                            <h2 className="font-instrument italic text-4xl sm:text-5xl lg:text-[4rem] text-slate-900 leading-[1.15] text-balance">
                                Make computer science and AI accessible to every young student — and help every small business in Cupertino build a strong online presence.
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
