import { motion } from "framer-motion";
import { Section } from "./Section";

const sponsors = [
  { name: "CodeCrafters", url: "https://codecrafters.io/", img: "https://www.codestarters.xyz/sponsors/codecrafters.svg" },
  { name: "gen.xyz", url: "https://gen.xyz/", img: "https://www.codestarters.xyz/sponsors/genxyz.png" },
  { name: "Relay", url: "https://relay.app/", img: "https://www.codestarters.xyz/sponsors/relay.webp" },
  { name: "Medo", url: "https://medo.com/", img: "https://www.codestarters.xyz/sponsors/medo.png" },
  { name: "Featherless AI", url: "https://featherless.ai/", img: "https://www.codestarters.xyz/sponsors/featherless.png" },
  { name: "n8n", url: "https://n8n.io/", img: "https://www.codestarters.xyz/sponsors/n8n.png" },
  { name: "Publick", url: "https://publick.xyz/", img: "https://www.codestarters.xyz/sponsors/publick.png" },
  { name: "zo.computer", url: "https://zo.computer/", img: "https://www.codestarters.xyz/sponsors/zo-computer.svg" },
];

export function Sponsors() {
  return (
    <Section id="sponsors" eyebrow="Backed By Builders" title="Our Sponsors" subtitle="FireHacks is made possible by organizations that believe in student innovation.">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sponsors.map((s, i) => (
          <motion.a key={s.name} href={s.url} target="_blank" rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.04 }}
            className="group relative h-28 rounded-xl bg-[#1a0a0a] border border-red-950/50 flex items-center justify-center p-6">
            <img src={s.img} alt={s.name} loading="lazy"
              className="max-h-12 max-w-[80%] object-contain opacity-80 group-hover:opacity-100 transition" />
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
