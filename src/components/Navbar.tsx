import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Flame } from "lucide-react";
import { FullFireHacksLogo } from "@/assets/logo";

const sections = [
  { name: "About", href: "#about" },
  { name: "Tracks", href: "#tracks" },
  { name: "Sponsors", href: "#sponsors" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find active section
      const sectionIds = sections.map(s => s.href.replace("#", ""));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(10,10,10,0.9)" : "rgba(10,10,10,0)",
        borderBottomColor: scrolled ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
      }}
      className="fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <FullFireHacksLogo />
        </a>

        {/* Desktop nav - fireball format */}
        <div className="hidden md:flex items-center gap-2">
          {sections.map((s) => {
            const isActive = activeSection === s.href.replace("#", "");
            return (
              <a
                key={s.name}
                href={s.href}
                className="relative group flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {/* Fireball indicator */}
                <motion.div
                  className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-red-500" : "bg-gray-600 group-hover:bg-red-500"
                  }`}
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                    opacity: isActive ? [0.7, 1, 0.7] : 1,
                  }}
                  transition={{
                    duration: isActive ? 1.5 : 0.3,
                    repeat: isActive ? Infinity : 0,
                  }}
                />
                <span className="mt-1">{s.name}</span>
              </a>
            );
          })}

          <div className="w-px h-6 bg-white/10 mx-2" />

          <a
            href="https://discord.gg/utUNdDz3"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Discord
          </a>

          <a
            href="https://luma.com/event/evt-teYwe8vJ6Eqne8d"
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            <Flame className="w-3.5 h-3.5" />
            Register
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="flex flex-col p-4 gap-1">
              {sections.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  <div className={`w-2 h-2 rounded-full ${activeSection === s.href.replace("#", "") ? "bg-red-500" : "bg-gray-600"}`} />
                  {s.name}
                </a>
              ))}
              <a
                href="https://discord.gg/utUNdDz3"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
              >
                Discord
              </a>
              <a
                href="https://luma.com/event/evt-teYwe8vJ6Eqne8d"
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-center px-5 py-3 rounded-lg bg-red-600 text-white font-medium"
              >
                Register for Event
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
