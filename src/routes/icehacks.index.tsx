import { IcehacksHome } from "@/components/icehacks/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/icehacks/")({
  component: IcehacksHome,
});
