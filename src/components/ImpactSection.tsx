"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const STATS = [
    { label: "Students to Teach", value: 150, suffix: "" },
    { label: "Websites to Build", value: 15, suffix: "" },
    { label: "Student Volunteers", value: 50, suffix: "" },
    { label: "Community Events", value: 12, suffix: "" },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
    const [count, setCount] = useState(from);
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * (to - from) + from));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isInView, from, to, duration]);

    return <span ref={nodeRef}>{count}</span>;
}

export function ImpactSection() {
    return (
        <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-semibold text-brand-300 tracking-wider uppercase mb-3">Our 2024-25 Targets</h2>
                    <h3 className="text-3xl md:text-5xl font-bold">Ambitious Goals for Our Community</h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center flex flex-col items-center"
                        >
                            <div className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2">
                                <Counter from={0} to={stat.value} />{stat.suffix}
                            </div>
                            <p className="text-brand-200 font-medium text-sm md:text-base uppercase tracking-wide">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
