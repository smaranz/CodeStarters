"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

const SPONSORS = [
    {
        name: "Creao AI",
        href: "https://creao.ai",
        logoSrc: "/sponsors/creao.png",
        logoAlt: "Creao AI",
    },
];

export function SponsorsSection() {
    return (
        <section id="sponsors" className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200 text-slate-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
                >
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 text-violet-800 font-barlow font-semibold text-xs tracking-widest uppercase px-4 py-2 mb-5">
                            <Heart className="w-3.5 h-3.5" aria-hidden />
                            Sponsors
                        </span>
                        <h2 className="font-instrument italic text-4xl lg:text-5xl text-slate-900">
                            Supported by partners who believe in our mission
                        </h2>
                    </div>
                    <p className="text-slate-600 max-w-md text-base leading-relaxed font-barlow">
                        We&apos;re grateful to organizations that help us bring CS, AI, and real-world projects to students and local businesses.
                    </p>
                </motion.div>

                <ul className="flex flex-wrap gap-6">
                    {SPONSORS.map((sponsor) => (
                        <li key={sponsor.name}>
                            <Link
                                href={sponsor.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center h-24 px-10 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
                            >
                                <span className="sr-only">{sponsor.name}</span>
                                <Image
                                    src={sponsor.logoSrc}
                                    alt={sponsor.logoAlt}
                                    width={220}
                                    height={48}
                                    className="h-10 md:h-11 w-auto max-w-[200px] object-contain object-center opacity-90 group-hover:opacity-100 transition-opacity"
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
