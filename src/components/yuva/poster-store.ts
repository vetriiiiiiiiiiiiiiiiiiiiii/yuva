export type Poster = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const postersStorageKey = "yuva-2026-posters";

export const defaultPosters: Poster[] = [
  {
    id: "p1",
    title: "Launchpad Phase 2",
    description: "Pitch your startup idea and win up to 10 Lakhs in seed funding.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
  },
  {
    id: "p2",
    title: "AI Hackathon",
    description: "48 hours to build the future with Agentic AI.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

export function getStoredPosters(): Poster[] {
  if (typeof window === "undefined") return defaultPosters;
  const stored = window.localStorage.getItem(postersStorageKey);
  if (!stored) return defaultPosters;
  try {
    const parsed = JSON.parse(stored) as Poster[];
    return Array.isArray(parsed) ? parsed : defaultPosters;
  } catch {
    return defaultPosters;
  }
}
