import { motion } from "framer-motion";
import { useState } from "react";

const coreTeam = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", role: "Vice President", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "Vice President", img: "/arnav.webp" },
  { name: "Amogh Bhatta", role: "Vice President", img: "/amogh.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Marketing", img: "/sai.webp" },
];

export function Team() {
  return (
    <section id="team" className="relative py-32 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-500 text-sm font-medium tracking-widest uppercase">The Crew</span>
          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">Meet the Team</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            A group of passionate high schoolers using computer science as a force for good.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {coreTeam.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-[#141414] border border-[#1F1F1F] overflow-hidden hover:border-red-500/30 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-[#1A1A1A]">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="font-medium text-white text-sm leading-tight">{m.name}</div>
                <div className="text-xs text-red-500 mt-1 font-medium">{m.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
