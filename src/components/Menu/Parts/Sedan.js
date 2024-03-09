export let Sedan = {
    name: "SEDAN",
    scale: 0.08,
    color: 0x000000,
    partes: ["LEFTDOORF", "LEFTDOORB", "RIGHTDOORF", "RIGHTDOORB", "ROOF", "HOOD", "TRUNK", "LIGHT", "Rin", "WINDOWFRAMEL",
        "WINDOWFRAMER", "BUMPERF", "BUMPERB", "FENDERRF", "FENDERRB", "FENDERLF", "FENDERLB", "MIRRORL", "MIRRORR", "RUNBOARDL", "RUNBOARDR"],
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
    RIGHTDOORB: {
        P1: { name: "P1", state: "Default", group: "RIGHTDOORB", allow: true },
        P2: { name: "P2", state: "Default", group: "RIGHTDOORB", allow: true },
        P3: { name: "P3", state: "Default", group: "RIGHTDOORB", allow: true },
        P4: { name: "P4", state: "Default", group: "RIGHTDOORB", allow: true },
        P5: { name: "P5", state: "Default", group: "RIGHTDOORB", allow: true }
    },
    LEFTDOORF: {
        P1: { name: "P1", state: "Default", group: "LEFTDOORF", allow: true },
        P2: { name: "P2", state: "Default", group: "LEFTDOORF", allow: true },
        P3: { name: "P3", state: "Default", group: "LEFTDOORF", allow: true },
        P4: { name: "P4", state: "Default", group: "LEFTDOORF", allow: true },
        P5: { name: "P5", state: "Default", group: "LEFTDOORF", allow: true }
    },
    LEFTDOORB: {
        P1: { name: "P1", state: "Default", group: "LEFTDOORB", allow: true },
        P2: { name: "P2", state: "Default", group: "LEFTDOORB", allow: true },
        P3: { name: "P3", state: "Default", group: "LEFTDOORB", allow: true },
        P4: { name: "P4", state: "Default", group: "LEFTDOORB", allow: true },
        P5: { name: "P5", state: "Default", group: "LEFTDOORB", allow: true }
    },
    ROOF: {
        P1: { name: "P1", state: "Default", group: "ROOF", allow: true },
        P2: { name: "P2", state: "Default", group: "ROOF", allow: true },
        P3: { name: "P3", state: "Default", group: "ROOF", allow: true },
        P4: { name: "P4", state: "Default", group: "ROOF", allow: true },
        P5: { name: "P5", state: "Default", group: "ROOF", allow: true }

    },
    HOOD: {
        P1: { name: "P1", state: "Default", group: "HOOD", allow: true },
        P2: { name: "P2", state: "Default", group: "HOOD", allow: true },
        P3: { name: "P3", state: "Default", group: "HOOD", allow: true },
        P4: { name: "P4", state: "Default", group: "HOOD", allow: true },
        P5: { name: "P5", state: "Default", group: "HOOD", allow: true }

    },
    TRUNK: {
        P1: { name: "P1", state: "Default", group: "TRUNK", allow: true },
        P2: { name: "P2", state: "Default", group: "TRUNK", allow: true },
        P3: { name: "P3", state: "Default", group: "TRUNK", allow: true },
        P4: { name: "P4", state: "Default", group: "TRUNK", allow: true },
        P5: { name: "P5", state: "Default", group: "TRUNK", allow: true }
    },
    BUMPERF: {
        P1: { name: "P1", state: "Default", group: "BUMPERF", allow: true },
        P2: { name: "P2", state: "Default", group: "BUMPERF", allow: true },
        P3: { name: "P3", state: "Default", group: "BUMPERF", allow: true },
        P4: { name: "P4", state: "Default", group: "BUMPERF", allow: true },
        P5: { name: "P5", state: "Default", group: "BUMPERF", allow: true }
    },
    BUMPERB: {
        P1: { name: "P1", state: "Default", group: "BUMPERB", allow: true },
        P2: { name: "P2", state: "Default", group: "BUMPERB", allow: true },
        P3: { name: "P3", state: "Default", group: "BUMPERB", allow: true },
        P4: { name: "P4", state: "Default", group: "BUMPERB", allow: true },
        P5: { name: "P5", state: "Default", group: "BUMPERB", allow: true }
    },
    FENDERRF: {
        P1: { name: "P1", state: "Default", group: "FENDERRF", allow: true },
        P2: { name: "P2", state: "Default", group: "FENDERRF", allow: true },
        P3: { name: "P3", state: "Default", group: "FENDERRF", allow: true },
        P4: { name: "P4", state: "Default", group: "FENDERRF", allow: true },
        P5: { name: "P5", state: "Default", group: "FENDERRF", allow: true }
    },
    FENDERRB: {
        P1: { name: "P1", state: "Default", group: "FENDERRB", allow: true },
        P2: { name: "P2", state: "Default", group: "FENDERRB", allow: true },
        P3: { name: "P3", state: "Default", group: "FENDERRB", allow: true },
        P4: { name: "P4", state: "Default", group: "FENDERRB", allow: true },
        P5: { name: "P5", state: "Default", group: "FENDERRB", allow: true }
    },
    FENDERLF: {
        P1: { name: "P1", state: "Default", group: "FENDERLF", allow: true },
        P2: { name: "P2", state: "Default", group: "FENDERLF", allow: true },
        P3: { name: "P3", state: "Default", group: "FENDERLF", allow: true },
        P4: { name: "P4", state: "Default", group: "FENDERLF", allow: true },
        P5: { name: "P5", state: "Default", group: "FENDERLF", allow: true }
    },
    FENDERLB: {
        P1: { name: "P1", state: "Default", group: "FENDERLB", allow: true },
        P2: { name: "P2", state: "Default", group: "FENDERLB", allow: true },
        P3: { name: "P3", state: "Default", group: "FENDERLB", allow: true },
        P4: { name: "P4", state: "Default", group: "FENDERLB", allow: true },
        P5: { name: "P5", state: "Default", group: "FENDERLB", allow: true }
    },
    RUNBOARDL: {
        P1: { name: "P1", state: "Default", group: "RUNBOARDL", allow: true },
        P2: { name: "P2", state: "Default", group: "RUNBOARDL", allow: true },
        P3: { name: "P3", state: "Default", group: "RUNBOARDL", allow: true }
    },
    RUNBOARDR: {
        P1: { name: "P1", state: "Default", group: "RUNBOARDR", allow: true },
        P2: { name: "P2", state: "Default", group: "RUNBOARDR", allow: true },
        P3: { name: "P3", state: "Default", group: "RUNBOARDR", allow: true }
    },
    WINDOWFRAMEL: {
        P1: { name: "P1", state: "Default", group: "WINDOWFRAMEL", allow: true },
        P2: { name: "P2", state: "Default", group: "WINDOWFRAMEL", allow: true },
        P3: { name: "P3", state: "Default", group: "WINDOWFRAMEL", allow: true }
    },
    WINDOWFRAMER: {
        P1: { name: "P1", state: "Default", group: "WINDOWFRAMER", allow: true },
        P2: { name: "P2", state: "Default", group: "WINDOWFRAMER", allow: true },
        P3: { name: "P3", state: "Default", group: "WINDOWFRAMER", allow: true }
    },
    light: {
        FL: { name: 'FL', state: "Default" },
        FR: { name: 'FR', state: "Default" },
        BL: { name: 'BL', state: "Default" },
        BR: { name: 'BR', state: "Default" },
    },
    Rin: {
        FL: { name: 'FL', state: "Default" },
        FR: { name: 'FR', state: "Default" },
        BL: { name: 'BL', state: "Default" },
        BR: { name: 'BR', state: "Default" },
    },
    MIRRORL: {
        P1: { name: "P1", state: "Default", group: "MIRRORL", allow: true },
    },
    MIRRORR: {
        P1: { name: "P1", state: "Default", group: "MIRRORR", allow: true },
    },
    cotizacion: 0
};
