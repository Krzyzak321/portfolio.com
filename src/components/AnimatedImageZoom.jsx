import React, { useRef, useEffect, useState } from "react";
import "./AnimatedImageZoom.css";

// TODO: Swap src="/phone.svg" for your image file!
const AnimatedImageZoom = ({
  src = "/phone.svg",      // Image path (SVG/PNG)
  centerX = 0.5,           // Horizontal center (0..1)
  centerY = 0.5,           // Vertical center (0..1)
  zoomScale = 4,           // Zoom strength (bigger!)
  duration = 1200          // Animation duration in ms
}) => {
  const imgRef = useRef();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Trigger zoom-in after mount
    const timer = setTimeout(() => {
      if (imgRef.current) imgRef.current.classList.add("zoom-in");
    }, 100);

    // Remove (hide) after zoom animation
    const hideTimer = setTimeout(() => setHidden(true), duration + 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  // Center of zoom
  const origin = `${centerX * 100}% ${centerY * 100}%`;

  // If hidden, don't render
  if (hidden) return null;

  return (
    <div className="animated-image-zoom-overlay">
      {/* For PNG, swap <svg> for <img src={src} ... /> */}
      <svg
        ref={imgRef}
        className="animated-image"
        style={{ transformOrigin: origin }}
        width={400}
        height={800}
        viewBox="0 0 200 400"
      >
        {/* Replace this with your SVG or use <img /> for PNG! */}
        <rect x="25" y="50" width="150" height="300" rx="30" fill="rgba(80,80,80,0.2)" />
        <circle cx="100" cy="120" r="30" fill="rgba(80,80,80,0.13)" />
        <rect x="65" y="320" width="70" height="30" rx="10" fill="rgba(80,80,80,0.18)" />
        {/* Transparent center */}
        <circle cx="100" cy="200" r="35" fill="transparent" stroke="rgba(80,80,80,0.13)" strokeWidth="6" />
      </svg>
    </div>
  );
};

export default AnimatedImageZoom;