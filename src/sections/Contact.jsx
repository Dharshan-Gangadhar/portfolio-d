import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin, MapPin } from "lucide-react";
import Tilt from "../components/Tilt";
import "./Contact.css";

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", website_hp: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Honeypot check: If the hidden field is filled, it's a bot. Mock success.
    if (form.website_hp) {
      setLoading(true);
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "", website_hp: "" });
        setLoading(false);
        setTimeout(() => setStatus(null), 4000);
      }, 800);
      return;
    }

    setLoading(true);
    setStatus(null);

    const sanitizedForm = {
      name: sanitizeInput(form.name),
      email: sanitizeInput(form.email),
      message: sanitizeInput(form.message),
    };

    try {
      const response = await fetch(
        "https://dharshan-portfolio-backend.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedForm),
        }
      );

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "", website_hp: "" });
        setTimeout(() => setStatus(null), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-split-layout">
        
        {/* Left Side: Typography and Info Pills */}
        <motion.div 
          className="contact-editorial"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
        >
          <h2 className="editorial-title">
            Let's build something <br/>
            <span className="text-gradient">amazing</span> together.
          </h2>
          <p className="editorial-subtitle">
            Whether you have a specific project in mind, need help solving a technical challenge, or just want to say hi — I'd love to hear from you.
          </p>

          <div className="contact-pills-grid">
            <a href="mailto:dharshanoffll@gmail.com" className="contact-pill glass lift-3d-sm">
              <div className="pill-icon"><Mail size={20} /></div>
              <div className="pill-content">
                <span className="pill-label">Email Me</span>
                <span className="pill-value">dharshanoffll@gmail.com</span>
              </div>
            </a>
            
            <div className="contact-pill glass lift-3d-sm">
              <div className="pill-icon"><MapPin size={20} /></div>
              <div className="pill-content">
                <span className="pill-label">Location</span>
                <span className="pill-value">Remote / Global</span>
              </div>
            </div>

            <a href="https://github.com/Dharshan-Gangadhar" target="_blank" rel="noopener noreferrer" className="contact-pill glass lift-3d-sm">
              <div className="pill-icon"><Github size={20} /></div>
              <div className="pill-content">
                <span className="pill-label">GitHub</span>
                <span className="pill-value">@Dharshan-Gangadhar</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/dharshan-gangadhar75/" target="_blank" rel="noopener noreferrer" className="contact-pill glass lift-3d-sm">
              <div className="pill-icon"><Linkedin size={20} /></div>
              <div className="pill-content">
                <span className="pill-label">LinkedIn</span>
                <span className="pill-value">Dharshan-Gangadhar75</span>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div 
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2, delay: 0.2 }}
        >
          <Tilt className="contact-card glass preserve-3d">
            <form onSubmit={handleSubmit} className="contact-form lift-3d-md preserve-3d">
              
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>I typically reply within 24 hours.</p>
              </div>

              {/* Honeypot field - Visually hidden to trap spambots */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website_hp}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <motion.button 
                type="submit" 
                className={`btn-primary submit-btn ${loading ? 'loading' : ''}`} 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="btn-content">Sending...</span>
                ) : (
                  <span className="btn-content">
                    Send Message <Send size={18} />
                  </span>
                )}
              </motion.button>

              <div className="status-container">
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="status-message success"
                  >
                    <CheckCircle2 size={18} />
                    <span>Message sent successfully! I'll be in touch.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="status-message error"
                  >
                    <AlertCircle size={18} />
                    <span>Something went wrong. Please try again later.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </Tilt>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;