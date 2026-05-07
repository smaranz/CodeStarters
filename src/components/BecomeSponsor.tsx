import { motion } from "framer-motion";
import { Section } from "./Section";
import { FileText, Mail, ShieldCheck, Users, Trophy, Megaphone } from "lucide-react";

const perks = [
  { icon: Users, title: "200–300 Hackers", desc: "Direct access to top Bay Area high school builders." },
  { icon: Trophy, title: "Brand Visibility", desc: "Logo on the website, swag, and live event signage." },
  { icon: Megaphone, title: "Workshops & Demos", desc: "Run a workshop, judge projects, or sponsor a track." },
  { icon: ShieldCheck, title: "Tax Deductible", desc: "All sponsorships are 100% tax-deductible via our 501(c)(3) fiscal sponsor." },
];

export function BecomeSponsor() {
  return (
    <Section id="become-sponsor" eyebrow="Partner With Us" title="Become a FireHacks Sponsor" subtitle="Help us put on the Bay Area's best high school hackathon. Reach hundreds of student builders and back the next generation of engineers.">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-4">
          {perks.map((p) => (
            <div key={p.title} className="p-6 rounded-2xl bg-[#1a0a0a] border border-red-950/50">
              <div className="w-11 h-11 rounded-xl bg-red-950/50 flex items-center justify-center mb-3">
                <p.icon className="w-5 h-5 text-red-500" />
              </div>
              <div className="font-medium text-gray-200 text-lg">{p.title}</div>
              <div className="text-sm text-gray-500 mt-1">{p.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl bg-[#1a0a0a] border border-red-950/50 p-8 sm:p-10 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-red-950/50 flex items-center justify-center">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-red-500 font-medium">Sponsorship Prospectus</div>
              <div className="text-2xl font-bold text-gray-200">Tiers, perks & pricing</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Our prospectus breaks down every tier — from supporting partners to the headline sponsor — including marketing reach, on-site activations, and recruiting opportunities.
          </p>

          <div className="rounded-xl border border-red-950/30 bg-[#0a0505] overflow-hidden mb-5">
            <embed
              src="/firehacks-sponsorship-prospectus.pdf#toolbar=0&navpanes=0"
              type="application/pdf"
              className="w-full h-[360px] bg-[#0a0505]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <a
              href="/firehacks-sponsorship-prospectus.pdf"
              target="_blank" rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              <FileText className="w-4 h-4" /> View Prospectus
            </a>
            <a
              href="mailto:sponsors@codestarters.xyz?subject=FireHacks%202026%20Sponsorship"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-red-900/50 text-gray-300 font-medium hover:bg-red-600 hover:text-white transition"
            >
              <Mail className="w-4 h-4" /> Email Sponsors Team
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
