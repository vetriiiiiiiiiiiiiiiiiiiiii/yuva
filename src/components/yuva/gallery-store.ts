export type GalleryItem = {
  id: string;
  imageUrl: string;
  caption: string;
};

export const galleryStorageKey = "yuva-2026-gallery";

export const defaultGallery: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    caption: "Hackathon Finals 2025",
  },
  {
    id: "g2",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    caption: "Keynote Session",
  },
  {
    id: "g3",
    imageUrl: "https://images.unsplash.com/photo-1475721025505-231362e205ab?w=800&q=80",
    caption: "Networking Event",
  },
];

export function getStoredGallery(): GalleryItem[] {
  if (typeof window === "undefined") return defaultGallery;
  const stored = window.localStorage.getItem(galleryStorageKey);
  if (!stored) return defaultGallery;
  try {
    const parsed = JSON.parse(stored) as GalleryItem[];
    return Array.isArray(parsed) ? parsed : defaultGallery;
  } catch {
    return defaultGallery;
  }
}
