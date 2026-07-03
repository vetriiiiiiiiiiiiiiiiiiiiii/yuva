import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { type GalleryItem, defaultGallery, getStoredGallery } from "./gallery-store";

const gradOptions = [
  "from-orange-500/40 via-orange-600/30 to-red-500/40",
  "from-fuchsia-500/40 to-orange-500/30",
  "from-orange-600/40 to-orange-500/30",
  "from-emerald-500/30 to-orange-500/40",
  "from-rose-500/30 to-fuchsia-500/40",
  "from-amber-500/30 to-pink-500/30",
];

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(defaultGallery);

  useEffect(() => {
    setItems(getStoredGallery());
    const handleStorage = () => setItems(getStoredGallery());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Section
      id="gallery"
      eyebrow="Glimpses"
      title={
        <>
          Inside the <span className="text-gradient">arena</span>.
        </>
      }
      subtitle="A peek at what 4 days of YUVA looks like."
    >
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((t, i) => {
          const grad = gradOptions[i % gradOptions.length];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.04, duration: 0.45, ease: "easeOut" }}
              className={`relative overflow-hidden rounded-2xl glass group cursor-pointer inline-block w-full`}
            >
              <img src={t.imageUrl} alt="Gallery" className="w-full object-cover aspect-[4/3]" />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 transition-transform duration-500 group-hover:scale-110`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${grad} mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
