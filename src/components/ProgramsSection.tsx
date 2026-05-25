"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function ProgramsSection() {
    return (
        <section id="programs" className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 text-center"
                >
                    <p className="text-brand-600 font-barlow font-medium text-sm tracking-widest uppercase mb-4">What We Do</p>
                    <h3 className="font-instrument italic text-5xl lg:text-7xl text-slate-900">Three core programs.</h3>
                </motion.div>

                {/* Program 1: CS & AI Education */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                            <Image
                                src="/program_cs_ai.jpg"
                                alt="CS & AI Education"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-7 lg:pt-12"
                    >
                        <span className="inline-block text-xs font-barlow font-medium tracking-widest uppercase text-brand-600 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full mb-6">Education</span>
                        <h4 className="font-barlow text-3xl lg:text-4xl font-bold text-slate-900 mb-5">CS &amp; AI Education</h4>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            Our volunteers teach foundational and advanced topics to equip younger students with the skills they need for the future.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Python fundamentals', 'Introduction to AI', 'AI Literacy & Safety', 'Web development basics'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                <span className="font-bold text-slate-900">Program formats:</span> Workshops, school partnerships, online sessions, and community events.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Program 2: Free Websites */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-7 lg:pt-12 order-2 lg:order-1"
                    >
                        <span className="inline-block text-xs font-barlow font-medium tracking-widest uppercase text-accent-600 bg-accent-50 border border-accent-100 px-4 py-1.5 rounded-full mb-6">Web Development</span>
                        <h4 className="font-barlow text-3xl lg:text-4xl font-bold text-slate-900 mb-5">Free Websites for Local Businesses</h4>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            We empower Cupertino&apos;s local economy by building professional websites at no cost — managed entirely by student developers gaining real-world experience.
                        </p>
                        <ul className="space-y-3 mb-8">
                            {['Restaurants & cafes', 'Retail shops', 'Service businesses', 'Local nonprofits'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0" />
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            {['Modern design', 'Mobile-first', 'Fast loading', 'Responsive'].map((feature) => (
                                <span key={feature} className="text-xs font-medium text-slate-600 border border-slate-200 rounded-full px-3.5 py-1.5 bg-white shadow-sm">
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 order-1 lg:order-2"
                    >
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                            <Image
                                src="/website.webp"
                                alt="Free website development"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Program 3: Featured AI Bootcamp */}
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-24 lg:mt-32 rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-brand-50 p-6 sm:p-8 lg:p-10 shadow-sm">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="aspect-[4/5] relative rounded-2xl overflow-hidden">
                            <Image
                                src="/ai_literacy.jpg"
                                alt="AI Agents & Development"
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-7 lg:pt-12"
                    >
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="inline-block text-xs font-barlow font-semibold tracking-widest uppercase text-violet-800 bg-white border border-violet-200 px-4 py-1.5 rounded-full">Featured Summer Track</span>
                            <span className="inline-block text-xs font-barlow font-medium tracking-widest uppercase text-brand-700 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full">AI Readiness</span>
                        </div>
                        <h4 className="font-barlow text-3xl lg:text-4xl font-bold text-slate-900 mb-5">AI Agents &amp; Development</h4>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                            An end-to-end class built to make students AI literate, future-ready, and confident with the tools shaping modern software.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {['Hermes', 'OpenClaw', 'OpenCode', 'TrueFoundry', 'Featherless AI'].map((item) => (
                                <span key={item} className="rounded-full border border-violet-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                        <ul className="space-y-3 mb-8">
                            {['End-to-end AI agent workflows', 'Hermes, OpenClaw, and OpenCode tooling', 'Prompting, evaluation, and safe AI usage', 'AI literacy for school, careers, and the future'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0" />
                                    <span className="text-slate-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="bg-white border border-violet-200 rounded-xl p-5 shadow-sm">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                <span className="font-bold text-slate-900">Sponsored by TrueFoundry and Featherless AI:</span> students get exposure to modern agentic AI workflows while building the judgment they need to use these tools responsibly.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
