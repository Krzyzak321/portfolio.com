import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { My3DObject } from "./components/My3DObject";
import { RoundedTiles } from "./components/RoundedTiles";
import { RoundedTile } from "./components/RoundedTile";
import  AnimatedImageZoom from "./components/AnimatedImageZoom";
import './App.css';
// Animowane kafelki do menu
const menuTiles = [
  { label: "Start", color: "#ffb347", icon: "🏠", href: "https://www.whonix.org/" },
  { label: "O mnie", color: "#77dd77", icon: "👤", href: "/about" },
  { label: "Projekty", color: "#aec6cf", icon: "💼", href: "/projects" },
  { label: "Kontakt", color: "#f49ac2", icon: "✉️", href: "/contact" },
];

const YMenu = () => {
  const [visibleTiles, setVisibleTiles] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleTiles(current);
      if (current >= menuTiles.length) clearInterval(interval);
    }, 260);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ymenu-root">
      {menuTiles.map((tile, idx) => (
        <a
          key={tile.label}
          href={tile.href}
          className={`ymenu-tile${idx < visibleTiles ? " fade-in" : ""}`}
          style={{
            background: tile.color,
            transitionDelay: `${idx * 0.13}s`,
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <span className="ymenu-icon">{tile.icon}</span>
          <span className="ymenu-label">{tile.label}</span>
        </a>
      ))}
    </div>
  );
};

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
            <YMenu />

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
              isFocused={window.innerWidth <= 600 ? false : isFocused}
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