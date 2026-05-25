import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="hero" id="hero">
      <motion.div 
        className="hero-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="status-badge" variants={itemVariants}>
          <span className="pulse-dot"></span>
          Available for New Projects
        </motion.div>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Designing the future with <span className="text-gradient">AI & Code.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={itemVariants}>
          Hi, I'm <span className="highlight-text">Dharshan</span>. I build
          high-performance full-stack applications with integrated artificial
          intelligence.
        </motion.p>

        <motion.div className="hero-buttons" variants={itemVariants}>
          <a href="#contact" className="btn-primary">
            Start a Project
          </a>
          <a href="/resume.pdf" download className="btn-secondary">
            View Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hero-right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <div className="profile-img-container">
          <img
            src="/profile.webp"
            alt="Dharshan - Full Stack Developer"
            className="profile-img"
            width="400"
            height="400"
            fetchPriority="high"
          />
          <div className="img-glow"></div>
          <motion.div 
            className="floating-card card-1 glass"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >🚀 Full Stack</motion.div>
          <motion.div 
            className="floating-card card-2 glass"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >🤖 AI Agent</motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
