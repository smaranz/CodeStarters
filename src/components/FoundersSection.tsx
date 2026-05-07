"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Loader2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type TeamVolunteer = {
    id: string;
    name: string;
    interest?: string | null;
    school?: string | null;
    grade_level?: string | null;
};

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

const TEAM_MEMBERS: {
    name: string;
    image: string | null;
    accent: string;
    title: string;
    /** Extra classes for `object-position` / crop when `object-cover` clips the face */
    imageClassName?: string;
}[] = [
    {
        name: "Smaran Aramballi Sandarsh",
        image: "/smaran_real.png",
        accent: "from-emerald-400 to-teal-500",
        title: "President",
    },
    {
        name: "Aidan Kwan",
        image: "/aidan-kwan.webp",
        accent: "from-sky-400 to-blue-600",
        title: "VP",
    },
    {
        name: "Arnav Ghildiyal",
        image: "/arnav.webp",
        accent: "from-pink-400 to-rose-500",
        title: "VP",
    },
    {
        name: "Amogh Bhatta",
        image: "/amogh-bhatta.webp",
        accent: "from-violet-400 to-purple-500",
        title: "VP",
        imageClassName: "object-[50%_35%]",
    },
    {
        name: "Sai Sanjit Reddy Vallapureddy",
        image: "/sai-sanjit.webp",
        accent: "from-amber-400 to-orange-500",
        title: "Head of Marketing",
    },
];

/** Optional headshots for volunteers in the expanded list (API has no image field) */
type VolunteerHeadshot = { src: string; imageClassName?: string };

const VOLUNTEER_HEADSHOTS: Record<string, VolunteerHeadshot> = {
    "shaurya gakhar": { src: "/shaurya-gakhar.webp" },
    // Supabase: "Yussef El Guerrab"; alias covers common Youssef spelling
    "yussef el guerrab": { src: "/yussef.webp", imageClassName: "object-cover object-[center_25%]" },
    "youssef el guerrab": { src: "/yussef.webp", imageClassName: "object-cover object-[center_25%]" },
    "yussef": { src: "/yussef.webp", imageClassName: "object-cover object-[center_25%]" },
    "youssef": { src: "/yussef.webp", imageClassName: "object-cover object-[center_25%]" },
    // Sai (was mislabeled "Sanju"); alias in case a volunteer row still says Sanju.
    "sai sanjit reddy vallapureddy": { src: "/sai-sanjit.webp" },
    "sanju": { src: "/sai-sanjit.webp" },
    // Supabase volunteer names (must match `volunteers.name` lowercased)
    "robin zhou": { src: "/robin.webp", imageClassName: "object-cover object-[center_22%]" },
    "robin": { src: "/robin.webp", imageClassName: "object-cover object-[center_22%]" },
    "arnav ghildiyal": { src: "/arnav.webp", imageClassName: "object-cover object-[center_28%]" },
    // Source: Downloads/image (5).webp — match `volunteers.name` lowercased.
    "shreesh basu": { src: "/shreesh.webp", imageClassName: "object-cover object-[50%_5%]" },
    "shreesh": { src: "/shreesh.webp", imageClassName: "object-cover object-[50%_5%]" },
    "reyansh nankani": { src: "/reyansh.webp" },
    "reyansh": { src: "/reyansh.webp" },
    "pranav chintalapati": { src: "/pranav-chintalapati.webp" },
    // Supabase may list abbreviated name (e.g. "Pranav C." → "pranav c" after strip final ".")
    "pranav c": { src: "/pranav-chintalapati.webp" },
    "pranav": { src: "/pranav-chintalapati.webp" },
    // Matches `Michael` or `Michael …` via volunteerHeadshot() prefix fallback.
    "michael": { src: "/michael-portrait.webp" },
    "amogh bhatta": {
        src: "/amogh-bhatta.webp",
        imageClassName: "object-cover object-[50%_35%]",
    },
    "amogh": {
        src: "/amogh-bhatta.webp",
        imageClassName: "object-cover object-[50%_35%]",
    },
    "arham": {
        src: "/arham.webp",
        imageClassName: "object-cover object-[50%_38%]",
    },
};

function normalizeVolunteerNameKey(name: string): string {
    return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function volunteerHeadshot(name: string): VolunteerHeadshot | undefined {
    const raw = normalizeVolunteerNameKey(name);
    const withoutPeriod = raw.endsWith(".") ? raw.slice(0, -1) : raw;
    return (
        VOLUNTEER_HEADSHOTS[raw] ??
        VOLUNTEER_HEADSHOTS[withoutPeriod] ??
        (raw.startsWith("michael ") ? VOLUNTEER_HEADSHOTS["michael"] : undefined) ??
        (raw.startsWith("amogh ") ? VOLUNTEER_HEADSHOTS["amogh bhatta"] : undefined) ??
        (raw.startsWith("arham ") ? VOLUNTEER_HEADSHOTS["arham"] : undefined) ??
        (raw.startsWith("pranav ") ? VOLUNTEER_HEADSHOTS["pranav chintalapati"] : undefined) ??
        (raw.startsWith("yussef") || raw.startsWith("youssef")
            ? VOLUNTEER_HEADSHOTS["yussef el guerrab"]
            : undefined)
    );
}

/** Names already shown above; exclude from expanded volunteer list */
const CORE_TEAM_NAMES = new Set(
    TEAM_MEMBERS.map((m) => normalizeVolunteerNameKey(m.name)),
);

/** Completed volunteers who should not appear on the public team section */
const HIDDEN_VOLUNTEER_NAMES = new Set<string>();

function hideFromPublicTeam(name: string): boolean {
    const n = normalizeVolunteerNameKey(name);
    if (HIDDEN_VOLUNTEER_NAMES.has(n)) return true;
    return false;
}

export function FoundersSection() {
    const [showTeam, setShowTeam] = useState(false);
    const [team, setTeam] = useState<TeamVolunteer[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggle = async () => {
        const next = !showTeam;
        setShowTeam(next);
        if (next && !team && !isLoading) {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/team");
                const data = (await res.json()) as TeamVolunteer[] | { error: string };
                if (!res.ok || !Array.isArray(data)) {
                    setError("Could not load the rest of the team.");
                    setTeam([]);
                } else {
                            const rest = data.filter(
                        (v) =>
                            !CORE_TEAM_NAMES.has(normalizeVolunteerNameKey(v.name)) &&
                            !hideFromPublicTeam(v.name),
                    );
                    setTeam(rest);
                }
            } catch {
                setError("Could not load the rest of the team.");
                setTeam([]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <section id="team" className="py-20 lg:py-28 bg-white text-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <p className="text-violet-600 font-barlow font-medium text-sm tracking-widest uppercase mb-4">Our Team</p>
                    <h3 className="font-instrument italic text-5xl lg:text-6xl text-slate-900 mb-4">Meet the team</h3>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        A group of passionate high schoolers using computer science as a force for good.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto xl:max-w-7xl 2xl:max-w-none">
                    {TEAM_MEMBERS.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
                                        <span className="text-white/85 text-6xl lg:text-7xl font-barlow font-bold leading-none">
                                            {member.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h4 className="font-barlow text-base lg:text-lg font-bold text-slate-900 mt-4 leading-snug text-balance">
                                {member.name}
                            </h4>
                            <p className="font-barlow text-xs sm:text-sm font-medium text-violet-600 mt-1.5 leading-snug text-balance">
                                {member.title}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <motion.button
                        onClick={handleToggle}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 rounded-full font-barlow font-medium h-12 px-7 text-base bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                        <Users className="w-4 h-4 opacity-90" aria-hidden />
                        {showTeam ? "Hide the rest of the team" : "See the rest of the team"}
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${showTeam ? "rotate-180" : ""}`}
                            aria-hidden
                        />
                    </motion.button>
                </div>

                <AnimatePresence initial={false}>
                    {showTeam && (
                        <motion.div
                            key="volunteers"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-12">
                                {isLoading && (
                                    <div className="flex items-center justify-center text-slate-500 gap-2 py-8">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span className="text-sm font-barlow">Loading team…</span>
                                    </div>
                                )}
                                {error && !isLoading && (
                                    <p className="text-center text-sm text-red-600 font-barlow py-8">{error}</p>
                                )}
                                {!isLoading && !error && team && team.length === 0 && (
                                    <p className="text-center text-sm text-slate-500 font-barlow py-8">
                                        No additional volunteers yet — be the first to join.
                                    </p>
                                )}
                                {!isLoading && team && team.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
                                        {team.map((v, i) => {
                                            const headshot = volunteerHeadshot(v.name);
                                            return (
                                            <motion.div
                                                key={v.id}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex flex-col items-center text-center"
                                            >
                                                <div
                                                    className={`aspect-square w-full relative rounded-2xl overflow-hidden ${
                                                        headshot
                                                            ? "bg-slate-100"
                                                            : `bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]}`
                                                    }`}
                                                >
                                                    {headshot ? (
                                                        <Image
                                                            src={headshot.src}
                                                            alt={v.name}
                                                            fill
                                                            className={headshot.imageClassName ?? "object-cover"}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-white/85 text-5xl lg:text-6xl font-barlow font-bold leading-none">
                                                                {v.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="font-barlow text-base font-bold text-slate-900 mt-4 leading-snug text-balance">
                                                    {v.name}
                                                </h4>
                                                {v.interest && (
                                                    <p className="text-xs text-slate-500 font-barlow mt-1">
                                                        {v.interest}
                                                    </p>
                                                )}
                                            </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
