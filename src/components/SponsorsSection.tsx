"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";

const SPONSORS = [
    {
        name: "CodeCrafters",
        href: "https://codecrafters.io",
        logoSrc: "/sponsors/codecrafters.svg",
        logoAlt: "CodeCrafters",
    },
    {
        name: "Gen.xyz",
        href: "https://gen.xyz",
        logoSrc: "/sponsors/genxyz.png",
        logoAlt: "Gen.xyz",
    },
    {
        name: "Relay",
        href: "https://relay.app",
        logoSrc: "/sponsors/relay.webp",
        logoAlt: "Relay",
    },
    {
        name: "Medo",
        href: "https://medo.com",
        logoSrc: "/sponsors/medo.png",
        logoAlt: "Medo",
        logoClassName: "h-24 sm:h-28 md:h-32 lg:h-36",
        logoWidth: 7743,
        logoHeight: 1589,
    },
    {
        name: "Featherless AI",
        href: "https://featherless.ai",
        logoSrc: "/sponsors/featherless.png",
        logoAlt: "Featherless AI",
        logoClassName: "h-24 sm:h-28 md:h-32 lg:h-36",
        logoWidth: 1280,
        logoHeight: 1280,
    },
    {
        name: "n8n",
        href: "https://n8n.io",
        logoSrc: "/sponsors/n8n.png",
        logoAlt: "n8n",
        logoClassName: "h-20 sm:h-24 md:h-28 lg:h-32",
        logoWidth: 800,
        logoHeight: 320,
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
                    {SPONSORS.map((sponsor) => {
                        const host = new URL(sponsor.href).hostname.replace(/^www\./, "");
                        const imgClass = `${sponsor.logoClassName ?? "h-16 sm:h-20 md:h-24 lg:h-[5.5rem]"} w-auto max-w-[min(100%,320px)] object-contain object-center opacity-95 group-hover:opacity-100 transition-opacity`;
                        return (
                        <li key={sponsor.name}>
                            <Link
                                href={sponsor.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${sponsor.name} — visit website (opens in new tab)`}
                                className="group flex flex-col items-center justify-center gap-3 min-h-[9.5rem] min-w-[16rem] sm:min-w-[18rem] px-10 py-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                            >
                                {sponsor.logoSrc.endsWith(".svg") ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={sponsor.logoSrc}
                                        alt=""
                                        className={imgClass}
                                    />
                                ) : (
                                <Image
                                    src={sponsor.logoSrc}
                                    alt=""
                                    width={sponsor.logoWidth ?? 256}
                                    height={sponsor.logoHeight ?? 256}
                                    className={imgClass}
                                />
                                )}
                                <span className="inline-flex items-center gap-1.5 text-sm font-barlow font-semibold text-slate-400 group-hover:text-violet-600 transition-colors">
                                    Visit {host}
                                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                                </span>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
