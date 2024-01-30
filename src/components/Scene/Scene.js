import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups } from "./Script";




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
    </>

  );
};

export default Scene;
