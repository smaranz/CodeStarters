export function FlameLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameGrad" x1="20" y1="4" x2="20" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFD700" />
          <stop offset="0.55" stopColor="#FF5A1F" />
          <stop offset="1" stopColor="#C0392B" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 C 22 12, 32 14, 30 26 C 36 24, 38 32, 36 38 C 34 44, 28 47, 20 47 C 11 47, 4 43, 4 34 C 4 27, 10 24, 12 19 C 14 22, 17 22, 17 17 C 17 12, 14 9, 16 4 C 17 8, 20 8, 20 2 Z"
        fill="url(#flameGrad)"
      />
    </svg>
  );
}

export function FullLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <FlameLogo size={34} />
      <div className="leading-none">
        <div className="font-display text-xl font-bold tracking-tight">FireHacks</div>
        <div className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">by CodeStarters</div>
      </div>
    </div>
  );
}
