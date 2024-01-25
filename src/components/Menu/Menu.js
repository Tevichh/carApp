import React, { useState } from 'react'
import "./Styles.css"
import { models } from "./carParts.js"
import { removeModels, gsapAnimation, orbitControls } from '../Scene/Script.js'
import { lightp1, carParts } from '../Scene/Script.js'

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
    carParts.modelCar.rotation.y = 0
    carParts.back.rotation.y = 0
    carParts.front.rotation.y = 0
    carParts.left.rotation.y = 0
    carParts.right.rotation.y = 0
    carParts.top.rotation.y = 0
}

const allowControls = () => {
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enableRotate = true;
    carParts.modelCar.rotation.y = 0
    carParts.back.rotation.y = 0
    carParts.front.rotation.y = 0
    carParts.left.rotation.y = 0
    carParts.right.rotation.y = 0
    carParts.top.rotation.y = 0
}

const Menu = () => {
    const [rotar, setRotar] = useState('stop')
    return (
        <div className='MenuContainer'>
            <label id='state'>{rotar}</label>
            <div className='MenuWrapper'>
                <div className='MenuOptions'>

                    <div className='colors'>
                        <input type='color' id='changeColor' onChange={(e) => {
                            console.log("CAMBIO")
                        }}></input>
                        <label>PAINT</label>
                    </div>
                    
                    <div className='Calculator'>
                        <h2>COTIZACIÓN</h2>
                        <label>TOTAL: </label>
                        <label id='fullAdd'>0</label>
                    </div>
                </div>


                <div className='MenuOptions'>
                    <h1>CAR MODEL</h1>
                    <ul className='MenuOptionsList'>
                        <li>
                            <select className='models' id='model'
                                onChange={(e) => {
                                    if (e.target.value !== "SELECCIONA") {

                                        e.target.options[0].disabled = true
                                        const model = models.find(
                                            (model) => model.name === e.target.value
                                        )
                                        //console.log(model);
                                        removeModels(model.modelCar.rute, model.modelCar.group, model.scale, 'CAR')
                                        for (var i = 0; i < model.damageLeft.length; i++) {
                                            removeModels(model.damageLeft[i].rute, model.damageLeft[i].group, model.scale, model.damageLeft[i].name, model.damageLeft[i].value)
                                        }

                                        document.getElementById('fullAdd').innerHTML = 0;
                                        document.getElementById('frontR').disabled = false;
                                        document.getElementById('frontL').disabled = false;
                                        document.getElementById('backR').disabled = false;
                                        document.getElementById('backL').disabled = false;
                                    }

                                }}>
                                <option id="selctNull">SELECCIONA</option>
                                {models.map((model, id) => (
                                    <option key={id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>

                    <button className='movimiento' onClick={() => {
                        setRotar('stop')
                        allowControls()
                        gsapAnimation(animations.original.cam, animations.original.pos)
                    }}
                    >LIBERAR MOV</button>
                </div>

                <div className='VistasCamara'>
                    <button name='rotar' id='rotateButton' onClick={() => {
                        setRotar('rotando')
                        stopControls()
                        gsapAnimation(animations.original.cam, animations.original.pos)
                    }}>ROTAR</button>

                    <button name='superior' onClick={() => {
                        setRotar('stop')
                        gsapAnimation(
                            animations.top.cam,
                            animations.top.pos
                        )

                        stopControls()
                    }}
                    >V.SUPERIOR</button>

                    <button name='frontal' onClick={() => {
                        setRotar('stop')
                        gsapAnimation(
                            animations.front.cam,
                            animations.front.pos
                        )

                        stopControls()
                    }}
                    >V.FRONTAL</button>

                    <button name='trasera' onClick={() => {
                        setRotar('stop')
                        gsapAnimation(
                            animations.back.cam,
                            animations.back.pos
                        )

                        stopControls()
                    }}
                    >V.TRASERA</button>

                    <button name='izquierda' onClick={() => {
                        setRotar('stop')
                        gsapAnimation(
                            animations.left.cam,
                            animations.left.pos
                        )

                        stopControls()
                    }}
                    >V.L.IZQUIERDA</button>

                    <button name='derecha' onClick={() => {
                        setRotar('stop')
                        gsapAnimation(
                            animations.right.cam,
                            animations.right.pos
                        )

                        stopControls()
                    }}
                    >V.L.DERECHA</button>
                </div>

                <div className='Lights'>

                    <form action="">
                        <label class="form-control">
                            <input type="checkbox" name="frontR" id="frontR" defaultChecked disabled
                                onChange={(e) => {
                                    var num = 0;
                                    const model = models.find(
                                        (model) => model.name === document.getElementById('model').value
                                    )
                                    if (e.target.checked === false) {

                                        num = parseInt(document.getElementById('fullAdd').textContent)
                                        document.getElementById('fullAdd').innerHTML = num + model.light.backRightValue.value;

                                        lightp1.isLight = false
                                    }

                                    if (e.target.checked === true) {
                                        num = parseInt(document.getElementById('fullAdd').textContent)
                                        document.getElementById('fullAdd').innerHTML = (num - model.light.backRightValue.value) > 0 ? num - model.light.backRightValue.value : 0;
                                        lightp1.isLight = true
                                    }
                                }
                                } />
                            Luz Frontal Derecha
                        </label>

                        <label class="form-control">
                            <input type="checkbox" name="frontL" id='frontL' defaultChecked disabled />
                            Luz Frontal Izquierda
                        </label>

                        <label class="form-control">
                            <input type="checkbox" name="backR" id='backR' defaultChecked disabled />
                            Luz Trasera Derecha
                        </label>

                        <label class="form-control">
                            <input type="checkbox" name="backL" id='backL' defaultChecked disabled />
                            Luz Trasera Izquierda
                        </label>
                    </form>

                </div>
            </div>
        </div >
    )
}

export default Menu