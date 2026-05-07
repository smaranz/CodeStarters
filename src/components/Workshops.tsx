import { motion } from "framer-motion";
import { Section } from "./Section";
import { Sparkles, Code2, Brain, Layers, Palette, Rocket } from "lucide-react";

const workshops = [
  { icon: Sparkles, title: "Vibe Coding", desc: "Ship fast with AI tools — Cursor, Claude, Lovable. Turn ideas into apps in minutes.", tag: "Beginner-friendly" },
  { icon: Brain, title: "AI / ML Crash Course", desc: "Train your first model. From prompt engineering to fine-tuning — get hands-on with the stack powering today's most exciting products.", tag: "All levels" },
  { icon: Code2, title: "Full-Stack Web Dev", desc: "Modern web stacks — React, Next, TanStack, Supabase. Build production-ready apps end to end.", tag: "Intermediate" },
  { icon: Layers, title: "Mobile Dev Lab", desc: "Native iOS/Android or cross-platform with React Native. Ship to your phone by lunch.", tag: "Intermediate" },
  { icon: Palette, title: "Product Design", desc: "Design that doesn't suck. Figma, prototyping, and the principles behind beautiful interfaces.", tag: "Beginner-friendly" },
  { icon: Rocket, title: "Pitching & Demo", desc: "How to demo a project that wins. Storytelling, slides, and live-demo survival tips.", tag: "All levels" },
];

export function Workshops() {
  return (
    <Section id="workshops" eyebrow="Learn While You Build" title="Workshops & Mentorship" subtitle="Industry mentors and hands-on workshops all day long. Whether you've never written a line of code or you're shipping production apps — there's a session for you.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {workshops.map((w, i) => (
          <motion.div key={w.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative p-6 rounded-2xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-red-950/50 flex items-center justify-center mb-4">
                <w.icon className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-gray-200">{w.title}</h3>
              </div>
              <div className="inline-block text-[10px] uppercase tracking-widest text-gray-500 font-medium mb-3">{w.tag}</div>
              <p className="text-sm text-gray-400 leading-relaxed">{w.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
