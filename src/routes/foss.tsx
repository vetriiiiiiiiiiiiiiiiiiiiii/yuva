import { createFileRoute } from "@tanstack/react-router";
import { Foss } from "@/components/yuva/Foss";

export const Route = createFileRoute("/foss")({
  head: () => ({
    meta: [
      { title: "FOSS Trichy Track — YUVA 2026" },
      {
        name: "description",
        content: "Built in the open. Powered by community. FOSS Trichy Mega Event.",
      },
    ],
  }),
  component: FossPage,
});

function FossPage() {
  return (
    <div className="pt-20">
      <Foss />
    </div>
  );
}
