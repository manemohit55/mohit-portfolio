import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const TYPED_LABEL = "AI Execution.";

const workflowSteps = [
  {
    id: "concept",
    label: "Concept",
    title: "Concept",
    description:
      "Defined information architecture and narrative flow before any generation started.",
    outcome: "Clear direction before acceleration.",
  },
  {
    id: "prompt-structuring",
    label: "Prompt Structuring",
    title: "Prompt Structuring",
    description:
      "Converted ambiguous requirements into structured UX logic using constraint-driven prompts.",
    outcome: "Reduced interpretation gaps and rework cycles.",
  },
  {
    id: "ai-exploration",
    label: "AI Exploration",
    title: "AI Exploration",
    description:
      "Generated multiple layout and interaction options quickly with AI design tools.",
    outcome: "Accelerated iteration from days to hours.",
  },
  {
    id: "human-refinement",
    label: "Human Refinement",
    title: "Human Refinement",
    description:
      "Curated and refined AI output through UX principles, system thinking, and product intent.",
    outcome: "Maintained usability integrity and brand alignment.",
  },
  {
    id: "ai-code-generation",
    label: "AI Code Generation",
    title: "AI Code Generation",
    description:
      "Translated approved design decisions into functional UI sections using Codex and Cursor.",
    outcome: "Dev-ready components with reduced handoff friction.",
  },
  {
    id: "functional-website",
    label: "Functional Website",
    title: "Functional Website",
    description:
      "Integrated structure, design, and AI-assisted code into a live, scalable portfolio.",
    outcome: "Compressed concept-to-live timeline significantly.",
  },
];

const toolBadges = ["ChatGPT", "Codex", "Cursor", "Bolt", "Lovable"];

export default function AIWorkflowSection() {
  const sectionRef = useRef(null);
  const hasTypedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [typedExecution, setTypedExecution] = useState("");

  const inView = useInView(sectionRef, { once: true, amount: 0.16 });
  const lastStepIndex = workflowSteps.length - 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.36,
  });

  const lineScale = useTransform(smoothProgress, [0, 1], [0, 1]);
  const orbY = useTransform(smoothProgress, [0, 1], [-36, 36]);
  const panelY = useTransform(smoothProgress, [0, 1], [10, -10]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * workflowSteps.length);
    const nextIndex = Math.max(0, Math.min(lastStepIndex, rawIndex));

    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  useEffect(() => {
    if (!inView || hasTypedRef.current) {
      return;
    }

    hasTypedRef.current = true;
    setTypedExecution("");

    let cursor = 0;
    const interval = window.setInterval(() => {
      cursor += 1;
      setTypedExecution(TYPED_LABEL.slice(0, cursor));
      if (cursor >= TYPED_LABEL.length) {
        window.clearInterval(interval);
      }
    }, 52);

    return () => window.clearInterval(interval);
  }, [inView]);

  const activeStep = workflowSteps[activeIndex];
  const completionRatio = useMemo(() => {
    if (workflowSteps.length <= 1) {
      return 0;
    }

    return activeIndex / lastStepIndex;
  }, [activeIndex, lastStepIndex]);

  return (
    <section id="ai-workflow" ref={sectionRef} className="relative min-h-[255vh] border-b border-ink/10">
      <motion.div
        className="pointer-events-none absolute right-[4%] top-[20%] h-[24rem] w-[24rem] rounded-full bg-moss/14 blur-3xl"
        style={{ y: orbY }}
        aria-hidden="true"
      />

      <div className="sticky top-20 overflow-hidden py-16 md:py-20">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.34, ease: "easeInOut" }}
            className="max-w-4xl"
          >
            <p className="section-kicker">AI Workflow</p>
            <h2 className="mt-4 font-heading text-[clamp(2.7rem,7.8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.02em]">
              <span className="text-ink">Human Strategy.</span>{" "}
              <span className="text-moss">
                {typedExecution}
                {typedExecution.length < TYPED_LABEL.length ? (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-[0.92em] w-[1px] animate-pulse bg-moss/80 align-middle"
                  />
                ) : null}
              </span>
            </h2>
            <p className="mt-5 max-w-[66ch] text-base leading-[1.72] text-ink/72 md:text-[1.05rem]">
              A live demonstration of how strategy, prompt engineering, and AI-assisted implementation work together
              to accelerate delivery without compromising system thinking.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-20">
            <div className="relative pl-8">
              <div className="absolute bottom-1 left-[10px] top-1 w-px bg-ink/16" aria-hidden="true" />
              <motion.div
                className="absolute bottom-1 left-[10px] top-1 w-px origin-top bg-moss"
                style={{ scaleY: lineScale }}
                aria-hidden="true"
              />

              <div className="space-y-5">
                {workflowSteps.map((step, index) => {
                  const isActive = activeIndex === index;
                  const isComplete = index <= activeIndex;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      className="group flex w-full items-start gap-3 text-left"
                      onClick={() => setActiveIndex(index)}
                    >
                      <motion.span
                        className={`mt-1.5 h-3 w-3 rounded-full border transition-colors duration-200 ${
                          isComplete ? "border-moss bg-moss" : "border-ink/30 bg-cream"
                        }`}
                        animate={{ scale: isActive ? 1.24 : 1 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      />
                      <span className="inline-flex flex-col">
                        <span
                          className={`uppercase transition-colors duration-200 ${
                            isActive
                              ? "text-[0.92rem] font-bold tracking-[0.082em] text-ink"
                              : "text-[0.68rem] font-semibold tracking-[0.1em] text-ink/56"
                          }`}
                        >
                          {step.label}
                        </span>
                        <span
                          className={`mt-1 h-px w-16 origin-left transition-all duration-250 ${
                            isActive ? "scale-x-100 bg-moss" : "scale-x-0 bg-ink/28 group-hover:scale-x-100"
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div style={{ y: panelY }}>
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="max-w-[680px]"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-moss">
                    Step {String(activeIndex + 1).padStart(2, "0")} / {workflowSteps.length}
                  </p>
                  <h3 className="mt-3 font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.012em] md:text-6xl">
                    {activeStep.title}
                  </h3>
                  <p className="mt-10 text-[1.04rem] leading-[1.72] text-ink/72">{activeStep.description}</p>
                  <p className="mt-6 border-l border-moss/45 pl-4 text-[0.92rem] leading-[1.72] text-ink/58">
                    <span className="font-semibold text-ink/74">Outcome:</span> {activeStep.outcome}
                  </p>

                  {completionRatio >= 1 ? (
                    <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink/48">
                      Workflow experienced. Scroll to continue.
                    </p>
                  ) : null}
                </motion.article>
              </AnimatePresence>

              <div className="mt-10 flex max-w-[680px] flex-wrap gap-2.5">
                {toolBadges.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-ink/15 px-3 py-1 text-[0.67rem] font-medium text-ink/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-moss/55"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
