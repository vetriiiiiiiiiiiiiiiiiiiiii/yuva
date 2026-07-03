import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, LogIn, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";
import { useAuth } from "./auth-store";
import { getSettings } from "./settings-store";

export function Hero() {
  const { user } = useAuth();
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    const load = () => {
      setVideoUrl(getSettings().heroVideoUrl || "");
    };
    load();
    window.addEventListener("yuva-settings-change", load);
    return () => window.removeEventListener("yuva-settings-change", load);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax — disabled when user prefers reduced motion */
  const titleY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center"
      style={{ willChange: "transform" }}
    >
      {/* ── Background: Dynamic Video or Fallback Gradient ── */}
      {videoUrl ? (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
            <iframe
              className="absolute w-[150vw] h-[150vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src={`https://www.youtube.com/embed/${videoUrl.includes("v=") ? videoUrl.split("v=")[1].split("&")[0] : videoUrl.split("/").pop()}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoUrl.includes("v=") ? videoUrl.split("v=")[1].split("&")[0] : videoUrl.split("/").pop()}&modestbranding=1&showinfo=0`}
              allow="autoplay; encrypted-media"
              frameBorder="0"
            />
          ) : (
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,112,67,0.28) 0%, transparent 55%), " +
              "radial-gradient(ellipse 70% 50% at 80% 15%, rgba(20,184,166,0.12) 0%, transparent 50%), " +
              "radial-gradient(ellipse 60% 60% at 50% 85%, rgba(255,214,102,0.14) 0%, transparent 50%), " +
              "linear-gradient(160deg, #07090f 0%, #130906 55%, #080a10 100%)",
          }}
        />
      )}

      {/* ── Dark overlay ── */}
      <div aria-hidden className="absolute inset-0 bg-black/50 z-[1]" />

      {/* ── Subtle dot-grid texture (CSS only, no extra element cost) ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* ── Centered hero content ── */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-4 w-full max-w-5xl will-change-transform"
        style={{ y: titleY, opacity: titleOpacity }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Giant YUVA title */}
        <h1
          className="font-display font-black text-white leading-[0.82] select-none"
          style={{
            fontSize: "clamp(5.5rem, 20vw, 16rem)",
            textShadow:
              "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4), 0 24px 90px rgba(0,0,0,0.8)",
          }}
        >
          YUVA
        </h1>

        {/* Year */}
        <span
          className="block font-semibold tracking-[0.28em] text-orange-100 mt-3"
          style={{ fontSize: "clamp(1.5rem, 4.5vw, 4rem)" }}
        >
          2026
        </span>

        {/* ── Countdown — moved inline, directly below "2026" ── */}
        <motion.div
          className="w-full max-w-md mt-8 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Countdown target="2026-09-07T09:00:00" />
        </motion.div>

        {/* Date + location pills */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-200 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-md">
            <CalendarDays size={14} className="text-orange-300 shrink-0" />
            Sep 7–10, 2026
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-md">
            <MapPin size={14} className="text-orange-300 shrink-0" />
            SRM IST Trichy
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {!user && (
            <Link
              to="/login"
              className="hero-primary-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950"
            >
              <LogIn size={15} />
              Register Now
              <ArrowRight size={15} />
            </Link>
          )}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hero-primary-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950"
            >
              Control Center <ArrowRight size={15} />
            </Link>
          )}
          {user?.role === "participant" && (
            <Link
              to="/dashboard"
              className="hero-primary-btn inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950"
            >
              My Dashboard <ArrowRight size={15} />
            </Link>
          )}
          <Link
            to="/events"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/18"
          >
            Explore Events <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
