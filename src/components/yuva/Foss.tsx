import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { getSettings } from "./settings-store";

const lines = [
  { p: "yuva@trichy", c: "~", t: "$ git clone https://github.com/foss-trichy/yuva-2026.git" },
  { p: "yuva@trichy", c: "~/yuva-2026", t: "$ sudo make innovate --community=open-source" },
  { p: "yuva@trichy", c: "~/yuva-2026", t: "-> recruiting 1,000+ contributors..." },
  { p: "yuva@trichy", c: "~/yuva-2026", t: "-> merging linux, github and collaboration tracks" },
  { p: "yuva@trichy", c: "~/yuva-2026", t: "$ ./launch --foss-mega-event" },
];

export function Foss() {
  const [settings, setSettings] = useState(getSettings());
  useEffect(() => {
    const handleStorage = () => setSettings(getSettings());
    window.addEventListener("yuva-settings-change", handleStorage);
    return () => window.removeEventListener("yuva-settings-change", handleStorage);
  }, []);

  return (
    <section id="foss" className="relative overflow-hidden py-28 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,87,34,0.5) 0 2px, transparent 2px 4px)",
          maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              FOSS Trichy / Mega Event
            </div>
            <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] md:text-6xl">
              Built in the open. <span className="text-gradient">Powered by community.</span>
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              A dedicated track celebrating the open-source movement: Linux, GitHub sprints,
              contributor onboarding, maintainer AMAs, and the FOSS Mega Event that closes YUVA
              2026.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Open Source Community",
                "Linux and Distros",
                "GitHub Sprints",
                "Developer Collaboration",
                "Innovation in the wild",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="mt-10">
              {settings.fossRegistrationLink ? (
                <a
                  href={settings.fossRegistrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold text-base shadow-[0_0_20px_rgba(255,87,34,0.2)] hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all hover:-translate-y-1"
                >
                  Register Now
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-muted-foreground px-6 py-3 rounded-xl font-bold text-base cursor-not-allowed">
                  Registration Opening Soon
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass neon-border overflow-hidden rounded-2xl p-1"
            >
              <div className="rounded-[14px] bg-black/40 p-5 font-mono text-xs md:p-7 md:text-sm">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Terminal size={12} /> foss-trichy / bash
                  </span>
                </div>
                <div className="space-y-1.5">
                  {lines.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.25 }}
                    >
                      <span className="text-[color:var(--neon-purple)]">{l.p}</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-[color:var(--neon-blue)]">{l.c}</span>{" "}
                      <span className="text-foreground/90">{l.t}</span>
                    </motion.div>
                  ))}
                  <div className="pt-1">
                    <span className="text-[color:var(--neon-purple)]">yuva@trichy</span>
                    <span className="text-muted-foreground">:</span>
                    <span className="text-[color:var(--neon-blue)]">~/yuva-2026</span>{" "}
                    <span className="inline-block h-4 w-2 bg-[color:var(--neon-cyan)] align-middle animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
