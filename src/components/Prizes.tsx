import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { ChevronDown, Trophy, Sparkles } from "lucide-react";

const tiers = [
  { medal: "🥇", title: "Grand Prize", value: "$3,000+", extra: "Cash + premium swag + internship intros", glow: "from-yellow-500/30 to-orange-500/20" },
  { medal: "🥈", title: "Runner-Up", value: "$1,500+", extra: "Cash + premium swag", glow: "from-orange-500/25 to-red-500/15" },
  { medal: "🥉", title: "Third Place", value: "$750+", extra: "Cash + swag pack", glow: "from-red-500/25 to-orange-500/10" },
];

const extras = [
  ["Track Winners (×5)", "Cash + Trophy per track"],
  ["Best Beginner Project", "Cash + Mentorship Package"],
  ["Best Social Impact", "Cash + CodeStarters Newsletter Feature"],
  ["Most Creative Hack", "Cash + Surprise Loot"],
  ["Best AI Project", "Sponsored by AI partners — credits + cash"],
  ["Sponsor Bounties", "Multiple bounties from CodeCrafters, Relay, gen.xyz, n8n & more"],
];

export function Prizes() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="prizes" eyebrow="The Reward" title="$30,000+ in Prizes" subtitle="The biggest prize pool of any Bay Area high school hackathon. Cash, credits, hardware, internship intros, and dozens of sponsor bounties.">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-10 grid sm:grid-cols-3 gap-3 text-center">
        <div className="p-5 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
          <Trophy className="w-5 h-5 text-red-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-red-500">$30K+</div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Total Prize Pool</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
          <Sparkles className="w-5 h-5 text-red-500 mx-auto mb-2" />
          <div className="text-3xl font-bold text-red-500">15+</div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Award Categories</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
          <div className="text-2xl mx-auto mb-2">🎁</div>
          <div className="text-3xl font-bold text-red-500">All</div>
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Hackers Get Swag</div>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {tiers.map((t, i) => (
          <motion.div key={t.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="relative p-1 rounded-2xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${t.glow} blur-xl opacity-50`} />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
              <div className="flex items-center gap-5">
                <div className="text-4xl">{t.medal}</div>
                <div>
                  <div className="text-lg font-medium text-gray-200">{t.title}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.extra}</div>
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-red-500">{t.value}</div>
            </div>
          </motion.div>
        ))}

        <div className="pt-4">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 rounded-xl bg-[#1a0a0a] border border-red-950/50 hover:border-red-500/50 transition">
            <span className="font-medium text-gray-300">View Specialty Awards & Sponsor Bounties</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-3 p-5 rounded-xl bg-[#1a0a0a]/50 border border-red-950/30 space-y-3">
                  {extras.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-sm border-b border-red-950/30 pb-3 last:border-0">
                      <span className="font-medium text-gray-300">{k}</span>
                      <span className="text-gray-500 text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-xs text-gray-600 text-center pt-4">
          Final prize allocations are subject to change as sponsorships are confirmed. Total committed value already exceeds $30,000.
        </p>
      </div>
    </Section>
  );
}
