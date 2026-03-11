"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Code2, PenTool, LayoutTemplate, Megaphone, Users, Sparkles, ArrowRight } from "lucide-react";
import { VolunteerForm } from "./VolunteerForm";

const ROLES = [
    { name: "Web Developers", icon: Code2 },
    { name: "UI/UX Designers", icon: PenTool },
    { name: "CS & AI Instructors", icon: LayoutTemplate },
    { name: "Outreach & Partnerships", icon: Users },
    { name: "Marketing & Social Media", icon: Megaphone },
    { name: "Vibe Coding", icon: Sparkles },
];

export function VolunteerSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section id="volunteer" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="bg-brand-950 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    {/* Subtle dot pattern texture */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-instrument italic text-4xl md:text-6xl text-white mb-5 leading-[1.1]">
                                Build the future <br />with us
                            </h2>
                            <p className="text-brand-200 font-barlow text-lg mb-8 leading-relaxed max-w-md">
                                Join our community of passionate students. Gain real-world experience, build your resume, and make a tangible impact.
                            </p>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                size="lg"
                                className="bg-white text-brand-950 hover:bg-brand-50 border-none font-barlow font-medium rounded-full px-8"
                            >
                                Apply to Volunteer <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {ROLES.map((role, i) => (
                                <motion.div
                                    key={role.name}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                                    whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                                    className="bg-white/[0.06] border border-white/[0.08] rounded-xl p-4 flex items-center gap-3 transition-colors cursor-default"
                                >
                                    <role.icon className="w-5 h-5 text-brand-300 shrink-0" />
                                    <span className="text-sm font-barlow font-medium text-white/90">{role.name}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
            <VolunteerForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
