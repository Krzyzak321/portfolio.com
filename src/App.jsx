import React from "react";
import { Canvas } from "@react-three/fiber";
import { My3DObject } from "./components/My3DObject";
import { RoundedTiles } from "./components/RoundedTiles";
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

const App = () => (
  <div className="app-root">
    <header>
      <h1>Portfolio 3D</h1>
      <div className="header-3d">
        <Canvas style={{
          width: "250px",
          height: "250px",
          pointerEvents: "none"
        }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <My3DObject scale={[1.5, 1.5, 1.5]} />
        </Canvas>
      </div>
    </header>
    <main>
      <Section>
        <RoundedTiles />
      </Section>
      <Section>
        <RoundedTiles />
      </Section>
      <Section>
        <RoundedTiles />
      </Section>
      <Section>
        <RoundedTiles />
      </Section>
      <Section>
        <div>Other content...</div>
      </Section>
    </main>
  </div>
);

export default App;