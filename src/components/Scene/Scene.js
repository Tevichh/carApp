import { useEffect, useRef } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups } from "./Script";
//import { models } from "../Menu/carParts";
import { FloatPoint, FloatLabel } from "../Menu/Parts/Styles/Sedan";

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
      <FloatPoint>
        <FloatLabel></FloatLabel>
      </FloatPoint>
    </>

  );
};

export default Scene;
