import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Tracks } from "@/components/Tracks";
import { Workshops } from "@/components/Workshops";
import { Schedule } from "@/components/Schedule";
import { Prizes } from "@/components/Prizes";
import { Team } from "@/components/Team";
import { FAQ } from "@/components/FAQ";
import { Sponsors } from "@/components/Sponsors";
import { Register } from "@/components/Register";
import { BecomeSponsor } from "@/components/BecomeSponsor";

import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { FireCursor } from "@/components/FireCursor";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SmoothScroll } from "@/components/SmoothScroll";

export const Route = createFileRoute("/firehacks")({
  head: () => ({
    meta: [
      { title: "FireHacks 2026 — Bay Area High School Hackathon by CodeStarters" },
      { name: "description", content: "FireHacks is a one-day hackathon for Bay Area high schoolers. June 6, 2026. $30K+ in prizes. 100% free." },
      { property: "og:title", content: "FireHacks 2026 — by CodeStarters" },
      { property: "og:description", content: "$30K+ in prizes. June 6, 2026 — Bay Area. Free to attend." },
    ],
  }),
  component: FireHacksPage,
});

function FireHacksPage() {
  return (
    <div className="bg-background text-foreground">
      <SmoothScroll />
      <LoadingScreen />
      <FireCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tracks />
        <Workshops />
        <Schedule />
        <Prizes />
        <Register />
        <Team />
        <Sponsors />
        <BecomeSponsor />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
