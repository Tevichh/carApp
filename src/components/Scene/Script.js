import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from "gsap";
import { models } from "../Menu/carParts";

// Global variables
let currentRef = null;
var num = 0;
var copyModel = {};

// Animation GSAP
const timeline = new gsap.timeline({ defaults: { duration: 1 } });

// CAR PARTS
const carParts = {
  modelCar: new THREE.Group(),
  top: new THREE.Group(),
  front: new THREE.Group(),
  back: new THREE.Group(),
  left: new THREE.Group(),
  right: new THREE.Group()
};

// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x021013);

const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(7.3, 2.1, 4.7);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

// Texture Loader
// const textureLoader = new THREE.TextureLoader();

const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
grid.material.opacity = 0.2;
grid.material.depthWrite = false;
grid.material.transparent = true;
grid.userData.intangible = true;
scene.add(grid);

// OrbitControls
export const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = THREE.MathUtils.degToRad(80);

// Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);


//Dom Events
document.addEventListener('DOMContentLoaded', function () {


  const containerClickHandler = (event) => {
    var target = event.target;

    //Send Cost
    if (target.id === "SEND") {
      console.log(copyModel);
    }
  }

  //Update Models
  const containerSelect = (event) => {

    var target = event.target;

    if (target.id === "modelSelect") {
      var modelName = document.getElementById("modelSelect").value;
      console.log(modelName)
      var model = models.find(model => model.name === modelName);
      copyModel = model;
    }

  }

  document.body.addEventListener('click', containerClickHandler);
  document.getElementById('modelSelect').addEventListener('change', containerSelect);
});





// Loader
var progressBarContainer = document.querySelector('.progress-bar-container');
const loadingManager = new THREE.LoadingManager(
  () => {
    progressBarContainer = document.querySelector('.progress-bar-container');
    progressBarContainer.style.display = 'none';
  },
  (_, itemsToLoad, itemsLoaded) => {
    progressBarContainer = document.querySelector('.progress-bar-container');
    progressBarContainer.style.display = 'flex';
    const progressBar = document.getElementById('progress-bar');
    progressBar.value = (itemsToLoad / itemsLoaded) * 100;
    document.body.style.cursor = 'not-allowed';
  },
  () => { }
);

const gltfLoaders = new GLTFLoader(loadingManager);

//Change parts
function partsChange(child, num, name, grupo) {

  var valor1 = 0, valor2 = 0;
  if (grupo === "LEFT") {
    valor1 = copyModel.damageLeft[name].value1;
    valor2 = copyModel.damageLeft[name].value2;
  } else if (grupo === "RIGHT") {
    valor1 = copyModel.damageRight[name].value1;
    valor2 = copyModel.damageRight[name].value2;
  } else if (grupo === "TOP") {
    valor1 = copyModel.damageTop[name].value1;
    valor2 = copyModel.damageTop[name].value2;
  } else if (grupo === "BACK") {
    valor1 = copyModel.damageBack[name].value1;
    valor2 = copyModel.damageBack[name].value2;
  } else if (grupo === "FRONT") {
    valor1 = copyModel.damageFront[name].value1;
    valor2 = copyModel.damageFront[name].value2;
  }

  function statePart(grupo) {
    if (grupo === "LEFT") {
      copyModel.damageLeft[name].state = child.userData.colorState;

    } else if (grupo === "RIGHT") {
      copyModel.damageRight[name].state = child.userData.colorState;

    } else if (grupo === "TOP") {
      copyModel.damageTop[name].state = child.userData.colorState;

    } else if (grupo === "BACK") {
      copyModel.damageBack[name].state = child.userData.colorState;

    } else if (grupo === "FRONT") {
      copyModel.damageFront[name].state = child.userData.colorState;

    }
  }


  if (!child.userData.colorState) {
    child.userData.colorState = "Paint_1";
  }
  switch (child.userData.colorState) {
    case "Default":
      child.material.color.set(0x10100F);
      statePart(grupo)
      child.userData.colorState = "Paint_1";
      num -= valor2;
      break;
    case "Paint_1":
      child.material.color.set(0x181800);
      statePart(grupo)
      child.userData.colorState = "Paint_2";
      num += valor1;
      break;
    case "Paint_2":
      child.material.color.set(0x272700);
      statePart(grupo)
      child.userData.colorState = "Default";
      num -= valor1;
      num += valor2;
      break;
    default:
      break;
  }


  document.getElementById('fullAdd').innerHTML = num;
}



function rinChange(child, num, name) {
  var valor = copyModel.Rin[name].value;
  if (!child.userData.colorState) {
    child.userData.colorState = "Damage";
  }
  console.log(name)
  switch (child.userData.colorState) {
    case "Default":
      child.material.color.set(0xA29E94);
      num -= valor
      copyModel.Rin[name].state = child.userData.colorState;

      child.userData.colorState = "Damage";

      break;
    case "Damage":
      child.material.color.set(0x181800);
      copyModel.Rin[name].state = child.userData.colorState;
      num += valor;
      child.userData.colorState = "Default";

      break;
    default:
      break;
  }
  document.getElementById('fullAdd').innerHTML = num;
}

function lightChange(child, num, name) {
  var valor = copyModel.light[name].value;
  if (!child.userData.colorState) {
    child.userData.colorState = "Damage";
  }
  console.log(name)
  switch (child.userData.colorState) {
    case "Default":
      if(name === "FR" || name === "FL"){
        child.material.color.set(0x000000);
      }else{
        child.material.color.set(0x290503);
      }
      
      num -= valor
      copyModel.light[name].state = child.userData.colorState;

      child.userData.colorState = "Damage";

      break;
    case "Damage":
      if(name === "FR" || name === "FL"){
        child.material.color.set(0xFFFFFF);
      }else{
        child.material.color.set(0xFF3F2F);
      }
      copyModel.light[name].state = child.userData.colorState;
      num += valor;
      child.userData.colorState = "Default";

      break;
    default:
      break;
  }
  document.getElementById('fullAdd').innerHTML = num;
}


function updateColorsByGroup(scene, nombre, grupo, name) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      var num = parseInt(document.getElementById('fullAdd').textContent);
      const isCheckbox = child.material.name === "CHECKBOX";
      const isGroupMatch = child.material.name === `${nombre}_${grupo}`;
      const isRin = child.material.name === `${grupo}_${nombre}`;
      const isLight = child.material.name === `${grupo}_${nombre}`;

      if (isCheckbox || isGroupMatch) {
        partsChange(child, num, name, grupo)
      } else if (isRin && grupo === "Rin") {
        rinChange(child, num, name)
      }else if (isLight && grupo === "LIGHT") {
        lightChange(child, num, name)
      }
    }
  });
}

// Interaction with Models
function onTouch(event) {
  const touch = event.touches ? event.touches[0] : null;
  const clientX = touch ? touch.clientX : event.clientX;
  const clientY = touch ? touch.clientY : event.clientY;
  const normalizedX = (clientX / window.innerWidth) * 2 - 1;
  const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);

  const intersects = raycaster.intersectObjects(scene.children.filter(obj => !obj.userData.intangible));

  if (intersects.length) {
    const parent = intersects[0].object;
    const lista = parent.name.split("_");
    const grupo = lista[0];
    const nombre = lista[1];

    const grupos = ["LEFT", "RIGHT", "FRONT", "BACK", "TOP", "Rin", "LIGHT"];

    if (grupos.includes(grupo)) {
      //console.log(grupo)
      updateColorsByGroup(scene, nombre, grupo, nombre);
    }

    if (num < 0) {
      document.getElementById('fullAdd').innerHTML = '0';
    }
  }
}

window.addEventListener('click', onTouch);
window.addEventListener('touchend', onTouch);

// Pointer
function cursorPointer(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const mouseNormalizedX = (mouseX / window.innerWidth) * 2 - 1;
  const mouseNormalizedY = -(mouseY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(mouseNormalizedX, mouseNormalizedY), camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  document.body.style.cursor = 'auto';

  for (const intersect of intersects) {
    const validMaterials = ["BOXCHECKMARK", "CHECKMARK", "Rin_FR", "Rin_FL", "Rin_BL", "Rin_BR"];
    if (validMaterials.includes(intersect.object.material.name)) {
      document.body.style.cursor = 'pointer';
      return;
    }
  }
}

window.addEventListener('mousemove', cursorPointer);

// Animate the scene
const animate = () => {
  var stateElement = document.getElementById('state');
  var state = stateElement ? stateElement.textContent : 'stop';

  if (state === 'rotando') {
    orbitControls.autoRotate = true;
  }

  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();

// Scene Lights
const light1 = new THREE.DirectionalLight(0xffffff, 1.2);
light1.position.set(6, 6, 6);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 1.2);
light2.position.set(-6, 6, 6);
scene.add(light2);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
scene.add(ambientLight);


// Environment Map
const envMap = new THREE.CubeTextureLoader().load([
  './envmap/px.png',
  './envmap/nx.png',
  './envmap/py.png',
  './envmap/ny.png',
  './envmap/pz.png',
  './envmap/nz.png',
]);
scene.environment = envMap;

// Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

// Dismount and clean up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  currentRef.removeChild(renderer.domElement);
};

// Load groups
export const loadGroups = () => {
  scene.add(carParts.modelCar);
  scene.add(carParts.top);
  scene.add(carParts.front);
  scene.add(carParts.back);
  scene.add(carParts.left);
  scene.add(carParts.right);
};

// Load Models
export const loadModels = (rute, group, scale, name, value) => {
  gltfLoaders.load(rute, (gltf) => {
    while (gltf.scene.children.length) {
      const model = gltf.scene.children[0];
      model.name = name;
      model.value = value;
      carParts[group].add(model);
      carParts[group].scale.set(scale, scale, scale);
    }
  });
};

// Remove Models
export const removeModels = (rute, group, scale, name, value) => {
  const oldModels = new THREE.Group();

  while (carParts[group].children.length) {
    oldModels.add(carParts[group].children[0]);
  }

  // Remove
  while (carParts[group].children.length) {
    carParts[group].remove(carParts[group].children[0]);
  }

  loadModels(rute, group, scale, name, value);

  // Free up memory
  oldModels.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.dispose();
      child.geometry.dispose();
    }
  });
};

// Animation Move
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
        onUpdate: () => camera.updateProjectionMatrix(),
      },
      "-=1.0"
    );
};

