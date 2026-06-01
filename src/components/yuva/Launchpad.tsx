import { motion } from "framer-motion";
import { Banknote, Briefcase, Handshake, Rocket, Sparkles, TrendingUp } from "lucide-react";

const pillars = [
  { Icon: Briefcase, title: "Investor Pitching", desc: "Pitch to a hand-picked panel of VCs, angels and CXOs." },
  { Icon: Rocket, title: "Startup Expo", desc: "Showcase your MVP to 5,000+ visitors across 4 days." },
  { Icon: Sparkles, title: "Innovation Showcase", desc: "Demo deep-tech, AI and hardware to industry scouts." },
  { Icon: Handshake, title: "Entrepreneur Networking", desc: "Curated mixers connecting builders & operators." },
  { Icon: Banknote, title: "Funding Opportunities", desc: "Grants, seed checks and accelerator fast-tracks." },
  { Icon: TrendingUp, title: "Mega Startup Event", desc: "The grand finale: India's next unicorns on one stage." },
];

export function Launchpad() {
  return (
    <section id="launchpad" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(139,92,246,0.25), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(0,217,255,0.18), transparent 55%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px animated-gradient" />
      <div className="absolute inset-x-0 bottom-0 h-px animated-gradient" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Launchpad Phase 2
            </div>
            <h2 className="mt-4 font-display font-black text-4xl md:text-6xl leading-[1.05]">
              The <span className="text-neon">startup arena</span> for India's next breakout founders.
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg">
              Phase 2 turns YUVA into a live deal-flow stage. Pitch, demo, raise, and ship —
              all under one roof, in front of the people who actually write checks.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#register" className="rounded-xl px-5 py-3 text-sm font-semibold animated-gradient text-primary-foreground shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:scale-[1.04] transition-transform">
                Apply for Launchpad
              </a>
              <a href="#contact" className="rounded-xl px-5 py-3 text-sm font-semibold glass hover:scale-[1.04] transition-transform">
                Become a Mentor
              </a>
            </div>

            {/* Animated growth chart */}
            <div className="mt-10 glass rounded-2xl p-5 neon-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground uppercase tracking-widest">Cohort Growth</span>
                <span className="text-[color:var(--neon-blue)] font-semibold">+412% YoY</span>
              </div>
              <svg viewBox="0 0 300 100" className="mt-3 w-full h-24">
                <defs>
                  <linearGradient id="lg" x1="0" x2="1">
                    <stop offset="0%" stopColor="#00d9ff" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  d="M0,85 C40,80 60,70 90,60 C120,50 140,55 170,40 C200,25 230,30 270,12 L300,8"
                  fill="none"
                  stroke="url(#lg)"
                  strokeWidth="2.5"
                />
                <path d="M0,85 C40,80 60,70 90,60 C120,50 140,55 170,40 C200,25 230,30 270,12 L300,8 L300,100 L0,100 Z" fill="url(#lg2)" />
              </svg>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="glass rounded-2xl p-6 hover:neon-border transition-all group"
              >
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-gradient-to-br from-[color:var(--neon-purple)] to-[color:var(--neon-blue)] text-primary-foreground">
                  <p.Icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-bold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
