import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups, removeModels, loadModels } from "./Script";
import { models } from "../Menu/carParts";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    loadGroups()

    for (var i = 0; i < models.length; i++) {
      loadModels(models[i].modelCar.rute, models[i].modelCar.group, models[i].scale)
    }
    setTimeout(()=>{for (i = 0; i < models.length; i++) {
      removeModels(models[i].modelCar.rute, models[i].modelCar.group, models[i].scale)
    }}, 5000)
    return () => {
      cleanUpScene();
    };

  }, []);

  return (
    <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
  );
};

export default Scene;
