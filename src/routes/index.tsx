import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSettings } from "@/components/yuva/settings-store";

import { ArrowRight, Radio, Sparkles } from "lucide-react";
import { Hero } from "@/components/yuva/Hero";
import { About } from "@/components/yuva/About";
import { Timeline } from "@/components/yuva/Timeline";
import { Gallery } from "@/components/yuva/Gallery";
import { FAQ } from "@/components/yuva/Extras";
import { Sponsors } from "@/components/yuva/Sponsors";
import { LaunchpadFeature } from "@/components/yuva/LaunchpadFeature";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YUVA 2026 - High Energy Techno-Management Fest" },
      {
        name: "description",
        content:
          "YUVA 2026 is SRM IST Trichy's national techno-management fest with flagship events, workshops, Launchpad and FOSS Trichy.",
      },
      { property: "og:title", content: "YUVA 2026 - SRM IST Trichy" },
      {
        property: "og:description",
        content: "Four days of code, startups, AI, open source and culture. Sep 7-10, 2026.",
      },
    ],
  }),
  component: Index,
});

/* ───────────────────────────────────────────────────────── */
/*  Vision Section — Aaruush-style full-screen quote        */
/* ───────────────────────────────────────────────────────── */
function VisionSection() {
  return (
    <section className="aaruush-vision-section py-12 px-6 relative">
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "url('/yuva-bg-clean.jpg') center/cover no-repeat",
          zIndex: -2,
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }}
      />
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 pointer-events-none bg-black/65" 
        style={{ 
          zIndex: -1,
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
        }} 
      />

      <motion.div
        className="flex flex-col items-center justify-center w-full max-w-5xl text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-white mb-6">
          <span className="font-raleway font-extrabold tracking-widest text-xl md:text-2xl uppercase text-orange-200">
            Bringing Aspirations, Harmonising Unity
          </span>
        </div>
        <p className="text-xl md:text-3xl font-raleway italic font-bold text-gray-200 max-w-4xl leading-relaxed">
          Anchored by a shared vision, we are crafting a dynamic and forward-looking arena that not
          only elevates this year's fest but also lays the groundwork for its future evolution. At
          its core, the fusion of individual brilliance and collective ambition fuels our spirit —
          leaving a profound and lasting legacy for SRM IST Trichy.
        </p>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/*  Explore YUVA Grid — Aaruush 2+3 portal card layout     */
/* ───────────────────────────────────────────────────────── */
const portals = [
  {
    title: "Launchpad",
    desc: "Pitch, network, and launch your startup idea in front of top investors.",
    to: "/launchpad" as const,
    bgKey: "launchpad" as const,
  },
  {
    title: "About YUVA",
    desc: "Learn about YUVA, our journey, vision, and the team that makes it all possible.",
    to: "/team" as const,
    bgKey: "aboutYuva" as const,
  },
  {
    title: "Flagships",
    desc: "Competitive arenas for builders, hackers, problem solvers and security teams.",
    to: "/flagships" as const,
    bgKey: "flagships" as const,
  },
  {
    title: "Events",
    desc: "Get details about all the exciting events, workshops and competitions at YUVA.",
    to: "/events" as const,
    bgKey: "events" as const,
  },
  {
    title: "Workshops",
    desc: "Hands-on, expert-led sessions that turn curiosity into deployable skill.",
    to: "/workshops" as const,
    bgKey: "workshops" as const,
  },
  {
    title: "FOSS Trichy",
    desc: "Open-source contributor onboarding, Linux culture and community-powered sprints.",
    to: "/foss" as const,
    bgKey: "foss" as const,
  },
];

function PortalCard({
  portal,
  bgImage,
  height = "372px",
}: {
  portal: (typeof portals)[number];
  bgImage: string;
  height?: string;
}) {
  return (
    <div style={{ height }}>
      <Link to={portal.to} className="explore-card" style={{ height: "100%" }}>
        <img
          src={bgImage}
          alt={portal.title}
          className="explore-card-bg"
          loading="lazy"
          decoding="async"
        />
        <div className="explore-card-overlay" />
        <div className="explore-card-content">
          <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
            {portal.title}
          </h3>
          <p style={{ fontSize: "1.05rem", opacity: 0.85, lineHeight: 1.5 }}>{portal.desc}</p>
        </div>
      </Link>
    </div>
  );
}

function ExploreYuva() {
  const [settings, setSettings] = useState(getSettings());
  useEffect(() => {
    const handleStorage = () => setSettings(getSettings());
    window.addEventListener("yuva-settings-change", handleStorage);
    return () => window.removeEventListener("yuva-settings-change", handleStorage);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 md:px-8 pb-0 md:pb-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "650px",
          height: "430px",
          background: "radial-gradient(ellipse at center, rgba(239,101,34,0.15), transparent 70%)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse at center, rgba(255,228,0,0.1), transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Section header */}
      <motion.div
        className="text-center text-white mb-10 mt-16 relative z-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex justify-center items-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
          <span className="font-normal text-lg md:text-2xl">Explore</span>
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-6xl leading-tight uppercase text-white">
          EXPLORE THE WORLD OF YUVA
        </h2>
      </motion.div>

      {/* 3-column cards grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[90%] md:max-w-7xl mb-12 relative z-10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {portals.map((portal) => (
          <PortalCard
            key={portal.title}
            portal={portal}
            bgImage={settings.portalImages[portal.bgKey] || ""}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/*  Live Pulse Ticker                                        */
/* ───────────────────────────────────────────────────────── */
const liveMoments = [
  "Opening ceremony",
  "Project expo",
  "Startup pitches",
  "FOSS Trichy",
  "YUVA Hacks",
  "CTF finals",
  "RC race",
  "Club showcases",
];

function LivePulse() {
  return (
    <section className="relative overflow-hidden py-10">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(239,101,34,0.15),rgba(2,6,23,0.66),rgba(255,228,0,0.15))]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/10 text-orange-200">
            <Radio size={20} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-200">
              Live festival pulse
            </p>
            <p className="mt-1 text-sm text-slate-300">
              The YUVA timeline moves fast. Pick your moment.
            </p>
          </div>
        </div>
        <div className="flex gap-3 overflow-hidden">
          <motion.div
            className="flex shrink-0 gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[...liveMoments, ...liveMoments].map((moment, index) => (
              <span
                key={`${moment}-${index}`}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 whitespace-nowrap"
              >
                {moment}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/*  Legacy Section — Aaruush "Our Legacy" style            */
/* ───────────────────────────────────────────────────────── */
function LegacySection() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[90vh] px-6 overflow-hidden z-10">
        {/* Mobile title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:hidden font-display font-bold text-white mb-8 leading-tight tracking-tight text-center"
        >
          Our Legacy
        </motion.h2>

        {/* Left: glowing YUVA symbol */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full lg:w-2/5 h-[50vh] md:h-screen flex items-center justify-center order-2 lg:order-1"
        >
          <div
            className="legacy-symbol-glow"
            style={{ width: "min(72vw, 400px)", height: "min(72vw, 400px)" }}
          >
            <span
              className="font-display font-black text-white select-none"
              style={{
                fontSize: "clamp(6rem, 18vw, 12rem)",
                lineHeight: 1,
              }}
            >
              Y
            </span>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full lg:w-3/5 flex flex-col justify-center items-start px-4 md:px-8 lg:pl-12 lg:pr-8 z-10 order-3 lg:order-2"
        >
          <div className="max-w-2xl">
            <h2 className="hidden lg:block font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              Our Legacy
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 leading-relaxed font-normal text-center lg:text-left">
              From humble beginnings to becoming a beacon of innovation and excellence, YUVA's
              journey is woven with passion, perseverance and purpose. Over the years, each
              generation has carried the torch forward — enriching traditions, embracing change, and
              inspiring new milestones that define SRM IST Trichy.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/" hash="timeline">
                <button className="flex items-center justify-center gap-2 bg-[#EF6522] backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 px-6 py-3 rounded-2xl text-white text-base font-semibold transition-all duration-300 ease-in-out hover:bg-[#d85a1e]">
                  Explore our Timeline <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}


/* ───────────────────────────────────────────────────────── */
/*  Closing CTA                                             */
/* ───────────────────────────────────────────────────────── */
function ClosingCTA() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.65, 1], [80, 0]);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-300">
              Sep 7–10, 2026
            </div>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] md:text-7xl text-white">
              The next build starts here.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Register, assemble your team and step into four days of competitions, workshops,
              founders, maintainers and high-energy campus culture.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="hero-primary-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-slate-950"
              >
                Register Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/*  Root page assembly                                      */
/* ───────────────────────────────────────────────────────── */
function Index() {
  return (
    <>
      <Hero />
      <VisionSection />
      <ExploreYuva />
      <LivePulse />
      <About />
      <LaunchpadFeature />
      <Sponsors />
      <Gallery />
      <ClosingCTA />
      <FAQ />
    </>
  );
}
