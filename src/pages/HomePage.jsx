import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  certifications,
  domainExpertise,
  experienceTimeline,
  featuredProjects,
  impactMetrics,
  profile,
  resumeDownloadUrl,
  skillClusters,
  education,
} from "../data/portfolioData";

const tickerItems = [
  "6+ years of experience",
  "+68% customer satisfaction lift",
  "+18% booking conversion",
  "+36% faster checkout journey",
  "Enterprise + SaaS + Travel + Healthcare",
];

const floatingMockups = [
  {
    id: "left-top-desktop",
    kind: "desktop",
    className:
      "left-[4%] top-[7%] w-[34vw] max-w-[280px] min-w-[132px] md:left-[4.5%] md:top-[7.5%] md:w-[20vw] md:min-w-[214px]",
    gradient: "from-[#131c2a] via-[#0c141f] to-[#091019]",
    start: 126,
    travel: 210,
    driftX: 7,
    opacity: 0.92,
  },
  {
    id: "left-top-mobile",
    kind: "mobile",
    className:
      "left-[24%] top-[22%] w-[16vw] max-w-[108px] min-w-[64px] md:left-[17%] md:top-[24%] md:w-[7.7vw] md:min-w-[92px]",
    gradient: "from-[#12283e] via-[#0c1623] to-[#091019]",
    start: 112,
    travel: 248,
    driftX: 5,
    opacity: 0.84,
    mobileHidden: true,
  },
  {
    id: "right-top-desktop",
    kind: "desktop",
    className:
      "right-[4%] top-[9%] w-[34vw] max-w-[280px] min-w-[132px] md:right-[5%] md:top-[9.5%] md:w-[20vw] md:min-w-[214px]",
    gradient: "from-[#171d32] via-[#0d1420] to-[#080e17]",
    start: 142,
    travel: 186,
    driftX: -6,
    opacity: 0.9,
  },
  {
    id: "right-top-mobile",
    kind: "mobile",
    className:
      "right-[24%] top-[24%] w-[16vw] max-w-[108px] min-w-[64px] md:right-[18%] md:top-[26%] md:w-[7.7vw] md:min-w-[92px]",
    gradient: "from-[#1a2235] via-[#101726] to-[#0a1019]",
    start: 118,
    travel: 232,
    driftX: -5,
    opacity: 0.84,
    mobileHidden: true,
  },
  {
    id: "left-bottom-desktop",
    kind: "desktop",
    className:
      "left-[6%] bottom-[8%] w-[34vw] max-w-[284px] min-w-[138px] md:left-[7.5%] md:bottom-[8%] md:w-[20.5vw] md:min-w-[220px]",
    gradient: "from-[#1b2233] via-[#0f1624] to-[#090f16]",
    start: 152,
    travel: 222,
    driftX: 8,
    opacity: 0.94,
  },
  {
    id: "left-bottom-mobile",
    kind: "mobile",
    className:
      "left-[24%] bottom-[23%] w-[16vw] max-w-[108px] min-w-[64px] md:left-[18%] md:bottom-[25%] md:w-[7.7vw] md:min-w-[92px]",
    gradient: "from-[#152a3f] via-[#0d1824] to-[#091019]",
    start: 120,
    travel: 268,
    driftX: 5,
    opacity: 0.86,
  },
  {
    id: "right-bottom-desktop",
    kind: "desktop",
    className:
      "right-[6%] bottom-[8%] w-[34vw] max-w-[284px] min-w-[138px] md:right-[7.5%] md:bottom-[8%] md:w-[20.5vw] md:min-w-[220px]",
    gradient: "from-[#111b2d] via-[#0b141f] to-[#081018]",
    start: 164,
    travel: 196,
    driftX: -6,
    opacity: 0.94,
  },
  {
    id: "right-bottom-mobile",
    kind: "mobile",
    className:
      "right-[24%] bottom-[23%] w-[16vw] max-w-[108px] min-w-[64px] md:right-[18%] md:bottom-[25%] md:w-[7.7vw] md:min-w-[92px]",
    gradient: "from-[#13263a] via-[#0d1724] to-[#090f18]",
    start: 126,
    travel: 244,
    driftX: -5,
    opacity: 0.86,
  },
];

const IMMERSIVE_DESKTOP_PLACEHOLDERS = [
  {
    id: "desk-01",
    title: "Website 01",
    subtitle: "Enterprise UX",
    accent: "rgba(140,255,46,0.18)",
    image: "https://picsum.photos/id/180/1400/900",
  },
  {
    id: "desk-02",
    title: "Website 02",
    subtitle: "SaaS Platform",
    accent: "rgba(120,170,255,0.16)",
    image: "https://picsum.photos/id/48/1400/900",
  },
  {
    id: "desk-03",
    title: "Website 03",
    subtitle: "Travel Booking",
    accent: "rgba(140,255,46,0.14)",
    image: "https://picsum.photos/id/26/1400/900",
  },
  {
    id: "desk-04",
    title: "Website 04",
    subtitle: "Design System",
    accent: "rgba(170,205,255,0.13)",
    image: "https://picsum.photos/id/11/1400/900",
  },
  {
    id: "desk-05",
    title: "Website 05",
    subtitle: "Dashboard Ops",
    accent: "rgba(140,255,46,0.12)",
    image: "https://picsum.photos/id/4/1400/900",
  },
  {
    id: "desk-06",
    title: "Website 06",
    subtitle: "Enterprise Admin",
    accent: "rgba(134,180,255,0.12)",
    image: "https://picsum.photos/id/63/1400/900",
  },
];

const IMMERSIVE_MOBILE_PLACEHOLDERS = [
  {
    id: "mob-01",
    title: "Mobile 01",
    subtitle: "Booking Flow",
    accent: "rgba(140,255,46,0.18)",
    image: "https://picsum.photos/id/1011/900/1600",
  },
  {
    id: "mob-02",
    title: "Mobile 02",
    subtitle: "Checkout UX",
    accent: "rgba(128,176,255,0.15)",
    image: "https://picsum.photos/id/1001/900/1600",
  },
  {
    id: "mob-03",
    title: "Mobile 03",
    subtitle: "Profile System",
    accent: "rgba(140,255,46,0.14)",
    image: "https://picsum.photos/id/1060/900/1600",
  },
  {
    id: "mob-04",
    title: "Mobile 04",
    subtitle: "Payments",
    accent: "rgba(123,170,255,0.14)",
    image: "https://picsum.photos/id/1025/900/1600",
  },
  {
    id: "mob-05",
    title: "Mobile 05",
    subtitle: "Retention Flow",
    accent: "rgba(140,255,46,0.12)",
    image: "https://picsum.photos/id/1069/900/1600",
  },
  {
    id: "mob-06",
    title: "Mobile 06",
    subtitle: "App Experience",
    accent: "rgba(110,160,255,0.12)",
    image: "https://picsum.photos/id/1074/900/1600",
  },
];

const IMMERSIVE_SLOTS = [
  {
    id: "slot-top-left-desktop",
    kind: "desktop",
    positionClass:
      "left-[4%] top-[10%] w-[30vw] max-w-[350px] min-w-[190px] md:left-[5%] md:top-[10%] md:w-[20vw] md:min-w-[228px]",
    layer: "bg",
    zoneMap: [0, 1, 2, 3, 4, 5],
    staticIndex: 0,
    reveal: [0.06, 0.2],
    driftX: -10,
    driftY: 74,
  },
  {
    id: "slot-mid-left-mobile",
    kind: "mobile",
    positionClass:
      "left-[22%] top-[30%] w-[16vw] max-w-[118px] min-w-[74px] md:left-[17%] md:top-[30%] md:w-[7.2vw] md:min-w-[95px]",
    layer: "fg",
    zoneMap: [1, 2, 3, 4, 5, 0],
    staticIndex: 1,
    reveal: [0.16, 0.3],
    driftX: -6,
    driftY: 88,
    mobileHidden: true,
  },
  {
    id: "slot-top-right-desktop",
    kind: "desktop",
    positionClass:
      "right-[4%] top-[11%] w-[30vw] max-w-[350px] min-w-[190px] md:right-[5%] md:top-[11%] md:w-[20vw] md:min-w-[228px]",
    layer: "bg",
    zoneMap: [3, 2, 1, 0, 5, 4],
    staticIndex: 2,
    reveal: [0.1, 0.24],
    driftX: 8,
    driftY: 76,
  },
  {
    id: "slot-mid-right-mobile",
    kind: "mobile",
    positionClass:
      "right-[22%] top-[31%] w-[16vw] max-w-[118px] min-w-[74px] md:right-[17%] md:top-[31%] md:w-[7.2vw] md:min-w-[95px]",
    layer: "mid",
    zoneMap: [2, 3, 4, 5, 0, 1],
    staticIndex: 2,
    reveal: [0.2, 0.34],
    driftX: 7,
    driftY: 92,
    mobileHidden: true,
  },
  {
    id: "slot-bottom-left-desktop",
    kind: "desktop",
    positionClass:
      "left-[8%] bottom-[10%] w-[31vw] max-w-[372px] min-w-[198px] md:left-[10%] md:bottom-[10%] md:w-[20.5vw] md:min-w-[236px]",
    layer: "mid",
    zoneMap: [4, 3, 2, 1, 0, 5],
    staticIndex: 3,
    reveal: [0.3, 0.46],
    driftX: -8,
    driftY: 98,
  },
  {
    id: "slot-bottom-center-mobile",
    kind: "mobile",
    positionClass:
      "left-[50%] bottom-[8.5%] w-[16vw] max-w-[118px] min-w-[74px] -translate-x-1/2 md:bottom-[9%] md:w-[7.2vw] md:min-w-[95px]",
    layer: "fg",
    zoneMap: [5, 4, 3, 2, 1, 0],
    staticIndex: 3,
    reveal: [0.42, 0.58],
    driftX: 0,
    driftY: 122,
  },
  {
    id: "slot-bottom-right-desktop",
    kind: "desktop",
    positionClass:
      "right-[8%] bottom-[10%] w-[31vw] max-w-[372px] min-w-[198px] md:right-[10%] md:bottom-[10%] md:w-[20.5vw] md:min-w-[236px]",
    layer: "mid",
    zoneMap: [1, 0, 5, 4, 3, 2],
    staticIndex: 4,
    reveal: [0.5, 0.66],
    driftX: 9,
    driftY: 100,
  },
  {
    id: "slot-deep-left-mobile",
    kind: "mobile",
    positionClass:
      "left-[34%] bottom-[29%] w-[16vw] max-w-[118px] min-w-[74px] md:left-[36%] md:bottom-[30%] md:w-[7.2vw] md:min-w-[95px]",
    layer: "fg",
    zoneMap: [0, 2, 4, 1, 3, 5],
    staticIndex: 4,
    reveal: [0.58, 0.72],
    driftX: -7,
    driftY: 118,
    mobileHidden: true,
  },
  {
    id: "slot-deep-right-mobile",
    kind: "mobile",
    positionClass:
      "right-[34%] bottom-[29%] w-[16vw] max-w-[118px] min-w-[74px] md:right-[36%] md:bottom-[30%] md:w-[7.2vw] md:min-w-[95px]",
    layer: "fg",
    zoneMap: [3, 5, 1, 4, 0, 2],
    staticIndex: 5,
    reveal: [0.64, 0.8],
    driftX: 7,
    driftY: 120,
    mobileHidden: true,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hasTrailGap(candidate, existingCards, minGap = 30) {
  return existingCards.every((card) => {
    const horizontalSeparated = candidate.x + candidate.width + minGap <= card.x || card.x + card.width + minGap <= candidate.x;
    const verticalSeparated = candidate.y + candidate.height + minGap <= card.y || card.y + card.height + minGap <= candidate.y;
    return horizontalSeparated || verticalSeparated;
  });
}

const testimonials = [
  {
    rating: "4.9 / 5",
    quote:
      "Working with Mohit improved clarity across the entire product lifecycle. From problem framing to final UI behavior, every decision was intentional and outcome-led.",
    author: "Product Director",
    source: "Enterprise SaaS",
  },
  {
    rating: "5.0 / 5",
    quote:
      "Strong systems mindset and excellent collaboration with engineering. He reduced handoff friction and raised delivery quality without slowing velocity.",
    author: "Engineering Lead",
    source: "Travel Platform",
  },
  {
    rating: "5.0 / 5",
    quote:
      "He balances business goals, user needs, and execution constraints exceptionally well. The work was strategic, practical, and measurable.",
    author: "Business Stakeholder",
    source: "Global Product Team",
  },
];

const directEmail = "mane.mohit55@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(directEmail)}`;
const contactPhone = "+918208150855";
const contactPhoneDisplay = "8208150855";
const contactQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=${encodeURIComponent(`tel:${contactPhone}`)}`;

const socialCards = [
  { label: "linkedin", href: profile.linkedin, short: "in" },
  { label: "email", href: gmailComposeUrl, short: "@" },
  { label: "resume", href: resumeDownloadUrl, short: "cv" },
  { label: "all projects", href: "/projects", short: "pj" },
];

const projectDates = {
  "sterling-resorts": "09/25",
  "trade-engine-online": "08/25",
  brantford: "03/24",
  sorrentina: "09/23",
  "health-track-sg": "07/25",
  "tax-buddi": "05/25",
};

const recruiterQuickFacts = [
  { label: "Role", value: profile.role },
  { label: "Experience", value: profile.experience },
  { label: "Location", value: profile.location },
  { label: "Availability", value: profile.availability },
];

function getExperienceHighlights(item) {
  const quantified = item.achievements.filter((point) => /(\+\d+%|\d+\+|award|reduced|improved|faster|lift)/i.test(point));
  if (quantified.length >= 2) {
    return quantified.slice(0, 2);
  }
  return item.achievements.slice(0, 2);
}

const heroMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function HeroFluidRippleLayer({ targetRef }) {
  const canvasRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const ripplesRef = useRef([]);
  const pointerRef = useRef({ lastX: null, lastY: null, lastTime: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const target = targetRef.current;
    const canvas = canvasRef.current;
    if (!target || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return undefined;
    }

    const rippleSettings = {
      maxSize: 102,
      animationSpeed: 5,
      strokeColor: [236, 236, 236],
    };

    const canvasSettings = {
      blur: 8,
    };

    let frameWidth = 1;
    let frameHeight = 1;
    let devicePixelRatio = 1;
    let animationFrameId = null;
    let lastFrameTime = performance.now();

    const setCanvasSize = () => {
      const bounds = target.getBoundingClientRect();
      frameWidth = Math.max(1, bounds.width);
      frameHeight = Math.max(1, bounds.height);
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(frameWidth * devicePixelRatio);
      canvas.height = Math.round(frameHeight * devicePixelRatio);
      canvas.style.width = `${frameWidth}px`;
      canvas.style.height = `${frameHeight}px`;
      canvas.style.filter = `blur(${canvasSettings.blur}px)`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.lineCap = "round";
    };

    const spawnRipple = (x, y, size = 2) => {
      const maxSize = rippleSettings.maxSize + Math.random() * 16;
      const animationSpeed = rippleSettings.animationSpeed + Math.random() * 1.4;
      ripplesRef.current.push({
        x,
        y,
        circleSize: size,
        maxSize,
        opacity: 1,
        animationSpeed,
        opacityStep: (animationSpeed / Math.max(1, maxSize - size)) / 2,
      });

      if (ripplesRef.current.length > 28) {
        ripplesRef.current.splice(0, ripplesRef.current.length - 28);
      }
    };

    const getPointerCoords = (event) => {
      const bounds = target.getBoundingClientRect();
      const x = clamp(event.clientX - bounds.left, 0, bounds.width);
      const y = clamp(event.clientY - bounds.top, 0, bounds.height);
      return { x, y };
    };

    const handlePointerEnter = (event) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;
      const { x, y } = getPointerCoords(event);
      pointerRef.current.lastX = x;
      pointerRef.current.lastY = y;
      pointerRef.current.lastTime = performance.now();
      spawnRipple(x, y, 2.2);
    };

    const handlePointerMove = (event) => {
      if (prefersReducedMotion || event.pointerType === "touch") return;
      const { x, y } = getPointerCoords(event);
      const now = performance.now();
      const { lastX, lastY, lastTime } = pointerRef.current;
      const movement = lastX == null || lastY == null ? Infinity : Math.hypot(x - lastX, y - lastY);
      const elapsed = now - lastTime;

      if (movement > 7 || elapsed > 34) {
        spawnRipple(x, y, 2);
        pointerRef.current.lastX = x;
        pointerRef.current.lastY = y;
        pointerRef.current.lastTime = now;
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.lastX = null;
      pointerRef.current.lastY = null;
      pointerRef.current.lastTime = 0;
    };

    const drawRipples = (deltaScale) => {
      const activeRipples = [];
      const strokeColor = rippleSettings.strokeColor;

      for (let index = ripplesRef.current.length - 1; index >= 0; index -= 1) {
        const ripple = ripplesRef.current[index];
        ripple.circleSize += ripple.animationSpeed * deltaScale;
        ripple.opacity -= ripple.opacityStep * deltaScale;

        if (ripple.opacity <= 0 || ripple.circleSize >= ripple.maxSize) {
          continue;
        }

        const alpha = ripple.opacity * 0.46;
        context.beginPath();
        context.lineWidth = 1.15;
        context.strokeStyle = `rgba(${Math.floor(strokeColor[0])}, ${Math.floor(strokeColor[1])}, ${Math.floor(strokeColor[2])}, ${alpha.toFixed(4)})`;
        context.arc(ripple.x, ripple.y, ripple.circleSize, 0, Math.PI * 2);
        context.stroke();

        context.beginPath();
        context.lineWidth = 0.85;
        context.strokeStyle = `rgba(${Math.floor(strokeColor[0])}, ${Math.floor(strokeColor[1])}, ${Math.floor(strokeColor[2])}, ${(alpha * 0.42).toFixed(4)})`;
        context.arc(ripple.x, ripple.y, ripple.circleSize * 1.22, 0, Math.PI * 2);
        context.stroke();

        activeRipples.push(ripple);
      }

      ripplesRef.current = activeRipples;
    };

    const animate = (time) => {
      const frameDelta = clamp((time - lastFrameTime) / 16.6667, 0.55, 2.3);
      lastFrameTime = time;

      context.clearRect(0, 0, frameWidth, frameHeight);
      drawRipples(frameDelta);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    setCanvasSize();
    animationFrameId = requestAnimationFrame(animate);

    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        setCanvasSize();
      });
      resizeObserverRef.current.observe(target);
    } else {
      window.addEventListener("resize", setCanvasSize);
    }

    if (!prefersReducedMotion) {
      target.addEventListener("pointerenter", handlePointerEnter, { passive: true });
      target.addEventListener("pointermove", handlePointerMove, { passive: true });
      target.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      } else {
        window.removeEventListener("resize", setCanvasSize);
      }

      if (!prefersReducedMotion) {
        target.removeEventListener("pointerenter", handlePointerEnter);
        target.removeEventListener("pointermove", handlePointerMove);
        target.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, [prefersReducedMotion, targetRef]);

  return (
    <div className="hero-fluid-layer pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-fluid-canvas h-full w-full" />
    </div>
  );
}

const letterSequenceLines = [
  "I translate complexity into scalable digital systems.",
  "AI assists the acceleration.",
  "Human judgment defines the outcome.",
];

function buildLetterModel(lines) {
  let order = 0;

  const model = lines.map((line) =>
    line.split(" ").map((word) =>
      Array.from(word).map((char) => {
        const letter = { char, order };
        order += 1;
        return letter;
      })
    )
  );

  return { model, totalLetters: order };
}

function AnimatedLetter({ char, order, totalAnimatedLetters, progress }) {
  const sequenceStart = 0.07;
  const sequenceSpan = 0.62;
  const letterPhase = 0.28;
  const step = totalAnimatedLetters > 1 ? sequenceSpan / (totalAnimatedLetters - 1) : 0;

  const start = Math.min(sequenceStart + order * step, 0.94);
  const mid = Math.min(start + letterPhase * 0.5, 0.97);
  const end = Math.min(start + letterPhase, 1);

  const color = useTransform(progress, [start, mid, end], ["#555a62", "#8cff2e", "#ffffff"]);
  const opacity = useTransform(progress, [start, end], [0.5, 1]);
  const textShadow = useTransform(
    progress,
    [start, mid, end],
    ["0 0 0 rgba(140,255,46,0)", "0 0 10px rgba(140,255,46,0.2)", "0 0 0 rgba(255,255,255,0)"]
  );

  if (char === " ") {
    return <span className="inline-block w-[0.33em]" aria-hidden="true" />;
  }

  return (
    <motion.span
      className="inline-block break-normal will-change-[color,opacity,text-shadow]"
      style={{ color, opacity, textShadow }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
}

function ScrollLetterTransitionSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.34,
  });

  const { model: letterModel, totalLetters } = useMemo(() => buildLetterModel(letterSequenceLines), []);

  return (
    <section
      ref={sectionRef}
      id="letter-sequence"
      data-header-tone="dark"
      className="relative h-[180vh] border-b border-white/10 bg-[#0d0d0d] text-white"
    >
      <div className="sticky top-[84px] flex h-[calc(100vh-84px)] items-center md:top-[96px] md:h-[calc(100vh-96px)]">
        <div className="section-shell">
          <div className="mx-auto w-full text-center">
            <h2
              aria-label={letterSequenceLines.join(" ")}
              className="mx-auto max-w-full break-normal text-center font-heading text-[clamp(2.2rem,5.7vw,5.6rem)] font-medium leading-[1.03] tracking-[-0.042em] [width:max-content]"
              style={{ wordBreak: "normal", overflowWrap: "normal", whiteSpace: "normal" }}
            >
              {prefersReducedMotion ? (
                letterSequenceLines.map((line, lineIndex) => (
                  <span key={`reduced-${lineIndex}`} className="mx-auto mb-[0.08em] block max-w-full text-white [width:max-content]">
                    {line}
                  </span>
                ))
              ) : (
                letterModel.map((lineWords, lineIndex) => (
                  <span key={lineIndex} className="mx-auto mb-[0.08em] block max-w-full text-center [width:max-content]">
                    {lineWords.map((wordLetters, wordIndex) => (
                      <span
                        key={`${lineIndex}-${wordIndex}`}
                        className="inline-block whitespace-nowrap align-baseline"
                        style={{ wordBreak: "normal", overflowWrap: "normal", whiteSpace: "nowrap" }}
                      >
                        {wordLetters.map(({ char, order }) => (
                          <AnimatedLetter
                            key={`${lineIndex}-${wordIndex}-${char}-${order}`}
                            char={char}
                            order={order}
                            totalAnimatedLetters={totalLetters}
                            progress={smoothProgress}
                          />
                        ))}
                        {wordIndex < lineWords.length - 1 ? (
                          <span className="inline-block w-[0.34em]" aria-hidden="true" />
                        ) : null}
                      </span>
                    ))}
                  </span>
                ))
              )}
            </h2>

            <p className="mx-auto mt-10 max-w-[68ch] text-[clamp(1rem,1.15vw,1.16rem)] leading-[1.72] text-[#9fa4af]">
              Lead UI/UX Designer blending strategy, prompt engineering, and AI-assisted implementation to move from
              concept to production faster — without compromising system integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerStrip({ items, tone = "dark", accentTop = false }) {
  const repeated = [...items, ...items];
  const borderClasses = accentTop
    ? "border-b border-t border-b-white/10 border-t-[#8cff2e]/70"
    : "border-y border-white/10";

  return (
    <div
      className={`ticker-strip ${borderClasses} bg-[#121417]`}
      data-header-tone={tone}
    >
      <div className="ticker-track">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="ticker-item">
            <span className="ticker-star" aria-hidden="true">
              ✶
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RotatingAwardBadge() {
  const prefersReducedMotion = useReducedMotion();
  const badgeText = "CLIENT SATISFACTION AWARD 2024 — CODEBLAZE ✶ ";

  return (
    <motion.div
      className="relative h-[266px] w-[266px] md:h-[352px] md:w-[352px]"
      animate={prefersReducedMotion ? undefined : { rotate: 360 }}
      transition={prefersReducedMotion ? undefined : { duration: 9.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <svg viewBox="0 0 320 320" className="h-full w-full" role="img" aria-label="Client Satisfaction Award 2024 badge">
        <defs>
          <path
            id="recognition-circle-path"
            d="M 160,160 m -126,0 a 126,126 0 1,1 252,0 a 126,126 0 1,1 -252,0"
          />
        </defs>

        <circle cx="160" cy="160" r="126" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.2" />
        <circle cx="160" cy="160" r="98" fill="none" stroke="rgba(140,255,46,0.26)" strokeWidth="1.05" />

        <text fill="#8cff2e" fontSize="14.2" fontWeight="600" letterSpacing="3.1">
          <textPath href="#recognition-circle-path" startOffset="0%">
            {badgeText.repeat(4)}
          </textPath>
        </text>

        <g fill="none" strokeLinecap="round" aria-hidden="true">
          <path d="M 98 164 H 222" stroke="rgba(255,255,255,0.34)" strokeWidth="1.4" />
          <path d="M 114 143 H 206" stroke="rgba(140,255,46,0.7)" strokeWidth="1.1" />
          <path d="M 136 186 H 184" stroke="rgba(255,255,255,0.24)" strokeWidth="1.1" />
          <circle cx="106" cy="164" r="3.8" fill="#8cff2e" />
          <circle cx="214" cy="164" r="3.8" fill="#8cff2e" />
          <circle cx="160" cy="143" r="3" fill="rgba(255,255,255,0.9)" />
        </g>
      </svg>
    </motion.div>
  );
}

function RecognitionAwardPhoto() {
  const frameRef = useRef(null);
  const rafRef = useRef(null);
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });
  const targetRef = useRef({ x: 0, y: 0, opacity: 0 });
  const [canTrackPointer, setCanTrackPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanTrackPointer(mediaQuery.matches);
    updateCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateCapability);
      return () => mediaQuery.removeEventListener("change", updateCapability);
    }

    mediaQuery.addListener(updateCapability);
    return () => mediaQuery.removeListener(updateCapability);
  }, []);

  const stopAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = () => {
    const frame = frameRef.current;
    if (!frame) {
      stopAnimation();
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    current.opacity += (target.opacity - current.opacity) * 0.16;

    const halfWidth = frame.clientWidth * 0.5;
    const halfHeight = frame.clientHeight * 0.5;
    const angle = Math.atan2(current.y - halfHeight, current.x - halfWidth) * (180 / Math.PI);

    frame.style.setProperty("--photo-edge-x", `${current.x.toFixed(2)}px`);
    frame.style.setProperty("--photo-edge-y", `${current.y.toFixed(2)}px`);
    frame.style.setProperty("--photo-edge-opacity", `${current.opacity.toFixed(3)}`);
    frame.style.setProperty("--photo-edge-angle", `${angle.toFixed(2)}deg`);

    const settled =
      Math.abs(target.x - current.x) < 0.45 &&
      Math.abs(target.y - current.y) < 0.45 &&
      Math.abs(target.opacity - current.opacity) < 0.02;

    if (settled) {
      stopAnimation();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const ensureAnimation = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const updatePointerTarget = (event) => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    targetRef.current.x = event.clientX - bounds.left;
    targetRef.current.y = event.clientY - bounds.top;
    targetRef.current.opacity = 1;
    ensureAnimation();
  };

  const handlePointerEnter = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerMove = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerLeave = () => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    targetRef.current.opacity = 0;
    ensureAnimation();
  };

  useEffect(() => stopAnimation, []);

  return (
    <figure
      ref={frameRef}
      className={`recognition-photo-frame group relative aspect-[4/5] rounded-[22px] bg-[#121212] shadow-[0_24px_46px_rgba(0,0,0,0.32)] ${
        !canTrackPointer || prefersReducedMotion ? "recognition-photo-frame-static" : ""
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="recognition-photo-media relative h-full w-full overflow-hidden rounded-[22px]">
        <img
          src="/images/recognition-award.jpeg"
          alt="Mohit Mane receiving the Client Satisfaction Award at CodeBlaze"
          loading="lazy"
          className="h-full w-full object-cover object-[52%_50%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:scale(1.12)] group-hover:[transform:scale(1.14)]"
        />
        <div className="recognition-photo-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="recognition-photo-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      </div>
    </figure>
  );
}

function RecognitionSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const badgeParallaxY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={sectionRef}
      id="recognition"
      data-header-tone="dark"
      className="relative overflow-hidden border-b border-white/10 bg-[#0d0d0d] text-white"
    >
      <div className="section-shell relative py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-14 lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)] lg:items-center"
        >
          <div className="max-w-[700px]">
            <p className="text-[0.82rem] uppercase tracking-[0.14em] text-[#8cff2e]">{`{ Recognition }`}</p>

            <h2 className="mt-5 font-heading text-[clamp(2.3rem,5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.045em]">
              Client Satisfaction Award 2024 <span className="text-white/64">— CodeBlaze</span>
            </h2>

            <p className="mt-8 max-w-[58ch] text-[clamp(1.05rem,1.4vw,1.32rem)] leading-[1.62] text-white/88">
              Led end-to-end product design across enterprise platforms, driving a 68% increase in customer satisfaction
              through system-level UX improvements and cross-functional alignment.
            </p>

            <p className="mt-6 max-w-[60ch] text-[1rem] leading-[1.7] text-white/58">
              Recognition earned through measurable impact, scalable systems, and execution excellence.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:justify-self-end">
            <motion.div style={prefersReducedMotion ? undefined : { y: photoParallaxY }}>
              <RecognitionAwardPhoto />
            </motion.div>

            <motion.div
              className="relative z-10 mx-auto -mt-24 flex w-fit justify-center md:-mt-28 lg:absolute lg:-bottom-24 lg:-left-24 lg:mt-0"
              style={prefersReducedMotion ? undefined : { y: badgeParallaxY }}
            >
              <div
                className="pointer-events-none absolute inset-6 rounded-full border border-[#8cff2e]/12"
                aria-hidden="true"
              />
              <RotatingAwardBadge />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingMockup({ item, progress, prefersReducedMotion }) {
  const y = useTransform(progress, [0, 1], [item.start, item.start - item.travel]);
  const x = useTransform(progress, [0, 1], [0, item.driftX || 0]);
  const ySmooth = useSpring(y, { stiffness: 92, damping: 24, mass: 0.42 });
  const xSmooth = useSpring(x, { stiffness: 92, damping: 24, mass: 0.42 });
  const opacity = useTransform(progress, [0, 0.12, 0.88, 1], [0.38, item.opacity ?? 0.9, item.opacity ?? 0.9, 0.28]);
  const scale = useTransform(progress, [0, 1], [0.985, 1.018]);
  const rotate = useTransform(progress, [0, 1], [item.driftX ? item.driftX * -0.12 : 0.6, item.driftX ? item.driftX * 0.12 : -0.6]);
  const blur = item.kind === "mobile" ? "blur-[0.2px]" : "";
  const aspectClass =
    item.kind === "mobile" ? "aspect-[9/19] rounded-[20px] md:rounded-[24px]" : "aspect-[16/10] rounded-[20px] md:rounded-[24px]";
  const mobileVisibilityClass = item.mobileHidden ? "hidden md:block" : "";

  return (
    <motion.div
      className={`pointer-events-none absolute overflow-hidden shadow-[0_26px_56px_rgba(0,0,0,0.5)] ${aspectClass} ${blur} ${mobileVisibilityClass} ${item.className}`}
      style={prefersReducedMotion ? undefined : { y: ySmooth, x: xSmooth, opacity, scale, rotate }}
      aria-hidden="true"
    >
      <div className={`h-full w-full bg-gradient-to-br ${item.gradient}`} />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 16%, rgba(140,255,46,0.18), transparent 36%), radial-gradient(circle at 78% 82%, rgba(88,152,255,0.18), transparent 44%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-22"
        style={{
          backgroundImage: "linear-gradient(112deg, rgba(255,255,255,0.15), transparent 38%)",
        }}
      />
    </motion.div>
  );
}

function CenterLockedShowcaseSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [sceneVisible, setSceneVisible] = useState(false);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 86, damping: 24, mass: 0.44 });
  const sceneOpacity = useTransform(smoothProgress, [0, 0.06, 0.94, 1], [0.55, 1, 1, 0.84]);

  return (
    <section
      ref={sectionRef}
      id="center-showcase"
      data-header-tone="dark"
      className="relative h-[230vh] overflow-hidden border-b border-white/10 bg-[#0d0d0d] text-white md:h-[240vh]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-46"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(140,255,46,0.08), transparent 42%), linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "auto, 320px 320px, 320px 320px",
          backgroundPosition: "0 0, -1px -1px, -1px -1px",
        }}
      />

      <motion.div
        className="sticky top-[84px] flex h-[calc(100vh-84px)] items-center justify-center overflow-hidden md:top-[96px] md:h-[calc(100vh-96px)]"
        style={prefersReducedMotion ? undefined : { opacity: sceneOpacity }}
      >
        <div className="relative h-full w-full">
          {floatingMockups.map((item) => (
            <FloatingMockup key={item.id} item={item} progress={smoothProgress} prefersReducedMotion={prefersReducedMotion || !sceneVisible} />
          ))}

          <motion.div className="relative z-10 mx-auto flex h-full max-w-[760px] flex-col items-center justify-center px-5 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45 }}
              className="text-[0.8rem] uppercase tracking-[0.16em] text-[#8cff2e]"
            >
              {`{ Immersive Portfolio Layer }`}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.52, delay: 0.06 }}
              className="mt-6 max-w-[17ch] font-heading text-[clamp(2.3rem,6.2vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.052em] text-white"
            >
              Product decisions in motion, grounded in system thinking.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.48, delay: 0.13 }}
              className="mt-8 max-w-[58ch] text-[0.98rem] leading-[1.74] text-white/64 md:text-[1.02rem]"
            >
              As you scroll through this locked scene, mockups travel against scroll direction to reveal depth and rhythm.
              Replace each placeholder with your final desktop and mobile case-study visuals.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function getImmersiveLayerConfig(layer) {
  if (layer === "bg") {
    return { moveX: 30, moveY: 50, rotate: 0.4, cursorFactor: 0.32, opacity: 0.6, blur: "blur-[1.25px]" };
  }
  if (layer === "fg") {
    return { moveX: 80, moveY: 120, rotate: 1.05, cursorFactor: 1, opacity: 0.92, blur: "" };
  }
  return { moveX: 50, moveY: 80, rotate: 0.72, cursorFactor: 0.62, opacity: 0.78, blur: "" };
}

function resolveImmersiveZone(localX, localY, bounds) {
  const safeWidth = Math.max(bounds.width, 1);
  const safeHeight = Math.max(bounds.height, 1);
  const normalizedX = Math.min(Math.max(localX / safeWidth, 0), 0.9999);
  const normalizedY = Math.min(Math.max(localY / safeHeight, 0), 0.9999);
  const column = Math.min(2, Math.floor(normalizedX * 3));
  const row = Math.min(1, Math.floor(normalizedY * 2));
  return row * 3 + column;
}

function ImmersiveMockupContent({ item, kind }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#0b121b]">
      <img
        src={item.image}
        alt={`${item.title} dummy ${kind} mockup`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,15,0.18),rgba(7,10,15,0.42))]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 18%, ${item.accent}, transparent 40%)`,
        }}
      />
    </div>
  );
}

function ImmersiveCursorThumb({ item, kind }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[inherit] bg-[#0b1219]"
      style={{
        backgroundImage: `radial-gradient(circle at 18% 20%, ${item.accent}, transparent 42%), linear-gradient(160deg, rgba(9,13,20,0.98), rgba(8,11,17,0.96))`,
      }}
    >
      <img
        src={item.image}
        alt={`${item.title} dummy ${kind} mockup`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-[0.94]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,14,0.16),rgba(6,9,14,0.35))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.12),transparent_52%)]" />
    </div>
  );
}

function ImmersiveCursorTrailCard({ card }) {
  const layerConfig = getImmersiveLayerConfig(card.layer);
  const zIndex = card.layer === "fg" ? 14 : card.layer === "mid" ? 12 : 10;

  return (
    <motion.div
      className={`pointer-events-none absolute ${layerConfig.blur}`}
      style={{
        left: 0,
        top: 0,
        width: card.width,
        height: card.height,
        zIndex,
      }}
      initial={{
        x: card.x,
        y: card.y,
        opacity: 0,
        scale: 0.97,
        rotate: card.rotate - 1.3,
      }}
      animate={{
        x: card.x,
        y: card.y,
        opacity: layerConfig.opacity,
        scale: 1,
        rotate: card.rotate,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
        transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      }}
      transition={{ duration: 0.17, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[12px] shadow-[0_18px_34px_rgba(0,0,0,0.44)]"
        style={{
          transform: `translate3d(calc(var(--immersive-cursor-x,0px) * ${layerConfig.cursorFactor * 0.12}), calc(var(--immersive-cursor-y,0px) * ${layerConfig.cursorFactor * 0.12}), 0)`,
          transition: "transform 120ms linear",
          willChange: "transform",
        }}
      >
        <ImmersiveCursorThumb item={card.item} kind={card.kind} />
      </div>
    </motion.div>
  );
}

function ImmersiveSlotCard({ slot, progress, activeZone, interactive, prefersReducedMotion }) {
  const layerConfig = getImmersiveLayerConfig(slot.layer);
  const dataset = slot.kind === "desktop" ? IMMERSIVE_DESKTOP_PLACEHOLDERS : IMMERSIVE_MOBILE_PLACEHOLDERS;
  const mappedIndex = interactive ? slot.zoneMap?.[activeZone] : slot.staticIndex;
  const safeIndex = Math.abs((mappedIndex ?? slot.staticIndex ?? 0) % dataset.length);
  const selected = dataset[safeIndex];
  const opacity = useTransform(
    progress,
    [slot.reveal?.[0] ?? 0, slot.reveal?.[1] ?? 0.2, 0.92, 1],
    [0, layerConfig.opacity, layerConfig.opacity, 0.18]
  );
  const shiftY = useTransform(progress, [0, 1], [slot.driftY ?? 60, (slot.driftY ?? 60) - layerConfig.moveY]);
  const shiftX = useTransform(progress, [0, 1], [slot.driftX ?? 0, (slot.driftX ?? 0) + layerConfig.moveX]);
  const rotate = useTransform(progress, [0, 1], [-layerConfig.rotate, layerConfig.rotate]);
  const smoothY = useSpring(shiftY, { stiffness: 95, damping: 25, mass: 0.44 });
  const smoothX = useSpring(shiftX, { stiffness: 95, damping: 25, mass: 0.44 });
  const smoothRotate = useSpring(rotate, { stiffness: 90, damping: 26, mass: 0.46 });
  const mobileVisibilityClass = slot.mobileHidden ? "hidden md:block" : "";
  const aspectClass =
    slot.kind === "mobile" ? "aspect-[9/19] rounded-[18px] md:rounded-[22px]" : "aspect-[16/10] rounded-[18px] md:rounded-[22px]";

  return (
    <motion.div
      className={`pointer-events-none absolute ${mobileVisibilityClass} ${slot.positionClass} ${aspectClass} ${layerConfig.blur}`}
      style={
        prefersReducedMotion
          ? { opacity: layerConfig.opacity }
          : { x: smoothX, y: smoothY, rotate: smoothRotate, opacity, willChange: "transform, opacity" }
      }
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[inherit] shadow-[0_20px_44px_rgba(0,0,0,0.42)]"
        style={{
          transform: `translate3d(calc(var(--immersive-cursor-x,0px) * ${layerConfig.cursorFactor}), calc(var(--immersive-cursor-y,0px) * ${layerConfig.cursorFactor}), 0)`,
          transition: "transform 140ms linear",
          willChange: "transform",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${slot.id}-${selected.id}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImmersiveMockupContent item={selected} kind={slot.kind} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PreFooterImmersiveSection() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const cursorRef = useRef(null);
  const boundsRef = useRef(null);
  const rafRef = useRef(null);
  const burstRef = useRef(0);
  const lastSpawnRef = useRef({ x: 0, y: 0, time: 0 });
  const trailTimeoutsRef = useRef(new Map());
  const currentRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0, opacity: 0 });
  const targetRef = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0, opacity: 0 });
  const [canTrackPointer, setCanTrackPointer] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [trailCards, setTrailCards] = useState([]);
  const [sectionActive, setSectionActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const desktopInteractive = canTrackPointer && !prefersReducedMotion;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanTrackPointer(mediaQuery.matches);
    updateCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateCapability);
      return () => mediaQuery.removeEventListener("change", updateCapability);
    }

    mediaQuery.addListener(updateCapability);
    return () => mediaQuery.removeListener(updateCapability);
  }, []);

  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionActive(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    observer.observe(sectionNode);
    return () => observer.disconnect();
  }, []);

  const updateBounds = () => {
    const sceneNode = sceneRef.current ?? sectionRef.current;
    if (!sceneNode) {
      return;
    }
    boundsRef.current = sceneNode.getBoundingClientRect();
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const handleResize = () => updateBounds();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stopAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = () => {
    const sectionNode = sectionRef.current;
    const cursorNode = cursorRef.current;
    if (!sectionNode || !cursorNode) {
      stopAnimation();
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;
    current.offsetX += (target.offsetX - current.offsetX) * 0.15;
    current.offsetY += (target.offsetY - current.offsetY) * 0.15;
    current.opacity += (target.opacity - current.opacity) * 0.17;

    sectionNode.style.setProperty("--immersive-cursor-x", `${current.offsetX.toFixed(2)}px`);
    sectionNode.style.setProperty("--immersive-cursor-y", `${current.offsetY.toFixed(2)}px`);
    cursorNode.style.transform = `translate3d(${(current.x - 8).toFixed(2)}px, ${(current.y - 8).toFixed(2)}px, 0)`;
    cursorNode.style.opacity = current.opacity.toFixed(3);

    const settled =
      Math.abs(target.x - current.x) < 0.35 &&
      Math.abs(target.y - current.y) < 0.35 &&
      Math.abs(target.offsetX - current.offsetX) < 0.2 &&
      Math.abs(target.offsetY - current.offsetY) < 0.2 &&
      Math.abs(target.opacity - current.opacity) < 0.02;

    if (settled) {
      stopAnimation();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const ensureAnimation = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const clearTrailTimeout = (id) => {
    const timer = trailTimeoutsRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      trailTimeoutsRef.current.delete(id);
    }
  };

  const clearAllTrailTimeouts = () => {
    trailTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
    trailTimeoutsRef.current.clear();
  };

  const removeTrailCard = (id) => {
    clearTrailTimeout(id);
    setTrailCards((current) => current.filter((card) => card.id !== id));
  };

  const scheduleTrailRemoval = (id, lifetime) => {
    clearTrailTimeout(id);
    const timer = setTimeout(() => removeTrailCard(id), lifetime);
    trailTimeoutsRef.current.set(id, timer);
  };

  const buildTrailCards = (localX, localY, zone) => {
    const bounds = boundsRef.current;
    if (!bounds) {
      return [];
    }

    const previousX = lastSpawnRef.current.x;
    const previousY = lastSpawnRef.current.y;
    const deltaX = localX - previousX;
    const deltaY = localY - previousY;
    const velocity = Math.hypot(deltaX, deltaY);
    const fallbackDirections = [
      { x: -0.82, y: -0.4 },
      { x: 0.82, y: -0.4 },
      { x: -0.9, y: 0 },
      { x: 0.9, y: 0 },
      { x: -0.82, y: 0.4 },
      { x: 0.82, y: 0.4 },
    ];
    const fallback = fallbackDirections[zone] ?? fallbackDirections[0];
    const normalizedX = velocity > 0.1 ? deltaX / velocity : fallback.x;
    const normalizedY = velocity > 0.1 ? deltaY / velocity : fallback.y;
    const orthogonalX = -normalizedY;
    const orthogonalY = normalizedX;

    const burstIndex = burstRef.current;
    const useDesktop = burstIndex % 2 === 0;
    const width = useDesktop ? clamp(bounds.width * 0.198, 225, 325) : clamp(bounds.width * 0.0825, 103, 143);
    const height = useDesktop ? width * 0.625 : width * 1.8;
    const baseDistance = clamp(velocity * 3.1, 142, 244);
    const lateralDirection = burstIndex % 4 < 2 ? 1 : -1;
    const lateralOffset = (useDesktop ? 30 : 46) * lateralDirection;
    const now = performance.now();
    const dataset = useDesktop ? IMMERSIVE_DESKTOP_PLACEHOLDERS : IMMERSIVE_MOBILE_PLACEHOLDERS;
    const media = dataset[Math.abs((zone * 2 + burstIndex + (useDesktop ? 0 : 1)) % dataset.length)];
    const x = clamp(localX - normalizedX * baseDistance + orthogonalX * lateralOffset - width / 2, 18, bounds.width - width - 18);
    const y = clamp(localY - normalizedY * baseDistance + orthogonalY * lateralOffset - height / 2, 18, bounds.height - height - 18);
    const directionalAngle = Math.atan2(normalizedY, normalizedX) * (180 / Math.PI);

    return [
      {
        id: `trail-${Math.round(now)}-${burstIndex}-${useDesktop ? "desktop" : "mobile"}`,
        x,
        y,
        width,
        height,
        rotate: clamp(directionalAngle * (useDesktop ? 0.08 : 0.055), -4.8, 4.8),
        item: media,
        kind: useDesktop ? "desktop" : "mobile",
        layer: useDesktop ? "mid" : "bg",
        createdAt: now,
      },
    ];
  };

  const spawnTrailBurst = (localX, localY, zone, forceSpawn = false) => {
    const now = performance.now();
    const elapsed = now - lastSpawnRef.current.time;
    const distance = Math.hypot(localX - lastSpawnRef.current.x, localY - lastSpawnRef.current.y);

    if (!forceSpawn && (elapsed < 88 || distance < 28)) {
      return;
    }

    const cards = buildTrailCards(localX, localY, zone);
    if (!cards.length) {
      return;
    }

    burstRef.current += 1;
    lastSpawnRef.current = { x: localX, y: localY, time: now };

    setTrailCards((current) => {
      const freshCards = current.filter((card) => now - card.createdAt < 1500);
      const acceptedCards = cards.filter((candidate) => hasTrailGap(candidate, freshCards, 18));
      if (!acceptedCards.length) {
        return freshCards.slice(-10);
      }
      return [...freshCards, ...acceptedCards].slice(-10);
    });

    cards.forEach((card, cardIndex) => {
      const lifetime = 980 + cardIndex * 140 + (card.layer === "bg" ? 120 : 20);
      scheduleTrailRemoval(card.id, lifetime);
    });
  };

  const updatePointerTarget = (event, { forceSpawn = false } = {}) => {
    const bounds = boundsRef.current;
    if (!bounds) {
      return;
    }

    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const normalizedX = localX / Math.max(bounds.width, 1) - 0.5;
    const normalizedY = localY / Math.max(bounds.height, 1) - 0.5;
    const zone = resolveImmersiveZone(localX, localY, bounds);

    targetRef.current.x = localX;
    targetRef.current.y = localY;
    targetRef.current.offsetX = normalizedX * 20;
    targetRef.current.offsetY = normalizedY * 20;
    targetRef.current.opacity = 1;
    ensureAnimation();

    spawnTrailBurst(localX, localY, zone, forceSpawn);
  };

  const handlePointerEnter = (event) => {
    if (!desktopInteractive || !sectionActive) {
      return;
    }
    updateBounds();
    setCursorVisible(true);
    updatePointerTarget(event, { forceSpawn: true });
  };

  const handlePointerMove = (event) => {
    if (!desktopInteractive || !sectionActive) {
      return;
    }
    if (!boundsRef.current) {
      updateBounds();
    }
    updatePointerTarget(event);
  };

  const handlePointerLeave = () => {
    if (!desktopInteractive) {
      return;
    }
    setCursorVisible(false);
    targetRef.current.opacity = 0;
    targetRef.current.offsetX = 0;
    targetRef.current.offsetY = 0;
    ensureAnimation();
  };

  useEffect(() => {
    if (desktopInteractive) {
      return undefined;
    }

    setTrailCards([]);
    clearAllTrailTimeouts();
    lastSpawnRef.current = { x: 0, y: 0, time: 0 };
    return undefined;
  }, [desktopInteractive]);

  useEffect(
    () => () => {
      stopAnimation();
      clearAllTrailTimeouts();
    },
    []
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 24,
    mass: 0.46,
  });
  const sceneOpacity = useTransform(smoothProgress, [0, 0.08, 0.92, 1], [0.58, 1, 1, 0.5]);

  return (
    <section
      ref={sectionRef}
      id="immersive-prefooter"
      data-header-tone="dark"
      className={`relative h-[88vh] overflow-hidden border-b border-white/10 bg-[#080a0f] text-white md:h-[90vh] ${
        desktopInteractive ? "cursor-none" : ""
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--immersive-cursor-x": "0px",
        "--immersive-cursor-y": "0px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(42% 70% at 10% 100%, rgba(140,255,46,0.3) 0%, rgba(140,255,46,0.06) 58%, rgba(140,255,46,0) 80%), radial-gradient(42% 70% at 50% 100%, rgba(140,255,46,0.38) 0%, rgba(140,255,46,0.1) 54%, rgba(140,255,46,0) 78%), radial-gradient(42% 70% at 90% 100%, rgba(140,255,46,0.3) 0%, rgba(140,255,46,0.06) 58%, rgba(140,255,46,0) 80%), linear-gradient(0deg, rgba(140,255,46,0.2) 0%, rgba(140,255,46,0.1) 24%, rgba(140,255,46,0) 58%), linear-gradient(180deg, rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
          backgroundSize: "auto, auto, auto, auto, 96px 96px, 96px 96px",
          backgroundPosition: "center, center, center, center, -1px -1px, -1px -1px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-screen"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(140,255,46,0.55) 0.55px, transparent 0.75px), radial-gradient(rgba(255,255,255,0.22) 0.45px, transparent 0.7px)",
          backgroundSize: "3px 3px, 4px 4px",
          backgroundPosition: "0 0, 1px 1px",
        }}
      />

      {desktopInteractive ? (
        <div
          ref={cursorRef}
          className="pointer-events-none absolute left-0 top-0 z-40 hidden h-4 w-4 rounded-full border border-[#8cff2e]/90 bg-[#8cff2e]/42 shadow-[0_0_0_1px_rgba(255,255,255,0.16)_inset,0_0_12px_rgba(140,255,46,0.4)] md:block"
          style={{ opacity: cursorVisible ? 1 : 0, transform: "translate3d(-9999px,-9999px,0)", willChange: "transform, opacity" }}
          aria-hidden="true"
        />
      ) : null}

      <motion.div
        ref={sceneRef}
        className="flex h-full items-center justify-center overflow-hidden"
        style={prefersReducedMotion ? undefined : { opacity: sceneOpacity }}
      >
        <div className="relative h-full w-full">
          {desktopInteractive ? (
            <AnimatePresence initial={false}>
              {trailCards.map((card) => (
                <ImmersiveCursorTrailCard key={card.id} card={card} />
              ))}
            </AnimatePresence>
          ) : (
            IMMERSIVE_SLOTS.map((slot) => (
              <ImmersiveSlotCard
                key={slot.id}
                slot={slot}
                progress={smoothProgress}
                activeZone={0}
                interactive={false}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))
          )}

          <motion.div className="absolute inset-0 z-20 grid place-items-center px-6 md:px-10">
            <motion.div className="-translate-y-[20%] w-max max-w-[92vw] justify-self-center text-center">
              <p className="text-[0.84rem] uppercase tracking-[0.22em] text-[#8cff2e]">[ Impact ]</p>
              <h3 className="mt-6 w-max max-w-[94vw] text-left font-heading text-[clamp(2.9rem,6.9vw,8.2rem)] font-medium leading-[1.04] tracking-[-0.014em] text-white">
                <span className="text-[#8cff2e] italic">Scalable</span> System
                <br />
                Drive <span className="text-[#8cff2e] italic">measurable</span>
                <br />
                <span className="text-white">business</span> <span className="text-[#8cff2e] italic">outcomes.</span>
              </h3>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, className = "" }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });
  const targetRef = useRef({ x: 0, y: 0, opacity: 0 });
  const [canTrackPointer, setCanTrackPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanTrackPointer(mediaQuery.matches);
    updateCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateCapability);
      return () => mediaQuery.removeEventListener("change", updateCapability);
    }

    mediaQuery.addListener(updateCapability);
    return () => mediaQuery.removeListener(updateCapability);
  }, []);

  const stopAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = () => {
    const card = cardRef.current;
    if (!card) {
      stopAnimation();
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    current.opacity += (target.opacity - current.opacity) * 0.14;

    card.style.setProperty("--glow-x", `${current.x.toFixed(2)}px`);
    card.style.setProperty("--glow-y", `${current.y.toFixed(2)}px`);
    card.style.setProperty("--glow-opacity", `${current.opacity.toFixed(3)}`);

    const settled =
      Math.abs(target.x - current.x) < 0.35 &&
      Math.abs(target.y - current.y) < 0.35 &&
      Math.abs(target.opacity - current.opacity) < 0.02;

    if (settled) {
      stopAnimation();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const ensureAnimation = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const updatePointerTarget = (event) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    targetRef.current.x = event.clientX - bounds.left;
    targetRef.current.y = event.clientY - bounds.top;
    targetRef.current.opacity = 1;
    ensureAnimation();
  };

  const handlePointerEnter = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerMove = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerLeave = () => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    targetRef.current.opacity = 0;
    ensureAnimation();
  };

  useEffect(() => stopAnimation, []);

  return (
    <motion.a
      ref={cardRef}
      href={project.link || `/projects#${project.id}`}
      target={project.link ? "_blank" : undefined}
      rel={project.link ? "noreferrer" : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative flex min-h-[420px] cursor-pointer flex-col justify-between overflow-hidden border border-white/10 bg-[#0a0d12] p-7 shadow-[0_8px_20px_rgba(4,8,16,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#8cff2e]/30 hover:shadow-[0_18px_40px_rgba(4,8,16,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8cff2e]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d12] md:min-h-[500px] ${className}`}
      whileHover={prefersReducedMotion ? { y: -2 } : { y: -2, scale: 1.02 }}
      transition={{ duration: 0.26, ease: "easeOut" }}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-opacity": "0",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-18%] transition-opacity duration-300 ease-out"
          style={{
            background: canTrackPointer
              ? "radial-gradient(460px circle at var(--glow-x) var(--glow-y), rgba(140,255,46,0.18), rgba(140,255,46,0.08) 33%, rgba(140,255,46,0.02) 56%, transparent 74%)"
              : "radial-gradient(360px circle at 50% 50%, rgba(140,255,46,0.14), rgba(140,255,46,0.05) 40%, transparent 72%)",
            opacity: canTrackPointer ? "var(--glow-opacity)" : "0.16",
            filter: "blur(18px)",
            willChange: "opacity, transform",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.84rem] font-medium tracking-[-0.02em] text-[#8cff2e]">{`{ ${project.category} }`}</p>
          <p className="text-[0.83rem] text-white/45">{projectDates[project.id] || "Now"}</p>
        </div>

        <h3 className="mt-5 max-w-[15ch] font-heading text-[clamp(2rem,3.4vw,3.05rem)] leading-[0.97] tracking-[-0.045em] text-white">
          {project.name}
        </h3>

        <p className="mt-4 max-w-[56ch] text-[0.96rem] leading-[1.6] text-white/52">{project.outcomeSnippet}</p>

        <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[0.82rem] leading-[1.55]">
          <p className="text-white/58">
            <span className="mr-2 inline-flex rounded-full border border-[#8cff2e]/35 px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-[0.11em] text-[#8cff2e]">
              Problem
            </span>
            {project.problemSnippet}
          </p>
          <p className="text-white/76">
            <span className="mr-2 inline-flex rounded-full border border-white/18 px-2 py-0.5 text-[0.64rem] font-semibold uppercase tracking-[0.11em] text-white/85">
              Outcome
            </span>
            {project.impact}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-7">
        <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[radial-gradient(circle_at_72%_22%,rgba(140,255,46,0.17),rgba(140,255,46,0.01)_46%),linear-gradient(160deg,#0d1220,#090c12)]">
          <div className="m-3 rounded-[10px] border border-white/10 bg-[#10141e] p-4">
            <div className="h-2 w-24 rounded-full bg-white/16" />
            <div className="mt-2 h-2 w-32 rounded-full bg-white/12" />
            <div className="mt-5 grid h-[160px] grid-cols-[1fr_1.2fr] gap-3 md:h-[182px]">
              <div className="rounded-lg border border-white/10 bg-[#0d1017]" />
              <div className="rounded-lg border border-white/10 bg-[#151b27]" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-[0.82rem] font-medium text-white/42">{project.tools.slice(0, 3).join(" · ")}</p>
      </div>
    </motion.a>
  );
}

function TestimonialCard({ item, index }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });
  const targetRef = useRef({ x: 0, y: 0, opacity: 0 });
  const [canTrackPointer, setCanTrackPointer] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanTrackPointer(mediaQuery.matches);
    updateCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateCapability);
      return () => mediaQuery.removeEventListener("change", updateCapability);
    }

    mediaQuery.addListener(updateCapability);
    return () => mediaQuery.removeListener(updateCapability);
  }, []);

  const stopAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const tick = () => {
    const card = cardRef.current;
    if (!card) {
      stopAnimation();
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    current.opacity += (target.opacity - current.opacity) * 0.14;

    card.style.setProperty("--glow-x", `${current.x.toFixed(2)}px`);
    card.style.setProperty("--glow-y", `${current.y.toFixed(2)}px`);
    card.style.setProperty("--glow-opacity", `${current.opacity.toFixed(3)}`);

    const settled =
      Math.abs(target.x - current.x) < 0.35 &&
      Math.abs(target.y - current.y) < 0.35 &&
      Math.abs(target.opacity - current.opacity) < 0.02;

    if (settled) {
      stopAnimation();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const ensureAnimation = () => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const updatePointerTarget = (event) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    targetRef.current.x = event.clientX - bounds.left;
    targetRef.current.y = event.clientY - bounds.top;
    targetRef.current.opacity = 1;
    ensureAnimation();
  };

  const handlePointerEnter = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerMove = (event) => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    updatePointerTarget(event);
  };

  const handlePointerLeave = () => {
    if (!canTrackPointer || prefersReducedMotion) {
      return;
    }
    targetRef.current.opacity = 0;
    ensureAnimation();
  };

  useEffect(() => stopAnimation, []);

  return (
    <motion.article
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative min-h-[420px] w-[82vw] max-w-[420px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f13] p-7 shadow-[0_8px_20px_rgba(4,8,16,0.22)] transition-[border-color,box-shadow] duration-300 hover:border-[#8cff2e]/30 hover:shadow-[0_18px_40px_rgba(4,8,16,0.42)] md:w-auto md:max-w-none"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={prefersReducedMotion ? { y: -2 } : { y: -2, scale: 1.01 }}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-opacity": "0",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-[-18%] transition-opacity duration-300 ease-out"
          style={{
            background: canTrackPointer
              ? "radial-gradient(460px circle at var(--glow-x) var(--glow-y), rgba(140,255,46,0.18), rgba(140,255,46,0.08) 33%, rgba(140,255,46,0.02) 56%, transparent 74%)"
              : "radial-gradient(360px circle at 50% 50%, rgba(140,255,46,0.14), rgba(140,255,46,0.05) 40%, transparent 72%)",
            opacity: canTrackPointer ? "var(--glow-opacity)" : "0.16",
            filter: "blur(18px)",
            willChange: "opacity, transform",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-10 opacity-25"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
        aria-hidden="true"
      />

      <p className="relative z-10 text-sm font-medium text-white/74">{item.rating}</p>
      <p className="relative z-10 mt-5 text-[1.04rem] leading-[1.68] text-white/88">{item.quote}</p>

      <div className="relative z-10 mt-9 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold text-white/85">
          {item.author
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div>
          <p className="text-base text-white">{item.author}</p>
          <p className="text-sm text-white/45">{item.source}</p>
        </div>
      </div>
    </motion.article>
  );
}

function SocialLinkCard({ item, highlighted = false, onOpenModal }) {
  if (highlighted) {
    return (
      <motion.button
        type="button"
        onClick={onOpenModal}
        className="group flex min-h-[180px] flex-col justify-between rounded-2xl bg-[#8cff2e] p-7 text-[#0d0f13]"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.22 }}
      >
        <span className="text-[2.2rem] leading-none">↳</span>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[2.05rem] font-semibold tracking-[-0.03em]">Get in touch</span>
          <span className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em]">
            Open
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      className="group flex min-h-[180px] items-end justify-between rounded-2xl border border-[#dfe0e5] bg-[#f7f7f9] p-7"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
    >
      <span className="text-[2.05rem] font-medium tracking-[-0.03em] text-[#2f2f2f]">{item.label}</span>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#8cff2e] text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[#111] transition-transform duration-300 group-hover:scale-105">
        {item.short}
      </span>
    </motion.a>
  );
}

function RecruiterSnapshotSection() {
  return (
    <section id="recruiter-snapshot" data-header-tone="light" className="relative border-b border-[#e1e2e6] bg-[#f6f6f8]">
      <div className="section-shell py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 xl:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] xl:items-end"
        >
          <div>
            <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#5f636c]">[ Recruiter Snapshot ]</p>
            <h2 className="mt-4 max-w-[13ch] font-heading text-[clamp(2.25rem,5.6vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.048em] text-[#2f3137]">
              Leadership proof in under 30 seconds.
            </h2>
            <p className="mt-5 max-w-[64ch] text-[1rem] leading-[1.7] text-[#61636b]">
              Product design leader driving measurable results across enterprise, travel, SaaS, fintech, and healthcare.
              Strategy, systems, and execution aligned to business outcomes.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {recruiterQuickFacts.map((fact) => (
              <motion.article
                key={fact.label}
                whileHover={{ y: -2, borderColor: "rgba(140,255,46,0.45)" }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="rounded-2xl border border-[#d9dce3] bg-white/65 p-4 md:p-5"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[#70747d]">{fact.label}</p>
                <p className="mt-2 text-[1rem] font-medium tracking-[-0.015em] text-[#2f3137]">{fact.value}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -2, borderColor: "rgba(140,255,46,0.42)" }}
              className="rounded-2xl border border-[#d9dce3] bg-[#f8f8fb] p-5 transition-colors duration-200"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6d727b]">{metric.label}</p>
              <p className="mt-3 font-heading text-[2.15rem] leading-none tracking-[-0.045em] text-[#2d3036]">
                {metric.prefix}
                {metric.value}
                {metric.suffix}
              </p>
              <p className="mt-3 text-[0.9rem] leading-[1.55] text-[#5e626b]">{metric.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipTimelineSection() {
  return (
    <section id="leadership" data-header-tone="dark" className="relative border-b border-white/10 bg-[#080b0f] text-white">
      <div className="section-shell py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.48 }}
          className="max-w-[820px]"
        >
          <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#8cff2e]">[ Leadership Through Execution ]</p>
          <h2 className="mt-4 max-w-[14ch] font-heading text-[clamp(2.4rem,5.8vw,5.2rem)] font-medium leading-[0.93] tracking-[-0.05em]">
            Built and scaled product outcomes across roles.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-[1.72] text-white/62">
            A clear progression from UX execution to system-level leadership with measurable business impact.
          </p>
        </motion.div>

        <div className="relative mt-12 md:mt-14">
          <div className="absolute bottom-0 left-[0.62rem] top-0 w-px bg-white/12 md:left-[0.72rem]" />
          <div className="space-y-8 md:space-y-10">
            {experienceTimeline.map((item, index) => {
              const highlights = getExperienceHighlights(item);
              return (
                <motion.article
                  key={`${item.company}-${item.duration}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="relative pl-7 md:pl-12"
                >
                  <span className="absolute left-[0.62rem] top-6 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[#8cff2e]/70 bg-[#0b1118] shadow-[0_0_0_4px_rgba(8,11,15,0.9)] md:left-[0.72rem]" />
                  <motion.div
                    whileHover={{ y: -2, borderColor: "rgba(140,255,46,0.38)" }}
                    transition={{ duration: 0.22 }}
                    className="rounded-2xl border border-white/12 bg-[#0d1219] p-6 md:p-7"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-heading text-[clamp(1.7rem,2.7vw,2.35rem)] leading-[0.95] tracking-[-0.035em] text-white">
                          {item.company}
                        </h3>
                        <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.13em] text-[#8cff2e]">{item.role}</p>
                      </div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-white/44">{item.duration}</p>
                    </div>

                    <p className="mt-4 max-w-[64ch] text-[0.97rem] leading-[1.68] text-white/68">{item.summary}</p>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {highlights.map((point) => (
                        <p key={point} className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[0.88rem] leading-[1.55] text-white/78">
                          {point}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesDomainSection() {
  return (
    <section id="capabilities" data-header-tone="light" className="relative border-b border-[#e1e2e6] bg-[#f6f6f8]">
      <div className="section-shell py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.46 }}
          className="max-w-[860px]"
        >
          <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#666a73]">[ Capability & Domain Matrix ]</p>
          <h2 className="mt-4 max-w-[14ch] font-heading text-[clamp(2.3rem,5.2vw,4.9rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#2f3137]">
            Strategy depth with cross-domain delivery maturity.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="grid gap-4 md:grid-cols-2">
            {skillClusters.map((cluster, index) => (
              <motion.article
                key={cluster.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38, delay: index * 0.04 }}
                whileHover={{ y: -2, borderColor: "rgba(140,255,46,0.45)" }}
                className="rounded-2xl border border-[#dadee6] bg-white/70 p-5 transition-colors duration-200"
              >
                <h3 className="font-heading text-[1.5rem] leading-[1.05] tracking-[-0.03em] text-[#2f3137]">{cluster.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-[1.6] text-[#61646c]">{cluster.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cluster.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#d7dce5] bg-[#f7f8fb] px-2.5 py-1 text-[0.67rem] font-semibold uppercase tracking-[0.11em] text-[#636872]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.46, delay: 0.08 }}
            className="space-y-4"
          >
            <article className="rounded-2xl border border-[#dadee6] bg-white/70 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#68707a]">Domain Coverage</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {domainExpertise.map((domain) => (
                  <span key={domain} className="rounded-full border border-[#d8dde6] bg-[#f7f8fb] px-3 py-1.5 text-[0.72rem] font-semibold text-[#4f5561]">
                    {domain}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-[#dadee6] bg-white/70 p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#68707a]">Execution Model</p>
              <ul className="mt-4 space-y-2 text-[0.9rem] leading-[1.55] text-[#5a5f69]">
                <li>Problem framing with stakeholders and product owners</li>
                <li>Systems-first design and component governance</li>
                <li>QA-aligned handoff with measurable acceptance criteria</li>
              </ul>
            </article>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section id="credentials" data-header-tone="dark" className="relative border-b border-white/10 bg-[#080b0f] text-white">
      <div className="section-shell py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.44 }}
          className="max-w-[760px]"
        >
          <p className="text-[0.8rem] uppercase tracking-[0.14em] text-[#8cff2e]">[ Credentials ]</p>
          <h2 className="mt-4 max-w-[15ch] font-heading text-[clamp(2.1rem,4.8vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.046em]">
            Trusted by outcomes, backed by continuous learning.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <motion.article whileHover={{ y: -2 }} transition={{ duration: 0.22 }} className="rounded-2xl border border-white/14 bg-white/[0.03] p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#8cff2e]">Education</p>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] leading-[1.58] text-white/76">
              {education.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article whileHover={{ y: -2 }} transition={{ duration: 0.22 }} className="rounded-2xl border border-white/14 bg-white/[0.03] p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#8cff2e]">Certifications</p>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] leading-[1.58] text-white/76">
              {certifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>

          <motion.article whileHover={{ y: -2 }} transition={{ duration: 0.22 }} className="rounded-2xl border border-white/14 bg-white/[0.03] p-5">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.13em] text-[#8cff2e]">Proof Points</p>
            <ul className="mt-4 space-y-2.5 text-[0.92rem] leading-[1.58] text-white/76">
              <li>Client Satisfaction Award 2024 at CodeBlaze</li>
              <li>+68% customer satisfaction lift on SaaS redesign</li>
              <li>+18% booking conversion for Sterling Resorts</li>
              <li>Reduced repetitive design effort by up to 40%</li>
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function HiringCtaSection() {
  return (
    <section id="hiring" data-header-tone="dark" className="relative border-b border-white/10 bg-[#080b0f] text-white">
      <div className="section-shell py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="rounded-[28px] border border-white/12 bg-[radial-gradient(circle_at_20%_20%,rgba(140,255,46,0.12),transparent_45%),#0d1218] px-6 py-8 md:px-10 md:py-10"
        >
          <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#8cff2e]">[ Hiring CTA ]</p>
          <h2 className="mt-4 max-w-[13ch] font-heading text-[clamp(2.2rem,5.2vw,4.7rem)] font-medium leading-[0.93] tracking-[-0.05em]">
            Open to Lead UI/UX and product design leadership roles.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[1rem] leading-[1.72] text-white/64">
            If you’re hiring for strategic product design leadership with strong execution and systems thinking, let’s talk.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <motion.a
              href={`tel:${contactPhone}`}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#8cff2e] px-5 py-2.5 text-[0.95rem] font-semibold text-[#10131a] shadow-[0_14px_30px_rgba(140,255,46,0.24)]"
            >
              Schedule a call
            </motion.a>
            <motion.a
              href={gmailComposeUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 py-2.5 text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-white/12"
            >
              Email me
            </motion.a>
            <motion.a
              href={resumeDownloadUrl}
              download="Mohit_Mane_UIUX.pdf"
              whileHover={{ y: -2 }}
              className="inline-flex items-center justify-center rounded-full border border-white/16 bg-transparent px-5 py-2.5 text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-white/8"
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.42]);

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactModalOpen]);

  return (
    <main className="bg-[#f3f3f5] text-[#2f2f2f]">
      <section
        ref={heroRef}
        id="summary"
        data-header-tone="light"
        className="relative flex min-h-screen flex-col overflow-hidden border-b border-[#e1e2e6] bg-[#f6f6f8] pt-24 md:pt-28"
      >
        <HeroFluidRippleLayer targetRef={heroRef} />

        <div className="section-shell relative z-10 flex flex-1 flex-col justify-center pb-4 md:pb-6">
          <motion.div className="relative" style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              variants={heroMotion}
              initial="hidden"
              animate="visible"
              custom={0.05}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-[#d7dbe2] bg-[#f3f4f7] px-6 py-3 text-[0.98rem] font-medium text-[#3a3e46] transition-colors duration-200 hover:bg-white hover:text-[#111]"
              >
                LinkedIn
              </a>

              <motion.a
                href={resumeDownloadUrl}
                download="Mohit_Mane_UIUX.pdf"
                className="group inline-flex items-center gap-2 rounded-full bg-[#8cff2e] px-6 py-3 text-[0.98rem] font-semibold text-[#111] shadow-[0_10px_26px_rgba(120,255,35,0.28)] transition-colors duration-200 hover:bg-[#79f124]"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Download Resume</span>
                <span className="transition-transform duration-250 group-hover:translate-y-[1px] group-hover:translate-x-[2px]">↓</span>
              </motion.a>
            </motion.div>

            <motion.div variants={heroMotion} initial="hidden" animate="visible" custom={0.14} className="pt-16 md:pt-20">
              <h1 className="max-w-[13ch] font-heading text-[clamp(3.4rem,8.9vw,7.85rem)] font-medium leading-[1.02] tracking-[-0.057em] text-[#303238]">
                Hi! I'm Mohit Mane
              </h1>
              <h2 className="mt-2 max-w-[14ch] font-heading text-[clamp(2.5rem,7.3vw,6.35rem)] font-medium leading-[1.04] tracking-[-0.05em] text-[#b2b3ba]">
                a Lead UI/UX Designer
              </h2>
            </motion.div>

            <motion.p
              variants={heroMotion}
              initial="hidden"
              animate="visible"
              custom={0.24}
              className="mt-12 max-w-[58ch] text-[1.02rem] leading-[1.72] text-[#64656c]"
            >
              I design system-led product experiences across enterprise, travel, SaaS, fintech, and healthcare. I align
              stakeholders, design teams, and engineers to ship measurable outcomes.
            </motion.p>
          </motion.div>
        </div>

        <TickerStrip items={tickerItems} tone="dark" accentTop />
      </section>

      <RecruiterSnapshotSection />

      <RecognitionSection />

      <ScrollLetterTransitionSection />

      <section id="projects" data-header-tone="dark" className="relative overflow-hidden border-b border-white/10 bg-[#080b0f] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 92% 24%, rgba(255,255,255,0.07), transparent 48%), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "auto, 350px 350px, 350px 350px",
            backgroundPosition: "0 0, -1px -1px, -1px -1px",
          }}
        />

        <div className="section-shell relative z-10 pb-20 pt-14 md:pb-24 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.52, ease: "easeOut" }}
            className="max-w-[24ch] text-left"
          >
            <p className="text-[0.82rem] uppercase tracking-[0.14em] text-[#8cff2e]">{`{ Selected Work }`}</p>
            <h2 className="mt-5 font-heading text-[clamp(2.8rem,6.8vw,5.9rem)] font-medium leading-[0.94] tracking-[-0.05em]">
              <span className="block md:whitespace-nowrap">Product design with</span>
              <span className="block md:whitespace-nowrap">measurable business impact</span>
            </h2>
          </motion.div>

          <div className="h-8 md:h-12" />

          <div className="grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
            <ProjectCard project={featuredProjects[0]} />
            <ProjectCard project={featuredProjects[1]} />

            <motion.a
              href="/projects"
              className="group flex min-h-[420px] items-center justify-center bg-[#8cff2e] p-10 text-[#0d0f13] md:min-h-[500px]"
              whileHover={{ scale: 1.008 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <span className="font-heading text-[2.12rem] leading-none tracking-[-0.04em]">View all projects</span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2228] text-2xl text-white">
                  ↗
                </span>
              </div>
            </motion.a>

            <ProjectCard project={featuredProjects[2]} />
            <ProjectCard project={featuredProjects[3]} />

            <motion.article
              className="flex min-h-[420px] flex-col justify-between bg-[#0a0d12] p-7 md:min-h-[500px]"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.22 }}
            >
              <div>
                <p className="text-[0.84rem] font-medium tracking-[-0.02em] text-[#8cff2e]">{`{ Leadership Through Execution }`}</p>
                <h3 className="mt-5 max-w-[15ch] font-heading text-[clamp(2rem,3.4vw,3.05rem)] leading-[0.97] tracking-[-0.045em] text-white">
                  Strategy, systems, and delivery at scale
                </h3>
              </div>

              <ul className="space-y-3 text-[0.95rem] leading-[1.5] text-white/62">
                <li>+68% customer satisfaction lift</li>
                <li>+18% booking conversion improvement</li>
                <li>Scalable design systems across enterprise products</li>
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      <LeadershipTimelineSection />

      <CapabilitiesDomainSection />

      <CredentialsSection />

      <section
        id="testimonials"
        data-header-tone="dark"
        className="flex min-h-screen items-center border-b border-white/10 bg-[#080b0f] py-20 text-white md:py-24"
      >
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex w-full flex-col items-center text-center"
          >
            <p className="text-[0.8rem] uppercase tracking-[0.14em] text-[#8cff2e]">[ Testimonials ]</p>
            <h2
              className="mx-auto mt-5 max-w-full text-center font-heading text-[clamp(3rem,7vw,6.1rem)] font-medium leading-[0.93] tracking-[-0.052em] [width:max-content]"
            >
              Don’t take my word for it <span className="text-[#8cff2e]">✶</span>
            </h2>
            <p className="mt-5 text-base text-white/58">
              <span className="text-[#8cff2e]">✶</span> Take theirs
            </p>
          </motion.div>

          <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {testimonials.map((item, index) => (
              <TestimonialCard key={item.author} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <HiringCtaSection />

      <section id="about-contact" data-header-tone="light" className="relative overflow-hidden bg-[#f3f3f5] py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-56"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,17,17,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.045) 1px, transparent 1px)",
            backgroundSize: "300px 300px, 300px 300px",
            backgroundPosition: "-1px -1px, -1px -1px",
          }}
        />

        <div className="section-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl"
          >
            <p className="text-[0.8rem] uppercase tracking-[0.14em] text-[#65666d]">[ About & Contact ]</p>
            <h2 className="mt-4 max-w-[11.8ch] font-heading text-[clamp(2.7rem,6.2vw,6rem)] font-medium leading-[0.92] tracking-[-0.052em] text-[#2f3137]">
              Let’s build meaningful products with systems-level clarity
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {socialCards.map((item) => (
              <SocialLinkCard key={item.label} item={item} />
            ))}
            <SocialLinkCard highlighted item={{ href: "#" }} onOpenModal={() => setIsContactModalOpen(true)} />
          </div>
        </div>
      </section>

      <TickerStrip items={tickerItems} tone="dark" />

      <section data-header-tone="dark" className="border-b border-white/10 bg-[#080b0f] py-6 text-white/78">
        <div className="section-shell flex items-center justify-between gap-4 text-[0.95rem]">
          <p className="inline-flex items-center gap-2 text-white/82">
            <span className="h-2.5 w-2.5 rounded-full bg-[#8cff2e]" />
            Available for leadership roles
          </p>

          <a href="#summary" className="inline-flex items-center gap-2 text-white/58 transition-colors duration-200 hover:text-white">
            Back to top
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f1114]">↑</span>
          </a>
        </div>
      </section>

      <footer data-header-tone="dark" className="relative overflow-hidden bg-[#080b0f] py-16 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-28"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0% 0%, transparent 62%, rgba(255,255,255,0.09) 63%, transparent 64%), radial-gradient(circle at 52% 0%, transparent 62%, rgba(255,255,255,0.09) 63%, transparent 64%)",
            backgroundSize: "540px 540px, 540px 540px",
            backgroundPosition: "0 -270px, 270px -270px",
          }}
        />

        <div className="section-shell relative z-10 flex flex-col gap-6 text-sm text-white/56 md:flex-row md:items-center md:justify-between">
          <p className="font-logo text-[1.88rem] tracking-[-0.03em] text-white">
            Mohit<span className="text-[#8cff2e]">-M.</span>
          </p>

          <p>Copyright © Product Design & UX Systems, {new Date().getFullYear()}</p>

          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-white/72 transition-colors duration-200 hover:text-white">
            Created by {profile.name}
          </a>
        </div>
      </footer>

      <AnimatePresence>
        {isContactModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[140] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Close contact modal"
              className="absolute inset-0 bg-[#05070d]/74 backdrop-blur-[9px]"
              onClick={() => setIsContactModalOpen(false)}
            />

            <motion.div
              className="contact-modal-rainbow relative z-10 w-full max-w-[820px] rounded-[32px] p-[4px]"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#0b0f15] p-6 text-white md:p-8">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/6 text-lg text-white/84 transition-colors duration-200 hover:bg-white/12"
                  aria-label="Close modal"
                >
                  ×
                </button>

                <div className="grid items-center gap-7 md:grid-cols-[1fr_1.14fr]">
                  <div className="mx-auto w-full max-w-[290px] rounded-2xl border border-white/10 bg-[#0f141d] p-3">
                    <img src={contactQrUrl} alt={`QR code to call ${contactPhoneDisplay}`} className="h-full w-full rounded-xl" loading="lazy" decoding="async" />
                  </div>

                  <div>
                    <p className="text-[0.8rem] uppercase tracking-[0.15em] text-[#8cff2e]">[ Contact ]</p>
                    <h3 className="mt-3 font-heading text-[clamp(2rem,3.2vw,2.85rem)] font-medium leading-[0.95] tracking-[-0.032em]">
                      Let’s connect directly
                    </h3>
                    <p className="mt-4 max-w-[42ch] text-[1.02rem] leading-[1.64] text-white/78">
                      Scan this QR code to call me on <span className="font-semibold text-white">{contactPhoneDisplay}</span>. You can also choose instant email or direct call below.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-5 py-2.5 text-[0.95rem] font-medium text-white transition-colors duration-200 hover:bg-white/12"
                      >
                        Email me
                      </a>
                      <a
                        href={`tel:${contactPhone}`}
                        className="inline-flex items-center justify-center rounded-full bg-[#8cff2e] px-5 py-2.5 text-[0.95rem] font-semibold text-[#0d1014] shadow-[0_12px_30px_rgba(140,255,46,0.28)] transition-colors duration-200 hover:bg-[#79f124]"
                      >
                        Call me
                      </a>
                    </div>

                    <p className="mt-5 text-sm text-white/55">
                      Email: <span className="text-white/84">{directEmail}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

    </main>
  );
}
