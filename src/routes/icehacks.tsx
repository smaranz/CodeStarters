import { IcehacksShell } from "@/components/icehacks/shell";
import { isIceHacksHost } from "@/lib/icehacks-host";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/icehacks")({
  head: () => ({
    meta: [
      { title: "Ice Hacks 2026" },
      {
        name: "description",
        content:
          "An online high school hackathon. November 8–15, 2026. Opening ceremony 6:00 PM PST on Nov 8. Free to attend.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Iceland&display=swap",
      },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && isIceHacksHost()) {
      throw redirect({ href: "/" });
    }
  },
  component: IcehacksLayout,
  notFoundComponent: IcehacksNotFound,
});

function IcehacksLayout() {
  return (
    <IcehacksShell>
      <Outlet />
    </IcehacksShell>
  );
}

function IcehacksNotFound() {
  return (
    <main className="relative z-[2] flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="sec-h">Page not found</h1>
      <p className="lede">That Ice Hacks page is gone.</p>
    </main>
  );
}
