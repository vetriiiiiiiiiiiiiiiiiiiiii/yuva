import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, logout, getCurrentUser } from "../components/yuva/auth-store";
import {
  useRegistrations,
  registerForEvent,
  unregisterFromEvent,
  unregisterFromWorkshop,
} from "../components/yuva/registration-store";
import { defaultEvents, eventsStorageKey, type FestEvent } from "../components/yuva/event-store";
import { defaultWorkshops } from "../components/yuva/workshop-store";
import {
  BookOpen,
  CalendarDays,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard - YUVA 2026" },
      { name: "description", content: "View your registered events and workshops." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, isParticipant } = useAuth();
  const navigate = useNavigate();
  const { registeredEvents, registeredWorkshops } = useRegistrations(user?.id);
  const [events, setEvents] = useState<FestEvent[]>(defaultEvents);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (!storedUser) {
      navigate({ to: "/login" });
    }
  }, [navigate]);

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

  if (!user) {
    return null;
  }

  const myEvents = events.filter((e) => registeredEvents.includes(e.id));
  const myWorkshops = defaultWorkshops.filter((w) => registeredWorkshops.includes(w.id));

  // Recommendation engine for suggested events
  const unregisteredEvents = events.filter((e) => !registeredEvents.includes(e.id));
  let suggestedEvents: FestEvent[] = [];
  if (myEvents.length > 0) {
    const myCategories = Array.from(new Set(myEvents.map((e) => e.cat)));
    const matchCategory = unregisteredEvents.filter((e) => myCategories.includes(e.cat));
    suggestedEvents = [...matchCategory];

    if (suggestedEvents.length < 3) {
      const remaining = unregisteredEvents.filter(
        (e) => !suggestedEvents.some((se) => se.id === e.id),
      );
      const sortedRemaining = [...remaining].sort((a, b) => {
        const aFlag = a.isFlagship || a.status === "Flagship" ? 1 : 0;
        const bFlag = b.isFlagship || b.status === "Flagship" ? 1 : 0;
        return bFlag - aFlag;
      });
      suggestedEvents = [...suggestedEvents, ...sortedRemaining].slice(0, 3);
    } else {
      suggestedEvents = suggestedEvents.slice(0, 3);
    }
  } else {
    const sorted = [...unregisteredEvents].sort((a, b) => {
      const aFlag = a.isFlagship || a.status === "Flagship" ? 1 : 0;
      const bFlag = b.isFlagship || b.status === "Flagship" ? 1 : 0;
      return bFlag - aFlag;
    });
    suggestedEvents = sorted.slice(0, 3);
  }

  return (
    <div className="min-h-screen px-4 pb-12 pt-28">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--neon-cyan)]">
              <Sparkles size={12} className="animate-pulse" />
              Participant Portal
            </div>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
              My <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back, <span className="text-foreground font-semibold">{user.name}</span>
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold transition-all hover:border-red-400/50 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="command-tile rounded-lg p-5">
            <CalendarDays size={20} className="text-[color:var(--neon-blue)]" />
            <div className="mt-5 font-display text-3xl font-black">{myEvents.length}</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Registered Events
            </div>
          </div>
          <div className="command-tile rounded-lg p-5">
            <BookOpen size={20} className="text-[color:var(--neon-purple)]" />
            <div className="mt-5 font-display text-3xl font-black">{myWorkshops.length}</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Registered Workshops
            </div>
          </div>
          <div className="command-tile rounded-lg p-5">
            <ShieldCheck size={20} className="text-[color:var(--neon-cyan)]" />
            <div className="mt-5 font-display text-3xl font-black capitalize">{user.role}</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Account Role
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          {/* Main Area: Registered Tracks */}
          <div className="space-y-8">
            {/* Events Card */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--neon-blue)]/10 text-[color:var(--neon-blue)]">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">My Events</h2>
                    <p className="text-xs text-muted-foreground">Compete, create, and conquer</p>
                  </div>
                </div>
                <Link
                  to="/events"
                  className="text-xs font-semibold text-[color:var(--neon-blue)] hover:underline"
                >
                  Browse Events
                </Link>
              </div>

              {myEvents.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {myEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="surface relative overflow-hidden rounded-xl p-5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="rounded-full bg-white/[0.05] border border-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                            {event.cat}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-bold">{event.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            {event.desc}
                          </p>
                        </div>
                        <button
                          onClick={() => unregisterFromEvent(user.id, event.id)}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                          title="Unregister"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                        {event.prize && (
                          <span className="text-[color:var(--hot-amber)] font-semibold">
                            Prize: {event.prize}
                          </span>
                        )}
                        {event.prize && <span>•</span>}
                        <span>{event.status}</span>
                        <span>•</span>
                        <span className="text-[color:var(--neon-cyan)] font-semibold">
                          Date: {event.date || "Sep 7-10, 2026"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-sm text-muted-foreground border border-dashed border-white/10 rounded-xl">
                  You haven't registered for any events yet.
                  <div className="mt-3">
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-1.5 rounded-lg animated-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md"
                    >
                      Explore Events
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Events Card */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--neon-cyan)]/10 text-[color:var(--neon-cyan)]">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Suggested Events</h2>
                    <p className="text-xs text-muted-foreground">
                      Handpicked recommendations for you
                    </p>
                  </div>
                </div>
                <Link
                  to="/events"
                  className="text-xs font-semibold text-[color:var(--neon-cyan)] hover:underline"
                >
                  View All Events
                </Link>
              </div>

              {suggestedEvents.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {suggestedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="surface relative overflow-hidden rounded-xl p-5 border border-white/10 flex flex-col justify-between"
                    >
                      <div>
                        <span className="rounded-full bg-white/[0.05] border border-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                          {event.cat}
                        </span>
                        <h3 className="mt-2 font-display text-base font-bold">{event.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {event.desc}
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                          {event.prize && (
                            <span className="text-[color:var(--hot-amber)] font-semibold">
                              Prize: {event.prize}
                            </span>
                          )}
                          {event.prize && <span>•</span>}
                          <span className="text-[color:var(--neon-blue)] font-semibold">
                            {event.date || "Sep 7-10, 2026"}
                          </span>
                        </div>
                        <button
                          onClick={() => registerForEvent(user.id, event.id)}
                          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-[color:var(--neon-blue)]/30 bg-[color:var(--neon-blue)]/10 py-2 text-xs font-semibold text-[color:var(--neon-blue)] hover:bg-[color:var(--neon-blue)]/20 transition-all cursor-pointer"
                        >
                          Register Interest
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-sm text-muted-foreground border border-dashed border-white/10 rounded-xl">
                  You've registered for all available events!
                </div>
              )}
            </div>

            {/* Workshops Card */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-[color:var(--neon-purple)]/10 text-[color:var(--neon-purple)]">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">My Workshops</h2>
                    <p className="text-xs text-muted-foreground">Learn from industry leaders</p>
                  </div>
                </div>
                <Link
                  to="/workshops"
                  className="text-xs font-semibold text-[color:var(--neon-purple)] hover:underline"
                >
                  Browse Workshops
                </Link>
              </div>

              {myWorkshops.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {myWorkshops.map((w) => (
                    <motion.div
                      key={w.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="surface relative overflow-hidden rounded-xl p-5 border border-white/10"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="rounded-full bg-white/[0.05] border border-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                            {w.level}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-bold">{w.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {w.stack.map((s) => (
                              <span
                                key={s}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/5"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => unregisterFromWorkshop(user.id, w.id)}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                          title="Unregister"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-4 text-[10px] text-muted-foreground">
                        Speaker: {w.speaker || "TBA"} • Duration: {w.duration}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-sm text-muted-foreground border border-dashed border-white/10 rounded-xl">
                  You haven't registered for any workshops yet.
                  <div className="mt-3">
                    <Link
                      to="/workshops"
                      className="inline-flex items-center gap-1.5 rounded-lg animated-gradient px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md"
                    >
                      Explore Workshops
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Profile Details */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold border-b border-white/5 pb-3">
                Participant Profile
              </h3>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-muted-foreground">
                    <User size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Name
                    </div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-muted-foreground">
                    <Mail size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Email
                    </div>
                    <div className="font-semibold truncate max-w-[200px]">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-muted-foreground">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Access Level
                    </div>
                    <div className="font-semibold text-[color:var(--neon-cyan)] capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold border-b border-white/5 pb-3">
                Quick Guide
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--neon-blue)]" />
                  Your registrations indicate interest and reserves a spot in event check-ins.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--neon-blue)]" />
                  Combo passes and registration fees are finalized on day 1 at the venue desk.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--neon-blue)]" />
                  For accommodation and queries, drop a line via the Contact Form.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
