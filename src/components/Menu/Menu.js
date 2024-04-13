import React, { useState } from 'react';
import "./Styles.css";
import { gsapAnimation, orbitControls } from '../Scene/Script.js';
import { OptionsCar } from './OptionsCar.js';
import { Cotizacion } from './Cotizacion.js';

const animations = {
    original: { cam: { x: 7.3, y: 2.1, z: 4.7 }, pos: { x: 0, y: 0, z: 0 } },
    top: { cam: { x: 0.367, y: 8.9, z: 0 }, pos: { x: 0, y: -30, z: 0 } },
    front: { cam: { x: 0, y: 1, z: 10 }, pos: { x: 0, y: 0.2, z: 0 } },
    back: { cam: { x: 0, y: 1, z: -10 }, pos: { x: 0, y: 0.2, z: 0 } },
    left: { cam: { x: 7.2, y: 2, z: 0 }, pos: { x: 0, y: 0, z: 0 } },
    right: { cam: { x: -7.2, y: 2, z: 0 }, pos: { x: 0, y: 0, z: 0 } }
};

const stopControls = () => {
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.enableRotate = false;
    orbitControls.autoRotate = false;
};

const allowControls = () => {
    orbitControls.enableZoom = true;
    orbitControls.enablePan = false;
    orbitControls.enableRotate = true;
    orbitControls.autoRotate = false;
};



const Menu = () => {
    const [rotar, setRotar] = useState('stop');

    return (
        <div className='MenuContainer'>
            <label id='state'>{rotar}</label>
            <div className='menu' id='menu'>
                <div className='MenuWrapper'>
                    <div className='MenuOptions'>
                        <div className='Calculator'>
                            <h2>COTIZACIÓN</h2>
                            {/*<label>TOTAL: </label>
                            <label id='fullAdd'>0</label>*/}
                            <Cotizacion></Cotizacion>
                            
                        </div>
                        <button id='SEND'>SEND</button>
                    </div>

                    <div className='MenuOptions'>
                        <h1>CAR MODEL</h1>
                        <OptionsCar></OptionsCar>

                        <button className='movimiento' onClick={() => {
                            setRotar('stop');
                            allowControls();
                            gsapAnimation(animations.original.cam, animations.original.pos);
                        }}>LIBERAR MOV</button>
                    </div>

                    <div className='VistasCamara'>
                        <button name='rotar' id='rotateButton' onClick={() => {
                            setRotar('rotando');
                            stopControls();
                            gsapAnimation(animations.original.cam, animations.original.pos);
                        }}>ROTAR</button>

                        <button name='superior' onClick={() => {
                            setRotar('stop');
                            gsapAnimation(
                                animations.top.cam,
                                animations.top.pos
                            );
                            stopControls();
                        }}>V.SUPERIOR</button>

                        <button name='frontal' onClick={() => {
                            setRotar('stop');
                            gsapAnimation(
                                animations.front.cam,
                                animations.front.pos
                            );
                            stopControls();
                        }}>V.FRONTAL</button>

                        <button name='trasera' onClick={() => {
                            setRotar('stop');
                            gsapAnimation(
                                animations.back.cam,
                                animations.back.pos
                            );
                            stopControls();
                        }}>V.TRASERA</button>

                        <button name='izquierda' onClick={() => {
                            setRotar('stop');
                            gsapAnimation(
                                animations.left.cam,
                                animations.left.pos
                            );
                            stopControls();
                        }}>V.L.IZQUIERDA</button>

                        <button name='derecha' onClick={() => {
                            setRotar('stop');
                            gsapAnimation(
                                animations.right.cam,
                                animations.right.pos
                            );
                            stopControls();
                        }}>V.L.DERECHA</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
