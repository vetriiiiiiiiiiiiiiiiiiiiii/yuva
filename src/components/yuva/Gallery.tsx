import { motion } from "framer-motion";
import { Section } from "./Section";

const tiles = [
  { h: "h-64", grad: "from-cyan-500/40 via-blue-500/30 to-violet-500/40", label: "Keynote Stage" },
  { h: "h-44", grad: "from-fuchsia-500/40 to-cyan-500/30", label: "Hack Floor" },
  { h: "h-52", grad: "from-violet-500/40 to-indigo-500/30", label: "Pitch Arena" },
  { h: "h-72", grad: "from-emerald-500/30 to-cyan-500/40", label: "FOSS Lab" },
  { h: "h-40", grad: "from-rose-500/30 to-fuchsia-500/40", label: "Esports" },
  { h: "h-56", grad: "from-amber-500/30 to-pink-500/30", label: "Startup Expo" },
  { h: "h-60", grad: "from-cyan-500/40 to-violet-500/40", label: "Afterparty" },
  { h: "h-44", grad: "from-blue-500/40 to-purple-500/30", label: "Robotics" },
];

export function Gallery() {
  return (
    <Section
      id="gallery"
      eyebrow="Glimpses"
      title={<>Inside the <span className="text-gradient">arena</span>.</>}
      subtitle="A peek at what 4 days of YUVA looks like."
    >
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {tiles.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 8) * 0.04, duration: 0.5 }}
            className={`mb-4 relative overflow-hidden rounded-2xl glass group cursor-pointer ${t.h}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${t.grad} transition-transform duration-500 group-hover:scale-110`} />
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-0 flex items-end p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/90">
                {t.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
