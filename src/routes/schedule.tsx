import { createFileRoute } from "@tanstack/react-router";
import { Timeline } from "@/components/yuva/Timeline";

export const Route = createFileRoute("/schedule")({
  component: ScheduleRoute,
});

function ScheduleRoute() {
  return (
    <div className="pt-24 pb-20">
      <Timeline />
    </div>
  );
}
