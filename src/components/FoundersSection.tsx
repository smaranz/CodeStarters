"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TeamMember = {
    name: string;
    image: string | null;
    accent: string;
    title: string;
    imageClassName?: string;
};

const FEATURED_TEAM: TeamMember[] = [
    {
        name: "Smaran Aramballi Sandarsh",
        image: "/smaran_real.png",
        accent: "from-emerald-400 to-teal-500",
        title: "President",
    },
    {
        name: "Amogh Bhatta",
        image: "/amogh-bhatta.webp",
        accent: "from-violet-400 to-purple-500",
        title: "VP",
        imageClassName: "object-[50%_35%]",
    },
];

const REST_OF_TEAM: TeamMember[] = [
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
        title: "Basic CS Mentor",
    },
    {
        name: "Robin Zhou",
        image: "/robin.webp",
        accent: "from-cyan-400 to-blue-500",
        title: "Head of Marketing",
        imageClassName: "object-cover object-[center_22%]",
    },
    {
        name: "Sai Sanjit Reddy Vallapureddy",
        image: "/sai-sanjit.webp",
        accent: "from-amber-400 to-orange-500",
        title: "Head of Education",
    },
];

const TEAM_MEMBERS = [...FEATURED_TEAM, ...REST_OF_TEAM];

function TeamCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
    return (
        <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
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
    );
}

export function FoundersSection() {
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-6 w-full mx-auto">
                    {TEAM_MEMBERS.map((member, i) => (
                        <TeamCard key={member.name} member={member} delay={i * 0.06} />
                    ))}
                </div>
            </div>
        </section>
    );
}
