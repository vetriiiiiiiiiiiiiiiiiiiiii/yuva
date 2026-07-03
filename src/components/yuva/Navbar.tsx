import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth, logout } from "@/components/yuva/auth-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/", hash: "about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/schedule", label: "Schedule" },
  { to: "/workshops", label: "Workshops" },
  { to: "/launchpad", label: "Launchpad" },
  { to: "/foss", label: "FOSS" },
  { to: "/flagships", label: "Flagships" },
  { to: "/ambassador", label: "Ambassador" },
  { to: "/team", label: "Team" },
];

const MotionLink = motion(Link);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    ...links,
    ...(user
      ? [
          {
            to: user.role === "admin" ? "/admin" : "/dashboard",
            label: "Dashboard",
          },
        ]
      : []),
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="font-normal text-white z-[500] fixed top-0 left-0 w-full"
    >
      <div className="flex items-center justify-between h-20 mx-4 md:mx-8">
        {/* Logo */}
        <Link to="/" className="relative flex flex-row items-center shrink-0">
          <div className="flex h-10 items-center justify-center rounded-2xl bg-white/10 px-3 py-1 aaruush-glass gap-3">
            <img
              src="/logos/srm-ist-trichy.png"
              alt="SRM IST Trichy"
              className="h-7 w-auto object-contain bg-white/90 rounded px-1"
            />
            <div className="h-5 w-[1px] bg-white/20" />
            <img
              src="/logos/yuva-wordmark.png"
              alt="YUVA 2026"
              className="h-7 w-auto object-contain [clip-path:inset(18%_0%)]"
            />
          </div>
        </Link>

        {/* Desktop: Centered glass pill nav */}
        <nav className="hidden lg:flex flex-row items-center justify-center gap-6 px-10 py-3 ml-6 rounded-2xl bg-transparent aaruush-glass transition-all duration-300 ease-in-out">
          {navLinks.map((l) => {
            const isActive = currentPath === l.to && !l.hash;
            return (
              <MotionLink
                key={l.label}
                to={l.to}
                hash={l.hash}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`text-sm font-semibold transition-all duration-200 hover:text-white/80 ${
                  isActive ? "text-orange-300" : "text-white"
                }`}
              >
                {l.label}
              </MotionLink>
            );
          })}
        </nav>

        {/* Right side buttons */}
        <div className="flex flex-row items-center justify-center gap-3 ml-4">
          {/* Live button — desktop only */}
          <Link to="/events" className="hidden md:block">
            <button className="rounded-2xl px-4 py-2 bg-transparent text-white hover:bg-black/20 transition-all duration-300 ease-in-out text-sm font-semibold flex gap-x-2 items-center aaruush-glass">
              <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]" />
              Live
            </button>
          </Link>

          {/* Register / User section */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-2xl px-4 py-2 text-white text-sm font-semibold aaruush-glass border border-orange-400/30 transition-all hover:bg-black/20"
                >
                  Admin
                </Link>
              )}
              <button
                className="rounded-2xl px-4 py-2 text-white text-sm font-semibold aaruush-glass transition-all hover:bg-black/20"
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center relative">
              <Link to="/login">
                <button className="rounded-2xl px-5 py-2 bg-transparent text-white hover:bg-black/20 transition-all duration-300 ease-in-out text-sm font-semibold aaruush-glass">
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden backdrop-blur-md"
            onClick={() => setOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {open ? <X size={17} /> : <Menu size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-1 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-slate-950/85 p-3 backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((l) => {
              const isActive = currentPath === l.to;
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium text-center transition-all duration-200 ${
                    isActive
                      ? "border border-orange-400/20 bg-orange-400/10 text-orange-200"
                      : "border border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/events"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-center border border-white/10 bg-white/5 text-slate-300 flex items-center justify-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Live
            </Link>
            {!user && (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-center border border-orange-400/30 bg-orange-500/10 text-orange-200"
              >
                Register
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
