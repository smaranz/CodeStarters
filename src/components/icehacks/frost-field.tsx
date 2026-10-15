import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
};

export function FrostField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let flakes: Flake[] = [];
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor(window.innerWidth / 22));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.15 + Math.random() * 0.45,
        vx: -0.15 + Math.random() * 0.3,
        a: 0.25 + Math.random() * 0.45,
      }));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const flake of flakes) {
        flake.y += flake.vy;
        flake.x += flake.vx + Math.sin((frame + flake.y) / 40) * 0.12;
        if (flake.y > window.innerHeight + 8) {
          flake.y = -8;
          flake.x = Math.random() * window.innerWidth;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 247, 255, ${flake.a})`;
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      }
      frame += 1;
      requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="frost-field" aria-hidden="true" />;
}
