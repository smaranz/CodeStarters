import { motion } from "framer-motion";
import { Code2, Brain, Smartphone, Shield, Gamepad2 } from "lucide-react";

const tracks = [
  { icon: Code2, name: "Web Dev", desc: "Build beautiful, fast, modern web apps" },
  { icon: Brain, name: "AI / ML", desc: "Train models and build AI-native apps" },
  { icon: Smartphone, name: "Mobile Dev", desc: "Ship apps that live in someone's pocket" },
  { icon: Shield, name: "Cybersecurity", desc: "Hack ethically and defend systems" },
  { icon: Gamepad2, name: "Game Dev", desc: "Create worlds and tell stories through play" },
];

export function Tracks() {
  return (
    <section id="tracks" className="relative py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-red-500 text-sm font-medium tracking-widest uppercase">Build What You Want</span>
        <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">Tracks</h2>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {tracks.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#1F1F1F] hover:border-red-500/30 transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative">
                <div className="mx-auto w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <t.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
