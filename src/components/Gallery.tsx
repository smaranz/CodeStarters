import { Section } from "./Section";

// Replace gradient cards with <img> tags for real photos
const captions = [
  ["Team Collaboration", "from-orange-500 to-red-600"],
  ["Project Demos", "from-yellow-400 to-orange-500"],
  ["Award Ceremony", "from-red-600 to-pink-500"],
  ["Late Night Hacking", "from-orange-600 to-purple-700"],
  ["Workshop Time", "from-yellow-500 to-red-500"],
  ["Opening Ceremony", "from-amber-500 to-orange-600"],
] as const;

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...captions, ...captions];
  return (
    <div className="flex gap-5 w-max" style={{ animation: `marquee 40s linear infinite${reverse ? " reverse" : ""}` }}>
      {items.map(([cap, grad], i) => (
        <div key={i} className={`shrink-0 w-72 h-44 rounded-2xl bg-gradient-to-br ${grad} relative shadow-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 text-white font-semibold drop-shadow">{cap}</div>
        </div>
      ))}
    </div>
  );
}

export function Gallery() {
  return (
    <Section id="gallery" eyebrow="Our Story" title="From Past Events" subtitle="CodeStarters has been running events since 2022. Here's a glimpse.">
      <div className="space-y-5 -mx-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Row />
        <Row reverse />
      </div>
    </Section>
  );
}
