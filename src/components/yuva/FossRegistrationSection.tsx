import { motion } from "framer-motion";
import { Terminal, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FossRegistrationSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 z-10">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
        >

          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 mb-6">
            <Terminal size={32} />
          </div>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-black mb-4 flex flex-wrap justify-center gap-x-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
          >
            {["Join", "the", "FOSS", "Trichy", "Movement"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={
                  word === "FOSS" || word === "Trichy"
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500"
                    : ""
                }
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto mb-10">
            Be part of one of the largest open-source gathering in Tamil Nadu. Participate in
            install-fests, contribute to upstream projects, and network with leading maintainers.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/foss"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(255,87,34,0.3)] hover:shadow-[0_0_40px_rgba(255,87,34,0.5)] transition-all"
            >
              Register for FOSS Track
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
