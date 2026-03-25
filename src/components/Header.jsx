import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { profile } from "../data/portfolioData";

const navItems = [
  { label: "Projects", kind: "home-section", id: "projects" },
  { label: "All Projects", kind: "route", to: "/projects" },
  { label: "About & Contact", kind: "home-section", id: "about-contact" },
];

function buildHashPath(id) {
  return `/#${id}`;
}

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");
  const [headerTone, setHeaderTone] = useState("light");

  const isHome = location.pathname === "/";
  const isProjectsRoute = location.pathname === "/projects";
  const isDarkHeader = headerTone === "dark";
  const homeSectionItems = useMemo(
    () => navItems.filter((item) => item.kind === "home-section"),
    []
  );

  const scrollToSectionWithOffset = useCallback((id, behavior = "smooth") => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const header = document.querySelector('[data-site-header="true"]');
    const headerHeight = header ? header.getBoundingClientRect().height : 96;

    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
    window.scrollTo({ top: Math.max(top, 0), behavior });
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isHome || !location.hash) {
      return;
    }

    const id = location.hash.replace("#", "");
    const timer = window.setTimeout(() => scrollToSectionWithOffset(id, "smooth"), 60);
    return () => window.clearTimeout(timer);
  }, [isHome, location.hash, scrollToSectionWithOffset]);

  useEffect(() => {
    if (!isHome) {
      return undefined;
    }

    const sections = ["summary", ...homeSectionItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-36% 0px -50% 0px",
        threshold: [0.15, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [homeSectionItems, isHome]);

  useEffect(() => {
    const updateHeaderTone = () => {
      if (!isHome) {
        setHeaderTone("light");
        return;
      }

      const header = document.querySelector('[data-site-header="true"]');
      const headerHeight = header ? header.getBoundingClientRect().height : 96;
      const probeY = Math.min(window.innerHeight - 1, Math.max(1, Math.round(headerHeight + 10)));
      const probeX = Math.round(window.innerWidth / 2);
      const probeElement = document.elementFromPoint(probeX, probeY);
      const toneElement = probeElement?.closest?.("[data-header-tone]");

      const nextTone = toneElement?.getAttribute("data-header-tone") === "dark" ? "dark" : "light";
      setHeaderTone((currentTone) => (currentTone === nextTone ? currentTone : nextTone));
    };

    updateHeaderTone();
    const timer = window.setTimeout(updateHeaderTone, 120);
    window.addEventListener("scroll", updateHeaderTone, { passive: true });
    window.addEventListener("resize", updateHeaderTone);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", updateHeaderTone);
      window.removeEventListener("resize", updateHeaderTone);
    };
  }, [isHome, location.hash, location.pathname]);

  const contactHref = useMemo(() => buildHashPath("about-contact"), []);

  const getItemHref = useCallback((item) => {
    if (item.kind === "route") {
      return item.to;
    }
    return buildHashPath(item.id);
  }, []);

  const handleNavClick = (event, item) => {
    setOpen(false);

    if (!isHome || item.kind !== "home-section") {
      return;
    }

    event.preventDefault();
    scrollToSectionWithOffset(item.id, "smooth");
    window.history.replaceState(null, "", buildHashPath(item.id));
  };

  return (
    <motion.header
      data-site-header="true"
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
        isDarkHeader
          ? "header-dark border-white/16 bg-[rgba(8,11,15,0.72)] shadow-[0_14px_34px_rgba(0,0,0,0.38)]"
          : "border-[#d7dbe3] bg-[rgba(246,246,248,0.78)] shadow-[0_12px_28px_rgba(31,35,45,0.1)]"
      }`}
      initial={{ opacity: 0, y: -22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-shell">
        <div className="flex h-[84px] items-center justify-between md:h-[96px]">
          <Link
            to="/"
            className={`font-logo text-[2rem] leading-none tracking-[-0.03em] transition-colors duration-300 md:text-[2.15rem] ${
              isDarkHeader ? "text-white/86" : "text-[#111]"
            }`}
          >
            Mohit<span className="text-[#8cff2e]">-M.</span>
          </Link>

          <nav className="hidden items-center gap-12 lg:flex">
            {navItems.map((item) => {
              const isActive =
                (item.kind === "route" && isProjectsRoute) ||
                (item.kind === "home-section" && isHome && activeSection === item.id);

              return (
                <Link
                  key={item.label}
                  to={getItemHref(item)}
                  className={`main-nav-link ${isActive ? "active" : ""} ${isDarkHeader ? "main-nav-link-dark" : ""}`}
                  onClick={(event) => handleNavClick(event, item)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <a
              href={`mailto:${profile.email}`}
              className={`text-[0.96rem] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                isDarkHeader ? "text-white/65 hover:text-white" : "text-[#3d4046] hover:text-[#111]"
              }`}
            >
              Email: {profile.email}
            </a>

            <Link
              to={contactHref}
              className={`inline-flex items-center rounded-full px-7 py-3 text-[1rem] font-medium transition-all duration-200 ${
                isDarkHeader
                  ? "border border-white/24 bg-white/12 text-white hover:bg-white/20"
                  : "bg-[#1f2228] text-white hover:bg-black"
              }`}
              onClick={(event) => handleNavClick(event, { kind: "home-section", id: "about-contact" })}
            >
              Contact me
            </Link>
          </div>

          <button
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border text-2xl leading-none shadow-[0_8px_18px_rgba(17,17,17,0.08)] transition-transform duration-200 hover:scale-105 lg:hidden ${
              isDarkHeader
                ? "border-white/30 bg-white/86 text-[#2e3137]"
                : "border-[#dbdbe0] bg-white/80 text-[#2d2f34]"
            }`}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? "max-h-[280px] pb-6" : "max-h-0"}`}
        >
          <div
            className={`rounded-2xl border p-5 ${
              isDarkHeader ? "border-white/20 bg-[#10141c]/90" : "border-[#dfdfe4] bg-white/90"
            }`}
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive =
                  (item.kind === "route" && isProjectsRoute) ||
                  (item.kind === "home-section" && isHome && activeSection === item.id);

                return (
                  <Link
                    key={item.label}
                    to={getItemHref(item)}
                    className={`main-nav-link w-fit ${isActive ? "active" : ""} ${isDarkHeader ? "main-nav-link-dark" : ""}`}
                    onClick={(event) => handleNavClick(event, item)}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={`mailto:${profile.email}`}
                className={`text-sm font-medium ${isDarkHeader ? "text-white/72" : "text-[#4c4f56]"}`}
                onClick={() => setOpen(false)}
              >
                {profile.email}
              </a>

              <Link
                to={contactHref}
                className={`inline-flex w-fit items-center rounded-full px-5 py-2.5 text-sm font-medium ${
                  isDarkHeader ? "bg-white/20 text-white" : "bg-[#1f2228] text-white"
                }`}
                onClick={(event) => handleNavClick(event, { kind: "home-section", id: "about-contact" })}
              >
                Contact me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
