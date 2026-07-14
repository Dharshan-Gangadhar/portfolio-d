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
            I’m a <strong>Computer Science</strong> student passionate about
            building real, working software and continuously improving my
            technical skills. I enjoy turning ideas into practical projects —
            from developing Java applications to building and deploying
            full‑stack web solutions.
          </p>

          <div className="about-stats">
            <div className="stat-item">
              <GraduationCap className="stat-icon" />
              <span>CS Student</span>
            </div>
            <div className="stat-item">
              <Code className="stat-icon" />
              <span>Project Focused</span>
            </div>
            <div className="stat-item">
              <Rocket className="stat-icon" />
              <span>AI Enthusiast</span>
            </div>
          </div>

          <p>
            I actively experiment, debug, and refine my work because I believe
            real growth comes from <strong>building</strong>. Beyond coding, I’m
            someone who doesn’t give up easily when things break — I fix them.
            I’m currently looking for <strong>opportunities</strong> to apply my
            skills and grow as a software engineer.
          </p>
        </div>
      </Tilt>
    </section>
  );
}


export default About;
