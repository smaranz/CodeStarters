import { FullLogo } from "@/assets/logo";
import { MessageCircle, Heart, Globe, Instagram, Mail, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  ["About", "#about"],
  ["Tracks", "#tracks"],
  ["Workshops", "#workshops"],
  ["Prizes", "#prizes"],
  ["Register", "#register"],
  ["Team", "#team"],
  ["FAQ", "#faq"],
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-red-950/50 bg-[#0a0505] px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <FullLogo />
            <p className="mt-4 text-red-500 font-medium text-lg">Ignite Your Potential.</p>
            <p className="mt-2 text-gray-600 text-sm max-w-xs">A Bay Area high school hackathon by CodeStarters. June 6, 2026. 100% free, $30K+ in prizes.</p>
            <div className="flex gap-3 mt-5">
              <a href="https://discord.gg/ZJtm6hdu" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a0a0a] border border-red-950/50 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition" aria-label="Discord">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/codestarters_cupertino/" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#1a0a0a] border border-red-950/50 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <Link to="/"
                className="w-10 h-10 rounded-full bg-[#1a0a0a] border border-red-950/50 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition" aria-label="CodeStarters Home">
                <Globe className="w-4 h-4" />
              </Link>
              <a href="mailto:team@codestarters.xyz"
                className="w-10 h-10 rounded-full bg-[#1a0a0a] border border-red-950/50 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-sm uppercase tracking-widest text-gray-600 mb-4">Navigate</div>
            <ul className="space-y-2">
              {navLinks.map(([label, href]) => (
                <li key={label}><a href={href} className="text-gray-400 hover:text-red-500 transition">{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="text-sm uppercase tracking-widest text-gray-600 mb-4">Support CodeStarters</div>
            <div className="rounded-2xl border border-red-950/50 bg-[#1a0a0a] overflow-hidden">
              <div className="p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-950/50 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-300">Donate via Hack Club Bank</div>
                  <div className="text-xs text-gray-600 mt-1">Tax-deductible · Stripe secure · 100% goes to CodeStarters programs and FireHacks.</div>
                </div>
              </div>
              <iframe
                src="https://hcb.hackclub.com/donations/start/codestarters"
                title="Donate to CodeStarters"
                className="w-full h-[420px] bg-white border-t border-red-950/50"
                loading="lazy"
              />
              <a href="https://hcb.hackclub.com/donations/start/codestarters" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition text-sm">
                Open donation page <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-red-950/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div>© 2026 CodeStarters. FireHacks is a student-run event.</div>
          <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noreferrer" className="hover:text-red-500 transition">MLH Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
}
