import { About } from "@/components/icehacks/about";
import { CTA } from "@/components/icehacks/cta";
import { FAQ } from "@/components/icehacks/faq";
import { Footer } from "@/components/icehacks/footer";
import { Hero } from "@/components/icehacks/hero";
import { Navbar } from "@/components/icehacks/navbar";
import { Reveal } from "@/components/icehacks/reveal";
import { Schedule } from "@/components/icehacks/schedule";
import { Sponsors } from "@/components/icehacks/sponsors";
import { Stats } from "@/components/icehacks/stats";
import { Ticker } from "@/components/icehacks/ticker";
import { Tracks } from "@/components/icehacks/tracks";

export function IcehacksHome() {
  return (
    <>
      <Navbar />
      <Ticker />
      <main>
        <Hero />
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Tracks />
        </Reveal>
        <Reveal>
          <Schedule />
        </Reveal>
        <Reveal>
          <FAQ />
        </Reveal>
        <Reveal>
          <CTA />
        </Reveal>
        <Reveal>
          <Sponsors />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
