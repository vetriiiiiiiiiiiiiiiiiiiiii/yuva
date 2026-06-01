import { motion } from "framer-motion";
import { Section } from "./Section";

const days = [
  {
    day: "Day 1",
    title: "Opening Day",
    items: ["Inauguration", "Project Expo", "Launchpad Day -1", "FOSS Trichy"],
  },
  {
    day: "Day 2",
    title: "Momentum Day",
    items: ["Launchpad Day 2", "Vibe Craft", "School Hackathon", "5 Workshops"],
  },
  {
    day: "Day 3",
    title: "Hackathon Day",
    items: ["YUVA Hacks 24h", "CTF", "5 Workshops"],
  },
  {
    day: "Day 4",
    title: "Finale Day",
    items: ["Club Events (8)", "Race (2)", "Hackathon Conclusion", "CTF Conclusion", "Event Conclusion"],
  },
];

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="4 Mega Days"
      title={<>The <span className="text-gradient">schedule</span>.</>}
      subtitle="A high-density 96-hour run from ignition to liftoff."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {days.map((d, i) => (
          <motion.article
            key={d.day}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.55 }}
            className="surface rounded-lg p-5"
          >
            <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{d.date}</div>
            <h3 className="mt-2 font-display text-2xl font-black">
              <span className="text-gradient">{d.day}</span>
            </h3>
            <div className="mt-1 font-semibold text-foreground/90">{d.title}</div>
            <ul className="mt-5 space-y-3 text-sm">
              {d.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-foreground/86">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--signal-green)]" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
