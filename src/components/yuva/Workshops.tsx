import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Clock, GraduationCap, User } from "lucide-react";
import { Section } from "./Section";

const workshops = [
  { title: "Data Conclave", stack: ["Data Science", "Analytics"], level: "Intermediate", duration: "4h" },
  { title: "BioInterface Lab", stack: ["Neurotech", "Biometrics"], level: "Advanced", duration: "5h" },
  { title: "RTOS", stack: ["Embedded", "Real-Time"], level: "Advanced", duration: "4h" },
  { title: "Cybernet", stack: ["Cybersecurity", "CTF"], level: "Advanced", duration: "5h" },
  { title: "Cadence", stack: ["Electronics", "Circuit Design"], level: "Intermediate", duration: "4h" },
  { title: "Kitchen to Market", stack: ["Food Tech", "Product Strategy"], level: "Intermediate", duration: "4h" },
  { title: "Molecular Biology Technique", stack: ["Lab Skills", "Bioinformatics"], level: "Advanced", duration: "5h" },
  { title: "Forensic Murder", stack: ["Forensics", "Investigation"], level: "Advanced", duration: "4h" },
  { title: "The Agentic Arena", stack: ["Creative Systems", "Experience Design"], level: "Intermediate", duration: "4h" },
];

const levelColor: Record<string, string> = {
  Beginner: "from-emerald-400 to-cyan-400",
  Intermediate: "from-cyan-400 to-violet-400",
  Advanced: "from-fuchsia-500 to-rose-400",
};

export function Workshops() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  return (
    <Section
      id="workshops"
      eyebrow="9 Workshops"
      title={<>Hands-on. <span className="text-gradient">Industry-led.</span></>}
      subtitle="Skill up in the stacks shaping tomorrow — every workshop is coming soon for this edition."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {workshops.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.04, duration: 0.5 }}
            className={`group surface relative flex items-center gap-4 overflow-hidden rounded-lg p-5 transition-all ${
              selectedWorkshop === w.title ? "border-[color:var(--signal-green)]" : "hover:border-[color:var(--neon-blue)]"
            }`}
          >
            <div className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${levelColor[w.level]} grid place-items-center text-primary-foreground font-display font-black text-lg`}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <GraduationCap size={12} /> {w.level}
                <span>•</span>
                <Clock size={12} /> {w.duration}
              </div>
              <h3 className="mt-1 font-display font-bold text-base md:text-lg truncate">{w.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {w.stack.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                <User size={12} /> Speaker · TBA
              </div>
              {selectedWorkshop === w.title && (
                <div className="mt-4 inline-flex rounded-full bg-[color:var(--signal-green)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--signal-green)]">
                  Coming soon
                </div>
              )}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedWorkshop(w.title);
                }}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-blue)] transition-transform hover:translate-x-0.5"
              >
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
