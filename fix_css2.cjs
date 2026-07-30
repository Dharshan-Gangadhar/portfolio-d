const fs = require('fs');
const path = 'c:/Users/dharshan/Desktop/Portfolio/dharshan-portfolio/src/styles/global.css';
let css = fs.readFileSync(path, 'utf8');

const regex = /\/\* =========================\s+FOOTER SECTION[\s\S]*?(?=\/\* =========================\s+FADE-IN ANIMATION)/;

const newCss = `/* =========================
   FOOTER SECTION (MASSIVE TYPOGRAPHY)
========================= */

.massive-footer {
  padding: 80px 8% 0; /* No bottom padding so text hits edge */
  background: var(--bg);
  border-top: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.footer-top-grid {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr auto;
  gap: 40px;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}

.footer-info-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 320px;
}

.footer-logo {
  text-decoration: none;
  color: var(--text);
  font-weight: 900;
  letter-spacing: -0.03em;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
}

.footer-logo-dot {
  color: var(--accent);
}

.footer-tagline {
  margin: 0;
  font-size: 1.05rem;
  color: var(--secondary-text);
  line-height: 1.6;
}

.footer-copyright {
  margin-top: auto;
  font-size: 0.9rem;
  color: var(--secondary-text);
  opacity: 0.7;
}

.footer-links-col {
  display: flex;
  gap: 80px;
}

.footer-nav-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-group-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--secondary-text);
  font-weight: 700;
}

.footer-nav-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav-list a {
  text-decoration: none;
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: fit-content;
}

.footer-nav-list a:hover {
  color: var(--accent);
  transform: translateX(5px);
}

.footer-action-col {
  display: flex;
  align-items: flex-end;
}

.scroll-top-massive {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(var(--bg-rgb), 0.5);
  border: 1px solid var(--border);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.scroll-top-massive:hover {
  background: var(--accent-gradient);
  color: white;
  border-color: transparent;
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
}

.footer-massive-text-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  user-select: none;
  margin-top: auto;
  z-index: 1;
}

.footer-massive-text {
  font-size: 16vw; /* Massive scaling based on viewport width */
  font-weight: 900;
  line-height: 0.8;
  margin: 0;
  color: rgba(var(--bg-rgb), 0.8); /* Fades into background */
  background: linear-gradient(180deg, var(--border) 0%, transparent 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.05em;
  transform: translateY(15%); /* Sits firmly at the bottom edge */
}

@media (max-width: 900px) {
  .footer-top-grid {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .footer-links-col {
    gap: 40px;
    flex-wrap: wrap;
  }
  
  .footer-action-col {
    align-items: flex-start;
  }
  
  .footer-massive-text {
    font-size: 22vw;
  }
}

`;

if(regex.test(css)){
    css = css.replace(regex, newCss);
    fs.writeFileSync(path, css);
    console.log("SUCCESS");
} else {
    console.log("Regex failed to match");
}
