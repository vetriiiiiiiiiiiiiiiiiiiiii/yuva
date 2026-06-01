import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot, ChevronDown, Facebook, Github, Instagram, Linkedin, Mail, MapPin,
  Phone, Twitter, Volume2, VolumeX, X,
} from "lucide-react";
import { Section } from "./Section";

/* ---------------- FAQ ---------------- */
const faqs = [
  { q: "Who can participate in YUVA 2026?", a: "Any college student, startup founder, developer or creator from across India can register. Some events are open to school students and professionals too." },
  { q: "Is there a registration fee?", a: "General entry is free. Flagship events and workshops have a nominal fee with combo passes available." },
  { q: "Will accommodation be provided?", a: "Yes — partnered hostels and hotels offer discounted stays for outstation participants." },
  { q: "Can my startup exhibit at Launchpad Phase 2?", a: "Absolutely. Apply via the Launchpad form; selected startups get a free booth and investor access." },
  { q: "How can I join as a mentor?", a: "Reach out via the contact form — our team replies within 48 hours." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title={<>Questions, <span className="text-gradient">answered</span>.</>}>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-display font-semibold">{f.q}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${open === i ? "rotate-180 text-[color:var(--neon-blue)]" : "text-muted-foreground"}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-sm text-muted-foreground"
                >
                  {f.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={<>Let's <span className="text-gradient">build together</span>.</>}
      subtitle="Drop us a line for press or general enquiries."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={(e) => e.preventDefault()} className="glass rounded-2xl p-6 md:p-8 space-y-4">
          {[
            { label: "Full Name", type: "text", ph: "Ada Lovelace" },
            { label: "Email", type: "email", ph: "you@domain.com" },
            { label: "Subject", type: "text", ph: "General enquiry" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.ph}
                className="mt-1 w-full bg-transparent border border-white/10 focus:border-[color:var(--neon-blue)] focus:shadow-[0_0_18px_rgba(0,217,255,0.35)] outline-none rounded-xl px-4 py-3 text-sm transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-muted-foreground">Message</label>
            <textarea
              rows={4}
              placeholder="Tell us more..."
              className="mt-1 w-full bg-transparent border border-white/10 focus:border-[color:var(--neon-blue)] focus:shadow-[0_0_18px_rgba(0,217,255,0.35)] outline-none rounded-xl px-4 py-3 text-sm transition-all resize-none"
            />
          </div>
          <button className="w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground animated-gradient hover:scale-[1.02] transition-transform">
            Send Message
          </button>
        </form>
        <div className="space-y-4">
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[color:var(--neon-blue)]" /> technicalclubs@ist.srmtrichy.edu.in
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[color:var(--neon-blue)]" /> manageriic@srmtrichy.edu.in
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-[color:var(--neon-purple)]" /> +91 94875 49510
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-[color:var(--neon-purple)]" /> +91 90430 01709
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-[color:var(--neon-cyan)]" /> SRM IST Trichy
            </div>
            <a
              href="https://www.google.com/maps/place/SRM+IST+Trichy"
              target="_blank"
              rel="noreferrer"
              className="block text-xs text-muted-foreground hover:text-[color:var(--neon-blue)]"
            >
              SRM IST Trichy
            </a>
            <div className="flex items-center gap-3 pt-2">
              {[Twitter, Instagram, Linkedin, Github, Facebook].map((I, i) => (
                <a key={i} href="#" className="h-10 w-10 grid place-items-center rounded-xl glass hover:neon-border transition-all">
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="glass relative h-64 overflow-hidden rounded-2xl">
            <iframe
              title="TRICHY SRM Medical College & Hospital map"
              src="https://maps.google.com/maps?q=10.95375,78.75825&z=17&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] invert-[0.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px animated-gradient" />
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md border border-white/10 bg-black/40">
              <img src="/logos/yuva-symbol-white.png" alt="YUVA symbol" className="h-7 w-7 object-contain" />
            </span>
            <span className="relative h-10 w-40 overflow-hidden" aria-label="YUVA event logo">
              <img
                src="/logos/yuva-wordmark.png"
                alt=""
                className="absolute left-1/2 top-1/2 h-40 w-40 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground max-w-xs">
            National Techno-Management Fest. Sep 7–10, 2026.
          </p>
        </div>
        {[
          { t: "Explore", l: ["Events", "About", "Workshops", "Launchpad"] },
          { t: "Community", l: ["FOSS Trichy", "Gallery", "FAQ"] },
          { t: "Contact", l: ["technicalclubs@ist.srmtrichy.edu.in", "manageriic@srmtrichy.edu.in", "+91 94875 49510", "+91 90430 01709"] },
        ].map((c) => (
          <div key={c.t}>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{c.t}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {c.l.map((i) => (
                <li key={i}><a href="#" className="hover:text-[color:var(--neon-blue)] transition-colors">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © 2026 YUVA · Crafted with neon & caffeine.
      </div>
    </footer>
  );
}

/* ---------------- Floating Buttons + Modal ---------------- */
export function FloatingActions() {
  const [muted, setMuted] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const onHash = () => { if (window.location.hash === "#register") setOpenModal(true); };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <button
          aria-label="Toggle ambient sound"
          onClick={() => setMuted((m) => !m)}
          className="h-12 w-12 grid place-items-center rounded-full glass neon-border hover:scale-105 transition-transform"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-[color:var(--neon-blue)]" />}
        </button>
        <button
          aria-label="AI Assistant"
          className="h-14 w-14 grid place-items-center rounded-full animated-gradient text-primary-foreground shadow-[0_0_30px_rgba(0,217,255,0.55)] hover:scale-105 transition-transform animate-pulse-glow"
        >
          <Bot size={22} />
        </button>
      </div>

      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => { setOpenModal(false); if (window.location.hash === "#register") history.replaceState(null, "", " "); }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass neon-border rounded-3xl p-6 md:p-8 w-full max-w-md relative"
            >
              <button
                onClick={() => { setOpenModal(false); history.replaceState(null, "", " "); }}
                className="absolute top-4 right-4 h-8 w-8 grid place-items-center rounded-full glass"
              >
                <X size={14} />
              </button>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Register · YUVA 2026</div>
              <h3 className="mt-2 font-display font-black text-2xl">Join the <span className="text-gradient">fest</span>.</h3>
              <form onSubmit={(e) => { e.preventDefault(); setOpenModal(false); }} className="mt-5 space-y-3">
                {["Full Name", "College / Org", "Email", "Phone"].map((f) => (
                  <input
                    key={f}
                    placeholder={f}
                    className="w-full bg-transparent border border-white/10 focus:border-[color:var(--neon-blue)] focus:shadow-[0_0_18px_rgba(0,217,255,0.35)] outline-none rounded-xl px-4 py-3 text-sm transition-all"
                  />
                ))}
                <button className="w-full rounded-xl py-3 text-sm font-semibold text-primary-foreground animated-gradient hover:scale-[1.02] transition-transform">
                  Reserve My Spot
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Cursor ---------------- */
export function NeonCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!enabled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] h-8 w-8 rounded-full mix-blend-screen"
      style={{
        transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)`,
        background: "radial-gradient(circle, rgba(0,217,255,0.55), transparent 70%)",
        boxShadow: "0 0 30px rgba(0,217,255,0.45), 0 0 60px rgba(139,92,246,0.35)",
        transition: "transform 0.08s ease-out",
      }}
    />
  );
}

/* ---------------- Loader ---------------- */
export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-background"
        >
          <div className="text-center">
            <div className="font-display font-black text-5xl text-gradient animate-pulse">YUVA 2026</div>
            <div className="mt-4 mx-auto h-1 w-48 rounded-full overflow-hidden bg-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full w-1/2 animated-gradient"
              />
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Booting kernel...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
