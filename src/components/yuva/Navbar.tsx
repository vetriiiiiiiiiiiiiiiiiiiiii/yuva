import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#workshops", label: "Workshops" },
  { href: "#launchpad", label: "Launchpad" },
  { href: "#foss", label: "FOSS" },
  { href: "#timeline", label: "Schedule" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`surface rounded-lg flex items-center justify-between px-4 md:px-6 py-3 backdrop-blur-xl ${
            scrolled ? "neon-border" : ""
          }`}
        >
          <a href="#top" className="flex items-center font-display font-black text-lg">
            <span className="relative h-9 w-36 overflow-hidden" aria-label="YUVA 2026">
              <img
                src="/logos/yuva-wordmark.png"
                alt=""
                className="absolute left-1/2 top-1/2 h-36 w-36 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              />
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 animated-gradient" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.06] lg:hidden"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface mt-2 grid grid-cols-2 gap-2 rounded-lg p-4 lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
