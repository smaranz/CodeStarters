export function Footer() {
  return (
    <footer className="border-t border-white/15 py-8">
      <div className="wrap flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-bold text-white">
          <img src="/icehacks/logo.png" alt="" className="w-6 h-6 object-contain" />
          Ice Hacks
        </a>
        <p className="text-[11px] text-[#d5eefc]">2026 Ice Hacks · stay frost · organized by CodeStarters</p>
        <a
          href="mailto:outreach@codestarters.org"
          className="text-[11px] uppercase tracking-wider text-[#c5ebff] hover:text-white"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
