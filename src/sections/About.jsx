import React from "react";
import { motion } from "framer-motion";
import { Code, GraduationCap, MapPin, Sparkles } from "lucide-react";
import Tilt from "../components/Tilt";
import "./About.css";
import "../styles/global.css";

const About = () => {
  const bentoVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section className="about" id="about">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          A glimpse into who I am and what drives me.
        </p>
      </motion.div>

      <motion.div 
        className="bento-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.15 }}
        style={{ perspective: "1200px" }}
      >
        {/* Card 1: Profile Image (Spans 1 col, 1 row, Circle) */}
        <motion.div variants={bentoVariants} className="bento-item bento-profile-wrapper">
          <Tilt className="bento-card bento-profile preserve-3d">
            <div className="animated-ring"></div>
            <img src="/Dharshan.jpg" alt="Dharshan" className="profile-img" loading="lazy" />
          </Tilt>
        </motion.div>

        {/* Card 2: Philosophy (Spans 2 cols, 1 row) */}
        <motion.div variants={bentoVariants} className="bento-item bento-philosophy-wrapper">
          <Tilt className="bento-card bento-philosophy preserve-3d glass">
            <div className="philosophy-content lift-3d-sm">
              <div className="greeting-badge">
                <span className="badge-dot"></span>
                Hi I'm Dharshan
              </div>
              <Sparkles className="bento-icon accent-icon" size={32} />
              <h3>Solving interesting problems with technology.</h3>
              <p>I'm on a journey to become a knowledgeable developer, passionate about creating <span className="highlight-text">clean, user-friendly websites</span>.</p>
            </div>
          </Tilt>
        </motion.div>

        {/* Card 3: Current Focus */}
        <motion.div variants={bentoVariants} className="bento-item">
          <Tilt className="bento-card bento-focus preserve-3d glass">
            <div className="focus-content lift-3d-sm">
              <Code className="bento-icon" size={24} />
              <h4>Current Focus</h4>
              <p>A curious learner currently building my foundation in <strong>fullstack development</strong> and <strong>Python</strong>.</p>
              <div className="focus-tags">
                <span className="bento-tag">Fullstack</span>
                <span className="bento-tag">Python</span>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Card 4: Connect/Vibe */}
        <motion.div variants={bentoVariants} className="bento-item">
          <Tilt className="bento-card bento-connect preserve-3d glass">
            <div className="connect-content lift-3d-sm">
              <GraduationCap className="bento-icon" size={24} />
              <h4>Continuous Learner</h4>
              <p>Always open to connecting and learning from others!</p>
            </div>
          </Tilt>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About;
