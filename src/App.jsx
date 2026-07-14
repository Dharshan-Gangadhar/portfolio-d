import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import ThreeDCanvas from "./components/ThreeDCanvas";
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => setDark(prevDark => !prevDark);

  const handleNavClick = (newView, sectionId = null) => {
    setView(newView);
    if (newView === "projects") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId) {
      setTargetSection(sectionId);
    }
  };

  // Scroll to section after view updates back to main homepage
  useEffect(() => {
    if (view === "main" && targetSection) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTargetSection(null);
      }, 100);
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
          boxShadow: "0 2px 10px rgba(168, 85, 247, 0.4)"
        }} 
      />

      <ThreeDCanvas />
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
              <Hero />
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

      <Footer />
    </div>
  );
}

export default App;

