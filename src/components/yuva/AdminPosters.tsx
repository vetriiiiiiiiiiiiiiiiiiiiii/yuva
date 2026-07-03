import { useEffect, useState, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { type Poster, defaultPosters, getStoredPosters, postersStorageKey } from "./poster-store";
import { resizeImage } from "./image-utils";

export function AdminPosters() {
  const [items, setItems] = useState<Poster[]>(defaultPosters);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setItems(getStoredPosters()), []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resized = await resizeImage(file, 1000, 1000); // Posters can be slightly larger but still compressed
      const newItem: Poster = {
        id: `poster-${Date.now()}`,
        title: "",
        description: "",
        imageUrl: resized,
      };

      const updated = [...items, newItem];
      setItems(updated);
      window.localStorage.setItem(postersStorageKey, JSON.stringify(updated));
    } catch (err) {
      alert("Failed to process poster image");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    window.localStorage.setItem(postersStorageKey, JSON.stringify(updated));
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Manage Posters</h2>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          id="poster-upload"
        />
        <label
          htmlFor="poster-upload"
          className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-3 py-2 text-sm font-semibold text-black cursor-pointer hover:opacity-90"
        >
          <Plus size={15} /> Upload Poster
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg border border-white/10 bg-white/[0.02] p-2 group overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt="Poster"
              className="h-auto w-full object-contain rounded"
            />
            <button
              onClick={() => remove(item.id)}
              className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground text-sm border border-dashed border-white/10 rounded-lg">
            No posters uploaded. Click 'Upload Poster' to add one.
          </div>
        )}
      </div>
    </div>
  );
}
