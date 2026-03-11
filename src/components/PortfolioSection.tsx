"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
    {
        id: 1,
        name: "Local Restaurant Initiative",
        category: "Hospitality",
        description: "Designing a high-speed menu and booking system for our first local dining partner. Coming Fall 2024.",
        color: "from-blue-100/40 to-indigo-100/40",
        status: "In Development"
    },
    {
        id: 2,
        name: "Cupertino Retail Showcase",
        category: "Retail",
        description: "Empowering a local boutique with a clean, mobile-first inventory display. Coming Winter 2024.",
        color: "from-brand-50 to-indigo-50",
        status: "In Planning"
    },
];

export function PortfolioSection() {
    return (
        <section id="projects" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div>
                        <h2 className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-3">The First Cohort</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900">Upcoming Projects</h3>
                    </div>
                    <p className="text-slate-600 max-w-md text-lg">
                        We are currently preparing our first batch of professional websites for local Cupertino businesses. Check back soon for the live launches!
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer block"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                {/* Image Placeholder */}
                                <div className={`aspect-[16/10] bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-grid-slate-900/[0.04]" />
                                    <div className="absolute top-6 left-6 p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm translate-y-0 flex items-center gap-2 text-brand-900 font-bold text-sm">
                                        {project.status}
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-8">
                                    <div className="text-sm font-semibold text-brand-600 mb-2">{project.category}</div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-3">{project.name}</h4>
                                    <p className="text-slate-600 line-clamp-2">{project.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
