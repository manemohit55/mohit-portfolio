import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ExperienceTimeline({ items }) {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 22%"],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.34,
  });
  const dotTop = useTransform(lineScale, [0, 1], ["2%", "98%"]);

  return (
    <div ref={timelineRef} className="relative mt-20">
      <div className="absolute bottom-0 left-[0.5rem] top-0 w-px bg-ink/14 md:left-[0.68rem]" />
      <motion.div
        className="absolute bottom-0 left-[0.5rem] top-0 w-px origin-top bg-moss/70 md:left-[0.68rem]"
        style={{ scaleY: lineScale }}
      />
      <motion.span
        className="pointer-events-none absolute left-[0.5rem] z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-moss shadow-[0_0_0_4px_rgba(245,242,234,0.95)] md:left-[0.68rem]"
        style={{ top: dotTop }}
        aria-hidden="true"
      />

      <div className="space-y-16">
        {items.map((item, index) => {
          return (
            <motion.article
              key={item.company}
              className="relative pl-8 md:pl-14 lg:mr-auto lg:max-w-[76%]"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.34, ease: "easeInOut", delay: index * 0.03 }}
            >
              <span
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full border border-moss/60 bg-cream"
                aria-hidden="true"
              />

              <div className="rounded-2xl border border-ink/10 bg-white/44 p-6 md:p-7">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight md:text-[2rem]">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium uppercase tracking-[0.1em] text-moss">{item.role}</p>
                  </div>

                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink/52">
                    {item.duration}
                  </p>
                </div>

                <p className="mt-5 max-w-[66ch] text-sm leading-[1.7] text-ink/72 md:text-[0.98rem]">
                  {item.summary}
                </p>

                <ul className="mt-4 space-y-2 text-sm leading-[1.7] text-ink/72 md:text-[0.96rem]">
                  {item.achievements.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-moss" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
