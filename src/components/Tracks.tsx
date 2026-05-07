import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "./Section";
import { Bot, Smartphone, Gamepad2, ShieldCheck, Globe } from "lucide-react";

const tracks = [
  { icon: Globe, name: "Web Dev", desc: "Build beautiful, fast, modern web apps. From landing pages to full-stack production tools.", grad: "from-red-500 to-orange-500" },
  { icon: Bot, name: "AI / ML", desc: "Train models, fine-tune LLMs, build AI-native apps. The frontier is wide open.", grad: "from-orange-500 to-red-600" },
  { icon: Smartphone, name: "Mobile Dev", desc: "Native iOS, Android, or cross-platform — ship something that lives in someone's pocket.", grad: "from-red-500 to-pink-500" },
  { icon: ShieldCheck, name: "Cybersecurity", desc: "Hack ethically. Defend the digital frontier — CTFs, tooling, defensive systems.", grad: "from-orange-600 to-red-700" },
  { icon: Gamepad2, name: "Game Dev", desc: "Create worlds. Tell stories through play — 2D, 3D, web, or mobile.", grad: "from-amber-500 to-orange-600" },
];

export function Tracks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="tracks" ref={ref} className="relative bg-[#0a0505]" style={{ height: `${tracks.length * 80}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="text-center mb-10 px-6">
          <div className="text-sm uppercase tracking-[0.2em] text-red-500 font-medium mb-3">Build What You Want</div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-100">Choose Your Track</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Software-only — no hardware constraints. Pick a lane or invent your own.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-[8.333vw] will-change-transform">
          {tracks.map((t) => (
            <div key={t.name}
              className="group relative shrink-0 w-[83.333vw] sm:w-[60vw] md:w-[42vw] lg:w-[32vw] h-[55vh] rounded-2xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
              <div className="relative h-full flex flex-col justify-between p-8 sm:p-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${t.grad} flex items-center justify-center`}>
                  <t.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">{t.name}</h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md">{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="text-center mt-8 text-xs text-gray-600 tracking-widest uppercase">
          ← Scroll to reveal more →
        </div>
      </div>
    </section>
  );
}
