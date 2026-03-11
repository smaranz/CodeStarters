"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TEAM_MEMBERS = [
    {
        name: "Smaran Aramballi Sandarsh",
        role: "Founder & Executive Director",
        bio: "Visionary leader dedicated to democratizing AI education and bridging the digital divide for small businesses. Smaran leads the organization's strategic direction and core technology initiatives.",
        image: "/smaran_real.png",
        accent: "from-emerald-400 to-teal-500",
    },
    {
        name: "Amogh Bhatta",
        role: "Vice President",
        bio: "Dedicated to community outreach and creating fast, beautiful local business sites. Amogh brings design thinking and a passion for accessible technology to every project.",
        image: null,
        accent: "from-violet-400 to-purple-500",
    },
    {
        name: "Arnav Ghildiyal",
        role: "Vice President",
        bio: "Focused on bridging the gap between young students and modern technology stacks. Arnav drives curriculum development and mentorship programs.",
        image: null,
        accent: "from-pink-400 to-rose-500",
    },
];

export function FoundersSection() {
    const [current, setCurrent] = useState(0);

    const goTo = (index: number) => {
        if (index < 0) setCurrent(TEAM_MEMBERS.length - 1);
        else if (index >= TEAM_MEMBERS.length) setCurrent(0);
        else setCurrent(index);
    };

    const member = TEAM_MEMBERS[current];

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
                    <h3 className="font-instrument italic text-5xl lg:text-6xl text-slate-900 mb-4">Meet the founders</h3>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        A group of passionate high schoolers using computer science as a force for good.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="grid md:grid-cols-12 gap-10 items-start"
                        >
                            {/* Image / Avatar */}
                            <div className="md:col-span-4">
                                <div className={`aspect-[3/4] relative rounded-2xl overflow-hidden bg-gradient-to-br ${member.accent}`}>
                                    {member.image ? (
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-white/80 text-[120px] font-barlow font-bold leading-none">
                                                {member.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="md:col-span-8 md:pt-6">
                                <p className="text-violet-600 font-barlow font-medium text-xs tracking-widest uppercase mb-3">
                                    {member.role}
                                </p>
                                <h4 className="font-barlow text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
                                    {member.name}
                                </h4>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    {member.bio}
                                </p>

                                {/* Dots */}
                                <div className="flex items-center gap-2 mb-6">
                                    {TEAM_MEMBERS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrent(i)}
                                            className={`h-2 rounded-full transition-all duration-300 ${i === current
                                                ? "w-8 bg-violet-500"
                                                : "w-2 bg-slate-300 hover:bg-slate-400"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3 mt-8 md:mt-0 md:absolute md:bottom-0 md:right-0">
                        <button
                            onClick={() => goTo(current - 1)}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => goTo(current + 1)}
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
