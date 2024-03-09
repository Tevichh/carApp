import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from "gsap";
import { models } from "../Menu/carParts";
import { carColor } from "../Menu/carColor"

// Global variables
let currentRef = null;
var num = 0;
var copyModel = {};
var clickControl = false;

// Animation GSAP
const timeline = new gsap.timeline({ defaults: { duration: 1 } });

// CAR PARTS
export const carParts = {
  modelCar: new THREE.Group(),
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


  const containerClickHandler = async (event) => {
    var target = event.target;

    //Send Cost
    if (target.id === "SEND") {
      console.log(copyModel);
      
      const requestBody = copyModel;

      const response = await fetch('https://api.example.com/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
      if (responseData.status) {
        window.location.href = responseData.href;
      }else{
        alert("OCURRIO UN ERROR");
      }
    }
  }


  document.body.addEventListener('click', containerClickHandler);
});


export const loadProducts = async (name, color, capa) => {
  console.log(name, color, capa);
  const model = models.find(model => model.name === name);
  copyModel = model;

  const colorModel = Object.entries(carColor).find(([colorName, _]) => colorName === color);
  copyModel.color = colorModel[1]

}

export const allowClick = async (allow) => {
  if (allow) {
    clickControl = true;
  } else {
    clickControl = false;
  }
}


// Loader
var progressBarContainer = document.querySelector('.progress-bar-container');
const loadingManager = new THREE.LoadingManager(
  () => {
    progressBarContainer = document.querySelector('.progress-bar-container');
    progressBarContainer.style.display = 'none';
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const childDivided = child.name.split("_");
        const part = childDivided[0];
        const point = childDivided[1]


        const partes = copyModel.partes;

        if (partes.includes(part) && part !== "Rin" && part !== "LIGHT") {
          const damageState = copyModel[part][point].state;
          switch (damageState) {
            case "Default":
              child.material.color.set(copyModel.color);
              break;
            case "Paint_1":
              child.material.color.set(0x181800);
              break;
            case "Paint_2":
              child.material.color.set(0x272700);
              break;
            default:
              break;
          }
        }


        else if (part === "Rin") {
          switch (copyModel[part][childDivided[1]].state) {
            case "Default":
              child.material.color.set(0xA29E94);
              break;
            case "Damage":
              child.material.color.set(0x181800);

              break;
            default:
              break;
          }
        }

        else if (part === "LIGHT") {
          switch (copyModel.light[childDivided[1]].state) {
            case "Default":
              child.material.color.set(childDivided[1] === "FR" || childDivided[1] === "FL" ? 0x000000 : 0x290503);
              break;
            case "Damage":
              child.material.color.set(childDivided[1] === "FR" || childDivided[1] === "FL" ? 0xFFFFFF : 0xFF3F2F);
              break;
            default:
              break;
          }
        }


      }
    });


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
function partsChange(child, name, grupo) {

  const option = copyModel[grupo][name].state
  const damageState = option === "Default" ? "Paint_1" : option === "Paint_1" ? "Paint_2" : "Default";

  switch (damageState) {
    case "Default":
      child.material.color.set(copyModel.color);
      break;
    case "Paint_1":
      child.material.color.set(0x181800);
      break;
    case "Paint_2":
      child.material.color.set(0x272700);
      break;
    default:
      break;
  }

  copyModel[grupo][name].state = damageState;

}




function rinChange(child, name) {

  child.userData.colorState = copyModel.Rin[name].state === "Default" ? "Damage" : "Default";
  console.log(name)

  switch (child.userData.colorState) {
    case "Default":
      child.material.color.set(0xA29E94);
      break;
    case "Damage":
      child.material.color.set(0x181800);
      break;
    default:
      break;
  }

  copyModel.Rin[name].state = child.userData.colorState;
}


function lightChange(child, name) {

  child.userData.colorState = copyModel.light[name].state === "Default" ? "Damage" : "Default";

  switch (child.userData.colorState) {
    case "Default":
      child.material.color.set(name === "FR" || name === "FL" ? 0x000000 : 0x290503);
      break;
    case "Damage":
      child.material.color.set(name === "FR" || name === "FL" ? 0xFFFFFF : 0xFF3F2F);
      break;
    default:
      break;
  }

  copyModel.light[name].state = child.userData.colorState;
  document.getElementById('fullAdd').innerHTML = num;
}



function updateColorsByGroup(scene, nombre, grupo) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const isGroupMatch = child.material.name === `${nombre}_${grupo}`;
      const isRin = child.material.name === `${grupo}_${nombre}`;
      const isLight = child.material.name === `${grupo}_${nombre}`;

      if (isGroupMatch) {
        partsChange(child, nombre, grupo)
      } else if (isRin && grupo === "Rin") {
        rinChange(child, nombre)
      } else if (isLight && grupo === "LIGHT") {
        lightChange(child, nombre)
      }
    }
  });
}

// Interaction with Models
function onTouch(event) {
  if (clickControl) {
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

      const grupos = copyModel.partes;

      if (grupos.includes(grupo)) {
        if (grupo === "Rin" || grupo === "LIGHT") {
          updateColorsByGroup(scene, nombre, grupo);
        }

        else if (nombre === "P1") {
          const preState = copyModel[grupo][nombre].state;
          for (let x in copyModel[grupo]) {

            if (x !== "P1" && copyModel[grupo][nombre].state !== "Default") {
              copyModel[grupo][x].allow = false;
              copyModel[grupo][x].state = preState;
            } else {
              copyModel[grupo][x].allow = true;
            }

            updateColorsByGroup(scene, copyModel[grupo][x].name, grupo);
          }
        } else if (copyModel[grupo][nombre].allow) {
          updateColorsByGroup(scene, nombre, grupo);
        }
      }

    }
  }
}

window.addEventListener('click', onTouch);
window.addEventListener('touchend', onTouch);

// Pointer
function cursorPointer(event) {
  document.body.style.cursor = 'auto';
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
  for (let x in copyModel.partes) {
    console.log(x)
  }
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

