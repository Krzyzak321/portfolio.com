import React from "react";
import { Canvas } from "@react-three/fiber";
import { RoundedTiles } from "./components/RoundedTiles";
// import { My3DObject } from "./components/My3DObject"; // future 3D object

const App = () => {
  return (
    <div className="app-root">
      <header>
        <h1>Portfolio 3D</h1>
        <p>Podstawa projektu z React i Three.js (JS)</p>
      </header>
      <main>
        {/* <section className="three-section">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <My3DObject />
          </Canvas>
        </section> */}
        <section className="tiles-section">
          <RoundedTiles />
        </section>
      </main>
    </div>
  );
};

export default App;