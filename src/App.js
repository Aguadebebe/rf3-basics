import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei";
import { useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
import './App.css';


const Cube = ({ position, size, color }) => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta * 2.0 
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2
    console.log(state.clock.elapsedTime)
  }); /*delta is the difference between the current frame and the last one*/
  /*ref.current.rotation.x or y or z refers to the axis the object will be rotating*/ 
  
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

 const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  
  useFrame((state, delta) => {

    const speed = isHovered ? 1 : 0.2
    ref.current.rotation.y += delta * speed 
    
  });
    
  return (
      <mesh 
      position={position} 
      ref={ref} onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
      >
        <sphereGeometry args={size} />
        <meshStandardMaterial 
        color={isHovered ? "orange" : "blue"}   
        wireframe 
      />
      </mesh>
    );
 }

 const Torus = ({ position, size, color }) => {
   
  
  return (
    <mesh position={position}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const TorusKnot = ({ position, size }) => {
  const ref = useRef();

  const {color , radius} = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5,
    },
  })
  
  useFrame((state, delta) => {
    {/*ref.current.rotation.x += delta*/}
    {/*ref.current.rotation.y += delta * 2.0*/}
  {/*ref.current.position.z = Math.sin(state.clock.elapsedTime) * 1.5*/}
  });
  
  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius, ...size]} />
      {/*<meshStandardMaterial color={color} />*/}
      <MeshWobbleMaterial color={color} factor={10} speed={0.2} />

    </mesh>
  );
}

const Scene = () => {
  const directionalLightRef = useRef();

  const {lightColor, lightIntensity} = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5, 
      min: 0,
      max: 5,
      step: 0.1,
    },
  });
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white")

  return (
   <> 
    <directionalLight 
     position={[0, 1, 2]} 
     intensity={lightIntensity} 
     ref={directionalLightRef} 
     color={lightColor}
    />
    <ambientLight intensity={0.5} /> 
    {/*[x, y, zed axis points]*/}  
    
    {/*<group position={[0, -1, 0]}>
      <Cube position={[1, 0, 0]} color={"green"} size={[1, 1, 1]} />
      <Cube position={[-1, 0, 0]} color={"hotpink"} size={[1, 1, 1]} />
      <Cube position={[-1, 2, 0]} color={"blue"} size={[1, 1, 1]} />
      <Cube position={[1, 2, 0]} color={"yellow"} size={[1, 1, 1]} />
  </group>*/}

      {/*<Cube position={[0, 0, 0,]} size={[1, 1, 1]} color={"red"} />*/}
{/*<Sphere position={[0, 0, 0]} size={[1, 30, 30]} color={""} />*/}
      {/*<Torus position={[2, 0, 0]} size={[0.8, 0.1, 30, 30]} color={"blue"} />*/}
      <TorusKnot 
       position={[-0, 0, 0]} 
       size={[ 0.1, 1000, 50 ]} 
       color={"white"} 
      />
      <OrbitControls enableZoom={false} />
      </>
  )
}

function App() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
