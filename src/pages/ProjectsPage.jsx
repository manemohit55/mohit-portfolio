import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProjectAccordionItem from "../components/ProjectAccordionItem";
import { allProjects } from "../data/portfolioData";

const HASH_SCROLL_DELAY = 120;

export default function ProjectsPage() {
  const location = useLocation();
  const [openProjectId, setOpenProjectId] = useState(allProjects[0]?.id ?? null);

  const projectIds = useMemo(() => new Set(allProjects.map((project) => project.id)), []);

  const scrollToProject = useCallback((id, behavior = "smooth") => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const header = document.querySelector('[data-site-header="true"]');
    const headerHeight = header ? header.getBoundingClientRect().height : 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior,
    });
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const id = location.hash.replace("#", "");
    if (!projectIds.has(id)) {
      return;
    }

    setOpenProjectId(id);
    const timer = window.setTimeout(() => scrollToProject(id, "smooth"), HASH_SCROLL_DELAY);

    return () => window.clearTimeout(timer);
  }, [location.hash, projectIds, scrollToProject]);

  const handleToggle = (id) => {
    setOpenProjectId((currentOpenId) => {
      const nextOpenId = currentOpenId === id ? null : id;

      if (nextOpenId) {
        window.history.replaceState(null, "", `/projects#${id}`);
        window.setTimeout(() => scrollToProject(id, "smooth"), HASH_SCROLL_DELAY);
      } else {
        window.history.replaceState(null, "", "/projects");
      }

      return nextOpenId;
    });
  };

  return (
    <main data-header-tone="light" className="bg-[#f6f6f8] pt-28 md:pt-32">
      <section className="border-b border-[#e1e2e6]">
        <div className="section-shell py-16 text-center md:py-20">
          <motion.p
            className="mx-auto text-[0.82rem] uppercase tracking-[0.14em] text-[#7e8189] [width:max-content]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Case Study Library
          </motion.p>

          <motion.h1
            className="mx-auto mt-4 max-w-full font-heading text-[clamp(3.2rem,8vw,7rem)] font-medium leading-[0.92] tracking-[-0.055em] text-[#303238] [width:max-content]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: 0.05 }}
          >
            All Projects.
          </motion.h1>

          <motion.p
            className="mx-auto mt-8 max-w-[67ch] text-[1.03rem] leading-[1.72] text-[#666970]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.1 }}
          >
            Expand any project to review problem framing, constraints, UX process, key decisions, system thinking, and
            measurable outcomes.
          </motion.p>
        </div>
      </section>

      <section className="border-b border-[#e1e2e6] pb-8 pt-2 md:pb-12">
        <div className="section-shell">
          {allProjects.map((project) => (
            <ProjectAccordionItem
              key={project.id}
              project={project}
              open={openProjectId === project.id}
              onToggle={() => handleToggle(project.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
