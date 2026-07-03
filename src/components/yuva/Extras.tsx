import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section } from "./Section";

/* ──────────────────────────────────────────────── */
/*  FAQ — Aaruush-style rounded-3xl glass cards    */
/* ──────────────────────────────────────────────── */
const faqs = [
  {
    q: "Who can participate in YUVA 2026?",
    a: "Any college student, startup founder, developer or creator from across India can register. Some events are open to school students and professionals too.",
  },
  {
    q: "Is there a registration fee?",
    a: "General entry is free. Flagship events and workshops have a nominal fee with combo passes available.",
  },
  {
    q: "Will accommodation be provided?",
    a: "Yes, partnered hostels and hotels offer discounted stays for outstation participants.",
  },
  {
    q: "Can my startup exhibit at Launchpad Phase 2?",
    a: "Absolutely. Apply via the Launchpad form; selected startups get a booth and investor access.",
  },
  {
    q: "How can I join as a mentor?",
    a: "Reach out via the contact form; our team replies within 48 hours.",
  },
  {
    q: "Is it possible to register for multiple events?",
    a: "Yes, you can register for and compete in multiple events. Check individual event pages for team size requirements.",
  },
  {
    q: "What is the last date for registration?",
    a: "Registration closes on Aug 31, 2026. We recommend registering early as slots are limited for flagship events.",
  },
  {
    q: "Which documents are required on the day of the fest?",
    a: "Bring a valid college ID card, a government-issued photo ID, and your event registration confirmation (digital or print).",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full bg-black text-white py-24 px-6 flex flex-col justify-start items-center">
      <motion.h2
        className="text-3xl text-center md:text-5xl lg:text-5xl font-bold font-display text-white mb-12 leading-normal uppercase"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Frequently Asked Questions
      </motion.h2>

      <ul className="space-y-4 w-full max-w-[90%] md:max-w-[62%]">
        {faqs.map((f, i) => (
          <motion.li
            key={i}
            className="w-full cursor-pointer select-none"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aaruush-faq-card">
              <button
                className="flex items-center justify-between w-full py-6 px-6 md:px-10 text-left gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-white font-semibold text-base md:text-xl leading-snug">
                  {f.q}
                </span>
                <ChevronDown
                  className={`h-7 w-7 md:h-8 md:w-8 text-white flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180 text-orange-300" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 md:px-10 pb-6 text-base text-slate-300 leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/*  Contact — keeps original layout               */
/* ──────────────────────────────────────────────── */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={
        <>
          Let's <span className="text-gradient">build together</span>.
        </>
      }
      subtitle="Drop us a line for press or general enquiries."
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass rounded-2xl p-6 md:p-8 space-y-4"
        >
          {[
            { label: "Full Name", type: "text", ph: "Ada Lovelace" },
            { label: "Email", type: "email", ph: "you@domain.com" },
            { label: "Subject", type: "text", ph: "General enquiry" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.ph}
                className="mt-1 w-full bg-transparent border border-white/10 focus:border-orange-400 focus:shadow-[0_0_18px_rgba(255,87,34,0.35)] outline-none rounded-xl px-4 py-3 text-sm transition-all"
              />
            </div>
          ))}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us more..."
              className="mt-1 w-full bg-transparent border border-white/10 focus:border-orange-400 focus:shadow-[0_0_18px_rgba(255,87,34,0.35)] outline-none rounded-xl px-4 py-3 text-sm transition-all resize-none"
            />
          </div>
          <button className="w-full rounded-xl py-3 text-sm font-semibold text-white animated-gradient hover:scale-[1.02] transition-transform">
            Send Message
          </button>
        </form>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-orange-400" />
              technicalclubs@ist.srmtrichy.edu.in
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-orange-400" />
              manageriic@srmtrichy.edu.in
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-orange-300" />
              +91 94875 49510
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-orange-300" />
              +91 90430 01709
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-orange-200" />
              SRM IST Trichy
            </div>
            <a
              href="https://www.google.com/maps/place/SRM+IST+Trichy"
              target="_blank"
              rel="noreferrer"
              className="block text-xs text-muted-foreground hover:text-orange-400 transition-colors"
            >
              View on Google Maps ↗
            </a>
            <div className="flex items-center gap-3 pt-2">
              {[Twitter, Instagram, Linkedin, Github, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 grid place-items-center rounded-xl glass hover:border-orange-400/40 hover:text-orange-300 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="glass relative h-64 overflow-hidden rounded-2xl">
            <iframe
              title="SRM IST Trichy map"
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

/* ──────────────────────────────────────────────── */
/*  Footer — Aaruush large branded card           */
/* ──────────────────────────────────────────────── */
const footerPortals = [
  { label: "Events", to: "/events" },
  { label: "Workshops", to: "/workshops" },
  { label: "Launchpad", to: "/launchpad" },
  { label: "Flagships", to: "/flagships" },
];

const footerContact = [
  {
    label: "technicalclubs@ist.srmtrichy.edu.in",
    href: "mailto:technicalclubs@ist.srmtrichy.edu.in",
  },
  { label: "manageriic@srmtrichy.edu.in", href: "mailto:manageriic@srmtrichy.edu.in" },
  { label: "+91 94875 49510", href: "tel:+919487549510" },
  { label: "+91 90430 01709", href: "tel:+919043001709" },
];

const footerJoin = [
  { label: "FOSS Trichy", to: "/foss" },
  { label: "Team YUVA", to: "/team" },
  { label: "Campus Ambassador", to: "/login" },
  { label: "Privacy Policy", to: "/" },
];

const socialLinks = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Github, href: "#", label: "GitHub" },
  { Icon: Facebook, href: "#", label: "Facebook" },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full mt-10"
    >
      {/* Large Aaruush-style footer card */}
      <div className="aaruush-footer-card relative overflow-hidden">
        {/* Right-top gradient blob */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(239,101,34,0.15), transparent 60%)",
          }}
        />
        {/* Bottom-left gradient blob */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 w-1/2 h-4/5 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(255,228,0,0.08), transparent 60%)",
          }}
        />

        {/* YUVA watermark text */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none"
        >
          <span
            className="font-display font-black text-white opacity-[0.06]"
            style={{ fontSize: "clamp(5rem, 20vw, 16rem)", lineHeight: 1 }}
          >
            YUVA
          </span>
        </div>

        {/* Footer content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex-1 flex flex-col md:flex-row items-start justify-between px-8 md:px-14 pt-14 pb-6 gap-10">
            {/* Logo + social row */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-auto flex items-center bg-white/10 rounded-xl px-3 py-1 aaruush-glass">
                  <img
                    src="/logos/yuva-wordmark.png"
                    alt="YUVA 2026"
                    className="h-7 w-auto object-contain [clip-path:inset(18%_0%)]"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
                National Techno-Management Fest.
                <br />
                SRM IST Trichy · Sep 7–10, 2026
              </p>
              <div className="flex gap-4 items-center flex-wrap">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="hover:opacity-70 transition-opacity text-white"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Our Portals */}
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Our Portals</h3>
              {footerPortals.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to as "/events" | "/workshops" | "/launchpad" | "/flagships"}
                  className="text-lg font-light text-white hover:opacity-75 transition-opacity"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Contact Us</h3>
              {footerContact.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-base font-light text-white hover:opacity-75 transition-opacity break-all"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Join Us */}
            <div className="flex flex-col gap-3">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Join Us</h3>
              {footerJoin.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to as "/" | "/foss" | "/team" | "/login"}
                  className="text-lg font-light text-white hover:opacity-75 transition-opacity"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 py-5 px-8 md:px-14 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>© 2026 YUVA · SRM IST Trichy. All rights reserved.</span>
            <span>Built with passion by Team YUVA</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

/* ──────────────────────────────────────────────── */
/*  Cursor — neon orange                           */
/* ──────────────────────────────────────────────── */
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
        background: "radial-gradient(circle, rgba(255,87,34,0.55), transparent 70%)",
        boxShadow: "0 0 30px rgba(255,87,34,0.45), 0 0 60px rgba(255,112,67,0.35)",
        transition: "transform 0.08s ease-out",
      }}
    />
  );
}

/* ──────────────────────────────────────────────── */
/*  Loader                                         */
/* ──────────────────────────────────────────────── */
export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-background"
        >
          <div className="text-center">
            <div className="font-display font-black text-5xl text-gradient animate-pulse">
              YUVA 2026
            </div>
            <div className="mt-4 mx-auto h-1 w-48 rounded-full overflow-hidden bg-white/5">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-full w-1/2 animated-gradient"
              />
            </div>
            <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Loading the arena...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
