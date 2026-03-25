import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 640);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          className="interactive fixed bottom-6 right-6 z-40 rounded-full border border-ink/20 bg-cream px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink shadow-soft"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.24 }}
          whileHover={{ y: -2 }}
          aria-label="Back to top"
        >
          Top
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
