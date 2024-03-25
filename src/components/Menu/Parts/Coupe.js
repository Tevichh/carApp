export let Coupe = {
    name: "COUPE",
    scale: 1,
    color: 0x000000,
    modelCar: {
        group: "modelCar",
        rute: "./model/Modelo05/scene.gltf"
    },
    partes: ["LEFTDOOR", "RIGHTDOOR", "ROOF", "HOOD", "TRUNK", "LIGHT", "Rin", "WINDOWFRAMEL", "WINDOWFRAMER", "BUMPERF", "BUMPERB", "MIRRORL", "MIRRORR",
        "FENDERRF", "FENDERRB", "FENDERLF", "FENDERLB", "RUNBOARDL", "RUNBOARDR"],
    RIGHTDOOR: {
        P1: { name: "P1", state: 0, group: "RIGHTDOOR", allow: true },
        P2: { name: "P2", state: 0, group: "RIGHTDOOR", allow: true },
        P3: { name: "P3", state: 0, group: "RIGHTDOOR", allow: true },
        P4: { name: "P4", state: 0, group: "RIGHTDOOR", allow: true },
        P5: { name: "P5", state: 0, group: "RIGHTDOOR", allow: true }
    },
    LEFTDOOR: {
        P1: { name: "P1", state: 0, group: "LEFTDOOR", allow: true },
        P2: { name: "P2", state: 0, group: "LEFTDOOR", allow: true },
        P3: { name: "P3", state: 0, group: "LEFTDOOR", allow: true },
        P4: { name: "P4", state: 0, group: "LEFTDOOR", allow: true },
        P5: { name: "P5", state: 0, group: "LEFTDOOR", allow: true }
    },
    ROOF: {
        P1: { name: "P1", state: 0, group: "ROOF", allow: true },
        P2: { name: "P2", state: 0, group: "ROOF", allow: true },
        P3: { name: "P3", state: 0, group: "ROOF", allow: true },
        P4: { name: "P4", state: 0, group: "ROOF", allow: true },
        P5: { name: "P5", state: 0, group: "ROOF", allow: true }

    },
    HOOD: {
        P1: { name: "P1", state: 0, group: "HOOD", allow: true },
        P2: { name: "P2", state: 0, group: "HOOD", allow: true },
        P3: { name: "P3", state: 0, group: "HOOD", allow: true },
        P4: { name: "P4", state: 0, group: "HOOD", allow: true },
        P5: { name: "P5", state: 0, group: "HOOD", allow: true }

    },
    TRUNK: {
        P1: { name: "P1", state: 0, group: "TRUNK", allow: true },
        P2: { name: "P2", state: 0, group: "TRUNK", allow: true },
        P3: { name: "P3", state: 0, group: "TRUNK", allow: true },
        P4: { name: "P4", state: 0, group: "TRUNK", allow: true },
        P5: { name: "P5", state: 0, group: "TRUNK", allow: true }
    },
    BUMPERF: {
        P1: { name: "P1", state: 0, group: "BUMPERF", allow: true },
        P2: { name: "P2", state: 0, group: "BUMPERF", allow: true },
        P3: { name: "P3", state: 0, group: "BUMPERF", allow: true },
        P4: { name: "P4", state: 0, group: "BUMPERF", allow: true },
        P5: { name: "P5", state: 0, group: "BUMPERF", allow: true }
    },
    BUMPERB: {
        P1: { name: "P1", state: 0, group: "BUMPERB", allow: true },
        P2: { name: "P2", state: 0, group: "BUMPERB", allow: true },
        P3: { name: "P3", state: 0, group: "BUMPERB", allow: true },
        P4: { name: "P4", state: 0, group: "BUMPERB", allow: true },
        P5: { name: "P5", state: 0, group: "BUMPERB", allow: true }
    },
    FENDERRF: {
        P1: { name: "P1", state: 0, group: "FENDERRF", allow: true },
        P2: { name: "P2", state: 0, group: "FENDERRF", allow: true },
        P3: { name: "P3", state: 0, group: "FENDERRF", allow: true },
        P4: { name: "P4", state: 0, group: "FENDERRF", allow: true },
        P5: { name: "P5", state: 0, group: "FENDERRF", allow: true }
    },
    FENDERRB: {
        P1: { name: "P1", state: 0, group: "FENDERRB", allow: true },
        P2: { name: "P2", state: 0, group: "FENDERRB", allow: true },
        P3: { name: "P3", state: 0, group: "FENDERRB", allow: true },
        P4: { name: "P4", state: 0, group: "FENDERRB", allow: true },
        P5: { name: "P5", state: 0, group: "FENDERRB", allow: true }
    },
    FENDERLF: {
        P1: { name: "P1", state: 0, group: "FENDERLF", allow: true },
        P2: { name: "P2", state: 0, group: "FENDERLF", allow: true },
        P3: { name: "P3", state: 0, group: "FENDERLF", allow: true },
        P4: { name: "P4", state: 0, group: "FENDERLF", allow: true },
        P5: { name: "P5", state: 0, group: "FENDERLF", allow: true }
    },
    FENDERLB: {
        P1: { name: "P1", state: 0, group: "FENDERLB", allow: true },
        P2: { name: "P2", state: 0, group: "FENDERLB", allow: true },
        P3: { name: "P3", state: 0, group: "FENDERLB", allow: true },
        P4: { name: "P4", state: 0, group: "FENDERLB", allow: true },
        P5: { name: "P5", state: 0, group: "FENDERLB", allow: true }
    },
    RUNBOARDL: {
        P1: { name: "P1", state: 0, group: "RUNBOARDL", allow: true },
        P2: { name: "P2", state: 0, group: "RUNBOARDL", allow: true },
        P3: { name: "P3", state: 0, group: "RUNBOARDL", allow: true }
    },
    RUNBOARDR: {
        P1: { name: "P1", state: 0, group: "RUNBOARDR", allow: true },
        P2: { name: "P2", state: 0, group: "RUNBOARDR", allow: true },
        P3: { name: "P3", state: 0, group: "RUNBOARDR", allow: true }
    },
    light: {
        FL: { name: 'FL', state: 0 },
        FR: { name: 'FR', state: 0 },
        BL: { name: 'BL', state: 0 },
        BR: { name: 'BR', state: 0 },
    },
    Rin: {
        FL: { name: 'FL', state: 0 },
        FR: { name: 'FR', state: 0 },
        BL: { name: 'BL', state: 0 },
        BR: { name: 'BR', state: 0 },
    },
    WINDOWFRAMEL: {
        P1: { name: "P1", state: 0, group: "WINDOWFRAMEL", allow: true },
        P2: { name: "P2", state: 0, group: "WINDOWFRAMEL", allow: true },
        P3: { name: "P3", state: 0, group: "WINDOWFRAMEL", allow: true }
    },
    WINDOWFRAMER: {
        P1: { name: "P1", state: 0, group: "WINDOWFRAMER", allow: true },
        P2: { name: "P2", state: 0, group: "WINDOWFRAMER", allow: true },
        P3: { name: "P3", state: 0, group: "WINDOWFRAMER", allow: true }
    },
    MIRRORL: {
        P1: { name: "P1", state: 0, group: "MIRRORL", allow: true },
    },
    MIRRORR: {
        P1: { name: "P1", state: 0, group: "MIRRORR", allow: true },
    },

    cotizacion: 0
};
