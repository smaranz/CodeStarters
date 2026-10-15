function IceCrystal({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" aria-hidden="true">
      <path
        d="M32 4 L56 28 L32 76 L8 28 Z"
        fill={`url(#iceg-${id})`}
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.6"
      />
      <path d="M32 4 L32 76" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
      <path d="M8 28 H56" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <defs>
        <linearGradient id={`iceg-${id}`} x1="32" y1="4" x2="32" y2="76">
          <stop stopColor="#f4fbff" />
          <stop offset="0.45" stopColor="#9fd4ff" />
          <stop offset="1" stopColor="#3a8ec4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const BITS = [
  { id: "a", cls: "a", left: "6%", top: "18%", delay: "0s" },
  { id: "b", cls: "b", left: "86%", top: "28%", delay: "0.4s" },
  { id: "c", cls: "c", left: "10%", top: "68%", delay: "0.8s" },
  { id: "d", cls: "d", left: "82%", top: "72%", delay: "1.2s" },
] as const;

export function IceBits() {
  return (
    <div className="ice-bits" aria-hidden="true">
      {BITS.map((bit) => (
        <span
          key={bit.id}
          className={`ice-bit ${bit.cls}`}
          style={{ left: bit.left, top: bit.top, transform: "translateY(0px)" }}
        >
          <span className="ice-bit-spin" style={{ animationDelay: bit.delay }}>
            <IceCrystal id={bit.id} />
          </span>
        </span>
      ))}
    </div>
  );
}
