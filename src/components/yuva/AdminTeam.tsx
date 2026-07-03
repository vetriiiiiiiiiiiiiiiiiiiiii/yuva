import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  type TeamMember,
  defaultTeam,
  getStoredTeam,
  teamStorageKey,
  clubOptions,
} from "./team-store";
import { resizeImage } from "./image-utils";

export function AdminTeam() {
  const [items, setItems] = useState<TeamMember[]>(defaultTeam);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);

  useEffect(() => setItems(getStoredTeam()), []);

  const save = () => {
    if (!editing?.name || !editing?.role || !editing?.imageUrl) return;
    const newItem: TeamMember = {
      id: editing.id || `team-${Date.now()}`,
      name: editing.name,
      role: editing.role,
      club: editing.club || "Tech Council",
      imageUrl: editing.imageUrl,
      linkedinUrl: editing.linkedinUrl,
      githubUrl: editing.githubUrl,
    };
    const updated = editing.id
      ? items.map((i) => (i.id === editing.id ? newItem : i))
      : [...items, newItem];
    setItems(updated);
    window.localStorage.setItem(teamStorageKey, JSON.stringify(updated));
    setEditing(null);
  };

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    window.localStorage.setItem(teamStorageKey, JSON.stringify(updated));
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Manage Team</h2>
        <button
          onClick={() => setEditing({ club: "Tech Council" })}
          className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-3 py-2 text-sm font-semibold text-black"
        >
          <Plus size={15} /> New
        </button>
      </div>
      {editing && (
        <div className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Name
              </label>
              <input
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Role
              </label>
              <input
                value={editing.role || ""}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Club / Association
            </label>
            <select
              value={editing.club || "Tech Council"}
              onChange={(e) => setEditing({ ...editing, club: e.target.value })}
              className="mt-1 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none"
            >
              {clubOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Image URL
            </label>
            <div className="mt-1 flex items-center gap-3">
              {editing.imageUrl && (
                <img
                  src={editing.imageUrl}
                  alt="Preview"
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const resized = await resizeImage(file, 800, 800);
                    setEditing({ ...editing, imageUrl: resized });
                  } catch (err) {
                    alert("Failed to process image");
                  }
                }}
                className="w-full text-sm text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[color:var(--neon-blue)] file:text-black file:font-bold"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                LinkedIn (Optional)
              </label>
              <input
                value={editing.linkedinUrl || ""}
                onChange={(e) => setEditing({ ...editing, linkedinUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                GitHub (Optional)
              </label>
              <input
                value={editing.githubUrl || ""}
                onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={save}
              className="flex-1 rounded-md bg-[color:var(--neon-blue)] py-2 text-sm font-bold text-black"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-md bg-white/10 px-4 py-2 text-sm font-bold text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg border border-white/10 bg-white/[0.02] p-4 flex gap-4 items-center"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-sm">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.role}</div>
              <div className="text-[10px] text-[color:var(--neon-blue)] uppercase font-bold mt-1">
                {item.club}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditing(item)}
                  className="text-xs text-orange-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
