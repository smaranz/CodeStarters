import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Section } from "./Section";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, v => Math.floor(v).toLocaleString() + suffix);
  useEffect(() => { if (inView) animate(mv, to, { duration: 2, ease: "easeOut" }); }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { icon: "🧑‍💻", value: 300, suffix: "", label: "Hackers Expected" },
  { icon: "🔥", value: 1, suffix: " Day", label: "Of Building" },
  { icon: "💰", value: 30, suffix: "K+", label: "In Prizes" },
  { icon: "🎟️", value: 100, suffix: "%", label: "Free to Attend" },
];

export function About() {
  return (
    <Section id="about" eyebrow="The Spark" title="What is FireHacks?" subtitle="CodeStarters' flagship Bay Area hackathon for high school students.">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center text-lg text-gray-400 leading-relaxed mb-16">
        One day of building, workshops, and mentorship for hundreds of student hackers. Free to attend, sponsored by teams who believe in the next generation of builders. Whether you're a seasoned coder or picking up your first keyboard — bring a laptop and ideas, we cover the rest.
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="relative p-6 sm:p-8 rounded-2xl bg-[#1a0a0a] border border-red-950/50 overflow-hidden">
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-3xl sm:text-4xl font-bold text-red-500">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
