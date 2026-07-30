import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Terminal, Database, Cloud, Sparkles, ChevronDown } from "lucide-react";
import Tilt from "../components/Tilt";
import "../styles/global.css";

const Skills = () => {
  const [activeDrawer, setActiveDrawer] = useState(0); // First drawer open by default

  const skillCategories = [
    {
      title: "Frontend",
      icon: <Code2 size={24} />,
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
    },
    {
      title: "AI & Tools",
      icon: <Sparkles size={24} />,
      skills: ["Prompt Engineering", "ChatGPT API", "Git & GitHub", "Figma", "VS Code", "Gemini Pro", "Claude Opus", "Google Colab"],
    },
    {
      title: "Backend",
      icon: <Terminal size={24} />,
      skills: ["Node.js", "Java", "Python"],
    },
    {
      title: "Database",
      icon: <Database size={24} />,
      skills: ["MySQL", "SQLite"],
    },
    {
      title: "Cloud & Deployment",
      icon: <Cloud size={24} />,
      skills: ["Vercel", "GitHub Pages", "Netlify", "Google Cloud Platform"],
    },
  ];

  return (
    <section className="skills" id="skills">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          A toolbox of modern technologies and AI-driven workflows.
        </p>
      </motion.div>

      <motion.div 
        className="tool-chest-container perspective-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <Tilt className="tool-chest glass preserve-3d">
          {skillCategories.map((category, index) => {
            const isOpen = activeDrawer === index;
            return (
              <div 
                key={index} 
                className={`drawer ${isOpen ? "open" : ""} preserve-3d`}
              >
                <button 
                  className="drawer-header lift-3d-sm"
                  onClick={() => setActiveDrawer(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <div className="drawer-handle"></div>
                  <div className="drawer-title-group">
                    <span className="category-icon">{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <motion.div 
                    className="drawer-chevron"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="drawer-content-wrapper preserve-3d"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="drawer-content inset-glass preserve-3d">
                        <div className="skill-items lift-3d-md">
                          {category.skills.map((skill, i) => (
                            <motion.div 
                              key={i} 
                              className="skill-pill"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Tilt>
      </motion.div>
    </section>
  );
};

export default Skills;
