import { LogoisumHero } from "@/components/LogoisumHero";
import { MissionSection } from "@/components/MissionSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { VolunteerSection } from "@/components/VolunteerSection";
import { RequestWebsiteSection } from "@/components/RequestWebsiteSection";
import { FoundersSection } from "@/components/FoundersSection";

export default function Home() {
  return (
    <>
      <LogoisumHero />
      <MissionSection />
      <ProgramsSection />
      <VolunteerSection />
      <RequestWebsiteSection />
      <FoundersSection />
    </>
  );
}
