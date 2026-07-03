export type Sponsor = {
  id: string;
  name: string;
  imageUrl: string;
  tier: "Title" | "Platinum" | "Gold" | "Silver" | "Partner";
};

export const sponsorsStorageKey = "yuva-2026-sponsors";

export const defaultSponsors: Sponsor[] = [
  {
    id: "srm-ist",
    name: "SRM IST Trichy",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fe/Srmseal.png/250px-Srmseal.png",
    tier: "Title",
  },
  {
    id: "foss-trichy",
    name: "FOSS Trichy",
    imageUrl: "https://fossunited.org/files/logo-icon-1024x1024.png",
    tier: "Platinum",
  },
];

export function getStoredSponsors(): Sponsor[] {
  if (typeof window === "undefined") return defaultSponsors;
  const stored = window.localStorage.getItem(sponsorsStorageKey);
  if (!stored) return defaultSponsors;
  try {
    const parsed = JSON.parse(stored) as Sponsor[];
    return Array.isArray(parsed) ? parsed : defaultSponsors;
  } catch {
    return defaultSponsors;
  }
}
