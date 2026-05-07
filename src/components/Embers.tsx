import { useEffect, useRef } from "react";

export function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 70;
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vy: -(Math.random() * 0.6 + 0.3) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.3,
      hue: 20 + Math.random() * 40,
      a: Math.random() * 0.8 + 0.2,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `hsla(${p.hue},100%,60%,${p.a})`);
        grad.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
