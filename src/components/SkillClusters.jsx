import { motion } from "framer-motion";
import { useState } from "react";

export default function SkillClusters({ skills }) {
  const [active, setActive] = useState(skills[0]?.title || "");

  return (
    <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill, idx) => {
        const isActive = active === skill.title;

        return (
          <motion.article
            key={skill.title}
            className={`group rounded-3xl border p-6 transition-colors duration-300 md:p-7 ${
              isActive ? "border-moss/45 bg-white/66" : "border-ink/12 bg-white/36"
            }`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.34, delay: idx * 0.04, ease: "easeInOut" }}
            whileHover={{ y: -3 }}
            onHoverStart={() => setActive(skill.title)}
            onFocusCapture={() => setActive(skill.title)}
            tabIndex={0}
          >
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-ink/48">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight md:text-[1.9rem]">
              {skill.title}
            </h3>
            <p className="mt-4 max-w-[34ch] text-sm leading-[1.7] text-ink/72 md:text-[0.96rem]">
              {skill.detail}
            </p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2"
              animate={{ opacity: isActive ? 1 : 0.72, y: isActive ? 0 : 2 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
            >
              {skill.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
                    isActive ? "border-moss/45 text-moss" : "border-ink/15 text-ink/55"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.article>
        );
      })}
    </div>
  );
}
