import { motion } from "framer-motion";
import { Section } from "./Section";
import { Calendar, Clock, MapPin } from "lucide-react";

export function Schedule() {
  return (
    <Section id="schedule" eyebrow="The Plan" title="Event Schedule" subtitle="One full day of building, learning, and connecting.">
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-3xl mx-auto rounded-2xl bg-[#1a0a0a] border border-red-950/50 p-10 sm:p-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/30 border border-red-900/30 text-xs text-gray-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Schedule Coming Soon
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-red-500 mb-6">All-Day Event</h3>
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="w-6 h-6 text-red-500" />
            <div className="font-medium text-gray-300">June 6, 2026</div>
            <div className="text-sm text-gray-500">Save the date</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-6 h-6 text-red-500" />
            <div className="font-medium text-gray-300">All Day</div>
            <div className="text-sm text-gray-500">Full schedule TBD</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-6 h-6 text-red-500" />
            <div className="font-medium text-gray-300">Bay Area</div>
            <div className="text-sm text-gray-500">Venue TBD</div>
          </div>
        </div>
        <p className="mt-10 text-gray-500">
          We're finalizing the schedule. Join our Discord to be the first to know.
        </p>
        <a href="https://discord.gg/ZJtm6hdu" target="_blank" rel="noreferrer"
          className="inline-flex mt-6 px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition">
          Join the Discord →
        </a>
      </motion.div>
    </Section>
  );
}
