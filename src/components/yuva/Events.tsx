import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Section } from "./Section";
import { useAuth } from "./auth-store";
import {
  defaultEvents,
  eventCategories,
  eventIcons,
  eventsStorageKey,
  type FestEvent,
} from "./event-store";
import { registerForEvent, unregisterFromEvent, useRegistrations } from "./registration-store";

export function Events({ admin = false }: { admin?: boolean }) {
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

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (cat === "All" || e.cat === cat) &&
          (q.trim() === "" ||
            `${e.title} ${e.desc} ${e.cat}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, events, q],
  );

  const selectedEvent = events.find((e) => e.id === selected);

  return (
    <Section
      id="events"
      eyebrow={`${events.length} Events / 4 Days`}
      title={
        <>
          Compete. <span className="text-gradient">Create. Conquer.</span>
        </>
      }
      subtitle="Explore all the competitions, workshops, and activities happening at YUVA 2026."
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {eventCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                cat === c
                  ? "animated-gradient text-primary-foreground shadow-[0_0_20px_rgba(255,87,34,0.36)]"
                  : "border border-white/10 bg-white/[0.05] text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="surface flex w-full items-center gap-2 rounded-lg px-3 py-2 md:w-72">
            <Search size={14} className="text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events..."
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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event, i) => {
          const Icon = eventIcons[event.icon] ?? eventIcons.code;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 9) * 0.04, duration: 0.45, ease: "easeOut" }}
              className={`group surface relative overflow-hidden rounded-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] active:scale-[0.995] will-change-transform ${
                selected === event.id
                  ? "border-[color:var(--signal-green)]"
                  : "hover:border-[color:var(--neon-blue)] hover:shadow-xl"
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-1 animated-gradient opacity-70" />
              {event.posterImage && (
                <div className="-mx-6 -mt-6 mb-4 h-32 overflow-hidden border-b border-white/10">
                  <img
                    src={event.posterImage}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {event.clubLogo ? (
                      <img
                        src={event.clubLogo}
                        alt="Club"
                        loading="lazy"
                        decoding="async"
                        className="h-11 w-11 rounded-lg object-cover bg-white/5"
                      />
                    ) : (
                      <div className="grid h-11 w-11 place-items-center rounded-lg animated-gradient text-primary-foreground">
                        <Icon size={20} />
                      </div>
                    )}
                  </div>
                  <span className="text-right text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {event.cat}
                  </span>
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
                  {event.date && (
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--neon-blue)]">
                      {event.date}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{event.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {event.desc}
                </p>
                <button
                  type="button"
                  onClick={(clickEvent) => {
                    clickEvent.stopPropagation();
                    setSelected(event.id);
                  }}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--neon-blue)] transition-transform hover:translate-x-0.5 cursor-pointer"
                >
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No events match your search.
          </div>
        )}
      </div>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedEvent && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 md:p-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelected(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] shadow-2xl md:flex-row"
                >
                  {selectedEvent.posterImage && (
                    <div className="h-64 w-full bg-black md:h-auto md:w-1/2 flex items-center justify-center p-4">
                      <img
                        src={selectedEvent.posterImage}
                        alt={selectedEvent.title}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col p-6 md:p-10 ${selectedEvent.posterImage ? "md:w-1/2" : "w-full"} overflow-y-auto`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {selectedEvent.cat}
                      </span>
                      <button
                        onClick={() => setSelected(null)}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <h2 className="font-display text-3xl font-bold mb-2">{selectedEvent.title}</h2>
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      {selectedEvent.status && (
                        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--neon-cyan)]">
                          {selectedEvent.status}
                        </span>
                      )}
                      {selectedEvent.prize && (
                        <span className="rounded-full bg-[color:var(--hot-amber)]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--hot-amber)]">
                          {selectedEvent.prize}
                        </span>
                      )}
                      {selectedEvent.date && (
                        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--neon-blue)]">
                          {selectedEvent.date}
                        </span>
                      )}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed flex-1 mb-8">
                      {selectedEvent.desc}
                    </p>

                    <div className="flex flex-col gap-3">
                      <div className="inline-flex rounded-full bg-[color:var(--signal-green)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--signal-green)] w-fit mb-2">
                        Details opening soon
                      </div>
                      {user ? (
                        selectedEvent.registrationLink ? (
                          <a
                            href={selectedEvent.registrationLink}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full text-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                          >
                            Register Now
                          </a>
                        ) : registeredEvents.includes(selectedEvent.id) ? (
                          <button
                            onClick={() => unregisterFromEvent(user.id, selectedEvent.id)}
                            className="w-full rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-bold text-red-400 transition-all hover:bg-red-500/20"
                          >
                            Cancel Registration
                          </button>
                        ) : (
                          <button
                            onClick={() => registerForEvent(user.id, selectedEvent.id)}
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
