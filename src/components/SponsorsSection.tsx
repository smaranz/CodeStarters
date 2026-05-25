"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";

type Sponsor = {
    name: string;
    href: string;
    logoSrc?: string;
    logoAlt?: string;
    logoWidth?: number;
    logoHeight?: number;
    textMark?: string;
};

const SPONSORS: Sponsor[] = [
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
        logoWidth: 256,
        logoHeight: 256,
    },
    {
        name: "Relay",
        href: "https://relay.app",
        logoSrc: "/sponsors/relay.webp",
        logoAlt: "Relay",
        logoWidth: 256,
        logoHeight: 256,
    },
    {
        name: "Medo",
        href: "https://medo.com",
        logoSrc: "/sponsors/medo.png",
        logoAlt: "Medo",
        logoWidth: 7743,
        logoHeight: 1589,
    },
    {
        name: "Featherless AI",
        href: "https://featherless.ai",
        logoSrc: "/sponsors/featherless.png",
        logoAlt: "Featherless AI",
        logoWidth: 1280,
        logoHeight: 1280,
    },
    {
        name: "TrueFoundry",
        href: "https://www.truefoundry.com",
        textMark: "TrueFoundry",
    },
    {
        name: "n8n",
        href: "https://n8n.io",
        logoSrc: "/sponsors/n8n.png",
        logoAlt: "n8n",
        logoWidth: 800,
        logoHeight: 320,
    },
    {
        name: "Publick",
        href: "https://publick.xyz",
        logoSrc: "/sponsors/publick.png",
        logoAlt: "Publick",
        logoWidth: 1254,
        logoHeight: 1254,
    },
    {
        name: "Guild.ai",
        href: "https://www.guild.ai/",
        logoSrc: "/sponsors/guild-ai.jpeg",
        logoAlt: "Guild.ai",
        logoWidth: 200,
        logoHeight: 200,
    },
    {
        name: "Zo Computer",
        href: "https://zo.computer/",
        logoSrc: "/sponsors/zo-computer.svg",
        logoAlt: "Zo Computer",
        logoWidth: 1280,
        logoHeight: 720,
    },
];

const logoImgClass =
    "max-h-16 sm:max-h-20 w-auto max-w-[min(100%,12rem)] object-contain object-center opacity-90 transition-opacity group-hover:opacity-100";

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

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 list-none p-0 m-0">
                    {SPONSORS.map((sponsor) => {
                        const host = new URL(sponsor.href).hostname.replace(/^www\./, "");
                        return (
                            <li key={sponsor.name} className="min-w-0 h-full">
                                <Link
                                    href={sponsor.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${sponsor.name} — visit website (opens in new tab)`}
                                    className="group flex h-full min-h-[13.5rem] flex-col items-stretch justify-between gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm transition-all hover:border-violet-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
                                >
                                    <div className="flex min-h-[5.75rem] flex-1 items-center justify-center">
                                        {!sponsor.logoSrc ? (
                                            <span className="text-center font-barlow text-2xl font-black tracking-tight text-slate-800 transition-colors group-hover:text-violet-700">
                                                {sponsor.textMark ?? sponsor.name}
                                            </span>
                                        ) : sponsor.logoSrc.endsWith(".svg") ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={sponsor.logoSrc}
                                                alt=""
                                                className={logoImgClass}
                                            />
                                        ) : (
                                            <Image
                                                src={sponsor.logoSrc}
                                                alt=""
                                                width={sponsor.logoWidth ?? 256}
                                                height={sponsor.logoHeight ?? 256}
                                                className={logoImgClass}
                                            />
                                        )}
                                    </div>
                                    <span className="inline-flex items-center justify-center gap-1.5 text-center text-sm font-barlow font-semibold text-slate-400 group-hover:text-violet-600 transition-colors">
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
