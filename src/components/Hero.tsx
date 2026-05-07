import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Ticket } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0505] via-[#1a0a0a] to-[#0f0808]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 60}%`,
              opacity: 0.3 + ((i * 7) % 7) * 0.1,
            }}
          />
        ))}
      </div>

      {/* Volcano SVG background */}
      <div className="absolute bottom-0 inset-x-0 h-[70vh]">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          {/* Volcano body - left mountain */}
          <defs>
            <linearGradient id="volcanoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a0a0a" />
              <stop offset="100%" stopColor="#0f0505" />
            </linearGradient>
            <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" />
              <stop offset="50%" stopColor="#ff6a00" />
              <stop offset="100%" stopColor="#ff4500" />
            </linearGradient>
            <radialGradient id="glowGrad" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#ff4500" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff4500" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="skyLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4500" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1a0a0a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Glow behind volcano */}
          <ellipse cx="720" cy="180" rx="300" ry="200" fill="url(#glowGrad)" className="animate-pulse" />

          {/* Volcano silhouette */}
          <path
            d="M200,600 L420,280 L480,240 L540,260 L620,200 L680,180 L720,160 L760,180 L820,200 L900,260 L960,240 L1020,280 L1240,600 Z"
            fill="url(#volcanoGrad)"
            stroke="none"
          />

          {/* Volcano crater */}
          <ellipse cx="720" cy="165" rx="40" ry="15" fill="#2a0f0f" />

          {/* Lava flow */}
          <path
            d="M700,175 L680,220 L660,280 L640,350 L620,420 L600,500 L580,600"
            stroke="url(#lavaGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M740,175 L760,230 L780,300 L800,380 L820,450 L840,520 L860,600"
            stroke="url(#lavaGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            className="opacity-60"
          />

          {/* Lava glow at crater */}
          <ellipse cx="720" cy="168" rx="20" ry="8" fill="#ff6a00" className="opacity-80 animate-pulse" />

          {/* Sky line glow */}
          <path
            d="M0,280 L420,280 L480,240 L540,260 L620,200 L680,180 L720,160 L760,180 L820,200 L900,260 L960,240 L1020,280 L1440,280 L1440,350 L0,350 Z"
            fill="url(#skyLine)"
          />
        </svg>
      </div>

      {/* Floating embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-500"
            style={{
              left: `${60 + ((i * 17) % 20)}%`,
              bottom: "30%",
              opacity: 0.6,
            }}
            animate={{
              y: [0, -200 - (i * 30)],
              x: [(i % 2 === 0 ? 0 : 30), (i % 2 === 0 ? 20 : -20)],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0505] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-900/50 bg-black/40 backdrop-blur text-xs text-gray-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          June 6, 2026 · Bay Area · $30K+ in Prizes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-7xl sm:text-8xl md:text-[10rem] font-bold text-red-500 leading-none tracking-tighter"
        >
          FireHacks
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-3 text-lg text-gray-500 tracking-wider">
          by <span className="text-gray-300 font-medium">CodeStarters</span>
        </motion.p>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-8 text-2xl sm:text-3xl md:text-4xl font-medium text-gray-200 max-w-3xl mx-auto">
          One Day. Build Something That Matters.
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-4 text-gray-500 text-base sm:text-lg">
          200+ Bay Area high schoolers. Workshops, mentors, $30K+ in prizes — 100% free.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="https://luma.com/event/evt-teYwe8vJ6Eqne8d" target="_blank" rel="noreferrer" className="group px-8 py-4 rounded-full bg-red-600 text-white font-medium flex items-center gap-2 hover:bg-red-700 transition-transform">
            <Ticket className="w-4 h-4" /> Register on Luma <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <a href="#about" className="group px-8 py-4 rounded-full border border-gray-700 text-gray-300 font-medium flex items-center gap-2 hover:border-gray-500 hover:text-white transition">
            Learn More <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
