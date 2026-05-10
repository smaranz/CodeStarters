import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/firehacks")({
  component: FireHacksRedirect,
});

function FireHacksRedirect() {
  useEffect(() => {
    window.location.replace("http://localhost:3000/firehacks");
  }, []);

  return null;
}
