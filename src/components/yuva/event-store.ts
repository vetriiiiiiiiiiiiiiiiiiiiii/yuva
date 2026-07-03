import {
  Brain,
  Code2,
  Cpu,
  Gamepad2,
  Lightbulb,
  LineChart,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wand2,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type EventCategory = "Technical" | "Non-Technical" | "Management" | "Gaming" | "AI & Coding";
export type EventIconKey =
  | "brain"
  | "code"
  | "cpu"
  | "game"
  | "lightbulb"
  | "chart"
  | "palette"
  | "rocket"
  | "shield"
  | "sparkles"
  | "trophy"
  | "users"
  | "wand"
  | "workflow";

export type FestEvent = {
  id: string;
  title: string;
  desc: string;
  cat: EventCategory;
  icon: EventIconKey;
  prize?: string;
  status?: string;
  isFlagship?: boolean;
  date?: string;
  registrationLink?: string;
  posterImage?: string;
  clubLogo?: string;
};

export const eventCategories: ("All" | EventCategory)[] = [
  "All",
  "Technical",
  "Non-Technical",
  "Management",
  "Gaming",
  "AI & Coding",
];

export const eventIcons: Record<EventIconKey, LucideIcon> = {
  brain: Brain,
  code: Code2,
  cpu: Cpu,
  game: Gamepad2,
  lightbulb: Lightbulb,
  chart: LineChart,
  palette: Palette,
  rocket: Rocket,
  shield: ShieldCheck,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
  wand: Wand2,
  workflow: Workflow,
};

export const iconOptions: { value: EventIconKey; label: string }[] = [
  { value: "code", label: "Code" },
  { value: "cpu", label: "Hardware" },
  { value: "shield", label: "Security" },
  { value: "brain", label: "AI" },
  { value: "workflow", label: "Workflow" },
  { value: "rocket", label: "Startup" },
  { value: "trophy", label: "Trophy" },
  { value: "game", label: "Gaming" },
  { value: "palette", label: "Creative" },
  { value: "chart", label: "Management" },
  { value: "sparkles", label: "Experience" },
  { value: "users", label: "People" },
  { value: "wand", label: "Prototype" },
  { value: "lightbulb", label: "Idea" },
];

export const defaultEvents: FestEvent[] = [
  {
    id: "data-wars",
    title: "Data Wars",
    desc: "A data science showdown built for analytics and predictive modeling.",
    cat: "AI & Coding",
    icon: "code",
    prize: "Rs.40K",
    status: "Flagship",
    isFlagship: false,
    date: "Sep 7, 2026",
  },
  {
    id: "neuroskin-arena",
    title: "NeuroSkin Arena",
    desc: "Biotech and neuro-interface challenges for next-gen makers.",
    cat: "Technical",
    icon: "cpu",
    prize: "Rs.35K",
    status: "Lab",
    isFlagship: false,
    date: "Sep 8, 2026",
  },
  {
    id: "rc-race",
    title: "RC Race",
    desc: "High-speed remote-control racing with precision and strategy.",
    cat: "Gaming",
    icon: "trophy",
    prize: "Rs.30K",
    status: "Finals",
    isFlagship: true,
    date: "Sep 10, 2026",
  },
  {
    id: "drone-race",
    title: "Drone Race",
    desc: "Precision obstacle drone racing and flight control challenge.",
    cat: "Technical",
    icon: "rocket",
    prize: "Rs.35K",
    status: "Flagship",
    isFlagship: true,
    date: "Sep 10, 2026",
  },
  {
    id: "capture-the-flag",
    title: "Capture the Flag",
    desc: "A cybersecurity CTF that tests offensive and defensive skills.",
    cat: "Technical",
    icon: "shield",
    prize: "Rs.45K",
    status: "Cyber",
    isFlagship: true,
    date: "Sep 9, 2026",
  },
  {
    id: "circuit-sprint",
    title: "Circuit Sprint",
    desc: "Electronics prototyping and design speed race.",
    cat: "Technical",
    icon: "wand",
    prize: "Rs.25K",
    status: "Build",
    isFlagship: false,
    date: "Sep 8, 2026",
  },
  {
    id: "max-bite",
    title: "Max Bite",
    desc: "Food product innovation from kitchen concept to market pitch.",
    cat: "Management",
    icon: "chart",
    prize: "Rs.20K",
    status: "Pitch",
    isFlagship: false,
    date: "Sep 7, 2026",
  },
  {
    id: "bio-code-x",
    title: "Bio Code X",
    desc: "Bioinformatics and computational biology hack challenge.",
    cat: "AI & Coding",
    icon: "brain",
    prize: "Rs.35K",
    status: "AI",
    isFlagship: false,
    date: "Sep 9, 2026",
  },
  {
    id: "vibecraft",
    title: "VibeCraft",
    desc: "Creative experience design and immersive event building.",
    cat: "Non-Technical",
    icon: "sparkles",
    prize: "Rs.20K",
    status: "Creative",
    isFlagship: true,
    date: "Sep 8, 2026",
  },
  {
    id: "project-expo",
    title: "Project Expo",
    desc: "A showcase of the brightest projects from student teams.",
    cat: "Non-Technical",
    icon: "palette",
    prize: "Rs.50K",
    status: "Expo",
    isFlagship: false,
    date: "Sep 7, 2026",
  },
  {
    id: "school-hackathon",
    title: "School Hackathon",
    desc: "A campus-level coding sprint for school innovators.",
    cat: "AI & Coding",
    icon: "code",
    prize: "Rs.30K",
    status: "Sprint",
    isFlagship: false,
    date: "Sep 8, 2026",
  },
  {
    id: "yuva-hacks",
    title: "YUVA Hacks",
    desc: "A 24-hour build sprint for rapid product creation.",
    cat: "AI & Coding",
    icon: "workflow",
    prize: "Rs.1L",
    status: "Mega",
    isFlagship: true,
    date: "Sep 9, 2026",
  },
  {
    id: "hr-conclave",
    title: "HR Conclave",
    desc: "Leadership and culture forum for career builders.",
    cat: "Management",
    icon: "users",
    prize: "Rs.25K",
    status: "Forum",
    isFlagship: true,
    date: "Sep 10, 2026",
  },
];

export const eventsStorageKey = "yuva-2026-events";
