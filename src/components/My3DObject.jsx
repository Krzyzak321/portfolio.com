// import React, { useRef, useEffect, useState } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';

// export function My3DObject({ isFocused, cursorPos }) {
//   const group = useRef();
//   const { nodes } = useGLTF('/portfolio.com/aparatznetawireframe.glb');
//   const [rotation, setRotation] = useState([0, 0, 0]);
  
//   // Animate rotation
//   useFrame(() => {
//     if (!group.current) return;
//     if (!isFocused) {
//       // Simple auto-rotation when page not focused
//       group.current.rotation.y += 0.01;
//     } else {
//       // Rotate toward cursor position (cursorPos: {x, y} in [-1, 1])
//       group.current.rotation.y += (cursorPos.x * Math.PI - group.current.rotation.y) * 0.05;
//       group.current.rotation.x += (cursorPos.y * Math.PI/8 - group.current.rotation.x) * 0.05;
//     }
//   });

//   return (
//     <group ref={group} scale={[0.05, 0.05, 0.05]} rotation={[Math.PI /4,0, 0]} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.ImageToStlcom_phothon_camera.geometry}
//         material={nodes.ImageToStlcom_phothon_camera.material}
//       />
//     </group>
//   );
// }

// useGLTF.preload('/portfolio.com/aparatznetawireframe.glb');
// import React, { useRef, useEffect } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';

// export function My3DObject({ isFocused, cursorPos, scale = [1, 1, 1] }) {
//   const group = useRef();
//   const { nodes } = useGLTF('/portfolio.com/aparatznetawireframe.glb');

//   // Początkowy obrót Y o 45 stopni
//   useEffect(() => {
//     if (group.current) {
//       group.current.rotation.x = Math.PI / 2;
//     }
//   }, []);

//   useFrame(() => {
//     if (!group.current) return;
//     if (!isFocused) {
//       group.current.rotation.y += 0.01;
//     } else {
//       const targetY = Math.PI / 4 + cursorPos.x * Math.PI / 6;
//       const targetX = cursorPos.y * Math.PI / 8;
//       group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;
//       group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
//     }
//   });

//   return (
//     <group ref={group} scale={[0.05, 0.05, 0.05]} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.ImageToStlcom_phothon_camera.geometry}
//         material={nodes.ImageToStlcom_phothon_camera.material}
//       />
//     </group>
//   );
// }

// useGLTF.preload('/portfolio.com/aparatznetawireframe.glb');
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function My3DObject({ isFocused, cursorPos, scale = [1, 1, 1] }) {
  const group = useRef();
  const { nodes } = useGLTF('/portfolio.com/aparatznetawireframe.glb');

  useFrame(() => {
    if (!group.current) return;
    // Project cursorPos (x, y in [-1, 1]) onto a 3D plane in front of the model
    // Adjust Z as needed (e.g., 2 units in front)
    const target = {
      x: cursorPos.x * 2,     // Spread out horizontally
      y: - cursorPos.y * 4,     // Spread out vertically
      z: 1                    // In front of the model
    };
    if (isFocused) {
      group.current.lookAt(target.x, target.y-2, target.z);
    } else {
      // Optional: slowly rotate when not focused
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} scale={[0.05, 0.05, 0.05]} position={[1,1, 0]} rotation={[- Math.PI , 0, 0]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ImageToStlcom_phothon_camera.geometry}
        material={nodes.ImageToStlcom_phothon_camera.material}
      />
    </group>
  );
}

useGLTF.preload('/portfolio.com/aparatznetawireframe.glb');