import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
const ThreeDCanvas = lazy(() => import("./components/ThreeDCanvas"));
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

// Import Lenis styles for correct layout behavior
import "lenis/dist/lenis.css";
import Lenis from "lenis";

function App() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [dark, setDark] = useState(() => getInitialTheme());
  const [view, setView] = useState("main"); // "main" or "projects"
  const [targetSection, setTargetSection] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    document.body.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Setup Lenis Smooth Momentum Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // EaseOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const toggleTheme = () => setDark(prevDark => !prevDark);

  // Handle hash on initial load
  useEffect(() => {
    if (window.location.hash && view === "main") {
      const hash = window.location.hash.replace("#", "");
      if (hash) setTargetSection(hash);
    }
  }, []);

  const handleNavClick = (newView, sectionId = null) => {
    setView(newView);
    if (newView === "projects") {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } else if (sectionId) {
      setTargetSection(sectionId);
    }
  };

  // Scroll to section after view updates back to main homepage
  useEffect(() => {
    if (view === "main" && targetSection) {
      // 500ms timeout ensures components (especially images and canvas) are fully mounted and layout has settled before scrolling.
      const timer = setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(`#${targetSection}`, { offset: -80 });
        } else {
          const element = document.getElementById(targetSection);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        setTargetSection(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [view, targetSection]);

  // Setup scroll progress indicator variables
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="scroll-progress-bar" 
        style={{ 
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "var(--accent-gradient)",
          transformOrigin: "0%",
          zIndex: 9999,
          boxShadow: "0 2px 10px var(--shadow-lg)"
        }} 
      />

      <ErrorBoundary>
        <Suspense fallback={null}>
          <ThreeDCanvas />
        </Suspense>
      </ErrorBoundary>
      <Navbar 
        isDark={dark} 
        toggleTheme={toggleTheme} 
        view={view}
        handleNavClick={handleNavClick}
        activeSection={view === "projects" ? "projects" : null}
      />

      <AnimatePresence mode="wait">
        <main key={view}>
          {view === "main" ? (
            <>
              <Hero handleNavClick={handleNavClick} />
              <About />
              <Skills />
              <Experience />
              <Contact />
            </>
          ) : (
            <Projects />
          )}
        </main>
      </AnimatePresence>

      <Footer handleNavClick={handleNavClick} lenisRef={lenisRef} />
    </div>
  );
}

export default App;

