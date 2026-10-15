const FAQS = [
  {
    q: "What is a hackathon?",
    a: "A week where you build something from scratch with a small team, then show it off. There is no exam, no grade, and nothing to lose. Most people come in with no idea what they are making and leave with a thing that works.",
  },
  {
    q: "Who can come?",
    a: "Any high school student. You do not need to be from a particular school, district, or club. You do not need a team either.",
  },
  {
    q: "What if I have never written code?",
    a: "Then you are exactly who we built this for. Workshops start from zero, mentors are around all week, and Best First Hack is a prize only first-timers can win.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Entry is free. You need a laptop, a charger, and decent internet.",
  },
  {
    q: "Do I need a team or an idea?",
    a: "No to both. There is team formation after opening ceremony on Nov 8, and teams are up to four people. Plenty of people show up alone.",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="wrap max-w-[720px]">
        <p className="kick">Questions</p>
        <h2 className="sec-h">
          Frequently <em>asked</em>.
        </h2>
        <div className="mt-8 stagger">
          {FAQS.map((item, index) => (
            <details key={item.q} className="border-t border-white/15 py-4" open={index === 0}>
              <summary className="cursor-pointer list-none font-bold text-white text-lg">{item.q}</summary>
              <p className="mt-2 text-[#d5eefc] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
