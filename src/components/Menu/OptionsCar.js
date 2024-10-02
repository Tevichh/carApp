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
    removeModels(model.modelCar.rute, model.modelCar.group, model.scale);


    //document.getElementById('fullAdd').innerHTML = model.cotizacion;
  }
};

export function OptionsCar() {

  const [selectedModel, setSelectedModel] = useState('');
  //document.body.style.cursor = 'not-allowed';

  const handleSave = () => {
    let modalModel = document.getElementById("modelModal").value
    let colorModel = document.getElementById("colorModal").value
    let capaModel = document.getElementById("capaModal").value

    handleModelChange(modalModel);
    loadProducts(modalModel, colorModel, capaModel);
    allowClick(true);
    setSelectedModel(modalModel);

  }


  return (
    <>
      <div className="mx-2 card-menu">
        <Form>
          <div class="row d-flex justify-content-center">
            <div class="col-md-5">
              <Form.Label className='modalLabel'>MODELO</Form.Label>
              <Form.Select id="modelModal" onChange={handleSave}>
                <option value="" disabled={selectedModel !== ''}>SELECCIONA</option>
                {models.map((model, id) => (
                  <option key={id} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div class="col-md-5">
              <Form.Label className='modalLabel'>COLOR</Form.Label>
              <Form.Select id="colorModal">
                <option>AMARILLO</option>
                <option>AZUL</option>
                <option>BLANCO</option>
                <option>NEGRO</option>
                <option>ROJO</option>
                <option>VERDE</option>
              </Form.Select>
            </div>

            <div class="col-md-5">
              <Form.Label className='modalLabel'>CAPA</Form.Label>
              <Form.Select id="capaModal">
                <option>MONOCAPA</option>
                <option>BICAPA</option>
                <option>TRICAPA</option>
                <option>CUATRICAPA</option>
              </Form.Select>
            </div>
          </div>
        </Form>
      </div>

    </>
  );
}

export default OptionsCar;