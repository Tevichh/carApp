export let Sedan = {
    name: "SEDAN",
    scale: 0.08,
    color: 0x000000,
    partes: ["RIGHTDOORF"],
    modelCar: {
        group: "modelCar",
        rute: "./model/Modelo01/sedan.gltf",
    },
    RIGHTDOORF: {
        P1: { name: "P1", state: "Default", group: "RIGHTDOORF", allow: true },
        P2: { name: "P2", state: "Default", group: "RIGHTDOORF", allow: true },
        P3: { name: "P3", state: "Default", group: "RIGHTDOORF", allow: true },
        P4: { name: "P4", state: "Default", group: "RIGHTDOORF", allow: true },
        P5: { name: "P5", state: "Default", group: "RIGHTDOORF", allow: true }
    },
    light: {
        FL: { name: 'FL', value: 0, state: "Default" },
        FR: { name: 'FR', value: 0, state: "Default" },
        BL: { name: 'BL', value: 0, state: "Default" },
        BR: { name: 'BR', value: 0, state: "Default" },
    },
    Rin: {
        FL: { name: 'FL', value: 0, state: "Default" },
        FR: { name: 'FR', value: 0, state: "Default" },
        BL: { name: 'BL', value: 0, state: "Default" },
        BR: { name: 'BR', value: 40, state: "Default" },
    },
    cotizacion: 0
};
