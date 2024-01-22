import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups, loadModels, removeModels } from "./Script";
import { models } from "../Menu/carParts";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    initScene(mountRef);
    loadGroups()
    loadModels('./model/Modelo01/sedan.gltf', 'modelCar', 0.08)
    for (var i = 0; i < models[0].damageLeft.length; i++) {
      loadModels(models[0].damageLeft[i].rute, models[0].damageLeft[i].group, models[0].scale, models[0].damageLeft[i].name, models[0].damageLeft[i].value)
    }

    return () => {
      cleanUpScene();
    };
  }, []);

  return (
    <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
  );
};

export default Scene;
