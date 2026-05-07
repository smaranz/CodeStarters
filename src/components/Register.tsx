import { motion } from "framer-motion";
import { Section } from "./Section";
import { ExternalLink } from "lucide-react";

export function Register() {
  return (
    <Section id="register" eyebrow="Reserve Your Spot" title="Register for FireHacks" subtitle="Spots are limited. Lock yours in via Luma — it takes about 30 seconds.">
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="lg:col-span-2 space-y-5">
          <div className="p-6 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
            <div className="text-sm uppercase tracking-widest text-red-500 font-medium mb-2">When</div>
            <div className="text-2xl font-bold text-gray-200">June 6, 2026</div>
            <div className="text-sm text-gray-500 mt-1">A full day of building.</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
            <div className="text-sm uppercase tracking-widest text-red-500 font-medium mb-2">Where</div>
            <div className="text-2xl font-bold text-gray-200">Bay Area, CA</div>
            <div className="text-sm text-gray-500 mt-1">Venue announced to registered hackers.</div>
          </div>
          <div className="p-6 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
            <div className="text-sm uppercase tracking-widest text-red-500 font-medium mb-2">Cost</div>
            <div className="text-2xl font-bold text-gray-200">100% Free</div>
            <div className="text-sm text-gray-500 mt-1">Meals, snacks, and swag included.</div>
          </div>
          <a
            href="https://luma.com/event/evt-teYwe8vJ6Eqne8d"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 w-full justify-center px-6 py-4 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Open Registration on Luma <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-red-950/50 bg-[#1a0a0a]">
          <iframe
            src="https://lu.ma/embed/event/evt-teYwe8vJ6Eqne8d/simple"
            title="Register for FireHacks on Luma"
            className="relative w-full h-[680px] bg-[#0a0505]"
            style={{ border: "none" }}
            allowFullScreen
            aria-hidden="false"
          />
        </motion.div>
      </div>
    </Section>
  );
}
