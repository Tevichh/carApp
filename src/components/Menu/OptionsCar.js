import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { models } from "./carParts.js";
import { removeModels, loadProducts } from '../Scene/Script.js';

const handleModelChange = (modelModal) => {

  if (modelModal !== "SELECCIONA") {
    const model = models.find(model => model.name === modelModal);

    removeModels(model.modelCar.rute, model.modelCar.group, model.scale, 'CAR');
    ['ruteL', 'ruteR', 'ruteF', 'ruteB', 'ruteT'].forEach(rute => {
      removeModels(model.rutes[rute], rute === 'ruteL' ? 'left' : rute === 'ruteR' ? 'right' : rute === 'ruteF' ? 'front' : rute === 'ruteB' ? 'back' : 'top', model.scale, 'CHECK');
    });

    document.getElementById('fullAdd').innerHTML = model.cotizacion;
  }
};

export function OptionsCar() {

  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState("SELECCIONA")

  const handleSave = () => {
    let modalModel = document.getElementById("modelModal").value
    setBtnName(modalModel)
    handleModelChange(modalModel)
    loadProducts(modalModel)
    setShow(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='light' onClick={handleShow}>
        {btnName}
      </Button>
      <Modal show={show} onHide={handleClose} className='Modal'>
        <Modal.Header closeButton>
          <Modal.Title>CAR INFO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label className='modalLabel'>MODELO</Form.Label>
            <Form.Select id="modelModal">
              {models.map((model, id) => (
                <option key={id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </Form.Select>
            <br />
            <Form.Label className='modalLabel'>COLOR</Form.Label>
            <Form.Select>
              <option>Amarillo</option>
              <option>Azul</option>
              <option>Blanco</option>
              <option>Negro</option>
              <option>Rojo</option>
              <option>Verde</option>
            </Form.Select>
            <br />
            <Form.Label className='modalLabel'>CAPA</Form.Label>
            <Form.Select>
              <option value="1">MONOCAPA</option>
              <option value="2">BICAPA</option>
              <option value="3">TRICAPA</option>
              <option value="4">CUATRICAPA</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OptionsCar;