import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Globe, Brain, Heart, Sparkles, Building2, Instagram, MessageCircle, ExternalLink, Flame, Mail, Menu, X } from "lucide-react";
import { CodeStartersLogo } from "@/assets/logo";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeStarters | Empowering the Next Generation" },
      { name: "description", content: "Student-led initiative teaching CS and AI to younger students while helping small businesses grow." },
    ],
  }),
  component: HomePage,
});

const programs = [
  {
    icon: GraduationCap,
    tag: "Education",
    title: "CS & AI Education",
    desc: "Our volunteers teach foundational and advanced topics to equip younger students with the skills they need for the future.",
    bullets: ["Python fundamentals", "Introduction to AI", "AI Literacy & Safety", "Web development basics"],
    image: "/program_cs_ai.jpg",
  },
  {
    icon: Globe,
    tag: "Web Development",
    title: "Free Websites for Local Businesses",
    desc: "We empower Cupertino's local economy by building professional websites at no cost — managed entirely by student developers gaining real-world experience.",
    bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"],
    image: "/website.webp",
  },
  {
    icon: Brain,
    tag: "AI Readiness",
    title: "AI Literacy & Responsible Use",
    desc: "We guide the next generation in navigating the AI era with confidence, focusing on ethical implementation, critical thinking, and practical tools.",
    bullets: ["Ethical AI principles", "Prompt engineering", "AI tools for productivity", "Critical source evaluation"],
    image: "/ai_literacy.jpg",
  },
];

const volunteerRoles = ["Web Developers", "UI/UX Designers", "CS & AI Instructors", "Outreach & Partnerships", "Marketing & Social Media", "Vibe Coding"];

const team = [
  { name: "Smaran Aramballi Sandarsh", role: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", role: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", role: "VP", img: "/arnav.webp" },
  { name: "Amogh Bhatta", role: "VP", img: "/amogh.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", role: "Head of Marketing", img: "/sai.webp" },
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

function HomePage() {
  return (
    <div className="bg-[#F8F9FB] text-[#111827]">
      <HomeNav />
      <main>
        <HomeHero />
        <Mission />
        <Programs />
        <FireHacksFeature />
        <Volunteer />
        <WebsiteRequest />
        <Team />
        <SponsorsSection />
        <DonateBlock />
      </main>
      <HomeFooter />
    </div>
  );
}

function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
          <CodeStartersLogo size={28} />
          <span className="font-display font-semibold text-lg tracking-tight">CodeStarters</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {["Mission", "Programs", "Events", "Team", "Sponsors", "Donate"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              {item}
            </a>
          ))}
          <a
            href="#volunteer"
            className="ml-3 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Join Us
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-600"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-1">
          {["Mission", "Programs", "Events", "Team", "Sponsors", "Donate"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
            >
              {item}
            </a>
          ))}
          <a
            href="#volunteer"
            onClick={() => setOpen(false)}
            className="block mt-3 text-center px-5 py-3 rounded-full bg-blue-600 text-white font-medium"
          >
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}

function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50" />
      <div className="absolute inset-0 opacity-30">
        <img
          src="/volcano-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9FB]/60 via-[#F8F9FB]/80 to-[#F8F9FB]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-500 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Student-led initiative expanding access to CS education
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tighter"
        >
          Teaching{" "}
          <span className="font-light text-gray-400">This</span>
          <br />
          Generation <span className="text-blue-600">AI and CS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto"
        >
          Student-led initiative teaching CS and AI to younger students while helping small businesses grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#programs"
            className="group px-8 py-4 rounded-full bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition"
          >
            See Our Programs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <Link
            to="/firehacks"
            className="group px-8 py-4 rounded-full border border-gray-300 text-gray-700 font-medium flex items-center gap-2 hover:border-gray-400 transition"
          >
            <Flame className="w-4 h-4 text-red-500" />
            Visit Fire Hacks
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">Our Mission</span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-tight"
        >
          Make computer science and AI{" "}
          <span className="text-blue-600">accessible to every young student</span>{" "}
          — and help every small business in Cupertino build a strong online presence.
        </motion.h2>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">What We Do</span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Three core programs.</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 mb-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                  <p.icon className="w-16 h-16 text-blue-300" />
                </div>
              </div>

              <span className="text-xs uppercase tracking-widest text-blue-600 font-medium">{p.tag}</span>
              <h3 className="mt-2 text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              <ul className="mt-4 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="text-sm flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FireHacksFeature() {
  return (
    <section id="events" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-[#1A0A0A]">
          <div className="grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-red-400 text-sm font-medium uppercase tracking-widest mb-5">
                <Flame className="w-3.5 h-3.5" /> Flagship event
              </span>
              <h2 className="text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-white">
                Fire Hacks
              </h2>
              <p className="mt-5 text-lg text-gray-400 max-w-lg">
                One day of building, workshops, and mentorship for hundreds of student hackers. Hosted by CodeStarters — free to attend, sponsored by teams who believe in the next generation of builders.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  June 6, 2026
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  Bay Area
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/firehacks"
                  className="px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                  Visit Fire Hacks site
                </Link>
                <a
                  href="https://discord.gg/utUNdDz3"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-white/20 text-gray-300 font-medium hover:border-white/40 transition"
                >
                  Join Discord
                </a>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-black text-red-500 leading-none">FIRE</div>
                <div className="text-6xl font-black text-white leading-none mt-1">HACKS</div>
                <div className="mt-4 text-sm text-gray-500">June 6, 2026 • Bay Area</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteer() {
  return (
    <section id="volunteer" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Build the future
          <br />
          <span className="text-blue-600">with us</span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Join our community of passionate students. Gain real-world experience, build your resume, and make a tangible impact.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {volunteerRoles.map((r) => (
            <div
              key={r}
              className="px-5 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700"
            >
              {r}
            </div>
          ))}
        </div>

        <a
          href="mailto:team@codestarters.xyz?subject=Volunteer%20with%20CodeStarters"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          <Sparkles className="w-4 h-4" />
          Apply to Volunteer
        </a>
      </div>
    </section>
  );
}

function WebsiteRequest() {
  return (
    <section id="request-website" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-blue-50 border border-blue-100 p-8 sm:p-12">
          <div className="text-center mb-10">
            <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">Exclusively for Cupertino</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Need a website?</h2>
            <p className="mt-3 text-gray-500">
              We build free professional websites for local Cupertino businesses. Fill out the form to get started.
            </p>
          </div>
          <form className="max-w-lg mx-auto space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Business Name *" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="text" placeholder="Owner Name *" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="email" placeholder="Email *" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="">Type of Business *</option>
              <option>Restaurant / Cafe</option>
              <option>Retail / Shop</option>
              <option>Service Provider</option>
              <option>Nonprofit</option>
              <option>Other</option>
            </select>
            <textarea placeholder="About your business" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea placeholder="What do you need?" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label className="flex items-start gap-3 text-sm text-gray-500">
              <input type="checkbox" required className="mt-0.5 accent-blue-600" />
              I confirm my business is located in Cupertino, CA. *
            </label>
            <button
              type="submit"
              className="w-full px-6 py-3.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Request a Free Website
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">Our Team</span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Meet the team</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            A group of passionate high schoolers using computer science as a force for good.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="font-semibold text-sm">{m.name}</div>
              <div className="text-xs text-blue-600 mt-0.5">{m.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorsSection() {
  return (
    <section id="sponsors" className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">Sponsors</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">Supported by partners</h2>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          We're grateful to organizations that help us bring CS, AI, and real-world projects to students and local businesses.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
          {sponsors.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center w-36 sm:w-44 h-20 rounded-xl bg-white border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <img
                src={s.img}
                alt={s.name}
                loading="lazy"
                className="max-h-10 max-w-full object-contain"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonateBlock() {
  return (
    <section id="donate" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">Support CodeStarters</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
          Help us teach CS &amp; AI
          <br />
          and build free websites for local businesses
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Donations fund workshops, hackathons, tooling, and keep our programs free. Processed securely through Hack Club Bank, our 501(c)(3) fiscal sponsor — tax-deductible.
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 overflow-hidden bg-gray-50">
          <iframe
            src="https://hcb.hackclub.com/donations/start/codestarters"
            title="Donate to CodeStarters"
            className="w-full h-[500px] bg-white"
            loading="lazy"
          />
          <a
            href="https://hcb.hackclub.com/donations/start/codestarters"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Open donation page <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition">
              <CodeStartersLogo size={28} />
              <span className="font-display font-semibold text-lg">CodeStarters</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              Student-led initiative expanding access to CS education and helping small businesses thrive online.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/cupertino_codestarters/" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <Link to="/firehacks"
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition" aria-label="Fire Hacks">
                <Flame className="w-4 h-4" />
              </Link>
              <a href="mailto:hello@codecore.org"
                className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900 mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              {["Mission", "Programs", "Events", "Team", "Sponsors", "Donate"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-500 hover:text-blue-600 transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-gray-900 mb-4">Get Involved</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#volunteer" className="text-gray-500 hover:text-blue-600 transition">Volunteer</a></li>
              <li><a href="#request-website" className="text-gray-500 hover:text-blue-600 transition">Request a Website</a></li>
              <li><a href="https://hcb.hackclub.com/donations/start/codestarters" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-600 transition">Donate</a></li>
              <li><a href="mailto:hello@codecore.org" className="text-gray-500 hover:text-blue-600 transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div>© 2026 CodeStarters Initiative</div>
          <div>Built with purpose by student developers.</div>
        </div>
      </div>
    </footer>
  );
}
