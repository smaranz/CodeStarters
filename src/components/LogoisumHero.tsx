"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function LogoisumHero() {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white text-slate-900 pt-28 pb-20 md:pt-36 md:pb-28">
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <p className="mb-6 font-barlow text-sm font-medium tracking-widest text-brand-600 uppercase">
                        CodeStarters
                    </p>
                    <h1 className="mb-6 flex flex-col items-center">
                        <span className="font-barlow text-[40px] font-medium leading-[1.1] tracking-tight text-slate-900 md:text-[52px]">
                            Teaching This
                        </span>
                        <span className="font-instrument text-[56px] leading-none font-normal text-slate-900 italic md:text-[72px]">
                            Generation AI and CS
                        </span>
                    </h1>

                    <p className="mb-10 max-w-xl font-barlow text-lg font-medium text-slate-600">
                        Student-led initiative teaching CS and AI to younger students while helping small
                        businesses grow.
                    </p>

                    <Link
                        href="#programs"
                        className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-barlow text-base font-medium text-white shadow-lg transition hover:bg-brand-500 hover:shadow-xl"
                    >
                        See Our Programs
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
