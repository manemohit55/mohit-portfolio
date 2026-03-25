import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');

    if (location.pathname === "/projects") {
      document.title = "Projects | Mohit Mane";
      if (descriptionTag) {
        descriptionTag.setAttribute(
          "content",
          "Case study library by Mohit Mane covering enterprise, travel, SaaS, fintech, and healthcare UX outcomes."
        );
      }
    } else {
      document.title = "Mohit Mane | Lead UI/UX Designer";
      if (descriptionTag) {
        descriptionTag.setAttribute(
          "content",
          "Lead UI/UX Designer with 6+ years experience delivering enterprise UX, scalable design systems, and measurable business impact."
        );
      }
    }

    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <HomePage />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
            >
              <ProjectsPage />
            </motion.div>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  );
}
