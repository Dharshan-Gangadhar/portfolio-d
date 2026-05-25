import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [dark, setDark] = useState(() => getInitialTheme());

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    document.body.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => setDark(prevDark => !prevDark);

  return (
    <div className="app-container">
      <Navbar 
        isDark={dark} 
        toggleTheme={toggleTheme} 
      />
      
      <AnimatePresence mode="wait">
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
