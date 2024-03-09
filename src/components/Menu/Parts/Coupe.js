export let Coupe = {
    name: "COUPE",
    scale: 1,
    modelCar: {
        group: "modelCar",
        rute: "./model/Modelo05/scene.gltf"
    },
    partes: ["LEFTDOORF", "LEFTDOORB", "RIGHTDOORF", "RIGHTDOORB", "ROOF", "HOOD", "TRUNK", "LIGHT", "Rin", "WINDOWFRAMEL", "WINDOWFRAMER","BUMPERF", "BUMPERB"],
    light: {
        FL: { name: 'FL',  state: "Default" },
        FR: { name: 'FR',  state: "Default" },
        BL: { name: 'BL',  state: "Default" },
        BR: { name: 'BR',  state: "Default" },
    },
    Rin: {
        FL: { name: 'FL',  state: "Default" },
        FR: { name: 'FR',  state: "Default" },
        BL: { name: 'BL',  state: "Default" },
        BR: { name: 'BR',  state: "Default" },
    },
    cotizacion: 0
};
