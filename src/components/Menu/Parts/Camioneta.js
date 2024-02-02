export const Camioneta = {
    name: "CAMIONETA",
    scale: 1.8,
    modelCar: {
      group: "modelCar",
      rute: "./model/Modelo04/scene.gltf"
    },
    rutes: {
      ruteT: "./model/Modelo04/top.gltf",
      ruteF: "./model/Modelo04/front.gltf",
      ruteB: "./model/Modelo04/back.gltf",
      ruteR: "./model/Modelo04/right.gltf",
      ruteL: "./model/Modelo04/left.gltf"
    },
    damageTop: {
      P1: { name: 'P1', group: 'top', value: 0 },
      P2: { name: 'P2', group: 'top', value: 0 },
      P3: { name: 'P3', group: 'top', value: 0 },
      P4: { name: 'P4', group: 'top', value: 0 },
      P5: { name: 'P5', group: 'top', value: 0 },
      P6: { name: 'P6', group: 'top', value: 0 },
      P7: { name: 'P7', group: 'top', value: 0 },
      P8: { name: 'P8', group: 'top', value: 0 },
      P9: { name: 'P9', group: 'top', value: 0 },
      P10: { name: 'P10', group: 'top', value: 0 },
      P11: { name: 'P11', group: 'top', value: 0 },
      P12: { name: 'P12', group: 'top', value: 0 }
    },
    damageFront: {
      P1: { name: 'P1', group: 'front', value: 0 },
      P2: { name: 'P2', group: 'front', value: 0 },
      P3: { name: 'P3', group: 'front', value: 0 }
    },
    damageBack: {
      P1: { name: 'P1', group: 'back', value: 0 },
      P2: { name: 'P2', group: 'back', value: 0 },
      P3: { name: 'P3', group: 'back', value: 0 },
      P4: { name: 'P4', group: 'back', value: 0 },
      P5: { name: 'P5', group: 'back', value: 0 },
      P6: { name: 'P6', group: 'back', value: 0 },
      P7: { name: 'P7', group: 'back', value: 0 },
      P8: { name: 'P8', group: 'back', value: 0 }
    },
    damageLeft: {
      P1: { name: 'P1', group: 'left', value: 0 },
      P2: { name: 'P2', group: 'left', value: 0 },
      P3: { name: 'P3', group: 'left', value: 0 },
      P4: { name: 'P4', group: 'left', value: 0 },
      P5: { name: 'P5', group: 'left', value: 0 },
      P6: { name: 'P6', group: 'left', value: 0 },
      P7: { name: 'P7', group: 'left', value: 0 },
      P8: { name: 'P8', group: 'left', value: 0 },
      P9: { name: 'P9', group: 'left', value: 0 },
      P10: { name: 'P10', group: 'left', value: 0 },
      P11: { name: 'P11', group: 'left', value: 0 },
      P12: { name: 'P12', group: 'left', value: 0 },
      P13: { name: 'P13', group: 'left', value: 0 },
      P14: { name: 'P14', group: 'left', value: 0 },
      P15: { name: 'P15', group: 'left', value: 0 },
      P16: { name: 'P16', group: 'left', value: 0 },
      P17: { name: 'P17', group: 'left', value: 0 },
      P18: { name: 'P18', group: 'left', value: 0 },
      P19: { name: 'P19', group: 'left', value: 0 },
      P20: { name: 'P20', group: 'left', value: 0 },
      P21: { name: 'P21', group: 'left', value: 0 },
      P22: { name: 'P22', group: 'left', value: 0 },
      P23: { name: 'P23', group: 'left', value: 0 },
      P24: { name: 'P24', group: 'left', value: 0 }
    },
    damageRight: {
      P1: { name: 'P1', group: 'right', value: 0 },
      P2: { name: 'P2', group: 'right', value: 0 },
      P3: { name: 'P3', group: 'right', value: 0 },
      P4: { name: 'P4', group: 'right', value: 0 },
      P5: { name: 'P5', group: 'right', value: 0 },
      P6: { name: 'P6', group: 'right', value: 0 },
      P7: { name: 'P7', group: 'right', value: 0 },
      P8: { name: 'P8', group: 'right', value: 0 },
      P9: { name: 'P9', group: 'right', value: 0 },
      P10: { name: 'P10', group: 'right', value: 0 },
      P11: { name: 'P11', group: 'right', value: 0 },
      P12: { name: 'P12', group: 'right', value: 0 },
      P13: { name: 'P13', group: 'right', value: 0 },
      P14: { name: 'P14', group: 'right', value: 0 },
      P15: { name: 'P15', group: 'right', value: 0 },
      P16: { name: 'P16', group: 'right', value: 0 },
      P17: { name: 'P17', group: 'right', value: 0 },
      P18: { name: 'P18', group: 'right', value: 0 },
      P19: { name: 'P19', group: 'right', value: 0 },
      P20: { name: 'P20', group: 'right', value: 0 },
      P21: { name: 'P21', group: 'right', value: 0 },
      P22: { name: 'P22', group: 'right', value: 0 },
      P23: { name: 'P23', group: 'right', value: 0 },
      P24: { name: 'P24', group: 'right', value: 0 }
    },
    light: {
      frontRightValue: { value: 10 },
      frontLeftValue: { value: 20 },
      backRightValue: { value: 30 },
      backleftValue: { value: 40 }
    },
    Rin: {
      FL: { name: 'FL', value: 0, state: "Default" },
      FR: { name: 'FR', value: 0, state: "Default" },
      BL: { name: 'BL', value: 0, state: "Default" },
      BR: { name: 'BR', value: 0, state: "Default" }
    },
    cotizacion: 0
  };
  