import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react"; 

function ProjectCard({ project }) {
  const isAI = project.tech.some(t => 
    t.toLowerCase().includes('ai') || t.toLowerCase().includes('python')
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`project-card ${isAI ? "ai-highlight" : ""} glass`}
    >
      <div className="project-image-container">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-img" />
        ) : (
          <div className="project-placeholder-gradient">
            <Code2 size={48} className="placeholder-icon" />
          </div>
        )}
        <div className="project-category-badge">{project.category || "Development"}</div>
      </div>

      <div className="project-card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="tech-stack">
          {project.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>

        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-btn">
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
              <Github size={18} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
