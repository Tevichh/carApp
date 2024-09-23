import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { allowClick, enviarCotizacion } from '../Scene/Script';

function calculoGramoHora(data) {
    const modelo = data[0].name;
    const listaInfo = data[1][modelo];
    const partesLista = data[2];
    let nClick, parte, gramosHorasArray;
    let gramo1, gramo2, hora1, hora2;
    let gramo = [];
    let hora = [];

    if (partesLista.length < 1) {
        return [0, 0]
    }

    partesLista.forEach(element => {
        //Separar elementos
        element = element.split("_");
        nClick = parseInt(element[2]);
        parte = element[0] + "_" + element[1];
        gramosHorasArray = listaInfo[parte];

        //Obtener datos DB
        gramosHorasArray = gramosHorasArray.split("-");

        gramo1 = parseFloat(gramosHorasArray[0]) || 0;
        gramo2 = parseFloat(gramosHorasArray[1]) || 0;
        hora1 = parseFloat(gramosHorasArray[2]) || 0;
        hora2 = parseFloat(gramosHorasArray[3]) || 0;


        if (nClick === 1) {
            gramo.push(gramo1);
            hora.push(hora1);
        } else if (nClick === 2) {
            gramo.push(gramo2);
            hora.push(hora2);
        }
    });

    let gramos = gramo.reduce((total, numero) => total + numero, 0);
    let horas = hora.reduce((total, numero) => total + numero, 0);

    return [gramos, horas];

}


export const Cotizacion = () => {
    const [show, setShow] = useState(false);
    const [datosCotizacion, setDatosCotizacion] = useState()
    const handleClose = () => {
        allowClick(true);
        setShow(false);
    }
    const handleShow = () => {
        allowClick(false);
        setShow(true);
        let data = enviarCotizacion();
        let info = calculoGramoHora(data);
        data[0].gramos = info[0];
        data[0].horas = info[1]
        setDatosCotizacion(data[0]);

    }
    return (
        <>
            <Button variant='outline-dark' size="sm" onClick={handleShow}>
                VER DETALLES
            </Button>

            <Modal show={show} onHide={handleClose} style={{
                marginTop: "3em"
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>COTIZACIÓN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card >
                        <Card.Body>
                            <Card.Title>CARACTERÍSTICAS DEL MODELO</Card.Title>
                            <Card.Text>
                                {datosCotizacion ? datosCotizacion.name : ''}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>GRAMOS UTILIZADOS: {datosCotizacion ? datosCotizacion.gramos : 0} Gr</ListGroup.Item>
                            <ListGroup.Item>HORAS UTILIZADAS: {datosCotizacion ? datosCotizacion.horas : 0} H</ListGroup.Item>
                            <ListGroup.Item>PRECIO TOTAL: {datosCotizacion ? datosCotizacion.Cotizacion : 0}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
