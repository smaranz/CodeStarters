"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
    { name: "Mission", href: "#mission" },
    { name: "Programs", href: "#programs" },
    { name: "Events", href: "#events" },
    { name: "Team", href: "#team" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Donate", href: "#donate" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl"
        >
            <nav className="bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between px-5 py-2.5">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 relative flex items-center justify-center">
                        <Image
                            src="/logo_new.png"
                            alt="CodeStarters Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-barlow font-bold text-lg tracking-tight text-slate-900">
                        CodeStarters
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-[13px] font-barlow font-medium tracking-wide uppercase text-slate-500 hover:text-slate-900 transition-colors"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <Link
                    href="#volunteer"
                    className="hidden md:flex bg-brand-700 text-white rounded-full pl-5 pr-2 py-2 font-barlow font-medium text-[13px] items-center gap-3 hover:bg-brand-800 transition-colors"
                >
                    Join Us
                    <span className="bg-white/20 rounded-full p-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </span>
                </Link>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span
                        className={`block w-5 h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-slate-900 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-4"
                >
                    <ul className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-3 px-3 text-lg font-barlow font-bold text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="#volunteer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="mt-2 w-full flex items-center justify-center bg-brand-700 text-white rounded-xl py-3 font-barlow font-medium"
                    >
                        Join Us
                    </Link>
                </motion.div>
            )}
        </motion.div>
    );
}
