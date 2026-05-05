"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Loader2, Users } from "lucide-react";

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

const TEAM_MEMBERS = [
    {
        name: "Smaran Aramballi Sandarsh",
        image: "/smaran_real.png",
        accent: "from-emerald-400 to-teal-500",
    },
    {
        name: "Aidan Kwan",
        image: null,
        accent: "from-sky-400 to-blue-600",
    },
    {
        name: "Amogh Bhatta",
        image: null,
        accent: "from-violet-400 to-purple-500",
    },
    {
        name: "Arnav Ghildiyal",
        image: null,
        accent: "from-pink-400 to-rose-500",
    },
    {
        name: "Sai Sanjit Reddy Vallapureddy",
        image: null,
        accent: "from-amber-400 to-orange-500",
    },
    {
        name: "Shaurya Gakhar",
        image: "/shaurya-gakhar.webp",
        accent: "from-cyan-400 to-blue-500",
    },
];

/** Names already shown above; exclude from expanded volunteer list */
const CORE_TEAM_NAMES = new Set(
    TEAM_MEMBERS.map((m) => m.name.trim().toLowerCase()),
);

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
                        (v) => !CORE_TEAM_NAMES.has(v.name.trim().toLowerCase()),
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
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
                                        className="object-cover"
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
                                        {team.map((v, i) => (
                                            <motion.div
                                                key={v.id}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex flex-col items-center text-center"
                                            >
                                                <div className={`aspect-square w-full relative rounded-2xl overflow-hidden bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]}`}>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-white/85 text-5xl lg:text-6xl font-barlow font-bold leading-none">
                                                            {v.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
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
                                        ))}
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
