import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const LUMA_EVENT_HREF = "https://luma.com/event/evt-teYwe8vJ6Eqne8d";
const LUMA_EVENT_ID = "evt-teYwe8vJ6Eqne8d";
const DISCORD_HREF = "https://discord.gg/utUNdDz3";
const PROSPECTUS_PATH = "/firehacks/prospectus";

export const Route = createFileRoute("/firehacks/")({
  head: () => ({
    meta: [
      { title: "Fire Hacks 2026 — Bay Area High School Hackathon" },
      { name: "description", content: "A full day of building, learning, and shipping. Join 200+ high school hackers for the Bay Area's most electric hackathon. June 6, 2026. Free." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" },
    ],
  }),
  component: FireHacksPage,
});

function RegisterLink({ className, children = "Register for Event" }: { className?: string; children?: React.ReactNode }) {
  return (
    <a href={LUMA_EVENT_HREF} className={`luma-checkout--button${className ? ` ${className}` : ""}`} data-luma-action="checkout" data-luma-event-id={LUMA_EVENT_ID}>
      {children}
    </a>
  );
}

function FireHacksPage() {
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("fh-visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px 15% 0px" }
    );
    page.querySelectorAll(".fh-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handler = () => nav.classList.toggle("fh-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const toggle = toggleRef.current;
    const links = linksRef.current;
    if (!toggle || !links) return;
    const handleToggle = () => { toggle.classList.toggle("fh-active"); links.classList.toggle("fh-open"); };
    toggle.addEventListener("click", handleToggle);
    const anchors = links.querySelectorAll("a");
    const close = () => { toggle.classList.remove("fh-active"); links.classList.remove("fh-open"); };
    anchors.forEach((a) => a.addEventListener("click", close));
    return () => { toggle.removeEventListener("click", handleToggle); anchors.forEach((a) => a.removeEventListener("click", close)); };
  }, []);

  return (
    <>
      <script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js"></script>
      <style dangerouslySetInnerHTML={{ __html: FH_CSS }} />
      <div ref={pageRef} className="fh-page">
        {/* NAV */}
        <nav ref={navRef} className="fh-nav">
          <div className="fh-nav-align">
            <div className="fh-nav-glass">
              <a href="#" className="fh-nav-logo">
                <span className="fh-nav-logo-icon">
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L28 16L16 30L4 16L16 2Z" fill="#EF4444" opacity="0.9" />
                    <path d="M16 8L22 16L16 24L10 16L16 8Z" fill="#0A0A0A" />
                  </svg>
                </span>
                Fire Hacks
              </a>
              <div ref={linksRef} className="fh-nav-links">
                <a href="#about">About</a>
                <a href="#tracks">Tracks</a>
                <a href="#sponsors">Sponsors</a>
                <a href={PROSPECTUS_PATH}>Prospectus</a>
                <a href="#faq">FAQ</a>
                <a href={DISCORD_HREF} target="_blank" rel="noopener noreferrer">Discord</a>
                <div className="fh-nav-drawer-cta">
                  <RegisterLink className="fh-btn fh-btn-primary fh-btn-sm fh-nav-drawer-register" />
                </div>
              </div>
              <div className="fh-nav-cta">
                <RegisterLink className="fh-btn fh-btn-primary fh-btn-sm" />
              </div>
              <button ref={toggleRef} type="button" className="fh-nav-toggle" aria-label="Toggle menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="fh-hero">
          <div className="fh-hero-content">
            <p className="fh-hero-eyebrow fh-reveal">
              Bay Area&apos;s Premier High School Hackathon
              <span className="fh-eyebrow-dot" />
              Bay Area
            </p>
            <h1 className="fh-hero-title fh-reveal fh-d1">
              <span className="fh-fire-part">FIRE</span>
              <br />
              <span className="fh-hacks-part">HACKS</span>
            </h1>
            <div className="fh-reveal fh-d2">
              <span className="fh-hero-date-badge">
                <span className="fh-pulse-dot" />
                June 6, 2026
              </span>
            </div>
            <p className="fh-hero-sub fh-reveal fh-d2">
              A full day of building, learning, and shipping. Join 200+ high school hackers for the Bay Area&apos;s most electric hackathon.
            </p>
            <div id="apply" className="fh-hero-ctas fh-apply-anchor fh-reveal fh-d3">
              <RegisterLink className="fh-btn fh-btn-primary" />
              <a href={DISCORD_HREF} target="_blank" rel="noopener noreferrer" className="fh-btn fh-btn-outline">Join Discord</a>
              <a href="#sponsors" className="fh-btn fh-btn-outline">Become a Sponsor</a>
              <a href={PROSPECTUS_PATH} className="fh-btn fh-btn-outline">View prospectus</a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="fh-stats">
          <div className="fh-container">
            <div className="fh-stats-grid">
              {[["200–300","Hackers"],["1 day","Of Building"],["$30K+","In Prizes"],["100%","Free"]].map(([n,l],i) => (
                <div key={l} className={`fh-stat-card fh-reveal${i ? ` fh-d${i}` : ""}`}>
                  <div className="fh-stat-number">{n}</div>
                  <div className="fh-stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="fh-section" id="about">
          <div className="fh-container">
            <div className="fh-about-grid">
              <div className="fh-reveal">
                <p className="fh-section-label">About the Event</p>
                <h2 className="fh-section-title">What is <span className="fh-accent-text">Fire Hacks</span>?</h2>
                <div className="fh-about-prose">
                  <p>Fire Hacks is a one-day hackathon designed for high school builders who want to ship real projects, learn from mentors, and connect with the Bay Area&apos;s next generation of engineers.</p>
                  <p>Whether you&apos;re building your first app or training your tenth model, Fire Hacks gives you the space, resources, and community to create something you&apos;re proud of — in one packed day.</p>
                  <p>Hosted by <a href="https://codestarters.xyz" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fh-accent)", borderBottom: "1px solid var(--fh-accent-dim)" }}>CodeStarters</a>, a student-led 501(c)(3) fiscally sponsored nonprofit teaching CS and AI to younger students. All sponsorships are tax-deductible.</p>
                </div>
              </div>
              <div className="fh-about-card fh-reveal fh-d1">
                <h3>{"// "}Why we&apos;re different</h3>
                <ul>
                  {["Software-only: web, mobile, AI/ML — no hardware constraints","A full day of focused building time","Workshops on AI/ML, full-stack dev, and product design","Mentors from industry and university on site all day","Full meals, snacks, and caffeine provided","100% free — no registration fee, ever"].map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TRACKS */}
        <section className="fh-section" id="tracks" style={{ paddingTop: "20px" }}>
          <div className="fh-container" style={{ textAlign: "center" }}>
            <p className="fh-section-label fh-reveal">Build What You Want</p>
            <h2 className="fh-section-title fh-reveal">Tracks</h2>
            <div className="fh-tracks-grid">
              {[
                { label: "Web Dev", d: "0", path: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></> },
                { label: "AI / ML", d: "1", path: <><path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.57-3.25 3.92L12 10v2"/><circle cx="12" cy="17" r="5"/><path d="M10 17h4"/><path d="M12 15v4"/></> },
                { label: "Mobile Dev", d: "2", path: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></> },
                { label: "Cybersecurity", d: "3", path: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></> },
                { label: "Game Dev", d: "4", path: <><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/><polyline points="2 15.5 12 8.5 22 15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/></> },
              ].map(({ label, d, path }) => (
                <div key={label} className={`fh-track-card fh-reveal${d !== "0" ? ` fh-d${d}` : ""}`}>
                  <div className="fh-track-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{path}</svg>
                  </div>
                  <h3>{label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPONSORS */}
        <section className="fh-section fh-sponsor-section" id="sponsors">
          <div className="fh-container fh-sponsor-container" style={{ textAlign: "center" }}>
            <p className="fh-section-label fh-sponsor-eyebrow fh-reveal">Our Sponsors</p>
            <h2 className="fh-section-title fh-sponsor-headline fh-reveal">Backed by Builders</h2>
            <div className="fh-sponsors-grid fh-reveal fh-d1">
              {[
                { href: "https://codecrafters.io", src: "/sponsors/codecrafters.svg", alt: "CodeCrafters" },
                { href: "https://gen.xyz", src: "/sponsors/genxyz.png", alt: "Gen.xyz" },
                { href: "https://relay.app", src: "/sponsors/relay.webp", alt: "Relay" },
                { href: "https://medo.com", src: "/sponsors/medo.png", alt: "Medo", cls: "fh-sponsor-logo-medo" },
                { href: "https://featherless.ai", src: "/sponsors/featherless.png", alt: "Featherless AI", cls: "fh-sponsor-logo-featherless" },
                { href: "https://n8n.io", src: "/sponsors/n8n.png", alt: "n8n", cls: "fh-sponsor-logo-n8n" },
                { href: "https://publick.xyz", src: "/sponsors/publick.png", alt: "Publick", cls: "fh-sponsor-logo-publick" },
                { href: "https://www.guild.ai/", src: "/sponsors/guild-ai.jpeg", alt: "Guild.ai", cls: "fh-sponsor-logo-guild" },
                { href: "https://zo.computer/", src: "/sponsors/zo-computer.svg", alt: "Zo Computer", cls: "fh-sponsor-logo-zo" },
              ].map(({ href, src, alt, cls }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="fh-sponsor-pill">
                  <img src={src} alt={alt} className={cls} />
                </a>
              ))}
            </div>
          </div>
          <div className="fh-sponsor-cta-bleed fh-reveal fh-d2">
            <div className="fh-container fh-sponsor-container">
              <div className="fh-sponsor-cta">
                <h3>Become a <span className="fh-accent-text">Sponsor</span></h3>
                <p>Help us put on the Bay Area&apos;s best high school hackathon. Your sponsorship is tax-deductible through our 501(c)(3) fiscal sponsor and directly funds prizes, meals, and resources for 200+ student builders.</p>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                  <a href="mailto:codestarters26@gmail.com?subject=Fire%20Hacks%20Sponsorship" className="fh-btn fh-btn-primary">
                    Get in Touch
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                  <a href={PROSPECTUS_PATH} className="fh-btn fh-btn-outline">View prospectus</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="fh-section" id="faq">
          <div className="fh-container" style={{ textAlign: "center" }}>
            <p className="fh-section-label fh-reveal">Got Questions?</p>
            <h2 className="fh-section-title fh-reveal">FAQ</h2>
            <div className="fh-faq-list">
              {[
                { q: "What is Fire Hacks?", a: "Fire Hacks is a one-day in-person hackathon for high school students in the Bay Area. It's organized by CodeStarters and focused entirely on software — web, mobile, and AI/ML. You'll build a project from scratch, attend workshops, eat great food, and compete for $30K+ in prizes.", d: "" },
                { q: "Who can attend?", a: "Any current high school student (grades 9–12) can apply. No prior hackathon or coding experience is required — we'll have beginner-friendly workshops and mentors to help you get started.", d: "fh-d1" },
                { q: "How much does it cost?", a: "Nothing. Fire Hacks is 100% free to attend. Meals, snacks, swag, and everything else are fully covered by our sponsors.", d: "fh-d1" },
                { q: "What should I build?", a: "Anything software-based. You can choose from tracks like Web Development, AI/ML, Mobile App Dev, Cybersecurity, or Game Dev. Build something that solves a real problem, explores a new technology, or is just plain fun.", d: "fh-d2" },
                { q: "How do I become a sponsor?", a: null, d: "fh-d2" },
                { q: "Where will sponsor money go?", a: "Every dollar goes directly toward making Fire Hacks happen: venue rental, meals and snacks for all attendees, prizes, swag, workshop materials, and event logistics. We're a nonprofit — there's no profit motive here.", d: "fh-d3" },
              ].map(({ q, a, d }) => (
                <details key={q} className={`fh-faq-item fh-reveal${d ? ` ${d}` : ""}`}>
                  <summary>{q}<span className="fh-faq-icon">+</span></summary>
                  <div className="fh-faq-answer">
                    {q === "How do I become a sponsor?" ? (
                      <>We&apos;d love to hear from you! Email us at <a href="mailto:codestarters26@gmail.com" style={{ color: "var(--fh-accent)" }}>codestarters26@gmail.com</a>, or view our <a href={PROSPECTUS_PATH} style={{ color: "var(--fh-accent)" }}>sponsorship prospectus</a>. All sponsorships are tax-deductible through our 501(c)(3) fiscal sponsor.</>
                    ) : a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="fh-footer">
          <div className="fh-container">
            <div className="fh-footer-inner">
              <div className="fh-footer-left">
                <a href="https://codestarters.xyz" target="_blank" rel="noopener noreferrer" className="fh-footer-logo">CodeStarters</a>
                <div className="fh-footer-sep" />
                <span className="fh-footer-text">Fire Hacks is a CodeStarters event.</span>
              </div>
              <div className="fh-footer-links">
                <a href="https://codestarters.xyz" target="_blank" rel="noopener noreferrer">codestarters.xyz</a>
                <a href={DISCORD_HREF} target="_blank" rel="noopener noreferrer">Discord</a>
                <a href="mailto:codestarters26@gmail.com">codestarters26@gmail.com</a>
                <span className="fh-footer-text">&copy; 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Ported from firehacks.module.css — all class names prefixed with fh-
const FH_CSS = `
.fh-page {
  --fh-bg: #0a0a0a;
  --fh-bg-card: #161616;
  --fh-bg-card-hover: #1e1e1e;
  --fh-accent: #ef4444;
  --fh-accent-dim: rgba(239,68,68,0.12);
  --fh-accent-glow: rgba(239,68,68,0.3);
  --fh-text: #a1a1aa;
  --fh-white: #f4f4f5;
  --fh-muted: #6b6b73;
  --fh-border: rgba(239,68,68,0.1);
  --fh-heading: 'Space Mono', monospace;
  --fh-body: 'DM Sans', sans-serif;
  --fh-radius: 12px;
  --fh-ease: 0.3s cubic-bezier(0.4,0,0.2,1);
  font-family: var(--fh-body);
  background: var(--fh-bg);
  color: var(--fh-text);
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}
.fh-page *,.fh-page *::before,.fh-page *::after{box-sizing:border-box;margin:0;padding:0}
.fh-page a{color:inherit;text-decoration:none}
.fh-page img{max-width:100%;display:block}
.fh-page ul{list-style:none}
.fh-container{max-width:1200px;margin:0 auto;padding:0 24px}
.fh-section{padding:100px 0}
.fh-section-label{font-family:var(--fh-heading);font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:var(--fh-accent);margin-bottom:12px}
.fh-section-title{font-family:var(--fh-heading);font-size:clamp(1.75rem,4vw,2.5rem);color:var(--fh-white);line-height:1.2;margin-bottom:20px}
.fh-accent-text{color:var(--fh-accent)}
.fh-reveal{opacity:0;transform:translateY(30px);transition:opacity .7s var(--fh-ease),transform .7s var(--fh-ease)}
.fh-reveal.fh-visible{opacity:1;transform:translateY(0)}
.fh-d1{transition-delay:.1s}.fh-d2{transition-delay:.2s}.fh-d3{transition-delay:.3s}.fh-d4{transition-delay:.4s}

/* NAV */
.fh-nav{position:fixed;top:0;left:0;right:0;z-index:1000;pointer-events:none}
.fh-nav-align{pointer-events:none;display:flex;justify-content:center;padding:14px clamp(12px,3vw,20px)}
.fh-nav-glass{pointer-events:auto;display:flex;align-items:center;justify-content:space-between;gap:clamp(12px,2.5vw,28px);width:100%;max-width:min(980px,100%);min-height:52px;padding:10px clamp(14px,2.2vw,22px);border-radius:9999px;background:linear-gradient(155deg,rgba(48,48,54,.42) 0%,rgba(18,18,22,.68) 42%,rgba(26,26,30,.58) 100%);border:1px solid rgba(255,255,255,.14);box-shadow:0 12px 48px rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.1) inset,0 0 0 1px rgba(239,68,68,.09) inset;backdrop-filter:blur(48px) saturate(185%);-webkit-backdrop-filter:blur(48px) saturate(185%);isolation:isolate;transition:box-shadow var(--fh-ease),background var(--fh-ease),transform var(--fh-ease),border-color var(--fh-ease)}
.fh-nav.fh-scrolled .fh-nav-glass{background:linear-gradient(155deg,rgba(52,52,58,.55) 0%,rgba(22,22,28,.78) 50%,rgba(30,30,36,.68) 100%);border-color:rgba(255,255,255,.18);box-shadow:0 16px 56px rgba(0,0,0,.58),0 1px 0 rgba(255,255,255,.12) inset,0 0 0 1px rgba(239,68,68,.1) inset}
.fh-nav-logo{display:flex;align-items:center;gap:10px;font-family:var(--fh-heading);font-weight:700;font-size:1.05rem;letter-spacing:-.02em;color:#fafafa;flex-shrink:0;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.fh-nav-logo-icon{width:28px;height:28px}.fh-nav-logo-icon svg{width:100%;height:100%}
.fh-nav-drawer-cta{display:none}
.fh-nav-links{display:flex;align-items:center;gap:clamp(18px,2.8vw,32px)}
.fh-nav-links > a{font-size:.8125rem;font-weight:600;letter-spacing:-.01em;color:rgba(250,250,250,.9);transition:color var(--fh-ease);position:relative;text-shadow:0 1px 2px rgba(0,0,0,.4)}
.fh-nav-links > a:hover{color:#fff}
.fh-nav-links > a::after{content:'';position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:0;height:2px;border-radius:2px;background:#ef4444;transition:width var(--fh-ease)}
.fh-nav-links > a:hover::after{width:100%}
.fh-nav-cta{display:flex;align-items:center;flex-shrink:0}
.fh-nav-toggle{display:none;flex-shrink:0;background:rgba(255,255,255,.08);border:none;cursor:pointer;padding:10px 11px;margin-right:-4px;border-radius:999px;transition:background var(--fh-ease)}
.fh-nav-toggle:hover{background:rgba(255,255,255,.14)}
.fh-nav-toggle span{display:block;width:18px;height:2px;background:rgba(250,250,250,.95);margin:5px 0;transition:transform var(--fh-ease),opacity var(--fh-ease);border-radius:2px}
.fh-nav-toggle.fh-active span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.fh-nav-toggle.fh-active span:nth-child(2){opacity:0}
.fh-nav-toggle.fh-active span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* BUTTONS */
.fh-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-family:var(--fh-body);font-weight:600;font-size:.9rem;padding:12px 28px;border-radius:9999px;border:none;cursor:pointer;transition:background var(--fh-ease),color var(--fh-ease),box-shadow var(--fh-ease),transform var(--fh-ease),border-color var(--fh-ease);text-decoration:none}
.fh-btn-primary{background:#dc2626;color:#0a0a0a;box-shadow:0 1px 0 rgba(255,255,255,.25) inset}
.fh-btn-primary:hover{background:#b91c1c;box-shadow:0 8px 28px rgba(220,38,38,.35);transform:translateY(-1px)}
.fh-btn-outline{background:#0a0a0a;color:#ef4444;border:1.5px solid #dc2626}
.fh-btn-outline:hover{background:#171717;color:#f87171;border-color:#ef4444;box-shadow:0 8px 28px rgba(0,0,0,.35);transform:translateY(-1px)}
.fh-btn-sm{padding:8px 18px;font-size:.78rem}
.fh-page a.luma-checkout--button{background:#dc2626!important;color:#0a0a0a!important;border:none!important;box-shadow:0 1px 0 rgba(255,255,255,.22) inset!important;text-decoration:none!important}
.fh-page a.luma-checkout--button:hover{background:#b91c1c!important;box-shadow:0 8px 28px rgba(220,38,38,.4)!important}

/* HERO */
.fh-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;padding:120px 24px 80px}
.fh-hero::before{content:'';position:absolute;inset:-50%;width:200%;height:200%;background:repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(239,68,68,.04) 60px,rgba(239,68,68,.04) 61px),repeating-linear-gradient(45deg,transparent,transparent 60px,rgba(248,113,113,.025) 60px,rgba(248,113,113,.025) 61px);animation:fh-grid-drift 25s linear infinite;pointer-events:none}
@keyframes fh-grid-drift{0%{transform:translate(0,0)}100%{transform:translate(60px,60px)}}
.fh-hero::after{content:'';position:absolute;top:20%;left:50%;transform:translateX(-50%);width:800px;height:600px;background:radial-gradient(ellipse,rgba(239,68,68,.07) 0%,transparent 70%);pointer-events:none}
.fh-hero-content{position:relative;z-index:1;max-width:800px}
.fh-hero-eyebrow{font-family:var(--fh-heading);font-size:.75rem;letter-spacing:3px;text-transform:uppercase;color:var(--fh-muted);margin-bottom:24px}
.fh-eyebrow-dot{display:inline-block;width:4px;height:4px;background:var(--fh-accent);border-radius:50%;margin:0 12px;vertical-align:middle}
.fh-hero-title{font-family:var(--fh-heading);font-size:clamp(3.5rem,12vw,8rem);font-weight:700;line-height:.95;letter-spacing:-2px;margin-bottom:28px}
.fh-fire-part{color:var(--fh-white)}
.fh-hacks-part{color:var(--fh-accent);text-shadow:0 0 60px var(--fh-accent-glow)}
.fh-hero-date-badge{display:inline-flex;align-items:center;gap:8px;background:var(--fh-accent-dim);border:1px solid var(--fh-border);border-radius:50px;padding:8px 20px;font-family:var(--fh-heading);font-size:.85rem;color:var(--fh-accent);margin-bottom:20px}
.fh-pulse-dot{width:8px;height:8px;background:var(--fh-accent);border-radius:50%;animation:fh-pulse 2s ease-in-out infinite}
@keyframes fh-pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 var(--fh-accent-glow)}50%{opacity:.7;box-shadow:0 0 0 6px transparent}}
.fh-hero-sub{font-size:1.1rem;color:var(--fh-text);max-width:520px;margin:0 auto 36px;line-height:1.7}
.fh-hero-ctas{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.fh-apply-anchor{scroll-margin-top:108px}

/* STATS */
.fh-stats{padding:0 0 20px;position:relative;z-index:2;margin-top:-40px}
.fh-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.fh-stat-card{background:var(--fh-bg-card);border-radius:var(--fh-radius);padding:28px 24px;position:relative;overflow:hidden;border:1px solid var(--fh-border);transition:transform var(--fh-ease),box-shadow var(--fh-ease)}
.fh-stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.3)}
.fh-stat-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--fh-accent);border-radius:0 2px 2px 0}
.fh-stat-number{font-family:var(--fh-heading);font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:var(--fh-white);line-height:1.1;margin-bottom:4px}
.fh-stat-label{font-size:.85rem;color:var(--fh-muted);font-weight:500}

/* ABOUT */
.fh-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
.fh-about-prose p{margin-bottom:16px;font-size:1.05rem}
.fh-about-prose p:last-child{margin-bottom:0}
.fh-about-card{background:var(--fh-bg-card);border:1px solid var(--fh-border);border-radius:var(--fh-radius);padding:36px}
.fh-about-card h3{font-family:var(--fh-heading);font-size:1.1rem;color:var(--fh-white);margin-bottom:20px}
.fh-about-card ul{display:flex;flex-direction:column;gap:14px}
.fh-about-card li{display:flex;align-items:flex-start;gap:12px;font-size:.95rem;line-height:1.5}
.fh-about-card li::before{content:'>';font-family:var(--fh-heading);color:var(--fh-accent);font-weight:700;flex-shrink:0;margin-top:1px}

/* TRACKS */
.fh-tracks-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-top:48px}
.fh-track-card{background:var(--fh-bg-card);border:1px solid var(--fh-border);border-radius:var(--fh-radius);padding:32px 24px;text-align:center;transition:all var(--fh-ease);position:relative;overflow:hidden}
.fh-track-card::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:var(--fh-accent);transition:width var(--fh-ease)}
.fh-track-card:hover::after{width:60%}
.fh-track-card:hover{background:var(--fh-bg-card-hover);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.fh-track-icon{width:48px;height:48px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;background:var(--fh-accent-dim);border-radius:12px}
.fh-track-card h3{font-family:var(--fh-heading);font-size:.85rem;color:var(--fh-white);letter-spacing:.5px}

/* SPONSORS */
.fh-sponsor-section{padding-top:120px;padding-bottom:120px}
.fh-sponsor-eyebrow{font-size:.8125rem;letter-spacing:.28em;margin-bottom:16px}
.fh-sponsor-headline{font-size:clamp(2rem,5.5vw,3.25rem);line-height:1.15;margin-bottom:40px}
.fh-sponsor-container{max-width:min(1320px,100%)}
.fh-sponsors-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;width:100%;margin:32px 0 48px}
@media(min-width:768px){.fh-sponsors-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}}
.fh-sponsor-pill{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;min-height:200px;padding:20px 18px;background:var(--fh-bg-card);border:1px solid var(--fh-border);border-radius:18px;transition:all var(--fh-ease)}
@media(min-width:640px){.fh-sponsor-pill{min-height:206px;padding:22px 20px}}
@media(min-width:1024px){.fh-sponsor-pill{min-height:210px;padding:24px 22px}}
.fh-sponsor-pill:hover{background:var(--fh-bg-card-hover);border-color:var(--fh-accent);transform:translateY(-2px)}
.fh-sponsor-pill img{display:block;height:auto;width:auto;max-height:52px;max-width:100%;object-fit:contain;object-position:center}
@media(min-width:640px){.fh-sponsor-pill img{max-height:60px}}
@media(min-width:1024px){.fh-sponsor-pill img{max-height:72px}}
.fh-sponsor-logo-medo,.fh-sponsor-logo-featherless,.fh-sponsor-logo-publick{max-height:120px!important}
.fh-sponsor-logo-guild{max-height:100px!important}
@media(min-width:640px){.fh-sponsor-logo-guild{max-height:128px!important}}
@media(min-width:1024px){.fh-sponsor-logo-guild{max-height:150px!important}}
.fh-sponsor-logo-n8n{max-height:68px!important}
@media(min-width:640px){.fh-sponsor-logo-n8n{max-height:84px!important}}
@media(min-width:1024px){.fh-sponsor-logo-n8n{max-height:100px!important}}
.fh-sponsor-logo-zo{max-height:108px!important}
@media(min-width:640px){.fh-sponsor-logo-zo{max-height:132px!important}}
@media(min-width:1024px){.fh-sponsor-logo-zo{max-height:154px!important}}
.fh-sponsor-cta-bleed{width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);max-width:100vw;box-sizing:border-box;padding:clamp(40px,6vw,72px) clamp(20px,4vw,48px);background:var(--fh-bg-card);border-top:1px solid var(--fh-border);border-bottom:1px solid var(--fh-border)}
.fh-sponsor-cta{width:100%;text-align:center}
.fh-sponsor-cta h3{font-family:var(--fh-heading);font-size:clamp(1.35rem,3vw,1.75rem);color:var(--fh-white);margin-bottom:16px}
.fh-sponsor-cta p{color:var(--fh-text);margin-bottom:28px;font-size:clamp(1rem,2vw,1.125rem);line-height:1.75;max-width:62ch;margin-left:auto;margin-right:auto}

/* FAQ */
.fh-faq-list{max-width:760px;margin:48px auto 0}
.fh-faq-item{border-bottom:1px solid var(--fh-border)}
.fh-faq-item:first-child{border-top:1px solid var(--fh-border)}
.fh-faq-item summary{display:flex;align-items:center;justify-content:space-between;padding:22px 0;cursor:pointer;font-family:var(--fh-heading);font-size:.9rem;color:var(--fh-white);transition:color var(--fh-ease);list-style:none}
.fh-faq-item summary::-webkit-details-marker{display:none}
.fh-faq-item summary:hover{color:var(--fh-accent)}
.fh-faq-icon{width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:var(--fh-heading);font-size:1.2rem;color:var(--fh-accent);transition:transform var(--fh-ease)}
.fh-faq-item[open] summary .fh-faq-icon{transform:rotate(45deg)}
.fh-faq-answer{padding:0 0 22px;font-size:.95rem;line-height:1.8;color:var(--fh-text);max-width:640px}

/* FOOTER */
.fh-footer{border-top:1px solid var(--fh-border);padding:48px 0}
.fh-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.fh-footer-left{display:flex;align-items:center;gap:16px}
.fh-footer-logo{font-family:var(--fh-heading);font-weight:700;font-size:.95rem;color:var(--fh-white)}
.fh-footer-sep{width:1px;height:20px;background:var(--fh-border)}
.fh-footer-text{font-size:.85rem;color:var(--fh-muted)}
.fh-footer-links{display:flex;gap:24px;align-items:center}
.fh-footer-links a{font-size:.85rem;color:var(--fh-muted);transition:color var(--fh-ease)}
.fh-footer-links a:hover{color:var(--fh-accent)}

/* RESPONSIVE */
@media(max-width:900px){.fh-stats-grid{grid-template-columns:repeat(2,1fr)}.fh-about-grid{grid-template-columns:1fr}.fh-tracks-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){
  .fh-nav-drawer-cta{display:flex;width:100%;margin-top:auto;padding-top:28px;border-top:1px solid rgba(255,255,255,.12)}
  .fh-nav-drawer-register{width:100%;justify-content:center}
  .fh-nav-links{position:fixed;top:0;right:-100%;width:min(300px,86vw);height:100vh;z-index:1100;padding:max(72px,12vh) 28px 32px;background:rgba(28,28,30,.82);backdrop-filter:blur(48px) saturate(180%);-webkit-backdrop-filter:blur(48px) saturate(180%);flex-direction:column;justify-content:flex-start;align-items:stretch;gap:8px;transition:right var(--fh-ease);border-left:1px solid rgba(255,255,255,.12);box-shadow:-16px 0 48px rgba(0,0,0,.35)}
  .fh-nav-links.fh-open{right:0}
  .fh-nav-links > a{font-size:1.05rem;font-weight:600;color:rgba(255,255,255,.92);padding:14px 16px;border-radius:14px;transition:background var(--fh-ease),color var(--fh-ease);text-shadow:none}
  .fh-nav-links > a:hover{color:#fff;background:rgba(255,255,255,.08)}
  .fh-nav-links > a::after{display:none}
  .fh-nav-toggle{display:block;z-index:1150;position:relative}
  .fh-nav-cta{display:none}
  .fh-hero-title{letter-spacing:-1px}
  .fh-section{padding:72px 0}
  .fh-sponsor-cta-bleed{padding:36px 20px}
}
@media(max-width:480px){
  .fh-stats-grid{grid-template-columns:1fr 1fr;gap:12px}
  .fh-stat-card{padding:20px 18px}
  .fh-tracks-grid{grid-template-columns:1fr 1fr;gap:12px}
  .fh-hero-ctas{flex-direction:column;align-items:center}
  .fh-hero-ctas .fh-btn{width:100%;max-width:280px;justify-content:center}
  .fh-footer-inner{flex-direction:column;text-align:center}
  .fh-footer-left{flex-direction:column}
  .fh-footer-sep{display:none}
}
`;
