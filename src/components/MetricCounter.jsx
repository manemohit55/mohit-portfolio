import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function MetricCounter({ label, value, description, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    const controls = animate(0, value, {
      duration: 1.05,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.article
      ref={ref}
      className="border-t border-ink/15 pt-5"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      <h3 className="font-heading text-4xl font-semibold tracking-tightest md:text-5xl">
        {prefix}
        {display}
        {suffix}
      </h3>
      <h4 className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-moss">{label}</h4>
      <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink/68">{description}</p>
    </motion.article>
  );
}
