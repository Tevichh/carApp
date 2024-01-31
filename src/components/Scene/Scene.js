import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups } from "./Script";
import { Arrow } from "../Menu/Arrow";




const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    loadGroups()
    //loadModels(models[0].modelCar.rute, models[0].modelCar.group, models[0].scale)
    return () => {
      cleanUpScene();
    };
  }, []);
  return (
    <>
      <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
      <Arrow href="#menu">↓</Arrow>
    </>

  );
};

export default Scene;
