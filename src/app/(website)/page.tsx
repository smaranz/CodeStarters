import { LogoisumHero } from "@/components/LogoisumHero";
import { MissionSection } from "@/components/MissionSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { EventsSection } from "@/components/EventsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { RequestWebsiteSection } from "@/components/RequestWebsiteSection";
import { FoundersSection } from "@/components/FoundersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { DonationSection } from "@/components/DonationSection";

export default function Home() {
  return (
    <>
      <LogoisumHero />
      <MissionSection />
      <ProgramsSection />
      <EventsSection />
      <VolunteerSection />
      <RequestWebsiteSection />
      <FoundersSection />
      <SponsorsSection />
      <DonationSection />
    </>
  );
}
