import { CodeStartersLogo } from "@/assets/logo";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Hls from "hls.js";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  Code2,
  ExternalLink,
  Flame,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Mail,
  Menu,
  Send,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const navLinks = [
  ["Home", "#home"],
  ["Mission", "#mission"],
  ["Programs", "#programs"],
  ["Events", "#events"],
  ["Team", "#team"],
  ["Donate", "#donate"],
];

const programs = [
  {
    icon: GraduationCap,
    name: "CS & AI Education",
    desc: "Our volunteers teach foundational and advanced topics to equip younger students with the skills they need for the future.",
    bullets: [
      "Python fundamentals",
      "Introduction to AI",
      "AI Literacy & Safety",
      "Web development basics",
    ],
  },
  {
    icon: Building2,
    name: "Free Websites for Local Businesses",
    desc: "We empower Cupertino's local economy by building professional websites at no cost, managed entirely by student developers gaining real-world experience.",
    bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"],
  },
  {
    icon: Bot,
    name: "AI Literacy & Responsible Use",
    desc: "We guide the next generation in navigating the AI era with confidence, focusing on ethical implementation, critical thinking, and practical tools.",
    bullets: [
      "Ethical AI principles",
      "Prompt engineering",
      "AI tools for productivity",
      "Critical source evaluation",
    ],
  },
];

const team = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", role: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "VP", img: "/arnav.webp" },
  { name: "Amogh Bhatta", role: "VP", img: "/amogh.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Education", img: "/sai.webp" },
];

const extendedTeam = [
  { name: "Reyansh Nankani", role: "UI/UX Designer", img: "/team/reyansh-nankani.png" },
  { name: "Arham Desai", role: "CS & AI Instructor", img: "/team/arham-desai.png" },
  { name: "Shaurya Gakhar", role: "CS & AI Instructor", img: "/team/shaurya-gakhar.png" },
  { name: "Robin Zhou", role: "Social Media Manager", img: "/team/robin-zhou.png" },
  { name: "Pranav C", role: "AI Lead & Vibe Coder", img: "/team/pranav-c.png" },
  { name: "Shreesh Basu", role: "Social Media Manager", img: "/team/shreesh-basu.png" },
  { name: "Michael Cutsail", role: "CS & AI Instructor", img: "/team/michael-cutsail.png" },
];

const sponsors = [
  { name: "CodeCrafters", url: "https://codecrafters.io", img: "/sponsors/codecrafters.svg" },
  { name: "Gen.xyz", url: "https://gen.xyz", img: "/sponsors/genxyz.png" },
  { name: "Relay", url: "https://relay.app", img: "/sponsors/relay.webp" },
  { name: "Medo", url: "https://medo.com", img: "/sponsors/medo.png" },
  { name: "Featherless AI", url: "https://featherless.ai", img: "/sponsors/featherless.png" },
  { name: "n8n", url: "https://n8n.io", img: "/sponsors/n8n.png" },
  { name: "Publick", url: "https://publick.xyz", img: "/sponsors/publick.png" },
  { name: "Guild.ai", url: "https://www.guild.ai/" },
  { name: "Zo Computer", url: "https://zo.computer/", img: "/sponsors/zo-computer.svg" },
];

const volunteerRoles = [
  "Web Developers",
  "UI/UX Designers",
  "CS & AI Instructors",
  "Outreach & Partnerships",
  "Marketing & Social Media",
  "Vibe Coding",
];

const missionWords =
  "Make computer science and AI accessible to every young student, and help every small business in Cupertino build a strong online presence.".split(
    " ",
  );

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeStarters | Empowering the Next Generation" },
      {
        name: "description",
        content:
          "Student-led initiative teaching CS and AI to younger students, building free websites for local Cupertino businesses, and hosting Fire Hacks.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start 75%", "end 45%"],
  });

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("CodeStarters volunteer interest");
    return `mailto:codestarters26@gmail.com?subject=${subject}`;
  }, []);

  useEffect(() => {
    const video = ctaVideoRef.current;
    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  function submitBusinessRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = encodeURIComponent(
      [
        `Business: ${form.get("business")}`,
        `Owner: ${form.get("owner")}`,
        `Email: ${form.get("email")}`,
        `Phone: ${form.get("phone") || "Not provided"}`,
        `Category: ${form.get("category")}`,
        `About: ${form.get("about") || "Not provided"}`,
        `Needs: ${form.get("needs") || "Not provided"}`,
      ].join("\n"),
    );
    window.location.href = `mailto:codestarters26@gmail.com?subject=Free%20Cupertino%20Website%20Request&body=${body}`;
    setFormSent(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4 md:px-28">
        <a href="#home" className="flex items-center gap-3" aria-label="CodeStarters home">
          <CodeStartersLogo size={28} white />
          <span className="text-lg font-bold">CodeStarters</span>
        </a>

        <div className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.slice(0, 4).map(([label, href], index) => (
            <div key={label} className="flex items-center">
              <a
                href={href}
                className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
              {index < 3 && <span className="text-muted-foreground/40">•</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/cupertino_codestarters/"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://discord.gg/utUNdDz3"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass hidden h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 sm:flex"
            aria-label="Discord"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.62 12.62 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.226 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-2xl border border-border bg-card p-4 md:hidden"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-55 grayscale"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-[1] h-64 bg-gradient-to-t from-background to-transparent" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center md:pt-32">
            <motion.div {...fadeUp(0)} className="mb-8 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                Student-led builders teaching the next generation
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mb-6 text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
            >
              Teaching <span className="font-serif font-normal italic">AI</span> and CS
            </motion.h1>
            <motion.p
              {...fadeUp(0.2)}
              className="text-hero-subtitle mx-auto mb-12 max-w-2xl text-lg"
            >
              Student-led initiative teaching CS and AI to younger students while helping small
              businesses grow.
            </motion.p>
            <motion.div
              {...fadeUp(0.3)}
              className="liquid-glass mx-auto flex max-w-xl flex-col items-center gap-2 rounded-3xl p-2 sm:flex-row sm:rounded-full"
            >
              <a
                href="#programs"
                className="flex-1 px-6 py-3 text-center font-medium text-foreground"
              >
                See our programs
              </a>
              <motion.a
                href={mailto}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-foreground px-8 py-3 font-medium text-background"
              >
                JOIN US
              </motion.a>
            </motion.div>
          </div>
        </section>

        <section id="programs" className="px-6 pb-6 pt-52 md:pb-9 md:pt-64">
          <motion.h2 {...fadeUp(0)} className="mb-6 text-center text-5xl md:text-7xl lg:text-8xl">
            Three core <span className="font-serif italic">programs.</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="mx-auto mb-24 max-w-2xl text-center text-lg text-muted-foreground"
          >
            We make computer science and AI accessible to young students and help Cupertino
            businesses build a stronger online presence.
          </motion.p>

          <div className="mx-auto mb-20 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
            {programs.map((program, index) => (
              <motion.article
                key={program.name}
                {...fadeUp(0.2 + index * 0.1)}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 flex h-[200px] w-[200px] items-center justify-center rounded-2xl bg-secondary">
                  <program.icon className="h-16 w-16 text-foreground/80" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{program.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{program.desc}</p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {program.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center justify-center gap-2">
                      <Check className="h-3.5 w-3.5 text-foreground/70" /> {bullet}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="mission" ref={missionRef} className="relative px-6 pb-32 pt-0 md:pb-44">
          <motion.div {...fadeUp(0)} className="mb-16 flex justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[min(800px,82vw)] w-[min(800px,82vw)] rounded-2xl object-cover grayscale"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
            />
          </motion.div>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-2xl font-medium leading-relaxed tracking-[-1px] md:text-4xl lg:text-5xl">
              {missionWords.map((word, index) => (
                <RevealWord
                  key={`${word}-${index}`}
                  index={index}
                  total={missionWords.length}
                  progress={missionProgress}
                  highlight={["computer", "science", "AI", "Cupertino"].includes(
                    word.replace(/[,.]/g, ""),
                  )}
                >
                  {word}
                </RevealWord>
              ))}
            </p>
            <motion.p
              {...fadeUp(0.2)}
              className="mx-auto mt-10 max-w-3xl text-xl text-muted-foreground md:text-2xl lg:text-3xl"
            >
              Workshops, school partnerships, community events, free local websites, and Fire Hacks
              all connect back to one goal: helping students build useful things with clarity.
            </motion.p>
          </div>
        </section>

        <section id="events" className="border-t border-border/30 px-6 py-32 md:py-44">
          <motion.p
            {...fadeUp(0)}
            className="mb-6 text-center text-xs uppercase tracking-[3px] text-muted-foreground"
          >
            FLAGSHIP EVENT
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="mb-16 text-center text-4xl md:text-6xl">
            Fire Hacks for <span className="font-serif italic">student builders</span>
          </motion.h2>
          <motion.div {...fadeUp(0.2)} className="mx-auto mb-16 max-w-5xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="aspect-[3/1] w-full rounded-2xl object-cover grayscale"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4"
            />
          </motion.div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-4">
            {[
              ["June 6, 2026", "One packed day of building in the Bay Area."],
              ["200+ hackers", "High school students building real software."],
              ["$30K+ prizes", "Sponsor-backed awards, meals, and logistics."],
              ["100% free", "Students bring a laptop, ideas, and curiosity."],
            ].map(([title, desc], index) => (
              <motion.div key={title} {...fadeUp(0.3 + index * 0.1)} className="text-center">
                <h3 className="mb-2 text-base font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.65)} className="mt-12 flex justify-center">
            <a
              href="/firehacks"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 font-medium text-background"
            >
              Visit Fire Hacks <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </section>

        <section id="volunteer" className="border-t border-border/30 px-6 py-32 md:py-44">
          <motion.h2 {...fadeUp(0)} className="text-center text-4xl md:text-6xl">
            Build the future <span className="font-serif italic">with us</span>
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="mx-auto mt-5 max-w-2xl text-center text-lg text-muted-foreground"
          >
            Join our community of passionate students. Gain real-world experience, build your
            resume, and make a tangible impact.
          </motion.p>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3">
            {volunteerRoles.map((role, index) => (
              <motion.div
                key={role}
                {...fadeUp(0.2 + index * 0.05)}
                whileHover={{ y: -4 }}
                className="liquid-glass rounded-2xl p-5 text-center text-sm font-medium"
              >
                {role}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="business" className="border-t border-border/30 px-6 py-32 md:py-44">
          <motion.div
            {...fadeUp(0)}
            className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[0.85fr_1.15fr]"
          >
            <div>
              <HeartHandshake className="mb-8 h-12 w-12 text-foreground/80" />
              <p className="mb-6 text-xs uppercase tracking-[3px] text-muted-foreground">
                EXCLUSIVELY FOR CUPERTINO
              </p>
              <h2 className="text-4xl md:text-6xl">
                Need a <span className="font-serif italic">website?</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                We build free professional websites for local Cupertino businesses. Fill out the
                form to get started.
              </p>
            </div>
            <form onSubmit={submitBusinessRequest} className="grid gap-4 sm:grid-cols-2">
              <input
                name="business"
                required
                placeholder="Business Name *"
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              />
              <input
                name="owner"
                required
                placeholder="Owner Name *"
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email *"
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              />
              <select
                name="category"
                required
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              >
                <option value="">Select a category</option>
                <option>Restaurant / Cafe</option>
                <option>Retail / Shop</option>
                <option>Service Provider</option>
                <option>Nonprofit</option>
                <option>Other</option>
              </select>
              <input
                name="about"
                placeholder="About your business"
                className="rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2"
              />
              <textarea
                name="needs"
                placeholder="What do you need?"
                className="min-h-28 rounded-xl bg-input px-4 py-3 outline-none ring-ring/30 focus:ring-2 sm:col-span-2"
              />
              <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
                <input required type="checkbox" className="mt-1 h-4 w-4 accent-white" />I confirm my
                business is located in Cupertino, CA.
              </label>
              <button className="rounded-full bg-foreground px-8 py-3 font-medium text-background sm:col-span-2">
                Request a Free Website
              </button>
              {formSent && (
                <p className="text-sm text-muted-foreground sm:col-span-2">
                  Opening your email app with the request details.
                </p>
              )}
            </form>
          </motion.div>
        </section>

        <section id="team" className="border-t border-border/30 px-6 py-32">
          <motion.div {...fadeUp(0)} className="mb-16 text-center">
            <p className="mb-6 text-xs uppercase tracking-[3px] text-muted-foreground">OUR TEAM</p>
            <h2 className="text-4xl md:text-6xl">
              Meet the <span className="font-serif italic">team</span>
            </h2>
          </motion.div>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((member, index) => (
              <motion.article
                key={member.name}
                {...fadeUp(0.1 + index * 0.08)}
                whileHover={{ y: -6 }}
                className="text-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  className="aspect-square w-full rounded-[22px] object-cover grayscale"
                />
                <h3 className="mt-6 text-lg font-bold leading-tight">{member.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{member.role}</p>
              </motion.article>
            ))}
          </div>

          <div className="mx-auto mt-24 max-w-6xl">
            <motion.div {...fadeUp(0)} className="mb-12 text-center">
              <p className="mb-4 text-xs uppercase tracking-[3px] text-muted-foreground">
                EXTENDED TEAM
              </p>
              <h3 className="text-3xl md:text-4xl">
                More people making it <span className="font-serif italic">happen</span>
              </h3>
            </motion.div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 lg:grid-cols-5">
              {extendedTeam.map((member, index) => (
                <motion.article
                  key={member.name}
                  {...fadeUp(0.05 + index * 0.05)}
                  whileHover={{ y: -6 }}
                  className="text-center"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="aspect-square w-full rounded-[22px] object-cover grayscale"
                  />
                  <h4 className="mt-6 text-base font-bold leading-tight">{member.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{member.role}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="sponsors" className="border-t border-border/30 px-6 py-32">
          <motion.div {...fadeUp(0)} className="mx-auto max-w-5xl text-center">
            <p className="mb-6 text-xs uppercase tracking-[3px] text-muted-foreground">SPONSORS</p>
            <h2 className="text-4xl md:text-6xl">
              Supported by <span className="font-serif italic">partners</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              We're grateful to organizations that help us bring CS, AI, and real-world projects to
              students and local businesses.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((sponsor, index) => (
              <motion.a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                {...fadeUp(0.1 + index * 0.04)}
                whileHover={{ scale: 1.04 }}
                className="liquid-glass flex h-24 items-center justify-center rounded-2xl p-5"
              >
                {sponsor.img ? (
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    loading="lazy"
                    className="max-h-9 max-w-full object-contain brightness-0 invert"
                  />
                ) : (
                  <span className="text-lg font-bold">{sponsor.name}</span>
                )}
              </motion.a>
            ))}
          </div>
        </section>

        <section
          id="donate"
          className="relative overflow-hidden border-t border-border/30 px-6 py-32 md:py-44"
        >
          <video
            ref={ctaVideoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 z-[1] bg-background/45" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <motion.div {...fadeUp(0)} className="relative mx-auto mb-8 h-10 w-10">
              <div className="absolute inset-0 h-10 w-10 rounded-full border-2 border-foreground/60" />
              <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/60" />
            </motion.div>
            <motion.h2 {...fadeUp(0.1)} className="mb-6 font-serif text-4xl italic md:text-6xl">
              Start Your Journey
            </motion.h2>
            <motion.p {...fadeUp(0.2)} className="mb-12 text-muted-foreground">
              Help us teach CS & AI, host Fire Hacks, and build free websites for local businesses.
            </motion.p>
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://hcb.hackclub.com/donations/start/codestarters"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-foreground px-8 py-3.5 font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Donate Now
              </a>
              <a href={mailto} className="liquid-glass rounded-lg px-8 py-3.5 font-medium">
                Apply to Volunteer
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-between gap-4 px-8 py-12 md:flex-row md:px-28">
        <p className="text-sm text-muted-foreground">© 2026 CodeStarters. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href="/firehacks"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Fire Hacks
          </a>
          <a
            href="mailto:codestarters26@gmail.com"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </a>
          <a
            href="https://www.instagram.com/cupertino_codestarters/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

function RevealWord({
  children,
  index,
  total,
  progress,
  highlight = false,
}: {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  highlight?: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.18);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={highlight ? "text-foreground" : "text-hero-subtitle"}
    >
      {children}{" "}
    </motion.span>
  );
}
