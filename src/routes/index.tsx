import { CodeStartersLogo } from "@/assets/logo";
import { SummerSignupForm } from "@/components/SummerSignupForm";
import { VolunteerForm } from "@/components/VolunteerForm";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, MotionValue, useMotionValue, useTransform } from "framer-motion";
import Hls from "hls.js";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Code2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Instagram,
  Megaphone,
  Menu,
  Palette,
  Sparkles,
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
  ["Summer", "#summer"],
  ["Events", "#events"],
  ["Team", "#team"],
  ["Donate", "#donate"],
];

const summerBootcamps = [
  { name: "Advanced CS", eligibility: "5th grade+", desc: "Algorithms, data structures, and project-based problem solving." },
  { name: "Basic CS", eligibility: "All grades", desc: "Beginner-friendly computing, logic, and coding fundamentals." },
  { name: "AI Development", eligibility: "Open to anyone", desc: "Build practical AI tools with modern APIs and responsible workflows." },
  { name: "Python", eligibility: "All grades", desc: "Hands-on Python foundations through small apps and exercises." },
];

const programs = [
  {
    img: "/cs-education.png",
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
    img: "/free-websites.png",
    name: "Free Websites for Local Businesses",
    desc: "We empower Cupertino's local economy by building professional websites at no cost, managed entirely by student developers gaining real-world experience.",
    bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"],
  },
  {
    img: "/ai-literacy.png",
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

const featuredTeam = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Amogh Bhatta", role: "VP", img: "/amogh.webp" },
];

const restOfTeam = [
  { name: "Aidan Kwan", role: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "Basic CS Mentor", img: "/arnav.webp" },
  { name: "Robin Zhou", role: "Head of Marketing", img: "/robin.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Education", img: "/sai.webp" },
];

const teamMembers = [...featuredTeam, ...restOfTeam];

const sponsors = [
  { name: "CodeCrafters", url: "https://codecrafters.io", img: "/sponsors/codecrafters.svg", fitClass: "h-16 max-w-[90%]" },
  { name: "Gen.xyz", url: "https://gen.xyz", img: "/sponsors/genxyz.png", fitClass: "h-14 max-w-[88%]" },
  { name: "Relay", url: "https://relay.app", img: "/sponsors/relay.webp", fitClass: "h-14 max-w-[88%]" },
  { name: "Medo", url: "https://medo.com", img: "/sponsors/medo.png", fitClass: "h-14 max-w-[86%]" },
  { name: "Featherless AI", url: "https://featherless.ai", img: "/sponsors/featherless.png", fitClass: "h-16 max-w-[90%]" },
  { name: "n8n", url: "https://n8n.io", img: "/sponsors/n8n.png", fitClass: "h-16 max-w-[88%]" },
  { name: "InsForge", url: "https://insforge.dev/", img: "/sponsors/insoforge.svg", fitClass: "h-20 max-w-[72%]" },
  { name: "Publick", url: "https://publick.xyz", img: "/sponsors/publick.png", fitClass: "h-14 max-w-[86%]" },
  { name: "Guild.ai", url: "https://www.guild.ai/", img: "/sponsors/guild-ai.png", fitClass: "h-16 max-w-[92%]" },
  { name: "Zo Computer", url: "https://zo.computer/", img: "/sponsors/zo-computer.svg", fitClass: "h-16 max-w-[92%]" },
];

const volunteerRoles = [
  { name: "Web Developers", Icon: Code2 },
  { name: "UI/UX Designers", Icon: Palette },
  { name: "CS & AI Instructors", Icon: GraduationCap },
  { name: "Outreach & Partnerships", Icon: Handshake },
  { name: "Marketing & Social Media", Icon: Megaphone },
  { name: "Vibe Coding", Icon: Sparkles },
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
  const [showSummerSignupForm, setShowSummerSignupForm] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const ctaVideoRef = useRef<HTMLVideoElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const missionProgress = useMotionValue(0);

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

  useEffect(() => {
    const section = missionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      missionProgress.set(progress);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [missionProgress]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav className={`fixed z-50 flex items-center justify-between nav-glass transition-all duration-300 ${scrolled ? "left-6 right-6 top-2 rounded-xl px-5 py-2" : "left-6 right-6 top-6 rounded-2xl px-6 py-4 md:left-10 md:right-10"}`}>
        <a href="#home" className="flex items-center gap-3" aria-label="CodeStarters home">
          <CodeStartersLogo size={28} white />
          <span className="text-lg font-bold">CodeStarters</span>
        </a>

        <div className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.slice(0, 5).map(([label, href], index) => (
            <div key={label} className="flex items-center">
              <a
                href={href}
                className="px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
              {index < 4 && <span className="text-muted-foreground/40">•</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/codestarters_cupertino/"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://hcb.hackclub.com/donations/start/codestarters"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Donate
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

          <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 text-center md:pt-20">
            <motion.h1
              {...fadeUp(0)}
              className="mb-5 text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
            >
              Teaching <span className="font-serif font-normal italic">AI</span> and CS
            </motion.h1>
            <motion.p
              {...fadeUp(0.1)}
              className="text-hero-subtitle mx-auto mb-12 max-w-2xl text-lg"
            >
              Student-led initiative teaching CS and AI to younger students while helping small
              businesses grow.
            </motion.p>
            <motion.div
              {...fadeUp(0.2)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#programs"
                className="font-medium text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white/70 pb-0.5"
              >
                See our programs →
              </a>
              <motion.button
                onClick={() => setShowSummerSignupForm(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Summer Signups
              </motion.button>
              <motion.button
                onClick={() => setShowVolunteerForm(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-white px-8 py-3 font-medium text-black"
              >
                JOIN US
              </motion.button>
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
                <div className="mx-auto mb-6 h-[200px] w-[200px] overflow-hidden rounded-2xl">
                  <img src={program.img} alt={program.name} className="h-full w-full object-cover grayscale" />
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

        <section id="summer" className="border-t border-border/30 px-6 py-32 md:py-44">
          <motion.div {...fadeUp(0)} className="mx-auto max-w-5xl text-center">
            <p className="mb-6 text-xs uppercase tracking-[3px] text-muted-foreground">SUMMER PROGRAM</p>
            <h2 className="text-4xl md:text-6xl">
              1-week bootcamp <span className="font-serif italic">signups are open.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              We&apos;re opening interest signups for four main CodeStarters summer classes. Exact dates are TBD.
            </p>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-4">
            {summerBootcamps.map((bootcamp, index) => (
              <motion.article
                key={bootcamp.name}
                {...fadeUp(0.15 + index * 0.06)}
                whileHover={{ y: -5 }}
                className="liquid-glass rounded-2xl p-6"
              >
                <CalendarDays className="mb-8 h-6 w-6 text-white/70" />
                <h3 className="mb-3 text-lg font-semibold">{bootcamp.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{bootcamp.desc}</p>
                <p className="mt-6 text-xs uppercase tracking-[2px] text-white/50">1 week · Date TBD</p>
                <p className="mt-2 text-xs uppercase tracking-[2px] text-white/50">{bootcamp.eligibility}</p>
              </motion.article>
            ))}
          </div>

          <motion.div {...fadeUp(0.45)} className="mt-12 flex justify-center">
            <motion.button
              onClick={() => setShowSummerSignupForm(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-10 py-3.5 font-medium text-background"
            >
              Sign Up for Summer <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </section>

        <section id="mission" ref={missionRef} className="h-[500vh] relative">
          <div className="sticky top-0 h-screen bg-black flex items-center justify-center overflow-hidden">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <p className="text-2xl font-medium leading-relaxed tracking-[-1px] md:text-4xl lg:text-5xl text-white">
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
            </div>
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
              target="_blank"
              rel="noreferrer"
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
            {volunteerRoles.map(({ name, Icon }, index) => (
              <motion.div
                key={name}
                {...fadeUp(0.2 + index * 0.05)}
                whileHover={{ y: -4 }}
                className="liquid-glass flex items-center gap-3 rounded-2xl p-5 text-sm font-medium"
              >
                <Icon className="h-5 w-5 shrink-0 text-white/70" />
                {name}
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.55)} className="mt-10 flex justify-center">
            <motion.button
              onClick={() => setShowVolunteerForm(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-foreground px-10 py-3.5 font-medium text-background"
            >
              Join Us
            </motion.button>
          </motion.div>
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
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 xl:grid-cols-6">
            {teamMembers.map((member, index) => (
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
                className="liquid-glass flex h-36 items-center justify-center rounded-2xl p-4 sm:p-5"
              >
                {sponsor.img ? (
                  <img
                    src={sponsor.img}
                    alt={sponsor.name}
                    loading="lazy"
                    className={`object-contain brightness-0 invert ${sponsor.fitClass ?? "h-14 max-w-[88%]"}`}
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
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 z-[1] bg-background/60" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <motion.div {...fadeUp(0)} className="mb-6 flex justify-center">
                <CodeStartersLogo size={36} white />
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="mb-3 font-serif text-4xl italic md:text-5xl">
                Support CodeStarters
              </motion.h2>
              <motion.p {...fadeUp(0.15)} className="text-muted-foreground">
                Every dollar helps us teach CS & AI, host Fire Hacks, and build free websites for local businesses.
              </motion.p>
            </div>
            <motion.div {...fadeUp(0.2)} className="overflow-hidden rounded-2xl bg-white shadow-2xl">
              <iframe
                src="https://hcb.hackclub.com/donations/start/codestarters"
                className="w-full border-0"
                height={580}
                title="Donate to CodeStarters"
              />
            </motion.div>
          </div>
        </section>
      </main>

      <SummerSignupForm isOpen={showSummerSignupForm} onClose={() => setShowSummerSignupForm(false)} />
      <VolunteerForm isOpen={showVolunteerForm} onClose={() => setShowVolunteerForm(false)} />

      <footer className="flex flex-col items-center justify-between gap-4 px-8 py-12 md:flex-row md:px-28">
        <p className="text-sm text-muted-foreground">© 2026 CodeStarters. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href="/firehacks"
            target="_blank"
            rel="noreferrer"
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
            href="https://www.instagram.com/codestarters_cupertino/"
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
  progress: MotionValue<number>;
  highlight?: boolean;
}) {
  const start = 0.05 + (index / total) * 0.8;
  const end = Math.min(0.95, start + 0.12);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="text-white"
    >
      {children}{" "}
    </motion.span>
  );
}
