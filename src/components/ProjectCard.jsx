import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [40, -32]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);

  return (
    <motion.article
      ref={cardRef}
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeInOut" }}
      whileHover={{ y: -3 }}
    >
      <Link
        to={`/projects#${project.id}`}
        className="block overflow-hidden rounded-[2.15rem] border border-ink/12 bg-white/40 transition-colors duration-300 hover:border-moss/40"
      >
        <div className="relative min-h-[25rem] overflow-hidden md:min-h-[34rem]">
          <motion.div
            className="absolute inset-0"
            style={{ y: visualY, scale: visualScale }}
            aria-hidden="true"
          >
            <div className="h-full w-full bg-[radial-gradient(circle_at_72%_16%,rgba(46,110,77,0.26),rgba(46,110,77,0.03)_48%),linear-gradient(160deg,rgba(255,255,255,0.48),rgba(255,255,255,0.14))]" />
            <div className="absolute inset-[9%] rounded-[1.6rem] border border-ink/14 bg-white/66 p-6">
              <div className="h-3 w-24 rounded-full bg-ink/10" />
              <div className="mt-2 h-3 w-40 rounded-full bg-ink/10" />
              <div className="mt-6 grid h-[70%] grid-cols-[0.88fr_1fr] gap-4">
                <div className="rounded-xl border border-ink/12 bg-cream/95" />
                <div className="rounded-xl border border-ink/12 bg-white/90" />
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/24 to-transparent" />

          <div className="absolute left-6 right-6 top-6 flex items-center justify-between gap-3">
            <p className="rounded-full border border-cream/28 bg-ink/26 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-cream/95">
              {project.category}
            </p>
            <p className="rounded-full border border-moss/45 bg-moss/20 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.11em] text-cream">
              {project.impact}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="max-w-[15ch] font-heading text-3xl font-semibold leading-[0.95] tracking-tight text-cream md:text-[2.7rem]">
              {project.name}
            </h3>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-cream/85 md:text-base">
              {project.problemSnippet}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-cream">
              <span className="relative">
                View Case Study
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-cream transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
