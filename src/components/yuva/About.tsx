import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section } from "./Section";

const stats = [
  { value: "12", label: "Technical Events" },
  { value: "9", label: "Workshops" },
  { value: "4", label: "Mega Days" },
  { value: "50+", label: "Colleges Joining" },
  { value: "30+", label: "Startup Mentors" },
  { value: "Rs.5L+", label: "Prize Pool" },
];

const tracks = [
  "Hackathons and AI build rooms",
  "Startup pitches with mentor clinics",
  "Open-source contribution sprints",
  "Hardware, robotics and esports finals",
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About YUVA 2026"
      title={
        <>
          A <span className="text-gradient">national stage</span> for builders,
          founders and dreamers.
        </>
      }
      subtitle="YUVA 2026 is a four-day techno-management festival fusing engineering, design, entrepreneurship and culture."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="surface relative overflow-hidden rounded-lg p-6 md:p-10 lg:col-span-7">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <p className="leading-relaxed text-foreground/90">
              From all-night hackathons to investor pitch arenas, YUVA is where ideas ship,
              careers launch and communities are forged. The fest brings together the
              brightest minds in <span className="text-[color:var(--neon-blue)]">technology</span>,
              <span className="text-[color:var(--signal-green)]"> management</span> and
              <span className="text-[color:var(--hot-amber)]"> creativity</span>.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {tracks.map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-foreground/85"
                >
                  <CheckCircle2 size={16} className="shrink-0 text-[color:var(--signal-green)]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:col-span-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="surface rounded-lg p-5 transition-all hover:border-[color:var(--neon-blue)]"
            >
              <div className="font-display text-3xl font-black text-gradient md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
