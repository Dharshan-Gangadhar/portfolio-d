import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import "./Experience.css";
import "../styles/global.css";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "GSSoC 2026 Contributor",
      company: "Girlscript Summer of Code",
      location: "Remote",
      period: "May 2026 - Present",
      description: "Contributing to open-source projects in web development and AI domains.",
      skills: ["React", "JavaScript", "Node.js", "Python", "Git", "Open Source"]
    },
    {
      id: 2,
      role: "Full Stack Developer Intern",
      company: "Mindenious Edutech",
      location: "Remote",
      period: "May 2026 - June 2026",
      description: "Developed a portfolio website using React and Node.js. Implemented responsive design and interactive features to enhance user experience",
      skills: ["React", "JavaScript", "Node.js", "CSS"]
    },
    {
      id: 3,
      role: "Artificial Intelligence Intern",
      company: "Infosys Springboard",
      location: "Remote",
      period: "Aug 2025 - Oct 2025",
      description: "Built a customer review and insight platform using AI-powered sentiment analysis. Developed the backend with Python and integrated NLP models for accurate insights.",
      skills: ["Python", "NLP", "AI", "Git"]
    }
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
    <section className="experience" id="experience">
      <div className="split-layout">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            My professional journey and work history.
          </p>
        </motion.div>

        <motion.div 
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="timeline-line"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="timeline-item glass"
            >
              <div className="timeline-dot">
                <Briefcase size={18} />
              </div>
              <div className="experience-header">
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
              </div>
              
              <div className="experience-meta">
                <span className="meta-item">
                  <Calendar size={14} />
                  {exp.period}
                </span>
                <span className="meta-item">
                  <MapPin size={14} />
                  {exp.location}
                </span>
              </div>
              
              <p className="experience-desc">{exp.description}</p>
              
              <div className="skill-items">
                {exp.skills.map((skill, i) => (
                  <div key={i} className="skill-pill">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
