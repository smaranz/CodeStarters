import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FullLogo } from "@/assets/logo";

const links = [
  { name: "About", href: "#about" },
  { name: "Tracks", href: "#tracks" },
  { name: "Workshops", href: "#workshops" },
  { name: "Prizes", href: "#prizes" },
  { name: "Register", href: "#register" },
  { name: "Team", href: "#team" },
  { name: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
      const sects = links.map(l => document.querySelector(l.href));
      for (let i = sects.length - 1; i >= 0; i--) {
        const el = sects[i] as HTMLElement | null;
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(links[i].name.toLowerCase());
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 inset-x-0 z-50 bg-[#0a0505]/80 backdrop-blur-xl border-b border-red-950/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="hover:opacity-80 transition"><FullLogo /></a>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.name} href={l.href} className="relative px-3 py-2 text-sm text-gray-500 hover:text-gray-300 transition-colors">
              {l.name}
              {active === l.name.toLowerCase() && (
                <motion.div layoutId="navline" className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-red-500 rounded-full" />
              )}
            </a>
          ))}
          <a href="https://luma.com/event/evt-teYwe8vJ6Eqne8d" target="_blank" rel="noreferrer" className="ml-3 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition">Register →</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-300" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-red-950/50">
            <div className="flex flex-col p-4 gap-2">
              {links.map(l => (
                <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-md hover:bg-[#1a0a0a] text-sm text-gray-300">{l.name}</a>
              ))}
              <a href="https://luma.com/event/evt-teYwe8vJ6Eqne8d" target="_blank" rel="noreferrer" className="mt-2 text-center px-4 py-3 rounded-full bg-red-600 text-white font-medium">Register on Luma →</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
