import React from "react";
import { motion } from "framer-motion";
import { Code2, Terminal, Database, Cloud, Sparkles } from "lucide-react";
import Tilt from "../components/Tilt";
import "../styles/global.css";

const Skills = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 }
    }
  };

  return (
    <section className="skills" id="skills">
      <div className="split-layout">
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
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Tilt className="skill-category-card glass preserve-3d">
                <div className="category-header lift-3d-sm">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.title}</h3>
                </div>
                <div className="skill-items lift-3d-md">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="skill-pill">
                      {skill}
                    </div>
                  ))}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

