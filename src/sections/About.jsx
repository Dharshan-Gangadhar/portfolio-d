import React from "react";
import { Code, GraduationCap, Rocket } from "lucide-react";
import Tilt from "../components/Tilt";
import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <Tilt className="about-card fade-in show">
        <div className="about-container">
          <h2>About Me</h2>

          <p>
            I'm a <strong>Computer Science</strong> student driven by 
            curiosity and a passion for building software that feels effortless to use.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <GraduationCap className="stat-icon" />
              <span>CS Student</span>
            </div>
            <div className="stat-item">
              <Code className="stat-icon" />
              <span>FULL-STACK DEV</span>
            </div>
            <div className="stat-item">
              <Rocket className="stat-icon" />
              <span>AI Enthusiast</span>
            </div>
          </div>

          <p>
            Right now, I’m focused on building a solid foundation in<strong> full-stack web development</strong> and <strong>Python</strong>.
            For me, coding goes beyond writing syntax—it’s about breaking down complex problems and turning them into clean, functional, and user-friendly web experiences.
            As a developer on a continuous learning path, I’m always eager to pick up new tools, take on challenging projects, and collaborate with others in the tech community. 
            Whether you want to discuss full-stack projects, share ideas, or just connect, my door is always open!  
          </p>
        </div>
      </Tilt>
    </section>
  );
}


export default About;
