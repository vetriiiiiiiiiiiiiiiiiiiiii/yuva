import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function YuvaLogoBreakdown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Igloo.inc style physics: pieces come from different directions and rotations, forming the logo

  // Y
  const y1_x = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, -200, 0]);
  const y1_y = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, -200, 0]);
  const y1_rot = useTransform(scrollYProgress, [0, 0.4, 0.6], [45, 45, 0]);
  const y1_op = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, 1]);

  const y2_x = useTransform(scrollYProgress, [0, 0.45, 0.65], [200, 200, 0]);
  const y2_y = useTransform(scrollYProgress, [0, 0.45, 0.65], [-200, -200, 0]);
  const y2_rot = useTransform(scrollYProgress, [0, 0.45, 0.65], [-45, -45, 0]);
  const y2_op = useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, 1]);

  const y3_y = useTransform(scrollYProgress, [0, 0.5, 0.7], [200, 200, 0]);
  const y3_op = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1]);

  // U
  const u1_y = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, -200, 0]);
  const u1_op = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, 1]);
  const u2_y = useTransform(scrollYProgress, [0, 0.45, 0.65], [-200, -200, 0]);
  const u2_op = useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, 1]);
  const u3_y = useTransform(scrollYProgress, [0, 0.5, 0.7], [200, 200, 0]);
  const u3_op = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1]);

  // V
  const v1_x = useTransform(scrollYProgress, [0, 0.4, 0.6], [-100, -100, 0]);
  const v1_y = useTransform(scrollYProgress, [0, 0.4, 0.6], [-200, -200, 0]);
  const v1_op = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, 1]);
  const v2_x = useTransform(scrollYProgress, [0, 0.45, 0.65], [100, 100, 0]);
  const v2_y = useTransform(scrollYProgress, [0, 0.45, 0.65], [-200, -200, 0]);
  const v2_op = useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, 1]);

  // A
  const a1_x = useTransform(scrollYProgress, [0, 0.4, 0.6], [-100, -100, 0]);
  const a1_y = useTransform(scrollYProgress, [0, 0.4, 0.6], [200, 200, 0]);
  const a1_op = useTransform(scrollYProgress, [0, 0.4, 0.5], [0, 0, 1]);
  const a2_x = useTransform(scrollYProgress, [0, 0.45, 0.65], [100, 100, 0]);
  const a2_y = useTransform(scrollYProgress, [0, 0.45, 0.65], [200, 200, 0]);
  const a2_op = useTransform(scrollYProgress, [0, 0.45, 0.55], [0, 0, 1]);
  const a3_x = useTransform(scrollYProgress, [0, 0.5, 0.7], [200, 200, 0]);
  const a3_op = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto h-[200px] sm:h-[300px] flex items-center justify-center"
    >
      <svg
        viewBox="0 0 800 300"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]"
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#b264ff" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g
          stroke="url(#neonGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#glow)"
        >
          {/* Y */}
          <motion.path
            d="M 50 50 L 100 150"
            style={{ x: y1_x, y: y1_y, rotate: y1_rot, opacity: y1_op }}
          />
          <motion.path
            d="M 150 50 L 100 150"
            style={{ x: y2_x, y: y2_y, rotate: y2_rot, opacity: y2_op }}
          />
          <motion.path d="M 100 150 L 100 250" style={{ y: y3_y, opacity: y3_op }} />

          {/* U */}
          <motion.path d="M 220 50 L 220 200" style={{ y: u1_y, opacity: u1_op }} />
          <motion.path d="M 320 50 L 320 200" style={{ y: u2_y, opacity: u2_op }} />
          <motion.path d="M 220 200 Q 270 270 320 200" style={{ y: u3_y, opacity: u3_op }} />

          {/* V */}
          <motion.path d="M 400 50 L 450 250" style={{ x: v1_x, y: v1_y, opacity: v1_op }} />
          <motion.path d="M 500 50 L 450 250" style={{ x: v2_x, y: v2_y, opacity: v2_op }} />

          {/* A */}
          <motion.path d="M 620 50 L 570 250" style={{ x: a1_x, y: a1_y, opacity: a1_op }} />
          <motion.path d="M 620 50 L 670 250" style={{ x: a2_x, y: a2_y, opacity: a2_op }} />
          <motion.path d="M 595 180 L 645 180" style={{ x: a3_x, opacity: a3_op }} />
        </g>
      </svg>
    </div>
  );
}
