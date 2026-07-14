import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import "../styles/global.css";

const Navbar = ({ toggleTheme, isDark, view, handleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = useMemo(
    () => [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const currentActiveSection = view === "projects" ? "projects" : activeSection;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Only run scroll intersection observer if we are on the main homepage
    if (view !== "main") return;

    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navItems, view]);

  const onNavClick = () => setIsMenuOpen(false);

  const handleLinkClick = (e, itemId) => {
    e.preventDefault();
    if (itemId === "projects") {
      handleNavClick("projects");
    } else {
      handleNavClick("main", itemId);
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`navbar ${isScrolled ? "is-scrolled" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <div className="nav-container">
        <a 
          className="logo" 
          href={view === "main" ? "#hero" : "#"} 
          onClick={(e) => handleLinkClick(e, "hero")}
        >
          Dharshan<span className="logo-dot">⚡</span>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={view === "main" ? `#${item.id}` : "#"}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={currentActiveSection === item.id ? "is-active" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            type="button"
          >
            <span className="toggle-icon" aria-hidden="true">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </span>
            <span className="toggle-label">{isDark ? "Light" : "Dark"}</span>
          </button>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls="nav-mobile-panel"
            type="button"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="nav-mobile" aria-hidden={!isMenuOpen}>
        <div className="nav-mobile-surface">
          <div id="nav-mobile-panel" className="nav-mobile-panel">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={view === "main" ? `#${item.id}` : "#"}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={currentActiveSection === item.id ? "is-active" : ""}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
