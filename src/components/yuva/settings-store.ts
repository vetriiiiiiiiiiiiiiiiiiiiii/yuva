export type ScheduleItem = {
  id: string;
  day: string; // e.g. "Day 1 – Sep 7"
  time: string; // e.g. "09:00 AM"
  title: string;
  location: string; // e.g. "Main Auditorium"
  category: string; // e.g. "Main Stage", "Workshop Hall"
};

export type PortalImages = {
  aboutYuva: string;
  flagships: string;
  events: string;
  workshops: string;
  foss: string;
  launchpad: string;
};

export type SiteSettings = {
  fossRegistrationLink: string;
  launchpadRegistrationLink: string;
  launchpadSponsorLink: string;
  yuvaSponsorLink: string;
  ambassadorRegistrationLink: string;
  heroVideoUrl: string;
  scheduleItems: ScheduleItem[];
  portalImages: PortalImages;
};

export const defaultPortalImages: PortalImages = {
  aboutYuva: "/yuva-bg.jpg",
  flagships: "/baahubali-bg.png",
  events: "/jallikattu-bull.png",
  workshops: "/nilgiri-tahr.png",
  foss: "/emerald-dove.png",
  launchpad: "/baahubali-bg.png", // reusing an image as default
};

export const defaultSettings: SiteSettings = {
  fossRegistrationLink: "",
  launchpadRegistrationLink: "",
  launchpadSponsorLink: "",
  yuvaSponsorLink: "",
  ambassadorRegistrationLink: "",
  heroVideoUrl: "https://www.youtube.com/watch?v=8V-wN8jO0bY",
  scheduleItems: [],
  portalImages: defaultPortalImages,
};

export const settingsStorageKey = "yuva-2026-settings";

export function getSettings(): SiteSettings {
  if (typeof window === "undefined") return defaultSettings;
  const stored = localStorage.getItem(settingsStorageKey);
  if (!stored) return defaultSettings;
  try {
    const parsed = JSON.parse(stored);
    return {
      ...defaultSettings,
      ...parsed,
      portalImages: { ...defaultPortalImages, ...(parsed.portalImages ?? {}) },
      scheduleItems: Array.isArray(parsed.scheduleItems) ? parsed.scheduleItems : [],
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event("yuva-settings-change"));
}
