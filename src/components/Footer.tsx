import { FullFireHacksLogo } from "@/assets/logo";
import { MessageCircle, Instagram, Mail, ExternalLink, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative border-t border-[#1F1F1F] bg-[#0A0A0A] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <FullFireHacksLogo />
            <div className="w-px h-6 bg-[#1F1F1F]" />
            <span className="text-sm text-gray-600">Fire Hacks is a CodeStarters event.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://codestarters.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              codestarters.xyz
            </a>
            <a
              href="https://discord.gg/utUNdDz3"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Discord
            </a>
            <a
              href="mailto:codestarters26@gmail.com"
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              codestarters26@gmail.com
            </a>
            <span className="text-sm text-gray-700">© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
