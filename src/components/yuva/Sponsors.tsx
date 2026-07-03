import { useEffect, useState } from "react";
import { Section } from "./Section";
import { type Sponsor, defaultSponsors, getStoredSponsors } from "./sponsor-store";
import { getSettings } from "./settings-store";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(defaultSponsors);

  useEffect(() => {
    setSponsors(getStoredSponsors());
    const handleStorage = () => setSponsors(getStoredSponsors());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [settings, setSettings] = useState(getSettings());
  useEffect(() => {
    const handleSettings = () => setSettings(getSettings());
    window.addEventListener("yuva-settings-change", handleSettings);
    return () => window.removeEventListener("yuva-settings-change", handleSettings);
  }, []);

  return (
    <Section
      id="sponsors"
      eyebrow="Partners"
      title={
        <>
          Backed by the <span className="text-gradient">builders of tomorrow</span>.
        </>
      }
      subtitle="An ecosystem of investors, studios and tech leaders fuel YUVA."
    >
      <div className="relative overflow-hidden glass rounded-2xl py-8 mb-6">
        <div className="flex gap-12 w-max animate-marquee">
          {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="h-10 w-16 rounded"
                style={{
                  backgroundImage: `url(${s.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.85,
                }}
              />
              <span className="font-display font-black text-2xl md:text-3xl tracking-[0.2em] text-foreground/60 hover:text-gradient transition-colors whitespace-nowrap">
                {s.name}
              </span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsors.slice(0, 8).map((s) => (
          <div
            key={s.id}
            className="glass rounded-2xl overflow-hidden hover:neon-border transition-all aspect-[3/2] group relative"
          >
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${s.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-10 text-center backdrop-blur-2xl"
        style={{ boxShadow: "0 0 80px rgba(249,115,22,0.15) inset" }}
      >
        <div
          aria-hidden
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-orange-500 mb-4 font-display">
            // Partner With Us
          </div>
          <h3 className="font-display font-black text-3xl md:text-4xl text-white mb-4">
            Want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Sponsor</span> YUVA?
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Reach 5,000+ students, engineers, and founders across 4 days. Get your brand in front of
            India's next tech leaders.
          </p>
          {settings.yuvaSponsorLink ? (
            <motion.a
              href={settings.yuvaSponsorLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.03, boxShadow: "0 12px 30px rgba(249,115,22,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide animated-gradient text-primary-foreground"
            >
              Become a Sponsor →
            </motion.a>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold tracking-wide border border-white/10 text-muted-foreground cursor-not-allowed bg-white/5">
              Sponsorship link coming soon
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
