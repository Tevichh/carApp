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
//scene.background = new THREE.Color(0x000505)192028
scene.background = new THREE.Color(0x021013)

const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(7.3, 2.1, 4.7);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

//TEXTURELOADER

//const textureLoader = new THREE.TextureLoader();

const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
grid.material.opacity = 0.2;
grid.material.depthWrite = false;
grid.material.transparent = true;
grid.userData.intangible = true;
scene.add(grid);


//OrbitControls
export const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = THREE.MathUtils.degToRad(80);


//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//LOADER
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
)


const gltfLoaders = new GLTFLoader(loadingManager)



//INTERACCION modelos

function onTouch(event) {
 
  const touch = event.touches ? event.touches[0] : null;

  // Obtén las coordenadas del evento (táctil o clic)
  const clientX = touch ? touch.clientX : event.clientX;
  const clientY = touch ? touch.clientY : event.clientY;

  // Normaliza las coordenadas para el raycaster
  const normalizedX = (clientX / window.innerWidth) * 2 - 1;
  const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(normalizedX, normalizedY), camera);

  // Intersecta objetos en la escena
  const intersects = raycaster.intersectObjects(
    scene.children.filter(obj => !obj.userData.intangible)
  );

  // Maneja la intersección si la hay
  if (intersects.length) {
    const parent = intersects[0].object;
    const lista = parent.name.split("_");
    const grupo = lista[0];
    const nombre = lista[1];

    if (grupo === 'LEFT') {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material.name === "CHECKBOX" || child.material.name === nombre) {
            if (!child.userData.colorState) { child.userData.colorState = "Paint_1" }
            switch (child.userData.colorState) {
              case "Default":
                child.material.color.set(0x10100F);
                child.userData.colorState = "Paint_1";
                break;
              case "Paint_1":
                child.material.color.set(0xFF0000);
                child.userData.colorState = "Paint_2";
                break;
              case "Paint_2":
                child.material.color.set(0x00FF00);
                child.userData.colorState = "Default";
                break;
              default:
                break;
            }
          }
        }
      });
    }
    if (num < 0) {
      document.getElementById('fullAdd').innerHTML = '0';
    }
  }
}


window.addEventListener('click', onTouch);
window.addEventListener('touchstart', onTouch);
window.addEventListener('touchmove', onTouch);
window.addEventListener('touchend', onTouch);







//POINTER
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
    if (intersect.object.material.name === "BOXCHECKMARK" ||
      intersect.object.material.name === "CHECKMARK" ||
      intersect.object.material.name === "Rin_FR" ||
      intersect.object.material.name === "Rin_FL" ||
      intersect.object.material.name === "Rin_BL" ||
      intersect.object.material.name === "Rin_BR") {

      document.body.style.cursor = 'pointer';
      return;
    }
  }
}

window.addEventListener('mousemove', cursorPointer);






var num = 0;



//Animate the scene
const animate = () => {
  var stateElement = document.getElementById('state')
  var state = stateElement ? stateElement.textContent : 'stop'

  if (state === 'rotando') {
    orbitControls.autoRotate = true
  }

  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);



};
animate();


//SCENELIGHTS

const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
light1.position.set(6, 6, 6)
scene.add(light1)

const light2 = new THREE.DirectionalLight(0xffffff, 1.2)
light2.position.set(-6, 6, 6)
scene.add(light2)

const light = new THREE.AmbientLight(0xFFFFFF, 1.2)
scene.add(light)

//CARLIGHTS
export const frontRL = new THREE.SpotLight(0xff8000, 30, 3.3, 0.29)
frontRL.position.set(0.9, 1.2, 4.5);
scene.add(frontRL)

export const frontLL = new THREE.SpotLight(0xff8000, 30, 3.3, 0.29)
frontLL.position.set(-0.9, 1.2, 4.5);
scene.add(frontLL)

export const backRL = new THREE.SpotLight(0xff8000, 30, 3.3, 0.29)
backRL.position.set(0.9, 1.2, -4.5);
scene.add(backRL)

export const backLL = new THREE.SpotLight(0xff8000, 30, 3.3, 0.29)
backLL.position.set(-0.9, 1.2, -4.5);
scene.add(backLL)




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

