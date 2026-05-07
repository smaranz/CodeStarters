import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tracks } from "@/components/Tracks";
import { Sponsors } from "@/components/Sponsors";
import { Team } from "@/components/Team";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/firehacks")({
  head: () => ({
    meta: [
      { title: "Fire Hacks — Bay Area's Premier High School Hackathon" },
      { name: "description", content: "Fire Hacks is a one-day hackathon for 200–300 high school builders in the Bay Area. June 6, 2026. $30K+ in prizes. 100% free. Hosted by CodeStarters." },
      { property: "og:title", content: "Fire Hacks — June 6, 2026" },
      { property: "og:description", content: "One-day high school hackathon in the Bay Area. $30K+ in prizes. 100% free." },
    ],
  }),
  component: FireHacksPage,
});

function FireHacksPage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tracks />
        <Team />
        <Sponsors />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
