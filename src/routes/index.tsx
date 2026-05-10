import { CodeStartersLogo } from "@/assets/logo";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

const navLinks = [
  ["Mission", "#mission"],
  ["Programs", "#programs"],
  ["Events", "#events"],
  ["Team", "#team"],
  ["Sponsors", "#sponsors"],
  ["Donate", "#donate"],
];

const programs = [
  {
    icon: GraduationCap,
    tag: "Education",
    title: "CS & AI Education",
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
    tag: "Web Development",
    title: "Free Websites for Local Businesses",
    desc: "We empower Cupertino's local economy by building professional websites at no cost, managed entirely by student developers gaining real-world experience.",
    bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"],
  },
  {
    icon: Bot,
    tag: "AI Readiness",
    title: "AI Literacy & Responsible Use",
    desc: "We guide the next generation in navigating the AI era with confidence, focusing on ethical implementation, critical thinking, and practical tools.",
    bullets: [
      "Ethical AI principles",
      "Prompt engineering",
      "AI tools for productivity",
      "Critical source evaluation",
    ],
  },
];

const volunteerRoles = [
  "Web Developers",
  "UI/UX Designers",
  "CS & AI Instructors",
  "Outreach & Partnerships",
  "Marketing & Social Media",
  "Vibe Coding",
];

const team = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", role: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "VP", img: "/arnav.webp" },
  { name: "Amogh Bhatta", role: "VP", img: "/amogh.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Education", img: "/sai.webp" },
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeStarters | Empowering the Next Generation" },
      {
        name: "description",
        content:
          "Student-led initiative teaching CS and AI to younger students, building free websites for local Cupertino businesses, and hosting Fire Hacks.",
      },
      { property: "og:title", content: "CodeStarters | Teaching This Generation AI and CS" },
      {
        property: "og:description",
        content:
          "Join CodeStarters to teach, build free websites for local businesses, sponsor our programs, or attend Fire Hacks.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.25]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("CodeStarters volunteer interest");
    return `mailto:codestarters26@gmail.com?subject=${subject}`;
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
    <div className="min-h-screen bg-[#8ec7ea] text-[#0c1525] selection:bg-[#2f8549] selection:text-white">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border px-4 py-3 shadow-xl transition-all duration-300 md:px-6 ${
          scrolled
            ? "border-white/70 bg-white/92 backdrop-blur-xl"
            : "border-white/50 bg-white/88 backdrop-blur"
        }`}
      >
        <a href="/" className="flex items-center gap-3" aria-label="CodeStarters home">
          <CodeStartersLogo size={34} />
          <span className="text-sm font-black tracking-tight sm:text-base">CodeStarters</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:text-[#2f8549]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={mailto}
            className="hidden items-center gap-2 rounded-full bg-[#2f8549] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-[#246c3a] sm:inline-flex"
          >
            Join Us <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2f8549] text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-4 right-4 top-20 z-40 rounded-2xl border border-white/70 bg-white p-4 shadow-xl md:hidden"
          >
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {label}
              </a>
            ))}
            <a
              href={mailto}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#2f8549] px-4 py-3 text-sm font-semibold text-white"
            >
              Join Us <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section
          id="home"
          className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28"
        >
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div>
              <motion.p
                {...fadeUp()}
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-bold text-[#2f8549] shadow-sm backdrop-blur"
              >
                <Sparkles className="h-4 w-4" /> Student-led nonprofit in Cupertino
              </motion.p>
              <motion.h1
                {...fadeUp(0.08)}
                className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#0c1525] sm:text-7xl lg:text-8xl"
              >
                Teaching This Generation AI and CS
              </motion.h1>
              <motion.p
                {...fadeUp(0.16)}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl"
              >
                Student-led initiative teaching CS and AI to younger students while helping small
                businesses grow.
              </motion.p>
              <motion.div {...fadeUp(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#programs"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0c1525] px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  See Our Programs{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a
                  href="/firehacks"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0c1525]/15 bg-white/65 px-6 py-3 font-bold text-[#0c1525] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Fire Hacks <Flame className="h-4 w-4 text-red-500" />
                </a>
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.18)} className="relative min-h-[360px]">
              <motion.div
                animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-2 w-72 rounded-2xl border border-white/70 bg-white/70 p-5 shadow-2xl backdrop-blur sm:w-96"
              >
                <Code2 className="mb-10 h-8 w-8 text-[#2f8549]" />
                <div className="space-y-3 font-mono text-sm text-slate-700">
                  <p>
                    <span className="text-[#2f8549]">const</span> future = students.map(build);
                  </p>
                  <p>
                    <span className="text-[#2f8549]">await</span> teach("AI + CS");
                  </p>
                  <p>ship("websites", "workshops", "events");</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 16, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-4 left-0 w-64 rounded-2xl bg-[#2f8549] p-5 text-white shadow-2xl sm:w-80"
              >
                <Users className="mb-8 h-8 w-8" />
                <p className="text-4xl font-black">3</p>
                <p className="mt-1 text-sm text-white/80">
                  Core programs: education, websites, and responsible AI.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section id="mission" className="px-6 py-24">
          <motion.div {...fadeUp()} className="mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
              Our Mission
            </p>
            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Make computer science and AI accessible to every young student, and help every small
              business in Cupertino build a strong online presence.
            </h2>
          </motion.div>
        </section>

        <section id="programs" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp()} className="mb-12">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
                What We Do
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Three core programs.
              </h3>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-3">
              {programs.map((program, index) => (
                <motion.article
                  key={program.title}
                  {...fadeUp(index * 0.08)}
                  whileHover={{ y: -8 }}
                  className="group rounded-2xl border border-white/60 bg-white/65 p-6 shadow-lg backdrop-blur transition hover:bg-white"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f8549]/10 text-[#2f8549] transition group-hover:scale-110">
                    <program.icon className="h-7 w-7" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2f8549]">
                    {program.tag}
                  </p>
                  <h4 className="mt-3 text-2xl font-black tracking-tight">{program.title}</h4>
                  <p className="mt-3 min-h-[96px] leading-7 text-slate-700">{program.desc}</p>
                  <ul className="mt-6 space-y-3">
                    {program.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                      >
                        <Check className="h-4 w-4 text-[#2f8549]" /> {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="events" className="px-6 py-24">
          <motion.div
            {...fadeUp()}
            className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] bg-[#0c1525] p-7 text-white shadow-2xl md:grid-cols-[1fr_0.85fr] md:p-10"
          >
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-red-400">
                <Flame className="h-4 w-4" /> Flagship event
              </p>
              <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Fire Hacks: our Bay Area high school hackathon
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                One day of building, workshops, and mentorship for hundreds of student hackers. Free
                to attend, sponsored by teams who believe in the next generation of builders.
              </p>
              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-300">
                <span className="rounded-full bg-white/10 px-4 py-2">June 6, 2026</span>
                <span className="rounded-full bg-white/10 px-4 py-2">Bay Area</span>
                <span className="rounded-full bg-white/10 px-4 py-2">200+ hackers</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/firehacks"
                  className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
                >
                  Visit Fire Hacks site <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://discord.gg/utUNdDz3"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Join Discord <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-5 font-black text-red-300">Why it matters</p>
              {[
                "Hands-on software tracks: web, AI/ML, mobile, security, and games.",
                "Industry and university mentors on site all day.",
                "Prizes, meals, and logistics covered. Students just bring a laptop and ideas.",
              ].map((item) => (
                <div key={item} className="mb-4 flex gap-3 text-sm leading-6 text-slate-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-500" /> {item}
                </div>
              ))}
              <a
                href="/firehacks"
                className="mt-4 inline-flex font-bold text-red-300 hover:text-red-200"
              >
                Details, registration, and sponsorship →
              </a>
            </div>
          </motion.div>
        </section>

        <section id="volunteer" className="px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...fadeUp()}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
                Join the community
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
                Build the future with us
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Join our community of passionate students. Gain real-world experience, build your
                resume, and make a tangible impact.
              </p>
              <a
                href={mailto}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2f8549] px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#246c3a]"
              >
                Apply to Volunteer <Send className="h-4 w-4" />
              </a>
            </motion.div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {volunteerRoles.map((role, index) => (
                <motion.div
                  key={role}
                  {...fadeUp(index * 0.05)}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/60 bg-white/65 p-5 text-sm font-black shadow-md backdrop-blur"
                >
                  {role}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="business" className="px-6 py-24">
          <motion.div
            {...fadeUp()}
            className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] bg-white/70 p-6 shadow-xl backdrop-blur lg:grid-cols-[0.8fr_1.2fr] lg:p-10"
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
                Exclusively for Cupertino
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-tight">Need a website?</h3>
              <p className="mt-4 leading-7 text-slate-700">
                We build free professional websites for local Cupertino businesses. Tell us what you
                need and the team will follow up.
              </p>
              <HeartHandshake className="mt-10 h-16 w-16 text-[#2f8549]" />
            </div>
            <form onSubmit={submitBusinessRequest} className="grid gap-4 sm:grid-cols-2">
              <input
                name="business"
                required
                placeholder="Business Name *"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
              />
              <input
                name="owner"
                required
                placeholder="Owner Name *"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email *"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
              />
              <select
                name="category"
                required
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
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
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4"
              />
              <textarea
                name="needs"
                placeholder="What do you need?"
                className="min-h-28 rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-[#2f8549]/20 transition focus:ring-4 sm:col-span-2"
              />
              <label className="flex items-start gap-3 text-sm font-semibold text-slate-700 sm:col-span-2">
                <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#2f8549]" />I
                confirm my business is located in Cupertino, CA.
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0c1525] px-6 py-3 font-bold text-white transition hover:bg-[#17233a] sm:col-span-2">
                Request a Free Website <ArrowRight className="h-4 w-4" />
              </button>
              {formSent && (
                <p className="text-sm font-semibold text-[#2f8549] sm:col-span-2">
                  Opening your email app with the request details.
                </p>
              )}
            </form>
          </motion.div>
        </section>

        <section id="team" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp()} className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
                Our Team
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Meet the team</h3>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
                A group of passionate high schoolers using computer science as a force for good.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {team.map((member, index) => (
                <motion.article
                  key={member.name}
                  {...fadeUp(index * 0.06)}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-2xl bg-white/70 shadow-lg backdrop-blur"
                >
                  <div className="aspect-square overflow-hidden bg-slate-200">
                    <img
                      src={member.img}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-black leading-tight">{member.name}</h4>
                    <p className="mt-1 text-xs font-bold text-[#2f8549]">{member.role}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="sponsors" className="px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <motion.div {...fadeUp()}>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#2f8549]">
                Sponsors
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Supported by partners who believe in our mission
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
                We're grateful to organizations that help us bring CS, AI, and real-world projects
                to students and local businesses.
              </p>
            </motion.div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {sponsors.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  {...fadeUp(index * 0.04)}
                  whileHover={{ y: -5 }}
                  className="flex h-28 items-center justify-center rounded-2xl border border-white/60 bg-white/70 p-5 shadow-md backdrop-blur transition hover:bg-white"
                >
                  {sponsor.img ? (
                    <img
                      src={sponsor.img}
                      alt={sponsor.name}
                      loading="lazy"
                      className="max-h-10 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xl font-black tracking-tight text-slate-800">
                      {sponsor.name}
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="donate" className="px-6 py-24">
          <motion.div
            {...fadeUp()}
            className="mx-auto max-w-5xl rounded-[2rem] bg-[#2f8549] p-8 text-center text-white shadow-2xl sm:p-12"
          >
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/70">
              Support CodeStarters
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Help us teach CS & AI and build free websites for local businesses
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Donations fund workshops, hackathons, tooling, and keep our programs free for students
              and small businesses. Gifts are processed securely through Hack Club Bank.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://hcb.hackclub.com/donations/start/codestarters"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-black text-[#2f8549] transition hover:-translate-y-0.5"
              >
                Donate through HCB <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="mailto:codestarters26@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-black text-white transition hover:bg-white/10"
              >
                Contact us <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#0c1525]/10 pt-8 text-sm font-semibold text-slate-700 md:flex-row">
          <p>© 2026 CodeStarters. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href="https://www.instagram.com/cupertino_codestarters/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-[#2f8549]"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href="/firehacks" className="hover:text-[#2f8549]">
              Fire Hacks
            </a>
            <a href="mailto:codestarters26@gmail.com" className="hover:text-[#2f8549]">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
