import { AnimatePresence, motion } from "framer-motion";

export default function ProjectAccordionItem({ project, open, onToggle }) {
  const bodyId = `${project.id}-body`;

  return (
    <article
      id={project.id}
      className={`scroll-mt-40 border-b border-[#dfe1e8] py-6 transition-colors duration-300 ${
        open ? "bg-[#f8f8fb]" : "bg-transparent"
      }`}
    >
      <button
        className="interactive flex w-full items-start justify-between gap-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={bodyId}
      >
        <div className="min-w-0">
          <h3 className="font-heading text-[clamp(2rem,4.5vw,3.65rem)] font-medium tracking-[-0.05em] text-[#2f3137]">
            {project.title}
          </h3>
          <p className="mt-2 text-[1.02rem] text-[#6f7179]">
            {project.role}
            {project.company ? <span className="text-[#8a8d97]"> {" • "} {project.company}</span> : null}
          </p>
        </div>
        <span
          className={`mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-2xl leading-none transition-all duration-250 ${
            open
              ? "border-[#8cff2e] bg-[#8cff2e] text-[#111]"
              : "border-[#cfd2db] bg-[#f6f6f8] text-[#4a4d55]"
          }`}
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={bodyId}
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="mt-8 border-t border-[#e2e4eb] pt-7">
              <div className="grid gap-7 lg:grid-cols-2">
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Problem Overview
                  </h4>
                  <p className="mt-3 text-[1.02rem] leading-[1.72] text-[#545760]">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Constraints
                  </h4>
                  <p className="mt-3 text-[1.02rem] leading-[1.72] text-[#545760]">{project.constraints}</p>
                </div>
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    UX Process
                  </h4>
                  <p className="mt-3 text-[1.02rem] leading-[1.72] text-[#545760]">{project.uxProcess}</p>
                </div>
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Key Decisions
                  </h4>
                  <ul className="mt-3 space-y-2 pl-4 text-[1.02rem] leading-[1.72] text-[#545760]">
                    {project.keyDecisions.map((decision) => (
                      <li key={decision} className="list-disc">
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid gap-7 lg:grid-cols-2">
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Design System Thinking
                  </h4>
                  <p className="mt-3 text-[1.02rem] leading-[1.72] text-[#545760]">{project.designSystemThinking}</p>
                </div>
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Approach
                  </h4>
                  <p className="mt-3 text-[1.02rem] leading-[1.72] text-[#545760]">{project.approach}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-7 lg:grid-cols-2">
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Tools Used
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[#d6d8df] bg-[#f1f2f6] px-3 py-1 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-[#5e626d]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-[#6a6d76]">
                    Impact Metrics
                  </h4>
                  <ul className="mt-3 space-y-2 pl-4 text-[1.02rem] leading-[1.72] text-[#545760]">
                    {project.impactMetrics.map((metric) => (
                      <li key={metric} className="list-disc">
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["01", "02", "03"].map((item) => (
                  <div
                    key={item}
                    className="aspect-[16/10] rounded-[14px] border border-[#d5d7de] bg-[radial-gradient(circle_at_76%_18%,rgba(140,255,46,0.12),rgba(140,255,46,0.01)_42%),linear-gradient(155deg,#f2f3f7,#eceef4)] p-3"
                  >
                    <div className="flex h-full items-end rounded-[10px] border border-[#d4d7df] bg-[#ffffffbf] p-3">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#646873]">
                        Mockup {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
