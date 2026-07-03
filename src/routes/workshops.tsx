import { createFileRoute } from "@tanstack/react-router";
import { Workshops } from "@/components/yuva/Workshops";

export const Route = createFileRoute("/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops — YUVA 2026" },
      { name: "description", content: "Hands-on, industry-led workshops at YUVA 2026." },
    ],
  }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  return (
    <div className="pt-20">
      <Workshops />
    </div>
  );
}
