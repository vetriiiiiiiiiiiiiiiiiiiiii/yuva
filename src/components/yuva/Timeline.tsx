import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useRef } from "react";

const days = [
  {
    day: "01",
    title: "Ignition",
    date: "Sep 7",
    items: ["Inauguration", "Project Expo", "Launchpad Day 1", "FOSS Trichy"],
  },
  {
    day: "02",
    title: "Momentum",
    date: "Sep 8",
    items: ["Launchpad Day 2", "Vibe Craft", "School Hackathon", "Workshop Labs"],
  },
  {
    day: "03",
    title: "Pressure",
    date: "Sep 9",
    items: ["YUVA Hacks 24h", "Cyber CTF", "AI Labs", "Builder Night"],
  },
  {
    day: "04",
    title: "Finale",
    date: "Sep 10",
    items: ["Club Events", "RC Race", "Hackathon Demos", "Closing Ceremony"],
  },
];

export function Timeline() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.82], [0, 1]);

  return (
    <section ref={ref} id="timeline" className="premium-section py-20 md:py-32">
      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 max-w-4xl"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            Festival route
          </div>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] md:text-7xl">
            Four days, one continuous <span className="text-gradient">charge</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            The schedule is designed like a crescendo: opening showcases, founder rooms, technical
            labs, overnight competitions and a full finale.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 md:block" />
          <motion.div
            className="kinetic-line absolute left-6 top-0 hidden h-full w-px origin-top md:block"
            style={{ scaleY: lineScale }}
          />
          <div className="grid gap-5">
            {days.map((day, index) => (
              <motion.article
                key={day.day}
                initial={{ opacity: 0, x: index % 2 === 0 ? -36 : 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid gap-5 md:grid-cols-[72px_1fr]"
              >
                <div className="relative z-10 hidden md:flex">
                  <div className="grid h-12 w-12 place-items-center rounded-lg border border-orange-300/30 bg-orange-400/15 font-display text-xl font-black text-orange-100 backdrop-blur">
                    {day.day}
                  </div>
                </div>
                <div className="premium-frame overflow-hidden">
                  <div className="grid gap-0 lg:grid-cols-[0.44fr_1fr]">
                    <div className="relative min-h-[220px] overflow-hidden p-6">
                      <div className="timeline-graphic absolute inset-0" aria-hidden />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,16,0.3),rgba(5,8,16,0.92))]" />
                      <div className="relative z-10 flex h-full min-h-[172px] flex-col justify-between">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs font-semibold text-slate-200">
                          <CalendarDays size={14} className="text-orange-300" />
                          {day.date}
                        </div>
                        <div>
                          <div className="font-display text-6xl font-black text-white/15 md:hidden">
                            {day.day}
                          </div>
                          <h3 className="font-display text-4xl font-black text-white md:text-5xl">
                            {day.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6">
                      {day.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-lg border border-white/10 bg-white/[0.045] px-4 py-4 text-sm font-semibold text-slate-200"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
