import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/firehacks")({
  beforeLoad: () => {
    throw redirect({ to: "/firehacks/member" });
  },
  component: () => null,
});
