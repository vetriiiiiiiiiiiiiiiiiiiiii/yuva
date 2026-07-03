import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Banknote,
  Briefcase,
  Handshake,
  Rocket,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { getSettings } from "./settings-store";
import { type Poster, defaultPosters, getStoredPosters } from "./poster-store";

const pillars = [
  {
    Icon: Briefcase,
    title: "Investor Pitching",
    desc: "Pitch to a hand-picked panel of VCs, angels and CXOs.",
  },
  {
    Icon: Rocket,
    title: "Startup Expo",
    desc: "Showcase your MVP to 5,000+ visitors across 4 days.",
  },
  {
    Icon: Sparkles,
    title: "Innovation Showcase",
    desc: "Demo deep-tech, AI and hardware to industry scouts.",
  },
  {
    Icon: Handshake,
    title: "Entrepreneur Networking",
    desc: "Curated mixers connecting builders & operators.",
  },
  {
    Icon: Banknote,
    title: "Funding Opportunities",
    desc: "Grants, seed checks and accelerator fast-tracks.",
  },
  {
    Icon: TrendingUp,
    title: "Mega Startup Event",
    desc: "The grand finale: India's next unicorns on one stage.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

export function Launchpad() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    const handleStorage = () => setSettings(getSettings());
    window.addEventListener("yuva-settings-change", handleStorage);
    return () => window.removeEventListener("yuva-settings-change", handleStorage);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePosition({ x, y });

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setLocalMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [posters, setPosters] = useState<Poster[]>(defaultPosters);

  useEffect(() => {
    setPosters(getStoredPosters());
    const handleStorage = () => setPosters(getStoredPosters());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Embers Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    class Ember {
      x!: number;
      y!: number;
      size!: number;
      vx!: number;
      vy!: number;
      alpha!: number;
      life!: number;
      maxLife!: number;
      color!: string;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 2.5 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = -(Math.random() * 1.1 + 0.4);
        this.alpha = Math.random() * 0.5 + 0.35;
        this.maxLife = Math.random() * 180 + 90;
        this.life = 0;
        const colors = ["#f59e0b", "#d4af37", "#ef4444", "#f97316"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        this.vx += (Math.random() - 0.5) * 0.04;

        if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        const lifeRatio = 1 - this.life / this.maxLife;
        const currentAlpha = this.alpha * lifeRatio;

        // Draw outer glow (faster than shadowBlur)
        c.globalAlpha = currentAlpha * 0.25;
        c.beginPath();
        c.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();

        // Draw inner core
        c.globalAlpha = currentAlpha;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    const count = 45;
    const list: Ember[] = Array.from({ length: count }, () => new Ember());

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      for (const e of list) {
        e.update();
        e.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="launchpad"
      className="relative py-28 md:py-36 overflow-hidden min-h-screen"
    >
      {/* 3D Mouse Parallax Background Image (Baahubali Style showing Tahr, Bull, Palm, Lily) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45 -z-20 filter brightness-90 contrast-110 saturate-[0.85]"
        style={{
          backgroundImage: 'url("/baahubali-bg.png")',
          scale: 1.08,
        }}
        animate={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
        }}
        transition={{
          x: { type: "spring", stiffness: 45, damping: 18 },
          y: { type: "spring", stiffness: 45, damping: 18 },
        }}
      />

      {/* Canvas for Drifting Glowing Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none -z-10"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Giant Rotating Golden Mandala in the Background */}
      <motion.div
        className="absolute top-[25%] left-[-150px] w-[500px] h-[500px] opacity-10 pointer-events-none -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
        >
          <circle cx="100" cy="100" r="95" strokeDasharray="5,5" />
          <circle cx="100" cy="100" r="75" />
          <circle cx="100" cy="100" r="55" strokeDasharray="10,5" />
          <path d="M 100 0 L 100 200 M 0 100 L 200 100" />
          <path d="M 30 30 L 170 170 M 30 170 L 170 30" />
          <polygon points="100,50 115,85 150,100 115,115 100,150 85,115 50,100 85,85" />
        </svg>
      </motion.div>

      {/* Fluttering Royal Banners at the sides */}
      <motion.div
        className="absolute left-4 top-24 w-10 h-36 -z-10 hidden lg:block"
        animate={{ rotate: [0, 1.8, -0.8, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top center" }}
      >
        <svg
          viewBox="0 0 100 400"
          className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]"
        >
          <defs>
            <linearGradient id="bannerGold" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#b58610" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
          <path d="M 0 0 L 100 0 L 100 350 L 50 400 L 0 350 Z" fill="url(#bannerGold)" />
          <path d="M 8 8 L 92 8 L 92 342 L 50 382 L 8 342 Z" fill="#7f1d1d" />
          <circle cx="50" cy="80" r="18" fill="#d4af37" />
          <polygon
            points="50,68 55,79 67,79 58,87 62,99 50,91 38,99 42,87 33,79 45,79"
            fill="#7f1d1d"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute right-4 top-24 w-10 h-36 -z-10 hidden lg:block"
        animate={{ rotate: [0, -1.8, 0.8, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        style={{ transformOrigin: "top center" }}
      >
        <svg
          viewBox="0 0 100 400"
          className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]"
        >
          <path d="M 0 0 L 100 0 L 100 350 L 50 400 L 0 350 Z" fill="url(#bannerGold)" />
          <path d="M 8 8 L 92 8 L 92 342 L 50 382 L 8 342 Z" fill="#7f1d1d" />
          <circle cx="50" cy="80" r="18" fill="#d4af37" />
          <polygon
            points="50,68 55,79 67,79 58,87 62,99 50,91 38,99 42,87 33,79 45,79"
            fill="#7f1d1d"
          />
        </svg>
      </motion.div>

      {/* Warm Golden/Amber and Fire Gradients */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(239,68,68,0.15), transparent 60%), linear-gradient(180deg, rgba(2,6,16,0.2) 0%, rgba(2,6,16,0.7) 50%, rgba(2,6,16,0.98) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--hot-amber)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--hot-amber)] to-transparent" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Top Hero Section: Split into equal text and growth map columns */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] font-cinzel mb-1">
              // Cohort Launchpad
            </div>
            <h2 className="mt-4 font-cinzel font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.12] text-white">
              The{" "}
              <span className="text-royal-gold filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                startup arena
              </span>{" "}
              for India's next breakout founders.
            </h2>
            <p className="mt-6 text-[#e6c687]/80 md:text-lg leading-relaxed font-serif italic max-w-xl">
              Phase 2 turns YUVA into a live deal-flow stage. Pitch, demo, raise, and ship — all
              under one roof, in front of the people who actually write checks.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={settings.launchpadRegistrationLink || "#register"}
                target="_blank"
                rel="noreferrer"
                className="relative overflow-hidden rounded-xl px-7 py-3.5 text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#b58610] via-[#ffd700] to-[#b58610] text-black font-cinzel transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(212,175,55,0.4)] active:scale-[0.98] will-change-transform"
              >
                Apply for Launchpad
              </a>
            </div>
          </motion.div>

          {/* Growth map / chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          >
            <div className="bg-[#070707]/85 border border-[#d4af37]/15 rounded-2xl p-7 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.8)] backdrop-blur-lg relative overflow-hidden group hover:border-[#d4af37]/35 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff4500] to-[#ffd700] opacity-5 -z-10 blur-3xl rounded-full" />
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-pulse" />
                  <span className="text-[#ffd700] font-cinzel text-[10px] tracking-[0.2em]">
                    Cohort Growth
                  </span>
                </div>
                <span className="text-[#ff4500] font-mono text-[10px] tracking-widest font-bold bg-[#ff4500]/10 px-2 py-0.5 rounded">
                  +412% YoY
                </span>
              </div>

              {/* Decorative grid overlays */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <svg viewBox="0 0 300 100" className="mt-6 w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="lg" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="50%" stopColor="#ff4500" />
                    <stop offset="100%" stopColor="#ffd700" />
                  </linearGradient>
                  <linearGradient id="lg2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ffd700" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ff4500" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.0, ease: "easeOut" }}
                  d="M0,85 C40,80 60,70 90,60 C120,55 140,55 170,40 C200,25 230,30 270,12 L300,8"
                  fill="none"
                  stroke="url(#lg)"
                  strokeWidth="3"
                  filter="drop-shadow(0 4px 10px rgba(212,175,55,0.4))"
                />
                <path
                  d="M0,85 C40,80 60,70 90,60 C120,55 140,55 170,40 C200,25 230,30 270,12 L300,8 L300,100 L0,100 Z"
                  fill="url(#lg2)"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Pillars Grid in 3 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={cardVariants as any}
              className="relative overflow-hidden bg-[#070707]/85 rounded-2xl p-7 border border-[#d4af37]/10 transition-all duration-300 group backdrop-blur-lg hover:-translate-y-1.5 hover:border-[#d4af37]/45 hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15),0_0_0_1px_rgba(212,175,55,0.2)] will-change-transform"
            >
              {/* Left indicator line that slides up on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ffd700] to-[#ff4500] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

              <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-[#ffd700] to-[#b58610] text-black shadow-[0_0_15px_rgba(212,175,55,0.35)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.65)] transition-all duration-300">
                <p.Icon
                  size={22}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-5 font-cinzel font-bold text-[17px] tracking-wider text-white group-hover:text-[#ffd700] transition-colors duration-300">
                {p.title}
              </h3>
              <p className="mt-2.5 text-sm text-[#e6c687]/75 leading-relaxed font-serif">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Side Scrolling Posters Area */}
        <div className="mt-24 mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] font-cinzel mb-8 text-center">
            // Startup Exhibitions
          </div>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {posters.map((poster) => (
              <motion.div
                key={poster.id}
                whileHover={{ scale: 1.03 }}
                className="snap-center min-w-[220px] md:min-w-[280px] bg-[#070707]/85 border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={poster.imageUrl} alt="Poster" className="w-full h-auto rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Sponsor CTA ── */}
        <SponsorCTA />

        {/* ── Contact Details ── */}
        <div className="mt-16 mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] font-cinzel mb-6 text-center">
            // Contact Us
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { name: "Madhan", phone: "94875 49510" },
              { name: "Vetri", phone: "9600407657" },
            ].map(({ name, phone }) => (
              <motion.a
                key={name}
                href={`tel:+91${phone.replace(/\s/g, "")}`}
                whileHover={{ y: -4, borderColor: "rgba(212,175,55,0.5)" }}
                className="flex items-center gap-5 bg-[#070707]/85 border border-[#d4af37]/15 rounded-2xl p-6 backdrop-blur-lg transition-colors duration-300 group"
              >
                <div className="h-14 w-14 shrink-0 grid place-items-center rounded-full bg-gradient-to-br from-[#ffd700] to-[#b58610] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
                  </svg>
                </div>
                <div>
                  <div className="font-cinzel font-bold text-[#ffd700] text-lg">{name}</div>
                  <div className="text-[#e6c687]/80 text-sm font-mono mt-0.5">+91 {phone}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}

/* ── Sponsor CTA component (reads link from settings) ── */
function SponsorCTA() {
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem("yuva-2026-settings");
        const parsed = stored ? JSON.parse(stored) : {};
        setLink(parsed.launchpadSponsorLink ?? "");
      } catch {
        setLink("");
      }
    };
    load();
    window.addEventListener("yuva-settings-change", load);
    return () => window.removeEventListener("yuva-settings-change", load);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 relative overflow-hidden rounded-3xl border border-[#d4af37]/20 bg-[#070707]/90 p-10 text-center backdrop-blur-lg"
      style={{ boxShadow: "0 0 60px rgba(212,175,55,0.08) inset" }}
    >
      <div
        aria-hidden
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ffd700]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#ff4500]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] font-cinzel mb-4">
          // Partner With Us
        </div>
        <h3 className="font-cinzel font-bold text-3xl md:text-4xl text-white mb-4">
          Want to <span className="text-[#ffd700]">Sponsor</span> Launchpad?
        </h3>
        <p className="text-[#e6c687]/70 max-w-xl mx-auto mb-8 font-serif italic">
          Reach 5,000+ students, engineers, and founders across 4 days. Get your brand in front of
          India's next tech leaders.
        </p>
        {link ? (
          <motion.a
            href={link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.03, boxShadow: "0 12px 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#b58610] via-[#ffd700] to-[#b58610] text-black font-cinzel"
          >
            Become a Sponsor →
          </motion.a>
        ) : (
          <div className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-widest border border-[#d4af37]/30 text-[#d4af37]/60 font-cinzel cursor-not-allowed">
            Sponsorship link coming soon
          </div>
        )}
      </div>
    </motion.div>
  );
}
