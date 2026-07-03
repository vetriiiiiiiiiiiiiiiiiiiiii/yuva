import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  Clock,
  Image,
  LayoutDashboard,
  LogOut,
  Plus,
  Rocket,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { deleteUser, logout, updateUserRole, useAuth, type UserRole } from "./auth-store";
import {
  defaultEvents,
  eventCategories,
  eventsStorageKey,
  iconOptions,
  type EventCategory,
  type FestEvent,
} from "./event-store";
import {
  defaultWorkshops,
  workshopLevels,
  workshopsStorageKey,
  type FestWorkshop,
  type WorkshopLevel,
} from "./workshop-store";
import {
  getSettings,
  saveSettings,
  type SiteSettings,
  type ScheduleItem,
  defaultPortalImages,
} from "./settings-store";

import { AdminSponsors } from "./AdminSponsors";
import { AdminGallery } from "./AdminGallery";
import { AdminPosters } from "./AdminPosters";
import { AdminTeam } from "./AdminTeam";
import { resizeImage } from "./image-utils";

type AdminTab =
  | "overview"
  | "events"
  | "workshops"
  | "launchpad"
  | "foss"
  | "schedule"
  | "users"
  | "sponsors"
  | "gallery"
  | "posters"
  | "team"
  | "settings";

const blankEvent: FestEvent = {
  id: "",
  title: "",
  desc: "",
  cat: "Technical",
  icon: "code",
  prize: "",
  status: "",
  isFlagship: false,
  date: "",
  registrationLink: "",
};

const blankWorkshop: FestWorkshop = {
  id: "",
  title: "",
  stack: [],
  level: "Intermediate",
  duration: "",
  speaker: "",
};

function makeId(title: string) {
  const id = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return id || `event-${Date.now()}`;
}

function saveEvents(events: FestEvent[]) {
  window.localStorage.setItem(eventsStorageKey, JSON.stringify(events));
  window.dispatchEvent(new Event("yuva-events-change"));
}

function saveWorkshops(workshops: FestWorkshop[]) {
  window.localStorage.setItem(workshopsStorageKey, JSON.stringify(workshops));
  window.dispatchEvent(new Event("yuva-workshops-change"));
}

export function AdminDashboard() {
  const { user, users, refresh } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [events, setEvents] = useState<FestEvent[]>(defaultEvents);
  const [cat, setCat] = useState<(typeof eventCategories)[number]>("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<FestEvent>({ ...blankEvent });
  const [workshops, setWorkshops] = useState<FestWorkshop[]>(defaultWorkshops);
  const [workshopQuery, setWorkshopQuery] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [editingWorkshop, setEditingWorkshop] = useState<FestWorkshop>({ ...blankWorkshop });
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem>({
    id: "",
    day: "Day 1",
    time: "",
    title: "",
    location: "",
    category: "Main Stage",
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file, 800, 800);
      setter(resized);
    } catch (err) {
      alert("Failed to process image");
    }
  };

  useEffect(() => {
    const stored = window.localStorage.getItem(eventsStorageKey);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as FestEvent[];
      if (Array.isArray(parsed)) setEvents(parsed);
    } catch {
      setEvents(defaultEvents);
    }
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem(workshopsStorageKey);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as FestWorkshop[];
      if (Array.isArray(parsed)) setWorkshops(parsed);
    } catch {
      setWorkshops(defaultWorkshops);
    }
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return events.filter(
      (event) =>
        (cat === "All" || event.cat === cat) &&
        (!query ||
          event.title.toLowerCase().includes(query) ||
          event.desc.toLowerCase().includes(query) ||
          event.cat.toLowerCase().includes(query)),
    );
  }, [events, cat, q]);

  const filteredWorkshops = useMemo(() => {
    const query = workshopQuery.trim().toLowerCase();
    return workshops.filter(
      (workshop) =>
        !query ||
        workshop.title.toLowerCase().includes(query) ||
        workshop.level.toLowerCase().includes(query) ||
        workshop.stack.join(" ").toLowerCase().includes(query) ||
        (workshop.speaker ?? "").toLowerCase().includes(query),
    );
  }, [workshops, workshopQuery]);

  const admins = users.filter((portalUser) => portalUser.role === "admin").length;

  const save = () => {
    if (!editing.title.trim()) {
      alert("Event title is required!");
      return;
    }

    const normalized: FestEvent = {
      ...editing,
      id: editing.id || makeId(editing.title),
      title: editing.title.trim(),
      desc: editing.desc.trim(),
      prize: editing.prize?.trim(),
      status: editing.status?.trim(),
      isFlagship: !!editing.isFlagship,
      registrationLink: editing.registrationLink?.trim(),
    };

    const updated = events.some((event) => event.id === normalized.id)
      ? events.map((event) => (event.id === normalized.id ? normalized : event))
      : [...events, normalized];

    setEvents(updated);
    saveEvents(updated);
    setEditing({ ...blankEvent });
    setSelected(null);
  };

  const editEvent = (event: FestEvent) => {
    setSelected(event.id);
    setEditing(event);
    setActiveTab("events");
  };

  const createEvent = () => {
    setSelected(null);
    setEditing({ ...blankEvent });
    setActiveTab("events");
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    saveEvents(updated);
    if (selected === id) {
      setSelected(null);
      setEditing({ ...blankEvent });
    }
  };

  const resetEvents = () => {
    setEvents(defaultEvents);
    saveEvents(defaultEvents);
    setSelected(null);
    setEditing({ ...blankEvent });
  };

  const editWorkshop = (workshop: FestWorkshop) => {
    setSelectedWorkshop(workshop.id);
    setEditingWorkshop(workshop);
    setActiveTab("workshops");
  };

  const createWorkshop = () => {
    setSelectedWorkshop(null);
    setEditingWorkshop({ ...blankWorkshop });
    setActiveTab("workshops");
  };

  const saveWorkshop = () => {
    if (!editingWorkshop.title.trim()) {
      alert("Workshop title is required!");
      return;
    }

    const normalized: FestWorkshop = {
      ...editingWorkshop,
      id: editingWorkshop.id || makeId(editingWorkshop.title),
      title: editingWorkshop.title.trim(),
      duration: editingWorkshop.duration.trim(),
      speaker: editingWorkshop.speaker?.trim(),
      stack: editingWorkshop.stack.map((item) => item.trim()).filter(Boolean),
    };

    const updated = workshops.some((workshop) => workshop.id === normalized.id)
      ? workshops.map((workshop) => (workshop.id === normalized.id ? normalized : workshop))
      : [...workshops, normalized];

    setWorkshops(updated);
    saveWorkshops(updated);
    setSelectedWorkshop(null);
    setEditingWorkshop({ ...blankWorkshop });
  };

  const deleteWorkshop = (id: string) => {
    const updated = workshops.filter((workshop) => workshop.id !== id);
    setWorkshops(updated);
    saveWorkshops(updated);
    if (selectedWorkshop === id) {
      setSelectedWorkshop(null);
      setEditingWorkshop({ ...blankWorkshop });
    }
  };

  const resetWorkshops = () => {
    setWorkshops(defaultWorkshops);
    saveWorkshops(defaultWorkshops);
    setSelectedWorkshop(null);
    setEditingWorkshop({ ...blankWorkshop });
  };

  const changeRole = (id: string, role: UserRole) => {
    updateUserRole(id, role);
    refresh();
  };

  const removeUser = (id: string) => {
    deleteUser(id);
    refresh();
  };

  const saveGlobalSettings = () => {
    saveSettings(settings);
    alert("Global settings saved!");
  };

  return (
    <div className="min-h-screen px-4 pb-12 pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--neon-cyan)]">
              Admin Only
            </div>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
              Control <span className="text-gradient">Center</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Signed in as <span className="text-[color:var(--neon-blue)]">{user?.email}</span>
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold transition-all hover:border-red-400/50 hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <MetricCard icon={CalendarDays} label="Events" value={events.length.toString()} />
          <MetricCard icon={BookOpen} label="Workshops" value={workshops.length.toString()} />
          <MetricCard icon={Users} label="Users" value={users.length.toString()} />
          <MetricCard icon={ShieldCheck} label="Admins" value={admins.toString()} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "events", label: "Events", icon: CalendarDays },
            { id: "workshops", label: "Workshops", icon: BookOpen },
            { id: "launchpad", label: "Launchpad", icon: Rocket },
            { id: "foss", label: "FOSS", icon: Users },
            { id: "schedule", label: "Schedule", icon: Clock },
            { id: "sponsors", label: "Sponsors", icon: LayoutDashboard },
            { id: "gallery", label: "Gallery", icon: Image },
            { id: "team", label: "Team", icon: Users },
            { id: "users", label: "Permissions", icon: ShieldCheck },
            { id: "settings", label: "Settings", icon: Save },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "animated-gradient text-primary-foreground"
                  : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl font-bold">Recent Events</h2>
                <button
                  onClick={createEvent}
                  className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-4 py-2 text-sm font-semibold text-black"
                >
                  <Plus size={16} />
                  Add Event
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {events.slice(0, 6).map((event) => (
                  <button
                    key={event.id}
                    onClick={() => editEvent(event)}
                    className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:border-[color:var(--neon-blue)]"
                  >
                    <div className="text-sm font-semibold">{event.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{event.cat}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">Admin Activity</h2>
              <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  Event edits update the public events page for this browser.
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  Permission changes can promote participants to admins or remove admin access.
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  This demo stores admin data in localStorage.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Events</h2>
                <div className="flex gap-2">
                  <button
                    onClick={createEvent}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold"
                  >
                    <Plus size={15} />
                    New
                  </button>
                  <button
                    onClick={resetEvents}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <div className="surface flex items-center gap-2 rounded-lg px-3 py-2">
                  <Search size={14} className="text-muted-foreground" />
                  <input
                    value={q}
                    onChange={(event) => setQ(event.target.value)}
                    placeholder="Search events..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {eventCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setCat(category)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                        cat === category
                          ? "animated-gradient text-primary-foreground"
                          : "border border-white/10 bg-white/[0.05] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filtered.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg border p-3 transition-all ${
                      selected === event.id
                        ? "border-[color:var(--neon-blue)] bg-[color:var(--neon-blue)]/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <button onClick={() => editEvent(event)} className="w-full text-left">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">{event.title}</div>
                        {event.isFlagship && (
                          <span className="rounded bg-[color:var(--neon-cyan)]/10 border border-[color:var(--neon-cyan)]/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[color:var(--neon-cyan)]">
                            Flagship
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{event.cat}</div>
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="mt-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No events found.
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">
                {selected ? "Edit Event" : "Create Event"}
              </h2>
              <div className="mt-5 space-y-4">
                <AdminField label="Event Title">
                  <input
                    value={editing.title}
                    onChange={(event) =>
                      setEditing((item) => ({ ...item, title: event.target.value }))
                    }
                    placeholder="Event title"
                    className="admin-input"
                  />
                </AdminField>

                <AdminField label="Description">
                  <textarea
                    value={editing.desc}
                    onChange={(event) =>
                      setEditing((item) => ({ ...item, desc: event.target.value }))
                    }
                    placeholder="Event description"
                    rows={4}
                    className="admin-input resize-none"
                  />
                </AdminField>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField label="Category">
                    <select
                      value={editing.cat}
                      onChange={(event) =>
                        setEditing((item) => ({
                          ...item,
                          cat: event.target.value as EventCategory,
                        }))
                      }
                      className="admin-input bg-[#07111f]"
                    >
                      {eventCategories
                        .filter((category) => category !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </AdminField>

                  <AdminField label="Icon">
                    <select
                      value={editing.icon}
                      onChange={(event) =>
                        setEditing((item) => ({
                          ...item,
                          icon: event.target.value as FestEvent["icon"],
                        }))
                      }
                      className="admin-input bg-[#07111f]"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </AdminField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField label="Prize / Reward">
                    <input
                      value={editing.prize ?? ""}
                      onChange={(event) =>
                        setEditing((item) => ({ ...item, prize: event.target.value }))
                      }
                      placeholder="e.g. Rs.40K"
                      className="admin-input"
                    />
                  </AdminField>
                  <AdminField label="Badge">
                    <input
                      value={editing.status ?? ""}
                      onChange={(event) =>
                        setEditing((item) => ({ ...item, status: event.target.value }))
                      }
                      placeholder="e.g. Flagship"
                      className="admin-input"
                    />
                  </AdminField>
                </div>

                <AdminField label="Event Date">
                  <input
                    value={editing.date ?? ""}
                    onChange={(event) =>
                      setEditing((item) => ({ ...item, date: event.target.value }))
                    }
                    placeholder="e.g. Sep 7, 2026"
                    className="admin-input"
                  />
                </AdminField>

                <AdminField label="Registration Link">
                  <input
                    value={editing.registrationLink ?? ""}
                    onChange={(event) =>
                      setEditing((item) => ({ ...item, registrationLink: event.target.value }))
                    }
                    placeholder="https://lu.ma/..."
                    className="admin-input"
                  />
                </AdminField>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField label="Event Poster (Image)">
                    <div className="flex flex-col gap-2">
                      {editing.posterImage && (
                        <img
                          src={editing.posterImage}
                          alt="Poster"
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setEditing((item) => ({ ...item, posterImage: url })),
                          )
                        }
                        className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[color:var(--neon-blue)] file:text-black file:font-bold"
                      />
                    </div>
                  </AdminField>

                  <AdminField label="Club Logo (Image)">
                    <div className="flex flex-col gap-2">
                      {editing.clubLogo && (
                        <img
                          src={editing.clubLogo}
                          alt="Logo"
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setEditing((item) => ({ ...item, clubLogo: url })),
                          )
                        }
                        className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[color:var(--neon-blue)] file:text-black file:font-bold"
                      />
                    </div>
                  </AdminField>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <input
                    type="checkbox"
                    id="isFlagship"
                    checked={!!editing.isFlagship}
                    onChange={(event) =>
                      setEditing((item) => ({ ...item, isFlagship: event.target.checked }))
                    }
                    className="h-4 w-4 rounded border-white/10 bg-white/5 text-[color:var(--neon-blue)] focus:ring-[color:var(--neon-blue)] cursor-pointer"
                  />
                  <label
                    htmlFor="isFlagship"
                    className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground cursor-pointer select-none"
                  >
                    Elite Flagship Event
                  </label>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={save}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
                  >
                    <Save size={16} />
                    Save Event
                  </button>
                  <button
                    onClick={createEvent}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold"
                  >
                    <X size={16} />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "workshops" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Workshops</h2>
                <div className="flex gap-2">
                  <button
                    onClick={createWorkshop}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold"
                  >
                    <Plus size={15} />
                    New
                  </button>
                  <button
                    onClick={resetWorkshops}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold"
                  >
                    <RotateCcw size={15} />
                    Reset
                  </button>
                </div>
              </div>

              <div className="surface mb-4 flex items-center gap-2 rounded-lg px-3 py-2">
                <Search size={14} className="text-muted-foreground" />
                <input
                  value={workshopQuery}
                  onChange={(event) => setWorkshopQuery(event.target.value)}
                  placeholder="Search workshops..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {filteredWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className={`rounded-lg border p-3 transition-all ${
                      selectedWorkshop === workshop.id
                        ? "border-[color:var(--neon-blue)] bg-[color:var(--neon-blue)]/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <button onClick={() => editWorkshop(workshop)} className="w-full text-left">
                      <div className="font-semibold">{workshop.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {workshop.level} / {workshop.duration || "Duration TBA"}
                      </div>
                    </button>
                    <button
                      onClick={() => deleteWorkshop(workshop.id)}
                      className="mt-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                ))}
                {filteredWorkshops.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No workshops found.
                  </div>
                )}
              </div>
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">
                {selectedWorkshop ? "Edit Workshop" : "Create Workshop"}
              </h2>
              <div className="mt-5 space-y-4">
                <AdminField label="Workshop Title">
                  <input
                    value={editingWorkshop.title}
                    onChange={(event) =>
                      setEditingWorkshop((item) => ({ ...item, title: event.target.value }))
                    }
                    placeholder="Workshop title"
                    className="admin-input"
                  />
                </AdminField>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField label="Level">
                    <select
                      value={editingWorkshop.level}
                      onChange={(event) =>
                        setEditingWorkshop((item) => ({
                          ...item,
                          level: event.target.value as WorkshopLevel,
                        }))
                      }
                      className="admin-input bg-[#07111f]"
                    >
                      {workshopLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </AdminField>

                  <AdminField label="Duration">
                    <input
                      value={editingWorkshop.duration}
                      onChange={(event) =>
                        setEditingWorkshop((item) => ({ ...item, duration: event.target.value }))
                      }
                      placeholder="e.g. 4h"
                      className="admin-input"
                    />
                  </AdminField>
                </div>

                <AdminField label="Stack Tags">
                  <input
                    value={editingWorkshop.stack.join(", ")}
                    onChange={(event) =>
                      setEditingWorkshop((item) => ({
                        ...item,
                        stack: event.target.value.split(",").map((tag) => tag.trim()),
                      }))
                    }
                    placeholder="Data Science, Analytics"
                    className="admin-input"
                  />
                </AdminField>

                <AdminField label="Speaker">
                  <input
                    value={editingWorkshop.speaker ?? ""}
                    onChange={(event) =>
                      setEditingWorkshop((item) => ({ ...item, speaker: event.target.value }))
                    }
                    placeholder="Speaker name or TBA"
                    className="admin-input"
                  />
                </AdminField>

                <AdminField label="Registration Link">
                  <input
                    value={editingWorkshop.registrationLink ?? ""}
                    onChange={(event) =>
                      setEditingWorkshop((item) => ({
                        ...item,
                        registrationLink: event.target.value,
                      }))
                    }
                    placeholder="https://lu.ma/..."
                    className="admin-input"
                  />
                </AdminField>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminField label="Workshop Poster (Image)">
                    <div className="flex flex-col gap-2">
                      {editingWorkshop.posterImage && (
                        <img
                          src={editingWorkshop.posterImage}
                          alt="Poster"
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setEditingWorkshop((item) => ({ ...item, posterImage: url })),
                          )
                        }
                        className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[color:var(--neon-blue)] file:text-black file:font-bold"
                      />
                    </div>
                  </AdminField>

                  <AdminField label="Club Logo (Image)">
                    <div className="flex flex-col gap-2">
                      {editingWorkshop.clubLogo && (
                        <img
                          src={editingWorkshop.clubLogo}
                          alt="Logo"
                          className="h-16 w-16 object-cover rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setEditingWorkshop((item) => ({ ...item, clubLogo: url })),
                          )
                        }
                        className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[color:var(--neon-blue)] file:text-black file:font-bold"
                      />
                    </div>
                  </AdminField>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={saveWorkshop}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-4 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
                  >
                    <Save size={16} />
                    Save Workshop
                  </button>
                  <button
                    onClick={createWorkshop}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold"
                  >
                    <X size={16} />
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="glass rounded-lg p-6">
            <h2 className="font-display text-2xl font-bold">User Permissions</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <tr>
                    <th className="py-3 pr-4">Name</th>
                    <th className="py-3 pr-4">Email</th>
                    <th className="py-3 pr-4">Role</th>
                    <th className="py-3 pr-4">Permissions</th>
                    <th className="py-3 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {users.map((portalUser) => (
                    <tr key={portalUser.id}>
                      <td className="py-4 pr-4 font-semibold">{portalUser.name}</td>
                      <td className="py-4 pr-4 text-muted-foreground">{portalUser.email}</td>
                      <td className="py-4 pr-4">
                        <select
                          value={portalUser.role}
                          onChange={(event) =>
                            changeRole(portalUser.id, event.target.value as UserRole)
                          }
                          disabled={portalUser.id === user?.id}
                          className="rounded-lg border border-white/10 bg-[#07111f] px-3 py-2 text-sm outline-none disabled:opacity-60"
                        >
                          <option value="participant">Participant</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="py-4 pr-4 text-xs text-muted-foreground">
                        {portalUser.role === "admin"
                          ? "Can edit events, workshops, and manage users"
                          : "Can browse participant pages"}
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <button
                          onClick={() => removeUser(portalUser.id)}
                          disabled={portalUser.id === user?.id}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-red-300 transition-all hover:bg-red-500/10 disabled:pointer-events-none disabled:opacity-40"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "sponsors" && <AdminSponsors />}
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "team" && <AdminTeam />}

        {activeTab === "launchpad" && (
          <div className="grid gap-6">
            <div className="glass rounded-lg p-6 max-w-2xl">
              <h2 className="font-display text-2xl font-bold">Launchpad Settings</h2>
              <div className="mt-5 space-y-4">
                <AdminField label="Sponsor CTA Link (Launchpad Page)">
                  <input
                    value={settings.launchpadSponsorLink ?? ""}
                    onChange={(e) =>
                      setSettings({ ...settings, launchpadSponsorLink: e.target.value })
                    }
                    placeholder="https://sponsor.link"
                    className="admin-input"
                  />
                </AdminField>
                <AdminField label="Launchpad Track Link">
                  <input
                    value={settings.launchpadRegistrationLink ?? ""}
                    onChange={(e) =>
                      setSettings({ ...settings, launchpadRegistrationLink: e.target.value })
                    }
                    placeholder="https://lu.ma/launchpad-trichy"
                    className="admin-input"
                  />
                </AdminField>
                <div className="pt-4">
                  <button
                    onClick={saveGlobalSettings}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
                  >
                    <Save size={16} />
                    Save Launchpad Settings
                  </button>
                </div>
              </div>
            </div>
            <div className="glass rounded-lg p-0 bg-transparent border-0">
              <AdminPosters />
            </div>
          </div>
        )}

        {activeTab === "foss" && (
          <div className="glass rounded-lg p-6 max-w-2xl">
            <h2 className="font-display text-2xl font-bold">FOSS Settings</h2>
            <div className="mt-5 space-y-4">
              <AdminField label="FOSS Mega Event Registration Link">
                <input
                  value={settings.fossRegistrationLink ?? ""}
                  onChange={(e) =>
                    setSettings({ ...settings, fossRegistrationLink: e.target.value })
                  }
                  placeholder="https://lu.ma/foss-trichy"
                  className="admin-input"
                />
              </AdminField>
              <div className="pt-4">
                <button
                  onClick={saveGlobalSettings}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
                >
                  <Save size={16} />
                  Save FOSS Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glass rounded-lg p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">Schedule Items</h2>
                <button
                  onClick={() =>
                    setEditingSchedule({
                      id: "",
                      day: "Day 1",
                      time: "",
                      title: "",
                      location: "",
                      category: "Main Stage",
                    })
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold"
                >
                  <Plus size={15} /> New
                </button>
              </div>
              <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
                {settings.scheduleItems?.map((item, i) => (
                  <div
                    key={item.id || i}
                    className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.day} • {item.time}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingSchedule(item)}
                          className="text-xs text-[color:var(--neon-blue)] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const updated = settings.scheduleItems.filter((_, idx) => idx !== i);
                            setSettings({ ...settings, scheduleItems: updated });
                          }}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!settings.scheduleItems || settings.scheduleItems.length === 0) && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No schedule items.
                  </div>
                )}
              </div>
              {settings.scheduleItems?.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={saveGlobalSettings}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-4 py-2 text-sm font-semibold text-black"
                  >
                    <Save size={14} /> Save Schedule
                  </button>
                </div>
              )}
            </div>

            <div className="glass rounded-lg p-6">
              <h2 className="font-display text-2xl font-bold">
                {editingSchedule.id ? "Edit Item" : "New Item"}
              </h2>
              <div className="mt-5 space-y-4">
                <AdminField label="Title">
                  <input
                    value={editingSchedule.title}
                    onChange={(e) =>
                      setEditingSchedule({ ...editingSchedule, title: e.target.value })
                    }
                    className="admin-input"
                    placeholder="e.g. Opening Keynote"
                  />
                </AdminField>
                <div className="grid grid-cols-2 gap-4">
                  <AdminField label="Day">
                    <input
                      value={editingSchedule.day}
                      onChange={(e) =>
                        setEditingSchedule({ ...editingSchedule, day: e.target.value })
                      }
                      className="admin-input"
                      placeholder="e.g. Day 1"
                    />
                  </AdminField>
                  <AdminField label="Time">
                    <input
                      value={editingSchedule.time}
                      onChange={(e) =>
                        setEditingSchedule({ ...editingSchedule, time: e.target.value })
                      }
                      className="admin-input"
                      placeholder="e.g. 09:00 AM"
                    />
                  </AdminField>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <AdminField label="Location">
                    <input
                      value={editingSchedule.location}
                      onChange={(e) =>
                        setEditingSchedule({ ...editingSchedule, location: e.target.value })
                      }
                      className="admin-input"
                      placeholder="e.g. Main Auditorium"
                    />
                  </AdminField>
                  <AdminField label="Category">
                    <input
                      value={editingSchedule.category}
                      onChange={(e) =>
                        setEditingSchedule({ ...editingSchedule, category: e.target.value })
                      }
                      className="admin-input"
                      placeholder="e.g. Main Stage"
                    />
                  </AdminField>
                </div>
                <button
                  onClick={() => {
                    if (!editingSchedule.title) return;
                    const item = {
                      ...editingSchedule,
                      id: editingSchedule.id || Date.now().toString(),
                    };
                    const items = [...(settings.scheduleItems || [])];
                    const existingIdx = items.findIndex((i) => i.id === item.id);
                    if (existingIdx >= 0) items[existingIdx] = item;
                    else items.push(item);
                    setSettings({ ...settings, scheduleItems: items });
                    setEditingSchedule({
                      id: "",
                      day: "Day 1",
                      time: "",
                      title: "",
                      location: "",
                      category: "Main Stage",
                    });
                  }}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-4 py-3 text-sm font-semibold text-black"
                >
                  <Plus size={16} /> Add / Update Item to List
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="glass rounded-lg p-6 max-w-2xl">
            <h2 className="font-display text-2xl font-bold">Global Settings</h2>

            <div className="mt-8 space-y-4">
              <AdminField label="YUVA Sponsor Link (Homepage)">
                <input
                  value={settings.yuvaSponsorLink ?? ""}
                  onChange={(e) => setSettings({ ...settings, yuvaSponsorLink: e.target.value })}
                  placeholder="https://sponsor-yuva.link"
                  className="admin-input"
                />
              </AdminField>
              <AdminField label="Campus Ambassador Registration Link">
                <input
                  value={settings.ambassadorRegistrationLink ?? ""}
                  onChange={(e) =>
                    setSettings({ ...settings, ambassadorRegistrationLink: e.target.value })
                  }
                  placeholder="https://register-ambassador.link"
                  className="admin-input"
                />
              </AdminField>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-[color:var(--neon-cyan)] flex items-center gap-2">
                <Video size={18} /> Hero Video Background
              </h3>
              <AdminField label="Video URL (YouTube or .mp4)">
                <div className="flex gap-2">
                  <input
                    value={settings.heroVideoUrl ?? ""}
                    onChange={(e) => setSettings({ ...settings, heroVideoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or .mp4 url"
                    className="admin-input"
                  />
                  <label
                    className="cursor-pointer rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center justify-center shrink-0"
                    title="Upload Video (< 2MB)"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 3 * 1024 * 1024) {
                          alert(
                            "Video must be under 3MB due to browser storage limits. Please use a YouTube link instead for larger videos.",
                          );
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setSettings({
                            ...settings,
                            heroVideoUrl: event.target?.result as string,
                          });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <Video size={16} className="text-muted-foreground" />
                  </label>
                </div>
              </AdminField>
              <p className="text-xs text-muted-foreground mt-2">
                Leave blank to use the default animated gradient.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4 text-[color:var(--neon-cyan)] flex items-center gap-2">
                <Image size={18} /> Explore Cards (Portal Images)
              </h3>
              <div className="space-y-4">
                {Object.keys(defaultPortalImages).map((key) => {
                  const k = key as keyof typeof defaultPortalImages;
                  return (
                    <AdminField key={k} label={k.replace(/([A-Z])/g, " $1").trim()}>
                      <div className="flex gap-2">
                        <input
                          value={settings.portalImages?.[k] ?? ""}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              portalImages: {
                                ...(settings.portalImages || defaultPortalImages),
                                [k]: e.target.value,
                              },
                            })
                          }
                          placeholder={defaultPortalImages[k]}
                          className="admin-input"
                        />
                        <label className="cursor-pointer rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center justify-center shrink-0">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(e, (url) =>
                                setSettings({
                                  ...settings,
                                  portalImages: {
                                    ...(settings.portalImages || defaultPortalImages),
                                    [k]: url,
                                  },
                                }),
                              )
                            }
                          />
                          <Image size={16} className="text-muted-foreground" />
                        </label>
                      </div>
                    </AdminField>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <button
                onClick={saveGlobalSettings}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.01]"
              >
                <Save size={16} />
                Save All Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="command-tile rounded-lg p-5">
      <Icon size={20} className="text-[color:var(--neon-cyan)]" />
      <div className="mt-5 font-display text-3xl font-black">{value}</div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function AdminField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
