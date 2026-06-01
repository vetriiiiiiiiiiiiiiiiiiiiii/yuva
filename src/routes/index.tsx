import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/yuva/Navbar";
import { Hero } from "@/components/yuva/Hero";
import { About } from "@/components/yuva/About";
import { Events } from "@/components/yuva/Events";
import { Workshops } from "@/components/yuva/Workshops";
import { Launchpad } from "@/components/yuva/Launchpad";
import { Foss } from "@/components/yuva/Foss";
import { Timeline } from "@/components/yuva/Timeline";
import { Gallery } from "@/components/yuva/Gallery";
import { Contact, FAQ, FloatingActions, Footer, Loader, NeonCursor } from "@/components/yuva/Extras";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YUVA 2026 — National Techno-Management Fest · Sep 7–10" },
      { name: "description", content: "YUVA 2026: a 4-day national techno-management fest featuring 12 events, 9 workshops, Launchpad Phase 2 startup arena and the FOSS Trichy Mega Event." },
      { property: "og:title", content: "YUVA 2026 — National Techno-Management Fest" },
      { property: "og:description", content: "4 mega days of code, startups, AI and culture. Sep 7–10, 2026." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Loader />
      <NeonCursor />
      <Navbar />
      <main>
        <Hero />
        <Events />
        <About />
        <Workshops />
        <Launchpad />
        <Foss />
        <Timeline />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
