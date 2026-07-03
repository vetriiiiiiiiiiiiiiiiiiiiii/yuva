import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
import {
  type GalleryItem,
  defaultGallery,
  getStoredGallery,
  galleryStorageKey,
} from "./gallery-store";

const MAX_SIZE_MB = 1.5;

// Compress image using canvas
function compressImage(file: File, maxSizeMB: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      const maxDim = 1000;
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

      let quality = 0.85;
      let result = canvas.toDataURL("image/webp", quality);
      while (result.length > maxSizeMB * 1024 * 1024 * 1.37 && quality > 0.2) {
        quality -= 0.1;
        result = canvas.toDataURL("image/webp", quality);
      }
      resolve(result);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

// Save and verify it actually persisted
function saveToStorage(data: GalleryItem[]): boolean {
  try {
    const serialized = JSON.stringify(data);
    window.localStorage.setItem(galleryStorageKey, serialized);
    const readBack = window.localStorage.getItem(galleryStorageKey);
    return readBack === serialized;
  } catch {
    return false;
  }
}

export function AdminGallery() {
  // ✅ Lazy initializer — reads localStorage on first render, not after mount
  const [items, setItems] = useState<GalleryItem[]>(() => getStoredGallery());
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if another tab changes storage
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === galleryStorageKey) setItems(getStoredGallery());
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
        base64Url = await new Promise<string>((res, rej) => {
          const reader = new FileReader();
          reader.onload = (ev) => res(ev.target?.result as string);
          reader.onerror = rej;
          reader.readAsDataURL(file);
        });
      } else {
        base64Url = await compressImage(file, MAX_SIZE_MB);
      }

      const newItem: GalleryItem = {
        id: `gallery-${Date.now()}`,
        imageUrl: base64Url,
        caption: file.name.replace(/\.[^.]+$/, ""),
      };

      const updated = [...items, newItem];
      const saved = saveToStorage(updated);

      if (saved) {
        setItems(updated);
      } else {
        setError("❌ Storage full — please delete some photos first, then try again.");
      }
    } catch {
      setError("❌ Failed to process image. Try a smaller or different file.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const remove = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveToStorage(updated);
    setError(null);
  };

  return (
    <div className="glass rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Manage Gallery</h2>
        <input
          type="file"
          accept="image/*,.svg,.webp,.avif,.png,.jpg,.jpeg,.gif,.bmp,.ico"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className={`inline-flex items-center gap-2 rounded-lg bg-[color:var(--neon-blue)] px-3 py-2 text-sm font-semibold text-black cursor-pointer hover:opacity-90 ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <Plus size={15} /> {uploading ? "Processing…" : "Upload Photo"}
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

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative rounded-lg border border-white/10 bg-white/[0.02] p-2 group overflow-hidden"
          >
            <img src={item.imageUrl} alt="Gallery" className="h-32 w-full object-cover rounded" />
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
            No photos uploaded. Click 'Upload Photo' to add one.
          </div>
        )}
      </div>
    </div>
  );
}
