import { motion } from "framer-motion";
import { Rocket, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function LaunchpadFeature() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36 z-10">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/10 text-orange-400">
                <Rocket size={18} />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-300">
                Launchpad Phase 2
              </span>
            </div>
            
            <h2 className="font-display font-black text-5xl md:text-7xl leading-[1.05] text-white mb-6">
              The ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
                Startup Arena
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Pitch to top-tier VCs, showcase your MVP to 5,000+ visitors, and secure seed funding. India's next breakout founders start their journey right here.
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/launchpad">
                <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300">
                  Explore Launchpad <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Abstract Visual representation of growth/startup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center"
          >
            {/* Glowing background aura without hard edges */}
            <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-yellow-400/10 rounded-full blur-[80px] -z-10" />
            
            {/* Minimalist floating elements */}
            <div className="relative w-full h-full max-w-[400px] max-h-[400px]">
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] right-[10%] w-32 h-32 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 shadow-2xl"
              >
                <TrendingUp className="text-orange-400" size={32} />
                <span className="text-xs font-bold text-white tracking-wider">+412%</span>
              </motion.div>

              <motion.div 
                animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }} 
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[15%] left-[5%] w-40 h-28 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col items-start justify-center p-5 shadow-2xl"
              >
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Seed Check</div>
                <div className="text-2xl font-black text-white">$100k</div>
              </motion.div>

              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-sm opacity-90 shadow-[0_0_80px_rgba(249,115,22,0.6)] flex items-center justify-center"
              >
                <Sparkles className="text-white w-20 h-20 opacity-80" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
