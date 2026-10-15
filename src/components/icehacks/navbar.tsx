import { ICEHACKS_DEVPOST_URL } from "@/lib/icehacks-host";
import { useState } from "react";

const LINKS = [
  ["about", "#about"],
  ["tracks", "#tracks"],
  ["schedule", "#schedule"],
  ["faq", "#faq"],
  ["sponsors", "#sponsors"],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-in sticky top-0 z-50 bg-[#0d3354]/55 backdrop-blur-md border-b border-white/15">
      <div className="wrap flex items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-2 font-bold text-white">
          <img src="/icehacks/logo.png" alt="" width={28} height={28} className="w-7 h-7 object-contain" />
          Ice Hacks
        </a>
        <button
          className="md:hidden text-white text-xl"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "✕" : "☰"}
        </button>
        <div className="hidden md:flex items-center gap-5">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-[#c5ebff] hover:text-white capitalize">
              {label}
            </a>
          ))}
          <a
            href={ICEHACKS_DEVPOST_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ice btn-s"
          >
            Apply
          </a>
        </div>
      </div>
      {open ? (
        <div className="md:hidden wrap flex flex-col gap-3 pb-4">
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-[#c5ebff] hover:text-white capitalize"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href={ICEHACKS_DEVPOST_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ice btn-s w-fit"
          >
            Apply
          </a>
        </div>
      ) : null}
    </nav>
  );
}
