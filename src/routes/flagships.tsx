import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Section } from "../components/yuva/Section";
import { useAuth } from "../components/yuva/auth-store";
import {
  defaultEvents,
  eventCategories,
  eventIcons,
  eventsStorageKey,
  type FestEvent,
} from "../components/yuva/event-store";
import {
  registerForEvent,
  unregisterFromEvent,
  useRegistrations,
} from "../components/yuva/registration-store";

export const Route = createFileRoute("/flagships")({
  head: () => ({
    meta: [
      { title: "Flagship Events — YUVA 2026" },
      {
        name: "description",
        content:
          "Explore the premium flagship battles at YUVA 2026: YUVA Hacks, CTF, RC Race, Drone Race, HR Conclave, and VibeCraft.",
      },
    ],
  }),
  component: FlagshipsPage,
});

function FlagshipsPage() {
  const { user, isAdmin } = useAuth();
  const { registeredEvents } = useRegistrations(user?.id);

  const [events, setEvents] = useState<FestEvent[]>(defaultEvents);
  const [cat, setCat] = useState<(typeof eventCategories)[number]>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(eventsStorageKey);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as FestEvent[];
      if (Array.isArray(parsed)) setEvents(parsed);
    } catch {
      window.localStorage.removeItem(eventsStorageKey);
    }
  }, []);

  const flagshipsOnly = useMemo(() => events.filter((e) => e.isFlagship === true), [events]);

  const filtered = useMemo(
    () =>
      flagshipsOnly.filter(
        (e) =>
          (cat === "All" || e.cat === cat) &&
          (q.trim() === "" ||
            `${e.title} ${e.desc} ${e.cat}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, flagshipsOnly, q],
  );

  return (
    <div className="pt-20">
      <Section
        id="flagships"
        eyebrow="Elite Battlefield"
        title={
          <>
            Flagship <span className="text-gradient">Events</span>
          </>
        }
        subtitle="The ultimate showcase: 6 premier national battles across engineering, hacking, biotech, racing, and leadership."
      >
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((c) => {
              // Only show categories that actually have flagship events
              const hasFlagships = c === "All" || flagshipsOnly.some((fe) => fe.cat === c);
              if (!hasFlagships) return null;

              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    cat === c
                      ? "animated-gradient text-primary-foreground shadow-[0_0_20px_rgba(255,87,34,0.36)]"
                      : "border border-white/10 bg-white/[0.05] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="surface flex w-full items-center gap-2 rounded-lg px-3 py-2 md:w-72">
              <Search size={14} className="text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search flagship events..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {isAdmin && (
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-foreground transition-all hover:border-[color:var(--neon-blue)]"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => {
            const Icon = eventIcons[event.icon] ?? eventIcons.code;
            const isReg = user && registeredEvents.includes(event.id);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 9) * 0.04, duration: 0.45, ease: "easeOut" }}
                className={`group surface relative overflow-hidden rounded-lg p-6 transition-all ${
                  selected === event.id
                    ? "border-[color:var(--signal-green)]"
                    : "hover:border-[color:var(--neon-blue)]"
                }`}
              >
                {/* Glowing Flagship Indicator */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[color:var(--neon-cyan)]/10 blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 top-0 h-1 animated-gradient opacity-90" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg animated-gradient text-primary-foreground">
                      <Icon size={20} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {event.cat}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 text-[8px] uppercase tracking-wider bg-[color:var(--neon-cyan)]/10 text-[color:var(--neon-cyan)] px-2 py-0.5 rounded border border-[color:var(--neon-cyan)]/20 font-bold">
                        <Sparkles
                          size={8}
                          className="animate-spin"
                          style={{ animationDuration: "3s" }}
                        />{" "}
                        Elite Flagship
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {event.status && (
                      <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--neon-cyan)]">
                        {event.status}
                      </span>
                    )}
                    {event.prize && (
                      <span className="rounded-full bg-[color:var(--hot-amber)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--hot-amber)]">
                        {event.prize}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold">{event.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                    {event.desc}
                  </p>

                  {selected === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4"
                    >
                      <div className="inline-flex rounded-full bg-[color:var(--signal-green)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--signal-green)] w-fit">
                        Details opening soon
                      </div>

                      {user ? (
                        isReg ? (
                          <button
                            type="button"
                            onClick={(clickEvent) => {
                              clickEvent.stopPropagation();
                              unregisterFromEvent(user.id, event.id);
                            }}
                            className="mt-1 w-full rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 cursor-pointer"
                          >
                            Cancel Registration
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(clickEvent) => {
                              clickEvent.stopPropagation();
                              registerForEvent(user.id, event.id);
                            }}
                            className="mt-1 w-full rounded-lg border border-[color:var(--neon-blue)]/30 bg-[color:var(--neon-blue)]/10 py-2 text-xs font-semibold text-[color:var(--neon-blue)] hover:bg-[color:var(--neon-blue)]/20 cursor-pointer"
                          >
                            Register Interest
                          </button>
                        )
                      ) : (
                        <Link
                          to="/login"
                          className="mt-1 w-full inline-flex justify-center items-center rounded-lg border border-white/10 bg-white/[0.06] py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                        >
                          Login to Register
                        </Link>
                      )}
                    </motion.div>
                  )}

                  <button
                    type="button"
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      setSelected(selected === event.id ? null : event.id);
                    }}
                    className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-blue)] transition-transform hover:translate-x-0.5 cursor-pointer"
                  >
                    {selected === event.id ? "Show Less" : "Learn More"}{" "}
                    <ArrowRight size={14} className={selected === event.id ? "rotate-90" : ""} />
                  </button>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
              No flagship events match your search.
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
