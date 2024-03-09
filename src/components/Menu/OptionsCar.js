import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { models } from "./carParts.js";
import { removeModels, loadProducts, allowClick } from '../Scene/Script.js';


const handleModelChange = (modelModal) => {

  if (modelModal !== "SELECCIONA") {
    const model = models.find(model => model.name === modelModal);
    removeModels(model.modelCar.rute, model.modelCar.group, model.scale, 'CAR');


    document.getElementById('fullAdd').innerHTML = model.cotizacion;
  }
};

export function OptionsCar() {

  const [show, setShow] = useState(false);
  const [btnName, setBtnName] = useState("SELECCIONA")
  document.body.style.cursor = 'not-allowed';

  const handleSave = () => {
    let modalModel = document.getElementById("modelModal").value
    let colorModel = document.getElementById("colorModal").value
    let capaModel = document.getElementById("capaModal").value
    setBtnName(modalModel);
    handleModelChange(modalModel);
    loadProducts(modalModel, colorModel, capaModel);
    allowClick(true);
    setShow(false);

  }

  const handleClose = () => {
    allowClick(true);
    setShow(false);
    const searchParams = new URLSearchParams(window.location.search);
    const parametro = searchParams.get('cc');
    console.log(parametro);
  };
  const handleShow = () => {
    allowClick(false);
    setShow(true);
  }
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
            <Form.Select id="colorModal">
              <option>AMARILLO</option>
              <option>AZUL</option>
              <option>BLANCO</option>
              <option>NEGRO</option>
              <option>ROJO</option>
              <option>VERDE</option>
            </Form.Select>
            <br />
            <Form.Label className='modalLabel'>CAPA</Form.Label>
            <Form.Select id="capaModal">
              <option>MONOCAPA</option>
              <option>BICAPA</option>
              <option>TRICAPA</option>
              <option>CUATRICAPA</option>
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