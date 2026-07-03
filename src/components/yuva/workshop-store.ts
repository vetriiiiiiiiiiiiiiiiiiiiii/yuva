export type WorkshopLevel = "Beginner" | "Intermediate" | "Advanced";

export type FestWorkshop = {
  id: string;
  title: string;
  stack: string[];
  level: WorkshopLevel;
  duration: string;
  speaker?: string;
  registrationLink?: string;
  posterImage?: string;
  clubLogo?: string;
};

export const workshopLevels: WorkshopLevel[] = ["Beginner", "Intermediate", "Advanced"];

export const defaultWorkshops: FestWorkshop[] = [
  {
    id: "data-conclave",
    title: "Data Conclave",
    stack: ["Data Science", "Analytics"],
    level: "Intermediate",
    duration: "4h",
  },
  {
    id: "biointerface-lab",
    title: "BioInterface Lab",
    stack: ["Neurotech", "Biometrics"],
    level: "Advanced",
    duration: "5h",
  },
  {
    id: "rtos",
    title: "RTOS",
    stack: ["Embedded", "Real-Time"],
    level: "Advanced",
    duration: "4h",
  },
  {
    id: "cybernet",
    title: "Cybernet",
    stack: ["Cybersecurity", "CTF"],
    level: "Advanced",
    duration: "5h",
  },
  {
    id: "cadence",
    title: "Cadence",
    stack: ["Electronics", "Circuit Design"],
    level: "Intermediate",
    duration: "4h",
  },
  {
    id: "kitchen-to-market",
    title: "Kitchen to Market",
    stack: ["Food Tech", "Product Strategy"],
    level: "Intermediate",
    duration: "4h",
  },
  {
    id: "molecular-biology-technique",
    title: "Molecular Biology Technique",
    stack: ["Lab Skills", "Bioinformatics"],
    level: "Advanced",
    duration: "5h",
  },
  {
    id: "forensic-murder",
    title: "Forensic Murder",
    stack: ["Forensics", "Investigation"],
    level: "Advanced",
    duration: "4h",
  },
  {
    id: "the-agentic-arena",
    title: "The Agentic Arena",
    stack: ["Creative Systems", "Experience Design"],
    level: "Intermediate",
    duration: "4h",
  },
];

export const workshopsStorageKey = "yuva-2026-workshops";
