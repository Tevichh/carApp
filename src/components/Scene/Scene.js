import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups } from "./Script";
import { Arrow } from "../Menu/Arrow";




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
      <Arrow href="#menu" id='panel'>↓</Arrow>
    </>

  );
};

export default Scene;
