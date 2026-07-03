import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, GitBranch, Lightbulb, Rocket } from "lucide-react";
import { useRef } from "react";

const pillars = [
  {
    title: "Build",
    copy: "Hackathons, AI rooms and technical arenas built for teams that ship under pressure.",
    icon: Cpu,
  },
  {
    title: "Launch",
    copy: "Startup pitches, mentor clinics and MVP showcases for young founders.",
    icon: Rocket,
  },
  {
    title: "Contribute",
    copy: "FOSS Trichy brings open-source maintainers, Linux culture and community sprints.",
    icon: GitBranch,
  },
  {
    title: "Lead",
    copy: "Technical clubs, student organizers and ambassadors shape the full festival experience.",
    icon: Lightbulb,
  },
];

const metrics = [
  { value: "50+", label: "colleges" },
  { value: "30+", label: "mentors" },
  { value: "Rs.5L+", label: "prize pool" },
  { value: "96h", label: "festival run" },
];

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const symbolY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const gridY = useTransform(scrollYProgress, [0, 1], [50, -40]);

  return (
    <section ref={ref} id="about" className="premium-section py-20 md:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
            About YUVA 2026
          </div>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] md:text-7xl">
            A national stage for people who <span className="text-gradient">make things real</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            YUVA fuses technology, management, entrepreneurship and culture into one high-energy
            festival system: compete, learn, pitch, contribute and leave with a stronger network.
          </p>

          <div className="mt-9 grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="premium-frame p-5"
              >
                <div className="font-display text-3xl font-black text-white md:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[620px]">
          <motion.div
            aria-hidden
            style={{ y: symbolY }}
            className="about-orbital-mark absolute left-1/2 top-10 h-[min(62vw,420px)] w-[min(62vw,420px)] -translate-x-1/2 opacity-70"
          />
          <motion.div
            aria-hidden
            style={{ y: gridY }}
            className="about-kinetic-grid absolute bottom-0 right-0 h-[min(70vw,440px)] w-[min(70vw,440px)] opacity-80"
          />
          <div className="relative z-10 grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="premium-frame min-h-[230px] p-6 transition-transform duration-300 hover:-translate-y-2 will-change-transform"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/10 text-orange-200">
                  <pillar.icon size={20} />
                </div>
                <h3 className="mt-8 font-display text-3xl font-black text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
