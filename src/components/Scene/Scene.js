import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups, loadModels, removeModels } from "./Script";
import { models } from "../Menu/carParts";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    loadGroups()
    //loadModels(models[0].modelCar.rute, models[0].modelCar.group, models[0].scale)

    /*for (var i = 0; i < models.length; i++) {
      removeModels(models[i].modelCar.rute, models[i].modelCar.group, models[i].scale)
    }*/

    return () => {
      cleanUpScene();
    };
  }, []);

  return (
    <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
  );
};

export default Scene;
