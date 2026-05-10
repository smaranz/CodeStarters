import { motion } from "framer-motion";
import { ExternalLink, Instagram } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { FireHacksLogo, CodeStartersLogo } from "@/assets/logo";

const fireHacksLinks = [
  ["About", "#about"],
  ["Tracks", "#tracks"],
  ["Sponsors", "#sponsors"],
  ["Prospectus", "/firehacks-sponsorship-prospectus.pdf"],
  ["FAQ", "#faq"],
];

export function Navbar() {
  const location = useLocation();
  const isFireHacks = location.pathname.startsWith("/firehacks");

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/10 bg-[#0A0A0A]/72 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6"
    >
      <a href={isFireHacks ? "/firehacks" : "/"} className="flex items-center gap-3">
        {isFireHacks ? <FireHacksLogo size={30} /> : <CodeStartersLogo size={30} />}
        <span className="font-bold text-lg">{isFireHacks ? "Fire Hacks" : "CodeStarters"}</span>
      </a>

      <div className="hidden md:flex items-center gap-1 text-sm">
        {fireHacksLinks.map(([link, href], index) => (
          <div key={link} className="flex items-center">
            <a
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              {link}
            </a>
            {index < fireHacksLinks.length - 1 && (
              <span className="text-muted-foreground/40">•</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <a
          href="https://www.instagram.com/cupertino_codestarters/"
          target="_blank"
          rel="noreferrer"
          className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Instagram"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://discord.gg/utUNdDz3"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/35 hover:text-white"
        >
          Discord <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <a
          href="https://luma.com/event/evt-teYwe8vJ6Eqne8d"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Register
        </a>
      </div>
    </motion.nav>
  );
}
