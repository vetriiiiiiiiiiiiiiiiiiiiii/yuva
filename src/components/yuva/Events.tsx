import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Brain, Code2, Cpu, Gamepad2, Lightbulb, LineChart, Mic2, Palette,
  Rocket, Search, ShieldCheck, Sparkles, Trophy, Users, Wand2, Workflow,
} from "lucide-react";
import { Section } from "./Section";

type Cat = "Technical" | "Non-Technical" | "Management" | "Gaming" | "AI & Coding";

const events: { title: string; desc: string; cat: Cat; Icon: typeof Brain }[] = [
  { title: "Data Wars", desc: "A data science showdown built for analytics and predictive modeling.", cat: "AI & Coding", Icon: Code2 },
  { title: "NeuroSkin Arena", desc: "Biotech and neuro-interface challenges for the next-gen makers.", cat: "Technical", Icon: Cpu },
  { title: "RC Race", desc: "High-speed remote-control racing with precision and strategy.", cat: "Gaming", Icon: Trophy },
  { title: "Capture the Flag", desc: "A cybersecurity CTF that tests offensive and defensive skills.", cat: "Technical", Icon: ShieldCheck },
  { title: "Circuit Sprint", desc: "Electronics prototyping and design speed race.", cat: "Technical", Icon: Wand2 },
  { title: "Max Bite", desc: "Food product innovation from kitchen concept to market pitch.", cat: "Management", Icon: LineChart },
  { title: "Bio Code X", desc: "Bioinformatics and computational biology hack challenge.", cat: "AI & Coding", Icon: Brain },
  { title: "VibeCraft", desc: "Creative experience design and immersive event building.", cat: "Non-Technical", Icon: Sparkles },
  { title: "Project Expo", desc: "A showcase of the brightest projects from student teams.", cat: "Non-Technical", Icon: Palette },
  { title: "School Hackathon", desc: "A campus-level coding sprint for school innovators.", cat: "AI & Coding", Icon: Code2 },
  { title: "YUVA Hacks", desc: "A 24-hour build sprint for rapid product creation.", cat: "AI & Coding", Icon: Workflow },
  { title: "HR Conclave", desc: "Leadership and culture forum for career builders.", cat: "Management", Icon: Users },
];

const cats: ("All" | Cat)[] = ["All", "Technical", "Non-Technical", "Management", "Gaming", "AI & Coding"];

export function Events() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (cat === "All" || e.cat === cat) &&
          (q.trim() === "" || e.title.toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  );

  return (
    <Section
      id="events"
      eyebrow="12 Events / 4 Days"
      title={<>Compete. <span className="text-gradient">Create. Conquer.</span></>}
      subtitle="Twelve flagship events across data, biotech, robotics and culture. Pick your battlefield."
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                cat === c
                  ? "animated-gradient text-primary-foreground shadow-[0_0_20px_rgba(0,217,255,0.36)]"
                  : "border border-white/10 bg-white/[0.05] text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="surface flex w-full items-center gap-2 rounded-lg px-3 py-2 md:w-72">
          <Search size={14} className="text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 9) * 0.04, duration: 0.5 }}
            className={`group surface relative overflow-hidden rounded-lg p-6 transition-all ${
              selected === e.title ? "border-[color:var(--signal-green)]" : "hover:border-[color:var(--neon-blue)]"
            }`}
          >
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg animated-gradient text-primary-foreground">
                  <e.Icon size={20} />
                </div>
                <span className="text-right text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{e.cat}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{e.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              {selected === e.title && (
                <div className="mt-4 inline-flex rounded-full bg-[color:var(--signal-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--signal-green)]">
                  Coming soon
                </div>
              )}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelected(e.title);
                }}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-blue)] transition-transform hover:translate-x-0.5"
              >
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No events match your search.
          </div>
        )}
      </div>
    </Section>
  );
}
