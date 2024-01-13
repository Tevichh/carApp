import React from 'react'
import "./Styles.css"
import { models } from "./carParts.js"
import { removeModels, gsapAnimation, orbitControls } from '../Scene/Script.js'

const animations = {

    original: {
        cam: { x: 7.3, y: 2.1, z: 4.7 },
        pos: { x: 0, y: 0, z: 0 }
    },
    top: {
        cam: { x: 0.367, y: 8.9, z: 0 },
        pos: { x: 0, y: -30, z: 0 }
    },
    front: {
        cam: { x: 0, y: 1, z: 10 },
        pos: { x: 0, y: 0.2, z: 0 }
    },
    back: {
        cam: { x: 0, y: 1, z: -10 },
        pos: { x: 0, y: 0.2, z: 0 }
    },
    left: {
        cam: { x: 7.2, y: 2, z: 0 },
        pos: { x: 0, y: 0, z: 0 }
    },
    right: {
        cam: { x: -7.2, y: 2, z: 0 },
        pos: { x: 0, y: 0, z: 0 }
    }
}

const stopControls = () => {
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enableRotate = false;
}

const allowControls = () => {
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enableRotate = true;
}


const Menu = () => {
    return (
        <div className='MenuContainer'>
            <div className='MenuWrapper'>
                <div className='Calculator'>
                    <h2>COTIZACIÓN</h2>
                    <label>TOTAL: </label>
                    <label id='fullAdd'>0</label>
                </div>

                <div className='MenuOptions'>
                    <h1>CAR OPTIONS</h1>
                    <ul className='MenuOptionsList'>
                        <li>
                            <label htmlFor='models'>Model</label>
                            <select className='models'
                                onChange={(e) => {
                                    const model = models.find(
                                        (model) => model.name === e.target.value
                                    )
                                    //console.log(model);
                                    removeModels(model.modelCar.rute, model.modelCar.group, model.scale, 'CAR')
                                    for (var i = 0; i < model.damageLeft.length; i++) {
                                        removeModels(model.damageLeft[i].rute, model.damageLeft[i].group, model.scale, model.damageLeft[i].name, model.damageLeft[i].value)
                                    }

                                }}>
                                {models.map((model, id) => (
                                    <option key={id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>

                    <button className='movimiento' onClick={() => {
                        allowControls()
                        gsapAnimation(animations.original.cam, animations.original.pos)
                    }}
                    >LIBERAR MOV</button>
                </div>

                <div className='VistasCamara'>
                    <button name='rotar' onClick={() => {
                        console.log("Rotar")
                    }}
                    > ROTAR</button>

                    <button name='superior' onClick={() => {
                        gsapAnimation(
                            animations.top.cam,
                            animations.top.pos
                        )

                        stopControls()
                    }}
                    >V.SUPERIOR</button>

                    <button name='frontal' onClick={() => {
                        gsapAnimation(
                            animations.front.cam,
                            animations.front.pos
                        )

                        stopControls()
                    }}
                    >V.FRONTAL</button>

                    <button name='trasera' onClick={() => {
                        gsapAnimation(
                            animations.back.cam,
                            animations.back.pos
                        )

                        stopControls()
                    }}
                    >V.TRASERA</button>

                    <button name='izquierda' onClick={() => {
                        gsapAnimation(
                            animations.left.cam,
                            animations.left.pos
                        )

                        stopControls()
                    }}
                    >V.L.IZQUIERDA</button>

                    <button name='derecha' onClick={() => {
                        gsapAnimation(
                            animations.right.cam,
                            animations.right.pos
                        )

                        stopControls()
                    }}
                    >V.L.DERECHA</button>
                </div>
            </div>
        </div >
    )
}

export default Menu