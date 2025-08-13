import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { My3DObject } from "./components/My3DObject";
import { RoundedTiles } from "./components/RoundedTiles";
import './App.css';
const Cursor = ({ x, y }) => (
  <span
    style={{
      display: "inline-block",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "rgba(30,144,255,0.5)",
      position: "relative",
      left: `${x * 12}px`,
      top: `${y * 12}px`,
      marginLeft: "12px",
      border: "2px solid #1e90ff",
      verticalAlign: "middle"
    }}
  />
);

const App = () => {
  const [isFocused, setIsFocused] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Listen for focus/blur
  React.useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Mouse movement for cursor
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize cursor position to [-1,1]
      const x = ((e.clientX / window.innerWidth) * 2) - 1;
      const y = ((e.clientY / window.innerHeight) * 2) - 1;
      setCursorPos({ x, y });
    };
    if (isFocused) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      setCursorPos({ x: 0, y: 0 }); // Center when not focused
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isFocused]);

  return (
    <div className="app-root">
      <header>
        <h1>
          Portfolio 3D
          <Cursor x={cursorPos.x} y={cursorPos.y} />
        </h1>
        <p>Podstawa projektu z React i Three.js (JS)</p>
      </header>
      <main>
        <section className="three-section" style={{height: "400px", width: "100%"}}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, 5]} intensity={0.5} />
            {/* Model */}
            <My3DObject isFocused={isFocused} cursorPos={cursorPos} />
          </Canvas>
        </section>
        <section className="tiles-section">
          <RoundedTiles />
        </section>
      </main>
    </div>
  );
};

export default App;