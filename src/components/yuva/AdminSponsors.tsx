import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import {
  type Sponsor,
  defaultSponsors,
  getStoredSponsors,
  sponsorsStorageKey,
} from "./sponsor-store";

const MAX_SIZE_MB = 1.5;

// Compress image to fit within max size using canvas
function compressImage(file: File, maxSizeMB: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // Scale down large images
      const maxDim = 800;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      // Reduce quality until under limit
      let quality = 0.85;
      let result = canvas.toDataURL("image/jpeg", quality);
      while (result.length > maxSizeMB * 1024 * 1024 * 1.37 && quality > 0.2) {
        quality -= 0.1;
        result = canvas.toDataURL("image/jpeg", quality);
      }
      resolve(result);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

// Save to localStorage and verify it was actually saved
function saveToStorage(data: Sponsor[]): boolean {
  try {
    const serialized = JSON.stringify(data);
    window.localStorage.setItem(sponsorsStorageKey, serialized);
    // Verify the write succeeded by reading back
    const readBack = window.localStorage.getItem(sponsorsStorageKey);
    return readBack === serialized;
  } catch {
    return false;
  }
}

export function AdminSponsors() {
  // ✅ Lazy initializer — reads localStorage on first render, not after mount
  const [sponsors, setSponsors] = useState<Sponsor[]>(() => getStoredSponsors());
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if another tab changes storage
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === sponsorsStorageKey) setSponsors(getStoredSponsors());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);

    try {
      let base64Url: string;

      if (file.type === "image/svg+xml") {
        // SVG — read as-is, already small
        base64Url = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = (ev) => res(ev.target?.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      } else {
        // All raster images — compress before saving
        base64Url = await compressImage(file, MAX_SIZE_MB);
      }

      const newSponsor: Sponsor = {
        id: `sponsor-${Date.now()}`,
        name: file.name.replace(/\.[^.]+$/, ""),
        imageUrl: base64Url,
        tier: "Partner",
      };

      const updated = [...sponsors, newSponsor];
      const saved = saveToStorage(updated);

      if (saved) {
        setSponsors(updated);
      } else {
        setError("❌ Storage full — please delete some existing sponsors first, then try again.");
      }
    } catch {
      setError("❌ Failed to process image. Try a smaller or different file.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const remove = (id: string) => {
    const updated = sponsors.filter((s) => s.id !== id);
    setSponsors(updated);
    saveToStorage(updated);
    setError(null);
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Manage Sponsors</h2>
        <input
          type="file"
          accept="image/*,.svg,.webp,.avif,.png,.jpg,.jpeg,.gif,.bmp,.ico"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          id="sponsor-upload"
        />
        <label
          htmlFor="sponsor-upload"
          className={`inline-flex items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-3 py-2 text-sm font-semibold text-black cursor-pointer hover:opacity-90 ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <Plus size={15} /> {uploading ? "Processing…" : "Upload Logo"}
        </label>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Format hint */}
      <p className="mb-4 text-xs text-muted-foreground">
        Supported: PNG · JPG · GIF · WebP · AVIF · SVG · BMP · ICO &nbsp;·&nbsp; Large images are
        auto-compressed
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="relative rounded-lg border border-white/10 bg-white/[0.02] p-4 group overflow-hidden"
          >
            <div
              className="mb-3 w-full h-32 rounded overflow-hidden"
              style={{
                backgroundImage: `url(${sponsor.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            />
            <button
              onClick={() => remove(sponsor.id)}
              className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {sponsors.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground text-sm border border-dashed border-white/10 rounded-lg">
            No sponsors uploaded. Click 'Upload Logo' to add one.
          </div>
        )}
      </div>
    </div>
  );
}
