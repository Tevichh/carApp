import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from "gsap";


//Global variables
let currentRef = null;

//Animation GSAP
const timeline = new gsap.timeline({ defaults: { duration: 1 } })

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
scene.background = new THREE.Color(0x000505)
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

var addition = 0
var parent;
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

    parent = intersects[0].object;
 

    if (intersects[0].object.material.color.equals(new THREE.Color(0x2B2D27)) && parent.parent.type === 'Group') {
      intersects[0].object.material.color.set(0x11110F)
      addition -= intersects[0].object.value
      document.getElementById('fullAdd').innerHTML = addition;

    } else if (parent.parent.type === 'Group') {
      intersects[0].object.material.color.set(0x2B2D27)
      addition += intersects[0].object.value
      document.getElementById('fullAdd').innerHTML = addition;
      //console.log(intersects[0].object.parent)
    }

    if (addition < 0) { addition = 0 }

    pointer.x = -1000;
    pointer.y = -1000;
  }


  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

};
animate();


//LIGHTS

const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
light1.position.set(6, 6, 6)
scene.add(light1)

const light2 = new THREE.DirectionalLight(0xffffff, 1.2)
light2.position.set(-6, 6, 6)
scene.add(light2)

const light = new THREE.AmbientLight(0xFFFFFF, 1.2)
scene.add(light)

/*
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
scene.environment = envMap*/


//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
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

export const loadModels = (rute, group, scale, name, value) => {
  gltfLoaders.load(rute, (gltf) => {
    while (gltf.scene.children.length) {
      const model = gltf.scene.children[0]
      model.name = name;
      model.value = value;
      carParts[group].add(model)
      carParts[group].scale.set(scale, scale, scale)
      //console.log(name)
    }
  })
}


//Remove Models

export const removeModels = (rute, group, scale, name, value) => {

  const oldModels = new THREE.Group();

  while (carParts[group].children.length) {
    oldModels.add(carParts[group].children[0])
  }

  //ELMINAR

  while (carParts[group].children.length) {
    carParts[group].remove(carParts[group].children[0])
  }

  //console.log(renderer.info)
  loadModels(rute, group, scale, name, value)

  //LIBERAR MEMORIA
  oldModels.traverse((child) => {

    if (child instanceof THREE.Mesh) {
      child.material.dispose()
      child.geometry.dispose()
    }

  })
}

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