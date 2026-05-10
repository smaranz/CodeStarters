import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const LEADERSHIP = [
  { name: "Smaran Aramballi Sandarsh", title: "President", img: "/smaran.png" },
  { name: "Aidan Kwan", title: "VP", img: "/aidan.webp" },
  { name: "Arnav Ghildiyal", title: "VP", img: "/arnav.webp" },
  { name: "Robin Zhou", title: "Head of Marketing", img: "/team/robin-zhou.png" },
  { name: "Amogh Bhatta", title: "VP", img: "/amogh.webp" },
  { name: "Sai Sanjit Reddy Vallapureddy", title: "Head of Education", img: "/sai.webp" },
];

const CORE_NAMES = new Set(LEADERSHIP.map((m) => m.name.trim().toLowerCase()));

type Headshot = { src: string; pos?: string };

const HEADSHOTS: Record<string, Headshot> = {
  "shaurya gakhar": { src: "/team/shaurya-gakhar.png" },
  "shreesh basu": { src: "/team/shreesh-basu.png", pos: "50% 5%" },
  "reyansh nankani": { src: "/team/reyansh-nankani.png" },
  "pranav chintalapati": { src: "/team/pranav-c.png" },
  "michael cutsail": { src: "/team/michael-cutsail.png" },
  "arham desai": { src: "/team/arham-desai.png", pos: "50% 38%" },
  "yussef el guerrab": { src: "/team/yussef.webp", pos: "center 15%" },
  "youssef el guerrab": { src: "/team/yussef.webp", pos: "center 15%" },
};

function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 2 && /[a-zA-Z]/.test(trimmed) && !/^\d+$/.test(trimmed);
}

function getHeadshot(name: string): Headshot | undefined {
  const key = name.trim().toLowerCase();
  if (HEADSHOTS[key]) return HEADSHOTS[key];
  for (const [k, v] of Object.entries(HEADSHOTS)) {
    if (key.startsWith(k.split(" ")[0]) || k.startsWith(key.split(" ")[0])) return v;
  }
  return undefined;
}

type Volunteer = { id: string; name: string; interest?: string | null };

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [{ title: "Team — CodeStarters" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from("volunteers")
          .select("id, name, interest")
          .order("created_at", { ascending: true });
        if (Array.isArray(data)) {
          setVolunteers(
            data.filter(
              (v: Volunteer) =>
                isValidName(v.name) &&
                !CORE_NAMES.has(v.name.trim().toLowerCase()),
            ),
          );
        } else {
          setVolunteers([]);
        }
      } catch {
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-12">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <motion.div {...fadeUp(0)} className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[3px] text-muted-foreground">Our Team</p>
          <h1 className="mb-4 font-serif text-5xl italic lg:text-6xl">Everyone on the team</h1>
          <p className="mx-auto max-w-lg text-lg text-muted-foreground">
            Passionate high schoolers building the future of CS education and local business tech.
          </p>
        </motion.div>

        {/* Leadership */}
        <p className="mb-8 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Leadership</p>
        <div className="mb-20 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {LEADERSHIP.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp(i * 0.05)}
              className="flex flex-col items-center text-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <h3 className="mt-3 text-sm font-bold leading-snug">{member.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{member.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Volunteers */}
        <p className="mb-8 text-xs font-bold uppercase tracking-[3px] text-muted-foreground">Volunteers</p>
        {loading && (
          <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading…</span>
          </div>
        )}
        {!loading && volunteers && volunteers.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No additional volunteers yet — be the first to join!
          </p>
        )}
        {!loading && volunteers && volunteers.length > 0 && (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {volunteers.map((v, i) => {
              const hs = getHeadshot(v.name);
              return (
                <motion.div
                  key={v.id}
                  {...fadeUp(i * 0.03)}
                  className="flex flex-col items-center text-center"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-secondary">
                    {hs ? (
                      <img
                        src={hs.src}
                        alt={v.name}
                        className="h-full w-full object-cover grayscale"
                        style={hs.pos ? { objectPosition: hs.pos } : undefined}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">
                          {v.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-bold leading-snug">{v.name}</h3>
                  {v.interest && (
                    <p className="mt-0.5 text-xs text-muted-foreground">{v.interest}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
