import { Section } from "./Section";

const sponsors = [
  "NEXUS LABS", "QUANTUM AI", "HYPERLOOP", "VOLT/X", "NEONFORGE", "ORBIT VC",
  "STACKWAVE", "PIXELGRID", "CIPHER OS", "PROTON FUND", "META.IO", "DEEPCORE",
];

export function Sponsors() {
  return (
    <Section
      id="sponsors"
      eyebrow="Partners"
      title={<>Backed by the <span className="text-gradient">builders of tomorrow</span>.</>}
      subtitle="An ecosystem of investors, studios and tech leaders fuel YUVA."
    >
      <div className="relative overflow-hidden glass rounded-2xl py-8 mb-6">
        <div className="flex gap-12 w-max animate-marquee">
          {[...sponsors, ...sponsors].map((s, i) => (
            <span
              key={i}
              className="font-display font-black text-2xl md:text-3xl tracking-[0.2em] text-foreground/60 hover:text-gradient transition-colors whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.slice(0, 8).map((s) => (
          <div
            key={s}
            className="glass rounded-2xl p-6 grid place-items-center hover:neon-border transition-all aspect-[3/2]"
          >
            <span className="font-display font-black tracking-[0.2em] text-foreground/80 text-center">
              {s}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}