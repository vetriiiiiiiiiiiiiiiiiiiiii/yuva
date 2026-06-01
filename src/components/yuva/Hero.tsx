import { motion } from "framer-motion";
import { useState } from "react";
import type { MouseEvent } from "react";
import {
  ArrowRight,
  CalendarDays,
  Code2,
  MapPin,
  Mic2,
  Rocket,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Countdown } from "./Countdown";
import { Particles } from "./Particles";

const highlights = [
  { icon: CalendarDays, label: "Sep 7-10, 2026", value: "4 days" },
  { icon: Users, label: "50+ colleges", value: "National crowd" },
  { icon: Sparkles, label: "30+ mentors", value: "Founder access" },
];

const featuredTracks = [
  { icon: Code2, title: "HackForge 48", meta: "48-hour national hackathon" },
  { icon: Rocket, title: "Launchpad Phase 2", meta: "Startup expo and investor pitches" },
  { icon: Trophy, title: "Championship Nights", meta: "Robotics, esports and awards" },
  { icon: Mic2, title: "Founder Sessions", meta: "Talks, mixers and mentor rooms" },
];

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: x * 22, y: y * 18 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-28 pb-14">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      <Particles />

      <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] w-full max-w-7xl flex-col justify-center px-4">
        <div
          className="hero-3d-scene"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, rotateX: 0, rotateY: 0 }}
            animate={{ opacity: 1, y: 0, rotateX: -tilt.y, rotateY: tilt.x }}
            transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
            className="hero-3d-card relative overflow-hidden grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center"
          >
          <div>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.5rem,10vw,8.8rem)] font-black leading-[0.88] tracking-normal">
              <span className="text-gradient">YUVA</span>
              <span className="block text-foreground">2026</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-xl">
              A four-day campus operating system for builders: competitions, AI labs,
              startup pitches, open-source sprints, esports and culture in one live arena.
            </p>

            <div className="mt-8" />

            <div className="mt-8 grid max-w-3xl gap-2 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="surface rounded-lg p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                    <item.icon size={14} className="text-[color:var(--neon-blue)]" />
                    {item.label}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pl-8 hero-3d-panel rounded-[2rem] p-6">
            <div className="absolute -left-8 top-8 hidden h-48 w-px animated-gradient lg:block" />
            <div className="mb-5 flex items-center gap-4 rounded-lg border border-white/10 bg-black/35 p-4 backdrop-blur-md">
              <img
                src="/logos/yuva-symbol-color.jpg"
                alt="YUVA symbol"
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  <Zap size={14} className="text-[color:var(--signal-green)]" />
                  Featured Tracks
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  The official YUVA mark anchors every competition, workshop and startup track.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {featuredTracks.map((track, index) => (
                <motion.a
                  key={track.title}
                  href={track.title.includes("Launchpad") ? "#launchpad" : "#events"}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16 + index * 0.08, duration: 0.55 }}
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-md transition-all hover:border-[color:var(--neon-blue)] hover:bg-white/[0.085]"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg animated-gradient text-primary-foreground">
                    <track.icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold">{track.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{track.meta}</p>
                  </div>
                  <ArrowRight size={16} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--neon-blue)]" />
                </motion.a>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/35 p-4 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <MapPin size={16} className="text-[color:var(--hot-amber)]" />
                  Trichy, Tamil Nadu
                </div>
                <a
                  href="#timeline"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--signal-green)]"
                >
                  View 4-day schedule <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12"
        >
          <Countdown target="2026-09-07T09:00:00" />
        </motion.div>
      </div>
    </section>
  );
}

