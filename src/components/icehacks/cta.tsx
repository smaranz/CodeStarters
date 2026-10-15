import { ICEHACKS_DEVPOST_URL } from "@/lib/icehacks-host";

export function CTA() {
  return (
    <section id="apply" className="py-24">
      <div className="wrap text-center">
        <h2 className="sec-h">Come build something.</h2>
        <p className="lede mx-auto">Online · November 8–15, 2026 · 100% free</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={ICEHACKS_DEVPOST_URL} target="_blank" rel="noreferrer" className="btn btn-ice">
            Apply now
          </a>
          <a href={ICEHACKS_DEVPOST_URL} target="_blank" rel="noreferrer" className="btn btn-quiet">
            Register
          </a>
        </div>
      </div>
    </section>
  );
}
