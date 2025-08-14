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
       <img
        ref={imgRef}
        src={src}
        alt="Animated zoom"
        className="animated-image"
        style={{ transformOrigin: origin, width: '400px', height: '800px' }}
      />
    </div>
  );
};

export default AnimatedImageZoom;