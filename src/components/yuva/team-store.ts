export type TeamMember = {
  id: string;
  name: string;
  role: string;
  club: string; // E.g., "Tech Council", "IIC", "GDSC", "ACM", "CodeChef", etc.
  imageUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
};

export const teamStorageKey = "yuva-2026-team";

export const defaultTeam: TeamMember[] = [
  {
    id: "t1",
    name: "John Doe",
    role: "President",
    club: "Tech Council",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    id: "t2",
    name: "Jane Smith",
    role: "Lead Coordinator",
    club: "IIC",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
];

export const clubOptions = [
  "Tech Council",
  "IIC",
  "GDSC",
  "CodeChef",
  "ACM",
  "Cyber Security Club",
  "AI Club",
  "Open Source Club",
  "Robotics Club",
  "Design Club",
  "Blockchain Club",
  "Other",
];

export function getStoredTeam(): TeamMember[] {
  if (typeof window === "undefined") return defaultTeam;
  const stored = window.localStorage.getItem(teamStorageKey);
  if (!stored) return defaultTeam;
  try {
    const parsed = JSON.parse(stored) as TeamMember[];
    return Array.isArray(parsed) ? parsed : defaultTeam;
  } catch {
    return defaultTeam;
  }
}
