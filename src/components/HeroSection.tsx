"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-end overflow-hidden pb-20 pt-32">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Students in a modern tech workshop"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/30" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-brand-300 text-sm font-medium tracking-wide mb-6">Student-led nonprofit in Cupertino, CA</p>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-white leading-[1.05] mb-8 text-balance"
                    >
                        Teaching the next generation{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10">CS &amp; AI</span>
                            <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-brand-500/40 rounded-sm" />
                        </span>
                        , building websites for local businesses
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed"
                    >
                        We&apos;re high school students who believe every kid deserves to learn code — and every small business deserves a great website.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link href="#volunteer">
                            <Button size="lg" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-400 border-none text-white">
                                Join as Volunteer <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="#request-website">
                            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10">
                                Request a Website
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 right-8 lg:right-12 z-10 hidden sm:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-white/40"
                />
            </motion.div>
        </section>
    );
}
