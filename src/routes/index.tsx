import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Globe, Heart, Sparkles, GraduationCap, Building2, Instagram, MessageCircle, ExternalLink, Flame, Mail } from "lucide-react";
import { FlameLogo } from "@/assets/logo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FireCursor } from "@/components/FireCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeStarters — Teaching This Generation AI & CS" },
      { name: "description", content: "Student-led 501(c)(3) initiative teaching CS and AI to younger students, building free websites for local Cupertino businesses, and hosting FireHacks — the Bay Area's premier high school hackathon." },
      { property: "og:title", content: "CodeStarters" },
      { property: "og:description", content: "Teaching the next generation AI & CS. Home of FireHacks 2026." },
    ],
  }),
  component: HomePage,
});

const programs = [
  {
    icon: GraduationCap,
    tag: "Education",
    title: "CS & AI Education",
    desc: "Our volunteers teach foundational and advanced topics — Python, intro to AI, AI literacy & safety, web dev — to younger students.",
    bullets: ["Python fundamentals", "Introduction to AI", "AI Literacy & Safety", "Web development basics"],
  },
  {
    icon: Globe,
    tag: "Web Development",
    title: "Free Websites for Local Businesses",
    desc: "We empower Cupertino's local economy by building professional websites at no cost — managed by student developers gaining real-world experience.",
    bullets: ["Restaurants & cafes", "Retail shops", "Service businesses", "Local nonprofits"],
  },
  {
    icon: Brain,
    tag: "AI Readiness",
    title: "AI Literacy & Responsible Use",
    desc: "We guide the next generation in navigating the AI era — ethical implementation, critical thinking, and practical tools.",
    bullets: ["Ethical AI principles", "Prompt engineering", "AI tools for productivity", "Critical source evaluation"],
  },
];

const volunteerRoles = ["Web Developers", "UI/UX Designers", "CS & AI Instructors", "Outreach & Partnerships", "Marketing & Social Media", "Vibe Coding"];

function HomePage() {
  return (
    <div className="bg-cs-background text-cs-foreground">
      <SmoothScroll />
      <FireCursor />
      <HomeNav />
      <main>
        <HomeHero />
        <Mission />
        <Programs />
        <FireHacksFeature />
        <Volunteer />
        <DonateBlock />
      </main>
      <HomeFooter />
    </div>
  );
}

function HomeNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-cs-background/80 backdrop-blur-xl border-b border-cs-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="hover:opacity-80 transition flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-lg font-semibold tracking-tight text-cs-foreground">CodeStarters</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          <a href="#mission" className="px-3 py-2 text-sm text-cs-muted hover:text-cs-foreground transition">Mission</a>
          <a href="#programs" className="px-3 py-2 text-sm text-cs-muted hover:text-cs-foreground transition">Programs</a>
          <a href="#firehacks" className="px-3 py-2 text-sm text-cs-muted hover:text-cs-foreground transition">FireHacks</a>
          <a href="#volunteer" className="px-3 py-2 text-sm text-cs-muted hover:text-cs-foreground transition">Volunteer</a>
          <a href="#donate" className="px-3 py-2 text-sm text-cs-muted hover:text-cs-foreground transition">Donate</a>
          <Link to="/firehacks" className="ml-3 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition inline-flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> FireHacks 2026
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
      >
        <source src="https://cdn.coverr.co/videos/coverr-mountain-landscape-1584/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-cs-background/40 via-cs-background/60 to-cs-background" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cs-border bg-white/20 backdrop-blur text-xs text-white/90 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          501(c)(3) student-led nonprofit · Cupertino, CA
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tighter text-white">
          Teaching <span className="font-light text-white/80">this</span><br />
          Generation AI &amp; CS
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          A student-led initiative making computer science and AI accessible to every young learner — and helping every small business in Cupertino build a strong online presence.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#programs" className="group px-8 py-4 rounded-full bg-white text-gray-900 font-medium flex items-center gap-2 hover:bg-gray-100 transition">
            See our programs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </a>
          <Link to="/firehacks" className="group px-8 py-4 rounded-full border border-white/30 text-white font-medium flex items-center gap-2 hover:border-white hover:bg-white/10 transition">
            <Flame className="w-4 h-4" /> Visit FireHacks 2026
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="py-24 px-6 bg-cs-background">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">Our Mission</div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-cs-foreground">
          Make computer science and AI <span className="text-blue-600">accessible to every young student</span> — and help every small business in Cupertino build a strong online presence.
        </motion.h2>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">What We Do</div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-cs-foreground">Three core programs.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative p-8 rounded-2xl bg-white border border-cs-border hover:shadow-lg transition overflow-hidden">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <p.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-xs uppercase tracking-widest text-blue-600 font-medium mb-2">{p.tag}</div>
                <h3 className="text-2xl font-semibold mb-3 text-cs-foreground">{p.title}</h3>
                <p className="text-sm text-cs-muted leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.bullets.map(b => (
                    <li key={b} className="text-sm flex items-center gap-2 text-cs-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FireHacksFeature() {
  return (
    <section id="firehacks" className="py-24 px-6 bg-cs-background">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-cs-border bg-white">
          <div className="grid lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-xs text-red-600 font-medium uppercase tracking-widest mb-5">
                <Flame className="w-3.5 h-3.5" /> Flagship Event
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-cs-foreground">
                <span className="text-red-600">FireHacks</span> 2026
              </h2>
              <p className="mt-5 text-lg text-cs-muted max-w-lg">
                The Bay Area's premier one-day hackathon for high school builders. Workshops, mentorship, and $30K+ in prizes — 100% free to attend.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                {[
                  ["June 6", "2026"],
                  ["$30K+", "Prizes"],
                  ["200+", "Hackers"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-gray-50 border border-cs-border p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{k}</div>
                    <div className="text-[10px] uppercase tracking-widest text-cs-muted mt-1">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/firehacks" className="group px-6 py-3 rounded-full bg-red-600 text-white font-medium flex items-center gap-2 hover:bg-red-700 transition">
                  Visit FireHacks site <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                <a href="https://discord.gg/ZJtm6hdu" target="_blank" rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-cs-border font-medium hover:border-gray-400 transition inline-flex items-center gap-2 text-cs-foreground">
                  <MessageCircle className="w-4 h-4" /> Join Discord
                </a>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-red-100" />
              <div className="relative h-full w-full flex items-center justify-center">
                <FlameLogo size={200} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Volunteer() {
  return (
    <section id="volunteer" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">Build the future with us</div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-cs-foreground">Join our community of passionate students.</h2>
        <p className="mt-4 text-cs-muted max-w-2xl mx-auto">Gain real-world experience, build your résumé, and make a tangible impact — across these roles:</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {volunteerRoles.map(r => (
            <div key={r} className="px-5 py-2.5 rounded-full border border-cs-border bg-white text-sm text-cs-foreground hover:border-blue-400 hover:text-blue-600 transition cursor-default">
              {r}
            </div>
          ))}
        </div>

        <a href="mailto:team@codestarters.xyz?subject=Volunteer%20with%20CodeStarters"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          <Sparkles className="w-4 h-4" /> Apply to Volunteer
        </a>
      </div>
    </section>
  );
}

function DonateBlock() {
  return (
    <section id="donate" className="py-24 px-6 bg-cs-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm uppercase tracking-[0.2em] text-blue-600 font-medium mb-3">Support CodeStarters</div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-cs-foreground">Help us teach CS &amp; AI<br className="hidden sm:block"/> and build free websites for locals.</h2>
          <p className="mt-4 text-cs-muted max-w-2xl mx-auto">
            Donations fund workshops, hackathons, tooling, and keep our programs free for students and small businesses. Gifts are processed securely through Hack Club Bank, our 501(c)(3) fiscal sponsor — your contribution is tax-deductible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2 p-8 rounded-2xl bg-white border border-cs-border space-y-5">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <div className="font-semibold text-xl text-cs-foreground">Why donate?</div>
              <p className="text-sm text-cs-muted mt-2 leading-relaxed">
                Every dollar goes directly into hands-on programs: classroom supplies, hackathon meals, prize pools, mentor stipends, and free websites for Cupertino businesses.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-cs-muted">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Tax-deductible via Hack Club Bank</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Secure checkout via Stripe</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 100% goes to CodeStarters</li>
            </ul>
            <a href="https://hcb.hackclub.com/codestarters" target="_blank" rel="noreferrer"
              className="text-xs text-cs-muted hover:text-blue-600 inline-flex items-center gap-1.5">
              hcb.hackclub.com/codestarters <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-cs-border overflow-hidden bg-white">
            <iframe
              src="https://hcb.hackclub.com/donations/start/codestarters"
              title="Donate to CodeStarters"
              className="w-full h-[560px] bg-white"
              loading="lazy"
            />
            <a href="https://hcb.hackclub.com/donations/start/codestarters" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-4 bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition">
              Open donation page in new tab <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="relative border-t border-cs-border bg-gray-50 px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="hover:opacity-80 transition flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <div className="leading-none">
                <div className="font-display text-lg font-semibold tracking-tight text-cs-foreground">CodeStarters</div>
                <div className="text-[10px] text-cs-muted tracking-wider uppercase mt-0.5">Cupertino, CA</div>
              </div>
            </Link>
            <p className="mt-4 text-sm text-cs-muted max-w-xs">
              Student-led 501(c)(3) initiative teaching CS &amp; AI and supporting local businesses.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://discord.gg/ZJtm6hdu" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-cs-border flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition" aria-label="Discord">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/codestarters_cupertino/" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-cs-border flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:team@codestarters.xyz"
                className="w-10 h-10 rounded-full bg-white border border-cs-border flex items-center justify-center hover:border-blue-400 hover:text-blue-600 transition" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-cs-muted mb-4">Explore</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#mission" className="text-cs-foreground/80 hover:text-blue-600 transition">Mission</a></li>
              <li><a href="#programs" className="text-cs-foreground/80 hover:text-blue-600 transition">Programs</a></li>
              <li><Link to="/firehacks" className="text-cs-foreground/80 hover:text-blue-600 transition">FireHacks 2026</Link></li>
              <li><a href="#volunteer" className="text-cs-foreground/80 hover:text-blue-600 transition">Volunteer</a></li>
              <li><a href="#donate" className="text-cs-foreground/80 hover:text-blue-600 transition">Donate</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-cs-muted mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:team@codestarters.xyz" className="text-cs-foreground/80 hover:text-blue-600 transition">team@codestarters.xyz</a></li>
              <li><a href="mailto:sponsors@codestarters.xyz" className="text-cs-foreground/80 hover:text-blue-600 transition">sponsors@codestarters.xyz</a></li>
              <li><a href="https://www.instagram.com/codestarters_cupertino/" target="_blank" rel="noreferrer" className="text-cs-foreground/80 hover:text-blue-600 transition">@codestarters_cupertino</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-cs-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cs-muted">
          <div>© 2026 CodeStarters · Fiscally sponsored by Hack Club Bank</div>
          <div className="flex items-center gap-1.5"><Building2 className="w-3 h-3" /> Cupertino, CA</div>
        </div>
      </div>
    </footer>
  );
}
