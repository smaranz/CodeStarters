import { useEffect, useRef } from "react";

export function FireCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = ref.current!;
    const trail: HTMLDivElement[] = [];
    const onMove = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      const t = document.createElement("div");
      t.className = "fixed pointer-events-none w-2 h-2 rounded-full z-[99]";
      t.style.background = "radial-gradient(circle,#FFD700,#FF5A1F,transparent)";
      t.style.left = `${e.clientX - 4}px`;
      t.style.top = `${e.clientY - 4}px`;
      t.style.transition = "opacity 600ms, transform 600ms";
      document.body.appendChild(t);
      requestAnimationFrame(() => { t.style.opacity = "0"; t.style.transform = "translateY(-12px) scale(0.3)"; });
      setTimeout(() => t.remove(), 700);
      trail.push(t);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99] hidden md:block" style={{ background: "radial-gradient(circle,#FFD700,#FF5A1F)", boxShadow: "0 0 12px #FF5A1F" }} />;
}
