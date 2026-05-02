"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export function LogoisumHero() {
    const videoARef = useRef<HTMLVideoElement>(null);
    const videoBRef = useRef<HTMLVideoElement>(null);
    const [activeVideo, setActiveVideo] = useState<"A" | "B">("A");

    useEffect(() => {
        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;

        const CROSSFADE_TIME = 0.8; // seconds before end to start crossfade

        const handleTimeUpdate = (current: HTMLVideoElement, next: HTMLVideoElement, label: "A" | "B") => {
            if (current.duration && current.currentTime >= current.duration - CROSSFADE_TIME) {
                // Start the next video and crossfade
                next.currentTime = 0;
                next.play().catch(() => { });
                setActiveVideo(label === "A" ? "B" : "A");
            }
        };

        const onTimeUpdateA = () => handleTimeUpdate(videoA, videoB, "A");
        const onTimeUpdateB = () => handleTimeUpdate(videoB, videoA, "B");

        videoA.addEventListener("timeupdate", onTimeUpdateA);
        videoB.addEventListener("timeupdate", onTimeUpdateB);

        return () => {
            videoA.removeEventListener("timeupdate", onTimeUpdateA);
            videoB.removeEventListener("timeupdate", onTimeUpdateB);
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-white p-4">
            {/* Background Video A */}
            <video
                ref={videoARef}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="/hero-bg.png"
                className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[800ms] ${activeVideo === "A" ? "opacity-100" : "opacity-0"
                    }`}
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Background Video B (for crossfade) */}
            <video
                ref={videoBRef}
                muted
                playsInline
                preload="auto"
                className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[800ms] ${activeVideo === "B" ? "opacity-100" : "opacity-0"
                    }`}
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>

            {/* Hero Content */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center mt-20 max-w-4xl w-full text-brand-950">
                <h1 className="flex flex-col items-center justify-center">
                    <span className="font-barlow font-medium tracking-[-4px] text-[40px] md:text-[60px] leading-[1.1] mb-2">
                        Teaching This
                    </span>
                    <span className="font-instrument italic font-normal text-[64px] md:text-[84px] leading-none mb-6">
                        Generation AI and CS
                    </span>
                </h1>

                <p className="font-barlow font-medium text-[18px] text-brand-950/80 mb-10 max-w-xl">
                    Student-led initiative teaching CS and AI to younger students while helping small businesses grow.
                </p>

                <Link href="#programs" className="bg-brand-950 text-white rounded-full pl-5 pr-8 py-4 font-barlow font-medium text-[16px] flex items-center gap-3 hover:scale-105 transition-transform shadow-xl">
                    <div className="bg-white/10 rounded-full p-2">
                        <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                    See Our Programs
                </Link>
            </div>
        </section>
    );
}
