import { ICEHACKS_DEVPOST_URL } from "@/lib/icehacks-host";
import { useEffect, useState } from "react";

const OPENING = Date.parse("2026-11-09T02:00:00.000Z");

function remaining() {
  const ms = Math.max(0, OPENING - Date.now());
  const total = Math.floor(ms / 1000);
  return {
    days: String(Math.floor(total / 86400)).padStart(2, "0"),
    hours: String(Math.floor((total % 86400) / 3600)).padStart(2, "0"),
    mins: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    secs: String(total % 60).padStart(2, "0"),
  };
}

export function Hero() {
  const [clock, setClock] = useState({ days: "00", hours: "00", mins: "00", secs: "00" });

  useEffect(() => {
    setClock(remaining());
    const id = window.setInterval(() => setClock(remaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header id="top" className="hero relative min-h-[100dvh] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-10">
        <p className="in kicker-line">November 8–15, 2026 · Online · 100% free</p>
        <div className="hero-mark in">
          <h1 className="icy-title">
            ICE
            <br />
            HACKS
          </h1>
          <span className="drip" style={{ left: "28%", animationDelay: "0s" }} />
          <span className="drip" style={{ left: "50%", animationDelay: "0.35s" }} />
          <span className="drip" style={{ left: "72%", animationDelay: "0.7s" }} />
        </div>
        <p className="in d1 edition">2026 Edition</p>
        <p className="in d2 lede hero-lede">
          A week online for high schoolers to build something that actually runs — software, hardware,
          or the weird idea in between.
        </p>
        <p className="in d2 count-label">Live countdown to opening</p>
        <div className="in d3 melt-clock" aria-live="polite">
          <div className="count-cell">
            <b>{clock.days}</b>
            <span>days</span>
          </div>
          <div className="count-cell">
            <b>{clock.hours}</b>
            <span>hours</span>
          </div>
          <div className="count-cell">
            <b>{clock.mins}</b>
            <span>mins</span>
          </div>
          <div className="count-cell">
            <b>{clock.secs}</b>
            <span>secs</span>
          </div>
        </div>
      </div>
      <div className="hero-cta in d4">
        <div className="wrap flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.15em] text-[#c5ebff] uppercase">
              Online · software, hardware, anything · 200+ hackers
            </p>
            <p className="text-[10px] sm:text-xs text-[#d5eefc] mt-1">
              8 days · $10K in prizes · all skill levels
            </p>
          </div>
          <div className="flex gap-2.5 w-full sm:w-auto">
            <a
              href={ICEHACKS_DEVPOST_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ice flex-1 sm:flex-initial"
            >
              Apply
            </a>
            <a href="#about" className="btn btn-quiet flex-1 sm:flex-initial">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
