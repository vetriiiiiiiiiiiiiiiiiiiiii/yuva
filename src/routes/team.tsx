import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  type TeamMember,
  defaultTeam,
  getStoredTeam,
  clubOptions,
} from "@/components/yuva/team-store";

export const Route = createFileRoute("/team")({
  component: TeamPage,
});

function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [activeTab, setActiveTab] = useState<string>("All");

  useEffect(() => {
    setTeam(getStoredTeam());
    const handleStorage = () => setTeam(getStoredTeam());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const clubs = ["All", ...Array.from(new Set(team.map((m) => m.club))).sort()];

  const filteredTeam = activeTab === "All" ? team : team.filter((m) => m.club === activeTab);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00e5ff] font-cinzel mb-4">
            // Meet The Builders
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black leading-tight">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#b264ff]">
              Minds
            </span>{" "}
            Behind YUVA
          </h1>
          <p className="mt-6 text-muted-foreground md:text-lg max-w-2xl mx-auto">
            From the Tech Council to the Robotics Club, meet the dedicated team that brings the
            National Techno-Management Fest to life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {clubs.map((club) => (
            <button
              key={club}
              onClick={() => setActiveTab(club)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTab === club ? "bg-[color:var(--neon-blue)] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-white/30"}`}
            >
              {club}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 hover:border-[#00e5ff]/40 transition-colors"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/10">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
              <div className="mt-3 text-[10px] uppercase tracking-widest text-[#00e5ff] font-bold bg-[#00e5ff]/10 px-2 py-1 rounded">
                {member.club}
              </div>
            </motion.div>
          ))}
          {filteredTeam.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No team members found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
