import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Tilt from "../components/Tilt";
import "./Experience.css";
import "../styles/global.css";

const experiences = [
  {
    id: 1,
    role: "GSSoC 2026 Contributor",
    company: "Girlscript Summer of Code",
    location: "Remote",
    period: "May 2026 - Present",
    description: "Contributing to open-source projects in web development and AI domains. Collaborating with developers globally to build impactful software.",
    skills: ["React", "JavaScript", "Node.js", "Python", "Git", "Open Source"]
  },
  {
    id: 2,
    role: "Full Stack Developer Intern",
    company: "Mindenious Edutech",
    location: "Remote",
    period: "May 2026 - June 2026",
    description: "Developed a portfolio website using React and Node.js. Implemented responsive design and interactive features to enhance user experience.",
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

const StackCard = ({ exp, index, total, progress }) => {
  // We want the card to start scaling down when it hits the top and the user continues scrolling.
  // The 'progress' is the scroll progress of the entire section (0 to 1).
  // We divide the progress into chunks for each card.
  const startScale = index / total; 
  const endScale = 1;

  // Scale down slightly to create a stack depth effect
  const targetScale = 1 - ((total - index - 1) * 0.05);
  
  const scale = useTransform(
    progress,
    [startScale, endScale],
    [1, targetScale]
  );

  // Fade out slightly to enhance the depth effect
  const opacity = useTransform(
    progress,
    [startScale, endScale],
    [1, 0.4]
  );

  return (
    <div className="stack-card-wrapper">
      <div 
        className="stack-card-sticky"
        style={{ top: `calc(15vh + ${index * 30}px)` }}
      >
        <motion.div style={{ scale, opacity, transformOrigin: "top center" }} className="stack-motion-wrapper">
          <Tilt className="stack-card glass preserve-3d">
            <div className="stack-header lift-3d-sm">
              <div className="stack-title-group">
                <h3>{exp.role}</h3>
                <h4>{exp.company}</h4>
              </div>
              <div className="stack-meta">
                <span className="meta-item"><Calendar size={14} /> {exp.period}</span>
                <span className="meta-item"><MapPin size={14} /> {exp.location}</span>
              </div>
            </div>
            
            <p className="stack-desc lift-3d-sm">{exp.description}</p>
            
            <div className="skill-items lift-3d-md">
              {exp.skills.map((skill, i) => (
                <div key={i} className="skill-pill">
                  {skill}
                </div>
              ))}
            </div>
          </Tilt>
        </motion.div>
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the entire experience section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section className="experience stack-experience" id="experience" ref={containerRef}>
      <motion.div 
        className="section-header stack-section-header"
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

      <div className="stack-container">
        {experiences.map((exp, index) => (
          <StackCard 
            key={exp.id} 
            exp={exp} 
            index={index} 
            total={experiences.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
