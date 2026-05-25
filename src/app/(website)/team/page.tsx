"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TeamVolunteer = {
    id: string;
    name: string;
    interest?: string | null;
    school?: string | null;
    grade_level?: string | null;
};

const CORE_TEAM: {
    name: string;
    image: string | null;
    accent: string;
    title: string;
    imageClassName?: string;
}[] = [
    { name: "Smaran Aramballi Sandarsh", image: "/smaran_real.png", accent: "from-emerald-400 to-teal-500", title: "President" },
    { name: "Amogh Bhatta", image: "/amogh-bhatta.webp", accent: "from-violet-400 to-purple-500", title: "VP", imageClassName: "object-[50%_35%]" },
    { name: "Aidan Kwan", image: "/aidan-kwan.webp", accent: "from-sky-400 to-blue-600", title: "VP" },
    { name: "Arnav Ghildiyal", image: "/arnav.webp", accent: "from-pink-400 to-rose-500", title: "Basic CS Mentor" },
    { name: "Robin Zhou", image: "/robin.webp", accent: "from-cyan-400 to-blue-500", title: "Head of Marketing", imageClassName: "object-cover object-[center_22%]" },
    { name: "Sai Sanjit Reddy Vallapureddy", image: "/sai-sanjit.webp", accent: "from-amber-400 to-orange-500", title: "Head of Education" },
];

const CORE_NAMES = new Set(CORE_TEAM.map((m) => m.name.trim().toLowerCase().replace(/\s+/g, " ")));

const ACCENTS = [
    "from-emerald-400 to-teal-500",
    "from-sky-400 to-blue-600",
    "from-violet-400 to-purple-500",
    "from-pink-400 to-rose-500",
    "from-amber-400 to-orange-500",
    "from-cyan-400 to-blue-500",
    "from-fuchsia-400 to-pink-500",
    "from-lime-400 to-emerald-500",
];

type VolunteerHeadshot = { src: string; imageClassName?: string };

const HEADSHOTS: Record<string, VolunteerHeadshot> = {
    "shaurya gakhar": { src: "/shaurya-gakhar.webp" },
    "yussef el guerrab": { src: "/yussef.webp", imageClassName: "object-cover object-[center_15%]" },
    "youssef el guerrab": { src: "/yussef.webp", imageClassName: "object-cover object-[center_15%]" },
    "yussef": { src: "/yussef.webp", imageClassName: "object-cover object-[center_15%]" },
    "youssef": { src: "/yussef.webp", imageClassName: "object-cover object-[center_15%]" },
    "sai sanjit reddy vallapureddy": { src: "/sai-sanjit.webp" },
    "sanju": { src: "/sai-sanjit.webp" },
    "robin zhou": { src: "/robin.webp", imageClassName: "object-cover object-[center_22%]" },
    "robin": { src: "/robin.webp", imageClassName: "object-cover object-[center_22%]" },
    "arnav ghildiyal": { src: "/arnav.webp", imageClassName: "object-cover object-[center_28%]" },
    "shreesh basu": { src: "/shreesh.webp", imageClassName: "object-cover object-[50%_5%]" },
    "shreesh": { src: "/shreesh.webp", imageClassName: "object-cover object-[50%_5%]" },
    "reyansh nankani": { src: "/reyansh.webp" },
    "reyansh": { src: "/reyansh.webp" },
    "pranav chintalapati": { src: "/pranav-chintalapati.webp" },
    "pranav c": { src: "/pranav-chintalapati.webp" },
    "pranav": { src: "/pranav-chintalapati.webp" },
    "michael": { src: "/michael-portrait.webp" },
    "amogh bhatta": { src: "/amogh-bhatta.webp", imageClassName: "object-cover object-[50%_35%]" },
    "amogh": { src: "/amogh-bhatta.webp", imageClassName: "object-cover object-[50%_35%]" },
    "arham": { src: "/arham.webp", imageClassName: "object-cover object-[50%_38%]" },
};

function getHeadshot(name: string): VolunteerHeadshot | undefined {
    const raw = name.trim().toLowerCase().replace(/\s+/g, " ");
    const noPeriod = raw.endsWith(".") ? raw.slice(0, -1) : raw;
    return (
        HEADSHOTS[raw] ??
        HEADSHOTS[noPeriod] ??
        (raw.startsWith("michael ") ? HEADSHOTS["michael"] : undefined) ??
        (raw.startsWith("amogh ") ? HEADSHOTS["amogh bhatta"] : undefined) ??
        (raw.startsWith("arham ") ? HEADSHOTS["arham"] : undefined) ??
        (raw.startsWith("pranav ") ? HEADSHOTS["pranav chintalapati"] : undefined) ??
        ((raw.startsWith("yussef") || raw.startsWith("youssef")) ? HEADSHOTS["yussef el guerrab"] : undefined)
    );
}

export default function TeamPage() {
    const [volunteers, setVolunteers] = useState<TeamVolunteer[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/team")
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const rest = data.filter((v: TeamVolunteer) => {
                        const trimmed = v.name.trim();
                        const isValid = trimmed.length >= 2 && /[a-zA-Z]/.test(trimmed) && !/^\d+$/.test(trimmed);
                        const isNotCore = !CORE_NAMES.has(trimmed.toLowerCase().replace(/\s+/g, " "));
                        return isValid && isNotCore;
                    });
                    setVolunteers(rest);
                } else {
                    setError("Could not load the team.");
                }
            })
            .catch(() => setError("Could not load the team."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <Link
                    href="/#team"
                    className="inline-flex items-center gap-2 text-sm font-barlow font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <p className="text-violet-600 font-barlow font-medium text-sm tracking-widest uppercase mb-4">Our Team</p>
                    <h1 className="font-instrument italic text-5xl lg:text-6xl text-slate-900 mb-4">Everyone on the team</h1>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        Passionate high schoolers building the future of CS education and local business tech.
                    </p>
                </motion.div>

                {/* Core leadership */}
                <h2 className="font-barlow font-bold text-xs tracking-widest uppercase text-slate-400 mb-8">Leadership</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                    {CORE_TEAM.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className={`aspect-square w-full relative rounded-2xl overflow-hidden bg-gradient-to-br ${member.accent}`}>
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className={cn("object-cover", member.imageClassName)}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/85 text-5xl font-barlow font-bold leading-none">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3 className="font-barlow text-sm font-bold text-slate-900 mt-3 leading-snug text-balance">
                                {member.name}
                            </h3>
                            <p className="font-barlow text-xs font-medium text-violet-600 mt-1">
                                {member.title}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Volunteers */}
                <h2 className="font-barlow font-bold text-xs tracking-widest uppercase text-slate-400 mb-8">Volunteers</h2>
                {loading && (
                    <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-barlow text-sm">Loading…</span>
                    </div>
                )}
                {error && !loading && (
                    <p className="text-center text-sm text-red-500 font-barlow py-12">{error}</p>
                )}
                {!loading && volunteers && volunteers.length === 0 && (
                    <p className="text-center text-sm text-slate-400 font-barlow py-12">
                        No additional volunteers yet — be the first to join!
                    </p>
                )}
                {!loading && volunteers && volunteers.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {volunteers.map((v, i) => {
                            const hs = getHeadshot(v.name);
                            return (
                                <motion.div
                                    key={v.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, delay: i * 0.03 }}
                                    className="flex flex-col items-center text-center"
                                >
                                    <div
                                        className={`aspect-square w-full relative rounded-2xl overflow-hidden ${
                                            hs ? "bg-slate-100" : `bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]}`
                                        }`}
                                    >
                                        {hs ? (
                                            <Image
                                                src={hs.src}
                                                alt={v.name}
                                                fill
                                                className={hs.imageClassName ?? "object-cover"}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-white/85 text-4xl font-barlow font-bold leading-none">
                                                    {v.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-barlow text-sm font-bold text-slate-900 mt-3 leading-snug text-balance">
                                        {v.name}
                                    </h3>
                                    {v.interest && (
                                        <p className="text-xs text-slate-400 font-barlow mt-0.5">{v.interest}</p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
