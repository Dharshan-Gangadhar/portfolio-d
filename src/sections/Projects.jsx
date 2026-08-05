import React from "react";
import { motion } from "framer-motion";
import projects from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="projects-section" style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient background glows matching Hero section */}
      <div className="img-glow" style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", opacity: 0.15, pointerEvents: "none", zIndex: 0 }}></div>
      <div className="img-glow" style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", opacity: 0.15, pointerEvents: "none", animationDelay: "2s", zIndex: 0 }}></div>
      
      <div className="split-layout" style={{ position: "relative", zIndex: 1 }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="status-badge" 
            style={{ 
              display: "inline-flex",
              marginBottom: "1.5rem"
            }}
          >
            <span className="pulse-dot"></span>
            My Portfolio
          </div>
          <h2 className="section-title" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", lineHeight: 1.1, marginTop: 0 }}>
            Featured <span className="text-gradient">Work.</span>
          </h2>
          <p className="section-subtitle">
            Exploring the intersection of Full-Stack development and Artificial
            Intelligence.
          </p>
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              project={project}
              key={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
