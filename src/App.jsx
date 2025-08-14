import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { My3DObject } from "./components/My3DObject";
import { RoundedTiles } from "./components/RoundedTiles";
import  AnimatedImageZoom from "./components/AnimatedImageZoom";
import './App.css';

const Section = ({ children }) => {
  const ref = React.useRef();
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`section ${visible ? "fade-in" : "fade-out"}`}
    >
      {children}
    </section>
  );
};

const App = () => {
  // Dodaj stany
  const [isFocused, setIsFocused] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Obsługa focus/blur
  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Obsługa ruchu myszy (kursora)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 2) - 1;
      const y = ((e.clientY / window.innerHeight) * 2) - 1;
      setCursorPos({ x, y });
    };
    if (isFocused) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFocused]);
  
  return (
    <div className="app-root">
      <header>
        <h1>Portfolio</h1>
        {/* === End AnimatedImageZoom === */}
        <div className="header-3d">
          <Canvas style={{
            width: "40vh",
            height: "40vh",
            pointerEvents: "none"
          }}>
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <My3DObject
              scale={[0.5, 0.5, 0.5]}
              isFocused={isFocused}
              cursorPos={cursorPos}
            />
          </Canvas>
        </div>
      </header>
      <main>
        {/* === Add your AnimatedImageZoom here === */}
        <AnimatedImageZoom
          src="/phone.svg"     // Change to your image path (SVG or PNG)
          centerX={0.5}        // Center of image horizontally
          centerY={0.5}        // Center of image vertically
          zoomScale={2}        // How much to zoom
          duration={1500}      // Animation duration (ms)
        />
        <Section>
          <RoundedTiles />
        </Section>
        <Section>
          <RoundedTiles />
        </Section>
        <Section>
          <RoundedTiles />
        </Section>
        {/* ... inne sekcje ... */}
      </main>
    </div>
  );
};

export default App;