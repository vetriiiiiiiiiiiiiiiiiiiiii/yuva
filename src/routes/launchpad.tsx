import { createFileRoute } from "@tanstack/react-router";
import { Launchpad } from "@/components/yuva/Launchpad";

export const Route = createFileRoute("/launchpad")({
  head: () => ({
    meta: [
      { title: "Launchpad Phase 2 — YUVA 2026" },
      { name: "description", content: "The startup arena for India's next breakout founders." },
    ],
  }),
  component: LaunchpadPage,
});

function LaunchpadPage() {
  return (
    <div className="pt-20">
      <Launchpad />
    </div>
  );
}
