import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";

const lead = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "https://www.codestarters.xyz/_next/image?url=%2Fsmaran_real.png&w=640&q=75" },
  { name: "Aidan Kwan", role: "Vice President", img: "https://www.codestarters.xyz/_next/image?url=%2Faidan-kwan.webp&w=640&q=75" },
  { name: "Arnav Ghildiyal", role: "Vice President", img: "https://www.codestarters.xyz/_next/image?url=%2Farnav.webp&w=640&q=75" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Marketing", img: "https://www.codestarters.xyz/_next/image?url=%2Fsai-sanjit.webp&w=640&q=75" },
];

const more = [
  { name: "Operations Lead", role: "Operations" },
  { name: "Sponsorship Lead", role: "Sponsorships" },
  { name: "Workshops Lead", role: "Workshops & Mentors" },
  { name: "Design Lead", role: "Design" },
  { name: "Logistics Lead", role: "Logistics" },
  { name: "Volunteer Coordinator", role: "Volunteers" },
  { name: "Outreach Lead", role: "Outreach" },
  { name: "Tech Lead", role: "Tech & Web" },
];

function Initials({ name }: { name: string }) {
  const init = name.split(" ").slice(0, 2).map(n => n[0]).join("");
  return (
    <div className="aspect-square w-full bg-red-950/50 flex items-center justify-center text-4xl font-bold text-red-500">
      {init}
    </div>
  );
}

export function Team() {
  const [showAll, setShowAll] = useState(false);
  return (
    <Section id="team" eyebrow="The Crew" title="Meet the Team" subtitle="A group of passionate high schoolers using computer science as a force for good.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lead.map((m, i) => (
          <motion.div key={m.name}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
            <div className="aspect-square overflow-hidden bg-[#0a0505]">
              <img src={m.img} alt={m.name} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-5">
              <div className="font-medium text-gray-200 leading-tight">{m.name}</div>
              <div className="text-sm text-red-500 mt-1">{m.role}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {more.map((m, i) => (
                <motion.div key={m.name}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="group relative rounded-2xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
                  <Initials name={m.name} />
                  <div className="p-5">
                    <div className="font-medium text-gray-200 leading-tight">{m.name}</div>
                    <div className="text-sm text-red-500 mt-1">{m.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-600 mt-6">
              Full roster being announced — want to join the team? <a href="mailto:team@codestarters.xyz" className="text-red-500 underline">team@codestarters.xyz</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mt-12">
        <button onClick={() => setShowAll(v => !v)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-red-900/50 text-red-500 font-medium hover:bg-red-600 hover:text-white transition">
          {showAll ? "Show less" : "See the rest of the team →"}
        </button>
      </div>
    </Section>
  );
}
