import React, { useRef, useState } from "react";

export default function Tilt({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate cursor position relative to center of element
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Tilt limits: maximum 12 degrees tilt for rich 3D effect
    const rX = -(mouseY / (height / 2)) * 12;
    const rY = (mouseX / (width / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setShadowX(-rY * 1.5);
    setShadowY(-rX * 1.5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShadowX(0);
    setShadowY(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-wrapper ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out",
        boxShadow: `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
