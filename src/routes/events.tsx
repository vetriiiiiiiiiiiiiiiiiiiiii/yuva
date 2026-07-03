import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/components/yuva/Events";
import { useAuth } from "@/components/yuva/auth-store";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — YUVA 2026" },
      {
        name: "description",
        content:
          "Explore the 12 flagship events at YUVA 2026 across Technical, Non-Technical, Management, Gaming, and AI & Coding.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { isAdmin } = useAuth();

  return (
    <div className="pt-20">
      <Events admin={isAdmin} />
    </div>
  );
}
