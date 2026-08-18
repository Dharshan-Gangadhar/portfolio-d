import React from "react";
import { ArrowUp } from "lucide-react";
import "../styles/global.css";

function Footer({ handleNavClick, lenisRef }) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    if (lenisRef && lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (target === "projects") {
      if (handleNavClick) handleNavClick("projects");
    } else {
      if (handleNavClick) handleNavClick("main", target);
    }
  };

  return (
    <footer className="footer massive-footer">
      <div className="footer-top-grid">
        
        <div className="footer-info-col">
          <a href="#hero" className="footer-logo" onClick={(e) => handleLinkClick(e, "hero")}>
            Dharshan<span className="footer-logo-dot">⚡</span>
          </a>
          <p className="footer-tagline">
            Turning ideas into AI-powered reality.<br/>
            Built with React & Node.js.
          </p>
          <div className="footer-copyright">
            © {currentYear} Dharshan Gangadhar.
          </div>
        </div>

        <div className="footer-links-col">
          <div className="footer-nav-group">
            <h4 className="footer-group-title">Navigation</h4>
            <nav className="footer-nav-list" aria-label="Footer navigation">
              <a href="#about" onClick={(e) => handleLinkClick(e, "about")}>About</a>
              <a href="#skills" onClick={(e) => handleLinkClick(e, "skills")}>Skills</a>
              <a href="#projects" onClick={(e) => handleLinkClick(e, "projects")}>Projects</a>
              <a href="#contact" onClick={(e) => handleLinkClick(e, "contact")}>Contact</a>
            </nav>
          </div>

          <div className="footer-nav-group">
            <h4 className="footer-group-title">Connect</h4>
            <nav className="footer-nav-list">
              <a href="https://github.com/Dharshan-Gangadhar" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/dharshan-gangadhar75" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:dharshanoffll@gmail.com" target="_blank" rel="noopener noreferrer">Email</a>
              <a href="https://leetcode.com/u/dharshan94" target="_blank" rel="noopener noreferrer" >LeetCode</a>
            </nav>
          </div>
        </div>
        
        <div className="footer-action-col">
          <button
            onClick={scrollToTop}
            className="scroll-top-massive"
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp size={24} />
          </button>
        </div>

      </div>

      <div className="footer-massive-text-container">
        <h1 className="footer-massive-text">DHARSHAN</h1>
      </div>
    </footer>
  );
}

export default Footer;
