import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(
        "https://dharshan-portfolio-backend.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
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
      <motion.div 
        className="contact-card glass"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      >
        <div className="contact-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Have a project in mind or just want to say hi? I'll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
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
              placeholder="Your Message"
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
      </motion.div>
    </section>
  );
};

export default Contact;