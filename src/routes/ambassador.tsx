import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings } from "@/components/yuva/settings-store";

export const Route = createFileRoute("/ambassador")({
  component: AmbassadorRoute,
});

function AmbassadorRoute() {
  return (
    <div className="pt-24 pb-20">
      <AmbassadorExperience />
    </div>
  );
}

function AmbassadorExperience() {
  const [settings, setSettings] = useState(getSettings());
  
  useEffect(() => {
    const handleSettings = () => setSettings(getSettings());
    window.addEventListener("yuva-settings-change", handleSettings);
    return () => window.removeEventListener("yuva-settings-change", handleSettings);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="relative flex flex-col md:flex-row h-full min-h-screen w-full items-center justify-center overflow-hidden px-6 md:px-0">
        {/* Left: text column */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center items-center md:items-start h-full px-6 py-16 lg:w-1/2"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300 mb-4">
            Campus ambassador
          </div>
          <h2 className="mb-5 mt-2 text-4xl md:text-5xl text-center md:text-left font-display font-extrabold text-white leading-tight">
            Campus <br />
            Ambassador
            <br />
            Program
          </h2>
          <p className="mb-8 text-lg text-white text-center md:text-left w-full max-w-[90%] md:max-w-lg leading-relaxed">
            If you want to represent YUVA in your college and win exciting goodies, join our{" "}
            <span className="font-bold text-orange-300">Campus Ambassador Program</span>.
          </p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <Link to="/team">
              <button className="flex items-center justify-center backdrop-blur-md px-5 py-2.5 rounded-2xl text-white text-base font-semibold transition-all duration-300 ease-in-out hover:bg-black/10 aaruush-glass">
                Know More?
              </button>
            </Link>
            {settings.ambassadorRegistrationLink ? (
              <a href={settings.ambassadorRegistrationLink} target="_blank" rel="noreferrer">
                <button className="flex items-center justify-center bg-[#EF6522] backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 px-5 py-2.5 rounded-2xl text-white text-base font-semibold transition-all duration-300 ease-in-out hover:bg-[#d85a1e]">
                  Register Now
                </button>
              </a>
            ) : (
              <Link to="/login">
                <button className="flex items-center justify-center bg-[#EF6522] backdrop-blur-md border border-white/20 shadow-lg shadow-black/20 px-5 py-2.5 rounded-2xl text-white text-base font-semibold transition-all duration-300 ease-in-out hover:bg-[#d85a1e]">
                  Register Now
                </button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Right: glass card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 flex items-center justify-center p-6 md:p-10"
        >
          <div className="relative min-h-[440px] w-full max-w-md overflow-hidden premium-frame rounded-2xl">
            <div className="ambassador-graphic absolute inset-0" aria-hidden />
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(4,7,14,0.88),rgba(4,7,14,0.18),rgba(4,7,14,0.78))]" />
            <div className="relative z-10 flex h-full min-h-[440px] flex-col justify-end p-6 md:p-8">
              <div className="max-w-sm rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
                <Sparkles size={22} className="text-orange-300" />
                <p className="mt-4 text-xl font-bold text-white">
                  Representation, reach and real ownership.
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Designed for students who want to lead communities, not just attend events.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
