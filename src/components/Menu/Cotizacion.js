import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { allowClick, enviarCotizacion } from '../Scene/Script';




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
        setDatosCotizacion(data);
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
                                {datosCotizacion? datosCotizacion.name : ''}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>GRAMOS UTILIZADOS: {datosCotizacion? datosCotizacion.gramos : 0} Gr</ListGroup.Item>
                            <ListGroup.Item>HORAS UTILIZADAS: {datosCotizacion? datosCotizacion.horas : 0} H</ListGroup.Item>
                            <ListGroup.Item>PRECIO TOTAL: {datosCotizacion? datosCotizacion.Cotizacion : 0}</ListGroup.Item>
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
