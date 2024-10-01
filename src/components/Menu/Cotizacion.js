import React from 'react'
import { actualizarCopyModel, enviarCotizacion } from '../Scene/Script';

function calculoGramoHora(data) {
    const modelo = data[0].name;
    const listaInfo = data[1][modelo];
    //const partesLista = data[2];
    let nClick, parte, gramosHorasArray;
    let gramo1, gramo2, hora1, hora2;
    let gramo = [];
    let hora = [];

    let partesLista = [];
    if (data[0].partes) {
        for (let parte of data[0].partes) {
            for (let p in data[0][parte]) {
                if (data[0][parte][p].state !== 0) {
                    partesLista.push(`${data[0][parte][p].group}_${data[0][parte][p].name}_${data[0][parte][p].state}`);
                }
            }
        }
    }
    console.log(partesLista)

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


export function cotizar() {

    let data = enviarCotizacion();
    console.log("data:", data)
    let info = calculoGramoHora(data);

    data[0].gramos = info[0];
    data[0].horas = info[1]
    const datosCotizacion = data[0];

    //console.log(datosCotizacion);

    actualizarCopyModel(datosCotizacion)

    document.getElementById("gramosUsados").innerText = `GRAMOS UTILIZADOS: ${datosCotizacion.gramos} Gr`
    document.getElementById("horasUsadas").innerText = `HORAS UTILIZADAS: ${datosCotizacion.horas} H`


}


export const Cotizacion = ({ datosCotizacion }) => {
    return (
        <div className="mx-2 card-menu">

            <ul className="list-group list-group-flush">
                <li id='gramosUsados' className="list-group-item">GRAMOS UTILIZADOS: {datosCotizacion ? datosCotizacion.gramos : 0} Gr</li>
                <li id="horasUsadas" className="list-group-item">HORAS UTILIZADAS: {datosCotizacion ? datosCotizacion.horas : 0} H</li>
                <li id="precioTotal" className="list-group-item">PRECIO TOTAL: {datosCotizacion ? datosCotizacion.Cotizacion : 0}</li>
            </ul>

        </div>

    );
};



