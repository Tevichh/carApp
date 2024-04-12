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

//Options var
const opPartDefault = 0;
const opPartFirtsDmg = 1;
const opPartSencondDmg = 2;

const opRinDefault = 0;
const opRinDmg = 1;

const opLightDefault = 0;
const opLightDmg = 1;

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
orbitControls.enableZoom = true;
orbitControls.enablePan = false;
orbitControls.maxPolarAngle = THREE.MathUtils.degToRad(80);
orbitControls.maxDistance = 10;
orbitControls.minDistance = 3;

// Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);


//DATA BASE
function lista() {
  var id = "3";
  fetch("https://itpa-sigtac.com/webgo/controlador/consultarCotizacion.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'ID=' + id
  }).then(function (resp) {
    return resp.text();
  }).then(function (data) {
    var valores = eval(data);

    //console.log('Respuesta:', valores[6]);
    let parts = valores[6];
    const rechazo = ["MODELO", "ID", "ITEM", "ESTADO"]

    const nameModelo = parts["MODELO"]

    let posicion = Object.keys(models).findIndex(key => models[key].name === nameModelo);

    console.log(models[posicion])

    for (const key in parts) {

      let keys = key.split("_");
      let mPart = keys[0];
      let mPoint = keys[1]
      let mValue = parts[key];

      if (!rechazo.includes(mPart)) {

        //console.log(mPart);
        if (mValue !== "0") {
          console.log(mPart + "-" + mPoint + ": " + mValue);
          models[posicion][mPart][mPoint].state = (parseInt(mValue) < 3 && parseInt(mValue) > 0) ? parseInt(mValue) : 0;
        }

      }

    }


  }).catch(function (error) {
    console.error('Error:', error);
  });
}

lista();

//Dom Events
document.addEventListener('DOMContentLoaded', function () {


  const containerClickHandler = async (event) => {
    var target = event.target;

    //Send Cost
    if (target.id === "SEND" && copyModel.name) {
      console.log(copyModel);
      var query = window.location.search.substring(1);
      var cc = query.split("=");
      var id = cc[1];
      if (cc.length <= 1) {
        alert("Falta query parameter");
      } else {
        alert(id);

        let data = 'ID=' + id + '&ESTADO=1&MODELO=' + copyModel.name
          + '&BUMPERB_P1=' + copyModel.BUMPERB.P1.state
          + '&BUMPERB_P2=' + copyModel.BUMPERB.P2.state
          + '&BUMPERB_P3=' + copyModel.BUMPERB.P3.state
          + '&BUMPERB_P4=' + copyModel.BUMPERB.P4.state
          + '&BUMPERB_P5=' + copyModel.BUMPERB.P5.state
          + '&BUMPERF_P1=' + copyModel.BUMPERF.P1.state
          + '&BUMPERF_P2=' + copyModel.BUMPERF.P2.state
          + '&BUMPERF_P3=' + copyModel.BUMPERF.P3.state
          + '&BUMPERF_P4=' + copyModel.BUMPERF.P4.state
          + '&BUMPERF_P5=' + copyModel.BUMPERF.P5.state
          + '&FENDERLB_P1=' + copyModel.FENDERLB.P1.state
          + '&FENDERLB_P2=' + copyModel.FENDERLB.P2.state
          + '&FENDERLB_P3=' + copyModel.FENDERLB.P3.state
          + '&FENDERLB_P4=' + copyModel.FENDERLB.P4.state
          + '&FENDERLB_P5=' + copyModel.FENDERLB.P5.state
          + '&FENDERLF_P1=' + copyModel.FENDERLF.P1.state
          + '&FENDERLF_P2=' + copyModel.FENDERLF.P2.state
          + '&FENDERLF_P3=' + copyModel.FENDERLF.P3.state
          + '&FENDERLF_P4=' + copyModel.FENDERLF.P4.state
          + '&FENDERLF_P5=' + copyModel.FENDERLF.P5.state
          + '&FENDERRB_P1=' + copyModel.FENDERRB.P1.state
          + '&FENDERRB_P2=' + copyModel.FENDERRB.P2.state
          + '&FENDERRB_P3=' + copyModel.FENDERRB.P3.state
          + '&FENDERRB_P4=' + copyModel.FENDERRB.P4.state
          + '&FENDERRB_P5=' + copyModel.FENDERRB.P5.state
          + '&FENDERRF_P1=' + copyModel.FENDERRF.P1.state
          + '&FENDERRF_P2=' + copyModel.FENDERRF.P2.state
          + '&FENDERRF_P3=' + copyModel.FENDERRF.P3.state
          + '&FENDERRF_P4=' + copyModel.FENDERRF.P4.state
          + '&FENDERRF_P5=' + copyModel.FENDERRF.P5.state
          + '&HOOD_P1=' + copyModel.HOOD.P1.state
          + '&HOOD_P2=' + copyModel.HOOD.P2.state
          + '&HOOD_P3=' + copyModel.HOOD.P3.state
          + '&HOOD_P4=' + copyModel.HOOD.P4.state
          + '&HOOD_P5=' + copyModel.HOOD.P5.state
          + '&LEFTDOORB_P1=' + copyModel.LEFTDOORB.P1.state
          + '&LEFTDOORB_P2=' + copyModel.LEFTDOORB.P2.state
          + '&LEFTDOORB_P3=' + copyModel.LEFTDOORB.P3.state
          + '&LEFTDOORB_P4=' + copyModel.LEFTDOORB.P4.state
          + '&LEFTDOORB_P5=' + copyModel.LEFTDOORB.P5.state
          + '&LEFTDOORF_P1=' + copyModel.LEFTDOORF.P1.state
          + '&LEFTDOORF_P2=' + copyModel.LEFTDOORF.P2.state
          + '&LEFTDOORF_P3=' + copyModel.LEFTDOORF.P3.state
          + '&LEFTDOORF_P4=' + copyModel.LEFTDOORF.P4.state
          + '&LEFTDOORF_P5=' + copyModel.LEFTDOORF.P5.state
          + '&LIGHT_BL=' + copyModel.light.BL.state
          + '&LIGHT_BR=' + copyModel.light.BR.state
          + '&LIGHT_FL=' + copyModel.light.FL.state
          + '&LIGHT_FR=' + copyModel.light.FR.state
          + '&MIRRORL_P1=' + copyModel.MIRRORL.P1.state
          + '&MIRRORR_P1=' + copyModel.MIRRORR.P1.state
          + '&RIGHTDOORB_P1=' + copyModel.RIGHTDOORB.P1.state
          + '&RIGHTDOORB_P2=' + copyModel.RIGHTDOORB.P2.state
          + '&RIGHTDOORB_P3=' + copyModel.RIGHTDOORB.P3.state
          + '&RIGHTDOORB_P4=' + copyModel.RIGHTDOORB.P4.state
          + '&RIGHTDOORB_P5=' + copyModel.RIGHTDOORB.P5.state
          + '&RIGHTDOORF_P1=' + copyModel.RIGHTDOORF.P1.state
          + '&RIGHTDOORF_P2=' + copyModel.RIGHTDOORF.P2.state
          + '&RIGHTDOORF_P3=' + copyModel.RIGHTDOORF.P3.state
          + '&RIGHTDOORF_P4=' + copyModel.RIGHTDOORF.P4.state
          + '&RIGHTDOORF_P5=' + copyModel.RIGHTDOORF.P5.state
          + '&RIN_BL=' + copyModel.Rin.BL.state
          + '&RIN_BR=' + copyModel.Rin.BR.state
          + '&RIN_FL=' + copyModel.Rin.FL.state
          + '&RIN_FR=' + copyModel.Rin.FR.state
          + '&ROOF_P1=' + copyModel.ROOF.P1.state
          + '&ROOF_P2=' + copyModel.ROOF.P2.state
          + '&ROOF_P3=' + copyModel.ROOF.P3.state
          + '&ROOF_P4=' + copyModel.ROOF.P4.state
          + '&ROOF_P5=' + copyModel.ROOF.P5.state
          + '&RUNBOARDL_P1=' + copyModel.RUNBOARDL.P1.state
          + '&RUNBOARDL_P2=' + copyModel.RUNBOARDL.P2.state
          + '&RUNBOARDL_P3=' + copyModel.RUNBOARDL.P3.state
          + '&RUNBOARDR_P1=' + copyModel.RUNBOARDR.P1.state
          + '&RUNBOARDR_P2=' + copyModel.RUNBOARDR.P2.state
          + '&RUNBOARDR_P3=' + copyModel.RUNBOARDR.P3.state
          + '&TRUNK_P1=' + copyModel.TRUNK.P1.state
          + '&TRUNK_P2=' + copyModel.TRUNK.P2.state
          + '&TRUNK_P3=' + copyModel.TRUNK.P3.state
          + '&TRUNK_P4=' + copyModel.TRUNK.P4.state
          + '&TRUNK_P5=' + copyModel.TRUNK.P5.state
          + '&WINDOWFRAMEL_P1=' + copyModel.WINDOWFRAMEL.P1.state
          + '&WINDOWFRAMEL_P2=' + copyModel.WINDOWFRAMEL.P2.state
          + '&WINDOWFRAMEL_P3=' + copyModel.WINDOWFRAMEL.P3.state
          + '&WINDOWFRAMER_P1=' + copyModel.WINDOWFRAMER.P1.state
          + '&WINDOWFRAMER_P2=' + copyModel.WINDOWFRAMER.P2.state
          + '&WINDOWFRAMER_P3=' + copyModel.WINDOWFRAMER.P3.state;

        console.log(data);


        fetch('https://itpa-sigtac.com/webgo/controlador/actualizarCotizacion.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data
        }).then(function (response) {
          if (response.ok) {
            alert('Actualización exitosa');
          } else {
            alert('Hubo un error al actualizar');
          }
        }).catch(function (error) {
          console.error('Error en la solicitud:', error);
        });

      }


    }
  }


  document.body.addEventListener('click', containerClickHandler);
});

//LOAD MODEL
export const loadProducts = async (name, color, capa) => {
  console.log(name, color, capa);
  const model = models.find(model => model.name === name);
  copyModel = model;

  const colorModel = Object.entries(carColor).find(([colorName, _]) => colorName === color);
  copyModel.color = colorModel[1]

  //copyModel.BUMPERF.P1.state = valores[6].BUMPERFP1;

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
        //console.log(childDivided)

        if (partes.includes(part) && part !== "Rin" && part !== "LIGHT") {
          const damageState = copyModel[part][point].state;

          if (point === "P1" && damageState !== opPartDefault) {
            for (let xPoint in copyModel[part]) {
              if (xPoint !== "P1") {
                copyModel[part][xPoint].state = copyModel[part][point].state;
                copyModel[part][xPoint].allow = false;
              }

            }
          }

          switch (damageState) {
            case opPartDefault:
              child.material.color.set(copyModel.color);
              break;
            case opPartFirtsDmg:
              child.material.color.set(0x181800);
              break;
            case opPartSencondDmg:
              child.material.color.set(0x272700);
              break;
            default:
              break;
          }


        }


        else if (part === "Rin") {
          switch (copyModel[part][childDivided[1]].state) {
            case opRinDefault:
              child.material.color.set(0xA29E94);
              break;
            case opRinDmg:
              child.material.color.set(0x181800);

              break;
            default:
              break;
          }
        }

        else if (part === "LIGHT") {
          switch (copyModel.light[childDivided[1]].state) {
            case opLightDefault:
              child.material.color.set(childDivided[1] === "FR" || childDivided[1] === "FL" ? 0x000000 : 0x290503);
              break;
            case opLightDmg:
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
  const damageState = option === opPartDefault ? opPartFirtsDmg : option === opPartFirtsDmg ? opPartSencondDmg : opPartDefault;

  switch (damageState) {
    case opPartDefault:
      child.material.color.set(copyModel.color);
      break;
    case opPartFirtsDmg:
      child.material.color.set(0x181800);
      break;
    case opPartSencondDmg:
      child.material.color.set(0x272700);
      break;
    default:
      break;
  }

  copyModel[grupo][name].state = damageState;

}




function rinChange(child, name) {

  child.userData.colorState = copyModel.Rin[name].state === opRinDefault ? opRinDmg : opRinDefault;
  console.log(name)

  switch (child.userData.colorState) {
    case opRinDefault:
      child.material.color.set(0xA29E94);
      break;
    case opRinDmg:
      child.material.color.set(0x181800);
      break;
    default:
      break;
  }

  copyModel.Rin[name].state = child.userData.colorState;
}


function lightChange(child, name) {

  child.userData.colorState = copyModel.light[name].state === opLightDefault ? opLightDmg : opLightDefault;

  switch (child.userData.colorState) {
    case opLightDefault:
      child.material.color.set(name === "FR" || name === "FL" ? 0x000000 : 0x290503);
      break;
    case opLightDmg:
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

            if (x !== "P1" && copyModel[grupo][nombre].state !== opPartDefault) {
              copyModel[grupo][x].allow = false;
              copyModel[grupo][x].state = preState;
            } else {
              copyModel[grupo][x].allow = true;
            }

            updateColorsByGroup(scene, copyModel[grupo][x].name, grupo);

            if (x !== "P1") {
              copyModel[grupo][x].state = opPartDefault;
              if (copyModel[grupo][nombre].state === opPartDefault) {
                copyModel[grupo][x].state = opPartSencondDmg;
                updateColorsByGroup(scene, copyModel[grupo][x].name, grupo);
              }
            }
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

function arraysIguales(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

let partesListaAnterior = []
// Animate the scene
const animate = () => {
  var stateElement = document.getElementById('state');
  var state = stateElement ? stateElement.textContent : 'stop';

  if (state === 'rotando') {
    orbitControls.autoRotate = true;
  }

  let partesLista = [];
  if (copyModel.partes) {
    for (let parte of copyModel.partes) {
      for (let p in copyModel[parte]) {
        if (copyModel[parte][p].state !== opPartDefault) {
          partesLista.push(`${copyModel[parte][p].group}_${copyModel[parte][p].name}_${copyModel[parte][p].state}`);
        }
      }
    }
  }

  // Comparar y imprimir cambios en la lista
  if (!arraysIguales(partesLista, partesListaAnterior)) {
    /* console.log("Lista de partes actualizada:");
    partesLista.forEach(parte => console.log(parte)); */
    partesListaAnterior = partesLista.slice(); // Copiar la lista para evitar modificar la original

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

