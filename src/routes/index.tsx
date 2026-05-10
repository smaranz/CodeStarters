import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, ArrowRight, GraduationCap, Globe, Brain, Flame, ExternalLink, Sparkles, Mail, Menu, X } from "lucide-react";
import { CodeStartersLogo } from "@/assets/logo";
import { useState, useEffect } from "react";
import { motion as fm } from "framer-motion";
import Hls from "hls.js";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const programs = [
  { icon: GraduationCap, tag: "Education", title: "CS & AI Education", desc: "Our volunteers teach foundational and advanced topics to equip younger students with the skills they need for the future.", bullets: ["Python fundamentals", "Introduction to AI", "AI Literacy & Safety", "Web development basics"] },
  { icon: Globe, tag: "Web Dev", title: "Free Websites for Local Businesses", desc: "We empower Cupertino's local economy by building professional websites at no cost — managed entirely by student developers.", bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"] },
  { icon: Brain, tag: "AI Literacy", title: "AI Literacy & Responsible Use", desc: "We guide the next generation in navigating the AI era with confidence, focusing on ethical implementation and critical thinking.", bullets: ["Ethical AI principles", "Prompt engineering", "AI tools for productivity", "Critical source evaluation"] },
];

const team = [
  { name: "Smaran Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", role: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "VP", img: "/arnav.webp" },
  { name: "Amogh Bhatta", role: "VP", img: "/amogh.webp" },
  { name: "Sai Vallapureddy", role: "Head of Marketing", img: "/sai.webp" },
];

const sponsors = [
  { name: "CodeCrafters", url: "https://codecrafters.io/", img: "/sponsors/codecrafters.svg" },
  { name: "Gen.xyz", url: "https://gen.xyz/", img: "/sponsors/genxyz.png" },
  { name: "Relay", url: "https://relay.app/", img: "/sponsors/relay.webp" },
  { name: "Medo", url: "https://medo.com/", img: "/sponsors/medo.png" },
  { name: "Featherless AI", url: "https://featherless.ai/", img: "/sponsors/featherless.png" },
  { name: "n8n", url: "https://n8n.io/", img: "/sponsors/n8n.png" },
  { name: "Publick", url: "https://publick.xyz/", img: "/sponsors/publick.png" },
  { name: "Zo Computer", url: "https://zo.computer/", img: "/sponsors/zo-computer.svg" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeStarters | Empowering the Next Generation" },
      { name: "description", content: "Student-led initiative teaching CS and AI to younger students while helping small businesses grow." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-28 py-4 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/30' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 w-7 h-7 rounded-full border-2 border-foreground/60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-foreground/60" />
          </div>
          <span className="font-bold text-lg">Mindloop</span>
        </div>
        <div className="hidden md:flex items-center gap-1 text-sm">
          {["Home", "Mission", "Programs", "Team"].map((link, i) => (
            <div key={link} className="flex items-center">
              <a href={`#${link.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2">{link}</a>
              {i < 3 && <span className="text-muted-foreground/40">•</span>}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"><Instagram className="w-4 h-4" /></button>
          <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"><Linkedin className="w-4 h-4" /></button>
          <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"><Twitter className="w-4 h-4" /></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-[1]" />
        <div className="relative z-10 text-center px-6 pt-28 md:pt-32 max-w-4xl mx-auto">
          <fm.div {...fadeUp(0)} className="flex items-center justify-center gap-2 mb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => <img key={i} src={`/assets/avatar-${i}.png`} alt="" className="w-8 h-8 rounded-full border-2 border-background" />)}
            </div>
            <span className="text-muted-foreground text-sm">7,000+ people already subscribed</span>
          </fm.div>
          <fm.h1 {...fadeUp(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-6">
            Get <span className="font-serif italic font-normal">Inspired</span> with Us
          </fm.h1>
          <fm.p {...fadeUp(0.2)} className="text-hero-subtitle text-lg mb-12 max-w-xl mx-auto">
            Student-led initiative teaching CS and AI to younger students while helping small businesses build their online presence.
          </fm.p>
          <fm.form {...fadeUp(0.3)} onSubmit={(e) => { e.preventDefault(); setEmail(""); }} className="liquid-glass rounded-full p-2 max-w-lg mx-auto flex items-center gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 bg-transparent px-6 py-2 text-foreground placeholder:text-muted-foreground outline-none" />
            <fm.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-foreground text-background rounded-full px-8 py-3 font-medium">SUBSCRIBE</fm.button>
          </fm.form>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pt-52 md:pt-64 pb-32 px-6">
        <fm.h2 {...fadeUp(0)} className="text-5xl md:text-7xl lg:text-8xl text-center mb-6">
          Search has <span className="font-serif italic">changed.</span> Have you?
        </fm.h2>
        <fm.p {...fadeUp(0.1)} className="text-muted-foreground text-lg max-w-2xl mx-auto mb-24 text-center">
          We make computer science and AI accessible to every young student — and help every small business in Cupertino build a strong online presence.
        </fm.p>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20 max-w-5xl mx-auto">
          {programs.map((p, i) => (
            <fm.div key={p.title} {...fadeUp(0.2 + i * 0.1)} className="text-center">
              <div className="w-[200px] h-[200px] mb-6 mx-auto flex items-center justify-center rounded-2xl bg-secondary">
                <p.icon className="w-16 h-16 text-foreground/80" />
              </div>
              <span className="text-xs uppercase tracking-widest text-accent font-medium">{p.tag}</span>
              <h3 className="font-semibold text-base mb-2 mt-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </fm.div>
          ))}
        </div>
        <fm.p {...fadeUp(0.5)} className="text-muted-foreground text-sm text-center">
          If you don't answer the questions, someone else will.
        </fm.p>
      </section>

      {/* Mission Video Section */}
      <section className="pt-0 pb-32 md:pb-44 px-6">
        <fm.div {...fadeUp(0)} className="flex justify-center mb-16">
          <video autoPlay loop muted playsInline className="w-[800px] h-[800px] object-cover rounded-2xl" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4" />
        </fm.div>
        <div className="max-w-4xl mx-auto">
          <fm.p {...fadeUp(0.2)} className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-relaxed text-center">
            We're building a space where <span className="text-foreground">curiosity</span> <span className="text-foreground">meets</span> <span className="text-foreground">clarity</span> — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.
          </fm.p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 md:py-44 px-6 border-t border-border/30">
        <fm.p {...fadeUp(0)} className="text-xs tracking-[3px] uppercase text-muted-foreground text-center mb-6">SOLUTION</fm.p>
        <fm.h2 {...fadeUp(0.1)} className="text-4xl md:text-6xl text-center mb-16">
          The platform for <span className="font-serif italic">meaningful</span> content
        </fm.h2>
        <fm.div {...fadeUp(0.2)} className="max-w-5xl mx-auto mb-16">
          <video autoPlay loop muted playsInline className="w-full rounded-2xl aspect-[3/1] object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" />
        </fm.div>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {["Curated Feed", "Writer Tools", "Community", "Distribution"].map((title, i) => (
            <fm.div key={title} {...fadeUp(0.3 + i * 0.1)} className="text-center">
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm">Handpicked content and tools for creators.</p>
            </fm.div>
          ))}
        </div>
      </section>

      {/* Fire Hacks CTA */}
      <section className="py-32 md:py-44 px-6 border-t border-border/30">
        <fm.div {...fadeUp(0)} className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-red-400 text-sm font-medium uppercase tracking-widest mb-5">
            <Flame className="w-4 h-4" /> Flagship event
          </span>
          <fm.h2 {...fadeUp(0.1)} className="text-4xl sm:text-6xl font-bold leading-[1.05]">
            Fire Hacks 2026
          </fm.h2>
          <fm.p {...fadeUp(0.2)} className="mt-5 text-lg text-muted-foreground max-w-lg mx-auto">
            One day of building, workshops, and mentorship for hundreds of student hackers. Free to attend, sponsored by teams who believe in the next generation.
          </fm.p>
          <fm.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> June 6, 2026</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Bay Area</span>
          </fm.div>
          <fm.div {...fadeUp(0.4)} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="/firehacks" className="px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition flex items-center gap-2">
              Visit Fire Hacks <ArrowRight className="w-4 h-4" />
            </a>
          </fm.div>
        </fm.div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6 border-t border-border/30">
        <fm.h2 {...fadeUp(0)} className="text-4xl md:text-5xl font-bold text-center mb-4">Meet the team</fm.h2>
        <fm.p {...fadeUp(0.1)} className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">High schoolers using computer science as a force for good.</fm.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {team.map((m, i) => (
            <fm.div key={m.name} {...fadeUp(0.2 + i * 0.1)} whileHover={{ y: -4 }} className="text-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-4">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold text-sm">{m.name}</div>
              <div className="text-xs text-accent mt-0.5">{m.role}</div>
            </fm.div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-24 px-6 border-t border-border/30">
        <fm.h2 {...fadeUp(0)} className="text-3xl md:text-4xl font-bold text-center mb-4">Supported by partners</fm.h2>
        <fm.p {...fadeUp(0.1)} className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">Organizations that help us bring CS, AI, and real-world projects to students and local businesses.</fm.p>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {sponsors.map((s, i) => (
            <fm.a key={s.name} href={s.url} target="_blank" rel="noreferrer" {...fadeUp(0.2 + i * 0.05)} whileHover={{ scale: 1.05 }} className="flex items-center justify-center w-36 h-20 rounded-xl bg-secondary border border-border p-4 hover:border-accent transition-all">
              <img src={s.img} alt={s.name} loading="lazy" className="max-h-8 max-w-full object-contain" />
            </fm.a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 md:py-44 px-6 border-t border-border/30 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" />
        <div className="absolute inset-0 bg-background/60 z-[1]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <fm.div {...fadeUp(0)} className="relative w-10 h-10 mx-auto mb-8">
            <div className="absolute inset-0 w-10 h-10 rounded-full border-2 border-foreground/60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-foreground/60" />
          </fm.div>
          <fm.h2 {...fadeUp(0.1)} className="text-4xl md:text-6xl font-serif italic mb-6">Start Your Journey</fm.h2>
          <fm.p {...fadeUp(0.2)} className="text-muted-foreground mb-12">Help us teach CS & AI to the next generation.</fm.p>
          <fm.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://hcb.hackclub.com/donations/start/codestarters" target="_blank" rel="noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-foreground text-background rounded-lg px-8 py-3.5 font-medium hover:bg-foreground/90 transition-colors">Donate Now</a>
            <a href="mailto:codestarters26@gmail.com" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="liquid-glass rounded-lg px-8 py-3.5 font-medium">Contact Us</a>
          </fm.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-28 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">© 2026 CodeStarters. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/cupertino_codestarters/" target="_blank" rel="noreferrer" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Instagram</a>
          <a href="/firehacks" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Fire Hacks</a>
          <a href="mailto:codestarters26@gmail.com" className="text-muted-foreground text-sm hover:text-foreground transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}