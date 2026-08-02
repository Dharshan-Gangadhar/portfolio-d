import React, { useEffect, useRef } from "react";

export default function ThreeDCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    let isMobile = window.innerWidth < 768;
    let particleCount = isMobile ? 15 : Math.min(60, Math.floor((width * height) / 25000)); // Adaptive count
    const focalLength = 300;
    const maxDistance = 120; // Constellation link distance

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    let currentScrollY = window.scrollY;

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (Math.random() - 0.5) * width * 1.5,
          y: (Math.random() - 0.5) * height * 1.5,
          z: Math.random() * 800 - 400, // Z depth between -400 and 400
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          vz: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1.5,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      particleCount = isMobile ? 15 : Math.min(60, Math.floor((width * height) / 25000));
      initParticles();
    };

    const handleMouseMove = (e) => {
      // Offset coords to make 0,0 the center of the viewport
      mouse.targetX = e.clientX - width / 2;
      mouse.targetY = e.clientY - height / 2;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // Smooth scroll tracking
      currentScrollY += (window.scrollY - currentScrollY) * 0.08;

      // Fetch dynamic color tokens from document body styles
      const computedStyles = getComputedStyle(document.body);
      const accentColor = computedStyles.getPropertyValue("--accent").trim() || "#7c3aed";
      const accent2Color = computedStyles.getPropertyValue("--accent-2").trim() || "#06b6d4";

      const centerX = width / 2;
      const centerY = height / 2;

      // Update & project particles
      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift positions
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Apply interactive force if mouse is active
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dz = p.z - 0; // Mouse is at z = 0
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < 200) {
            const force = (200 - dist) * 0.04;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.z += (dz / dist) * force;
          }
        }

        // Boundary wrap around
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;
        if (p.z < -400) p.z = 400;
        if (p.z > 400) p.z = -400;

        // 3D Projection
        if (focalLength + p.z <= 50) continue;
        const scale = focalLength / (focalLength + p.z);
        const projX = p.x * scale + centerX;
        
        // Shift Y coordinate by scroll offset before projection for natural perspective parallax
        const projY = (p.y - currentScrollY * 0.35) * scale + centerY;
        const size = Math.max(0.1, p.radius * scale);

        // Save projected coords
        projected.push({
          x: projX,
          y: projY,
          size: size,
          z: p.z,
          scale: scale,
          colorIndex: i % 2,
        });
      }

      // Draw constellation links (lines) - skip on mobile to save O(N^2) CPU calculations
      if (!isMobile) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const p1 = projected[i];
            const p2 = projected[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              // Opacity decreases with distance and depth (negative scale/negative z)
              const depthFactor = Math.max(0, Math.min(1, (p1.scale + p2.scale) / 2));
              const alpha = (1 - dist / maxDistance) * 0.14 * depthFactor;
              
              ctx.strokeStyle = p1.colorIndex === 0 ? accentColor : accent2Color;
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;

        const opacity = Math.max(0.1, Math.min(0.8, p.scale));
        ctx.globalAlpha = opacity;

        // Glowing gradient for particles
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        const color = p.colorIndex === 0 ? accentColor : accent2Color;
        
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.75,
      }}
    />
  );
}
