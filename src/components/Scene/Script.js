import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui'
import { gsap } from "gsap";

//Global variables
let currentRef = null;
//Controls GUI
const gui = new dat.GUI()
//Animation GSAP
const timeline = new gsap.timeline({ defaults: { duration: 1 } })

const stateMov = false;

//CAR PARTS
const carParts = {
  modelCar: new THREE.Group(),
  top: new THREE.Group(),
  front: new THREE.Group(),
  back: new THREE.Group(),
  left: new THREE.Group(),
  right: new THREE.Group()
}

//Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x393939)
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(7.3, 2.1, 4.7);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);


//OrbitControls
export const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enablePan = false;


//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//LOADER
const gltfLoaders = new GLTFLoader()

//RAYCASTER
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-100, -100);

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  //console.log(pointer)

}
window.addEventListener('click', onPointerMove);


//Animate the scene
const animate = () => {
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(
    scene.children,
    true
  )
  // console.log(intersects)

  //INTERSECTS

  if (intersects.length) {

    console.log(intersects[0].object.name)
    
    //console.log(intersects[0].point)
    pointer.x = -1000;
    pointer.y = -1000;
  }


  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

};
animate();


//LIGHTS

const light1 = new THREE.DirectionalLight(0xffffff, 1)
light1.position.set(6, 6, 6)
scene.add(light1)


const envMap = new THREE.CubeTextureLoader().load(
  [
    './envmap/px.png',
    './envmap/nx.png',
    './envmap/py.png',
    './envmap/ny.png',
    './envmap/pz.png',
    './envmap/nz.png',
  ]
)
scene.environment = envMap


//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  gui.destroy();
  scene.dispose();
  currentRef.removeChild(renderer.domElement);
};

//Load groups

export const loadGroups = () => {
  scene.add(carParts.modelCar)
  scene.add(carParts.top)
  scene.add(carParts.front)
  scene.add(carParts.back)
  scene.add(carParts.left)
  scene.add(carParts.right)

}

//Load Models

export const loadModels = (rute, group, scale) => {
  gltfLoaders.load(rute, (gltf) => {
    while (gltf.scene.children.length) {
      carParts[group].add(gltf.scene.children[0])
      carParts[group].scale.set(scale, scale, scale)
      carParts[group]['precio'] = 20
      //console.log(gltf)
    }
  })
}
//Remove Models

export const removeModels = (rute, group, scale) => {

  const oldModels = new THREE.Group();

  while (carParts[group].children.length) {
    oldModels.add(carParts[group].children[0])
  }

  //ELMINAR

  while (carParts[group].children.length) {
    carParts[group].remove(carParts[group].children[0])
  }

  //console.log(renderer.info)
  loadModels(rute, group, scale)

  //LIBERAR MEMORIA
  oldModels.traverse((child) => {

    if (child instanceof THREE.Mesh) {
      child.material.dispose()
      child.geometry.dispose()
    }

  })
}

/*DEBUGG CONTROlS

const cubeForDebugging = new THREE.Mesh(
  new THREE.BoxBufferGeometry(0.1, 0.1, 0.1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0
  })
)

scene.add(cubeForDebugging)
gui
  .add(cubeForDebugging.position, "x")
  .min(-20)
  .max(10)
  .step(0.00001)
  .name("target x")
  .onChange(() => {
    orbitControls.target.x = cubeForDebugging.position.x
  })
gui
  .add(cubeForDebugging.position, "y")
  .min(-30)
  .max(10)
  .step(0.00001)
  .name("target y")
  .onChange(() => {
    orbitControls.target.y = cubeForDebugging.position.y
  })
gui
  .add(cubeForDebugging.position, "z")
  .min(-10)
  .max(10)
  .step(0.00001)
  .name("target z")
  .onChange(() => {
    orbitControls.target.z = cubeForDebugging.position.z
  })

gui
  .add(camera.position, "x")
  .min(-10)
  .max(10)
  .step(0.00001)
  .name("Cam x")
gui
  .add(camera.position, "y")
  .min(-10)
  .max(10)
  .step(0.00001)
  .name("Cam y")
gui
  .add(camera.position, "z")
  .min(-10)
  .max(10)
  .step(0.00001)
  .name("Cam z")
*/
//ANIMATION MOVE

export const gsapAnimation = (camPos, targetPost) => {
  timeline
    .to(orbitControls.target, {
      x: targetPost.x,
      y: targetPost.y,
      z: targetPost.z,
    })
    .to(
      camera.position,
      {
        x: camPos.x,
        y: camPos.y,
        z: camPos.z,
        onUpdate: () => camera.updateProjectionMatrix()
      },
      "-=1.0"
    )
}