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
    <section id="projects" className="projects-section">
      <div className="split-layout">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Work</h2>
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
