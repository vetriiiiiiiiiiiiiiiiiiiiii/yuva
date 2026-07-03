import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, GraduationCap, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section } from "./Section";
import { useAuth } from "./auth-store";
import { defaultWorkshops, workshopsStorageKey, type FestWorkshop } from "./workshop-store";
import {
  registerForWorkshop,
  unregisterFromWorkshop,
  useRegistrations,
} from "./registration-store";

const levelColor: Record<string, string> = {
  Beginner: "from-orange-400 to-orange-500",
  Intermediate: "from-orange-500 to-orange-600",
  Advanced: "from-orange-600 to-orange-700",
};

export function Workshops() {
  const { user } = useAuth();
  const { registeredWorkshops } = useRegistrations(user?.id);
  const [workshops, setWorkshops] = useState<FestWorkshop[]>(defaultWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkshops = () => {
      const stored = window.localStorage.getItem(workshopsStorageKey);
      if (!stored) {
        setWorkshops(defaultWorkshops);
        return;
      }

      try {
        const parsed = JSON.parse(stored) as FestWorkshop[];
        if (Array.isArray(parsed)) setWorkshops(parsed);
      } catch {
        window.localStorage.removeItem(workshopsStorageKey);
        setWorkshops(defaultWorkshops);
      }
    };

    loadWorkshops();
    window.addEventListener("storage", loadWorkshops);
    window.addEventListener("yuva-workshops-change", loadWorkshops);
    return () => {
      window.removeEventListener("storage", loadWorkshops);
      window.removeEventListener("yuva-workshops-change", loadWorkshops);
    };
  }, []);

  const selectedW = workshops.find((w) => w.id === selectedWorkshop);

  return (
    <Section
      id="workshops"
      eyebrow={`${workshops.length} Workshops`}
      title={
        <>
          Hands-on. <span className="text-gradient">Industry-led.</span>
        </>
      }
      subtitle="Skill up in the stacks shaping tomorrow — every workshop is coming soon for this edition."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {workshops.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: i % 2 ? 24 : -24, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 6) * 0.04, duration: 0.45, ease: "easeOut" }}
              className={`group surface relative flex items-center gap-4 overflow-hidden rounded-lg p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.995] will-change-transform ${
                selectedWorkshop === w.id
                  ? "border-[color:var(--signal-green)]"
                  : "hover:border-[color:var(--neon-blue)] hover:shadow-xl"
              }`}
            >
            <div
              className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${levelColor[w.level]} grid place-items-center text-primary-foreground font-display font-black text-lg relative overflow-hidden`}
            >
              {w.clubLogo ? (
                <img
                  src={w.clubLogo}
                  alt="Club Logo"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover bg-white/5"
                />
              ) : (
                String(i + 1).padStart(2, "0")
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                <GraduationCap size={12} /> {w.level}
                <span>•</span>
                <Clock size={12} /> {w.duration || "TBA"}
              </div>
              <h3 className="mt-1 font-display font-bold text-base md:text-lg truncate">
                {w.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {w.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground/80">
                <User size={12} /> Speaker · {w.speaker || "TBA"}
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedWorkshop(w.id);
                }}
                className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-blue)] transition-transform hover:translate-x-0.5 cursor-pointer"
              >
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedW && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedWorkshop(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] shadow-2xl md:flex-row"
                >
                  {selectedW.posterImage && (
                    <div className="h-64 w-full bg-black md:h-auto md:w-1/2 flex items-center justify-center p-4">
                      <img
                        src={selectedW.posterImage}
                        alt={selectedW.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col p-6 md:p-10 ${selectedW.posterImage ? "md:w-1/2" : "w-full"} overflow-y-auto`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Workshop
                      </span>
                      <button
                        onClick={() => setSelectedWorkshop(null)}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-2">{selectedW.title}</h2>
                    <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap size={14} /> {selectedW.level}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {selectedW.duration || "TBA"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User size={14} /> {selectedW.speaker || "TBA"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2 mb-8">
                      {selectedW.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 mt-auto">
                      <div className="inline-flex rounded-full bg-[color:var(--signal-green)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--signal-green)] w-fit mb-2">
                        {selectedW.registrationLink ? "Registration Open" : "Details opening soon"}
                      </div>
                      {user ? (
                        selectedW.registrationLink ? (
                          <a
                            href={selectedW.registrationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full text-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                          >
                            Register Now
                          </a>
                        ) : registeredWorkshops.includes(selectedW.id) ? (
                          <button
                            onClick={() => unregisterFromWorkshop(user.id, selectedW.id)}
                            className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-bold text-red-400 transition-all hover:bg-red-500/20"
                          >
                            Cancel Registration
                          </button>
                        ) : (
                          <button
                            onClick={() => registerForWorkshop(user.id, selectedW.id)}
                            className="w-full text-center rounded-xl bg-gradient-to-r from-[color:var(--neon-blue)] to-blue-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                          >
                            Register Interest
                          </button>
                        )
                      ) : (
                        <Link
                          to="/login"
                          className="w-full text-center rounded-xl border border-white/10 bg-white/[0.06] px-6 py-3 font-bold text-white transition-all hover:bg-white/10"
                        >
                          Login to Register
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </Section>
  );
}
