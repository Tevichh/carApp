import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups } from "./Script";
import { Arrow } from "../Menu/Arrow";
import { ArrowUp } from "../Menu/ArrowUp";




const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    loadGroups()

    return () => {
      cleanUpScene();
    };
  }, []);
  return (
    <>
      <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
      <Arrow href="#menu" id='panel'>⭣</Arrow>
      <ArrowUp href="#root" id='panel'>⭡</ArrowUp>

    </>

  );
};

export default Scene;
