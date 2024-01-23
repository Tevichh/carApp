import { useEffect, useRef, useState } from "react";
import { ContainerScene } from "./Scene.elements";
import { cleanUpScene, initScene, loadGroups} from "./Script";
//import { models } from "../Menu/carParts";

const Scene = () => {
  const mountRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (active){
    initScene(mountRef);
    loadGroups()
    //loadModels(models[0].modelCar.rute, models[0].modelCar.group, models[0].scale)
    return () => {
      cleanUpScene();
    };}
  }, [active]);

  return (
    <ContainerScene className='SceneContainer' ref={mountRef}></ContainerScene>
  );
};

export default Scene;
