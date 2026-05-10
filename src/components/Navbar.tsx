import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const navLinks = ["Home", "How It Works", "Philosophy", "Use Cases"];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-28 py-4"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-7 h-7">
          <div className="absolute inset-0 w-7 h-7 rounded-full border-2 border-foreground/60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-foreground/60" />
        </div>
        <span className="font-bold text-lg">Mindloop</span>
      </div>

      <div className="hidden md:flex items-center gap-1 text-sm">
        {navLinks.map((link, index) => (
          <div key={link} className="flex items-center">
            <a
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              {link}
            </a>
            {index < navLinks.length - 1 && (
              <span className="text-muted-foreground/40">•</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="Instagram">
          <Instagram className="w-4 h-4" />
        </button>
        <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="LinkedIn">
          <Linkedin className="w-4 h-4" />
        </button>
        <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform" aria-label="Twitter">
          <Twitter className="w-4 h-4" />
        </button>
      </div>
    </motion.nav>
  );
}