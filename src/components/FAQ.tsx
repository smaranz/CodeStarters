import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./Section";
import { Plus } from "lucide-react";

const faqs = [
  ["What is FireHacks?", "FireHacks is a one-day in-person hackathon for high school students in the Bay Area, organized by CodeStarters and focused entirely on software — web, mobile, AI/ML, security, and games. Build a project from scratch, attend workshops, eat great food, and compete for $30K+ in prizes."],
  ["Who can attend?", "Any current high school student (grades 9–12) can apply. No prior hackathon or coding experience required — we run beginner-friendly workshops and have mentors on site all day."],
  ["How much does it cost?", "Nothing. FireHacks is 100% free. Meals, snacks, swag, and everything else are fully covered by our sponsors."],
  ["What should I build?", "Anything software-based. Web Dev, AI/ML, Mobile, Cybersecurity, or Game Dev — solve a real problem, explore a new tech, or just build something fun."],
  ["When and where is it?", "June 6, 2026, in the Bay Area. Specific venue is shared with registered hackers closer to the event."],
  ["Can I work in a team?", "Yes — teams of up to 4. Solo hackers welcome too; we run a team-formation session at the start."],
  ["What about workshops?", "We're running sessions on vibe coding with AI tools, full-stack web dev, AI/ML crash course, mobile, product design, and pitching."],
  ["How do I become a sponsor?", "Email sponsors@codestarters.xyz or check the Become a Sponsor section above for our prospectus. All sponsorships are tax-deductible via our 501(c)(3) fiscal sponsor."],
  ["Where will sponsor money go?", "Directly to prizes, meals, venue, swag, and resources for student builders. CodeStarters is fiscally sponsored by Hack Club Bank — every dollar is accounted for."],
  ["Is there a Code of Conduct?", "Yes — we follow the MLH Code of Conduct for inclusive, respectful events."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="Curious?" title="Got Questions?" subtitle="We've got answers.">
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className="rounded-xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#1a0a0a]/80 transition">
                <span className="font-medium text-gray-200 pr-4">{q}</span>
                <Plus className={`w-5 h-5 shrink-0 text-red-500 transition-transform ${isOpen ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 text-gray-400 leading-relaxed">{a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
