import axios from 'axios';
import React, { useState } from 'react'
import Table from "react-bootstrap/Table";
import {  url2 } from "../../../Componentes/Ocultar";

function Financiamiento(prop) {
  const idProyecto = prop.propIdProyecto
  console.log("este es el idProyecto en financiamiento", idProyecto)

  // Almacenamiento de los datos
  const [datosProporcionalidad, setDatosProporcionalidad] = useState({
    pd_tasa_interes: '',
    pd_anio_financiamiento: '',
    pd_pagos_anuales: ''

  })
  // Función que obtiene los datos introducidos en los inputs 
  const handleInputChange = (event) => {
    setDatosProporcionalidad({
      ...datosProporcionalidad, [event.target.name]: event.target.value,
    })
  }
  // Función que realiza la inserción de los datos a la tabla proporcionalidad en la bd 

  async function SendProporcionalidad() {
    console.log(idProyecto)
    const data = {
      pd_tasa_interes: datosProporcionalidad.pd_tasa_interes,
      pd_anio_financiamiento: datosProporcionalidad.pd_anio_financiamiento,
      pd_pagos_anuales: datosProporcionalidad.pd_pagos_anuales
    };
    try {
      const respuesa = await axios.post(url2 + `/api/cotizador/proporcionalidad/insert/${idProyecto}`, data);
      const respuestaBack = respuesa.data.msg
      console.log(respuestaBack)
      alert(respuestaBack)
    } catch (error) {
      console.log(error)
    }
  }

  return (


    <div className="contenido-usuarios">

      <Table responsive striped bordered hover size="sm" className="tablas">
        <thead>
          {/*=================== Titulos Tabla Clientes ===================*/}
          <tr className="titulo-tabla-usuarios">
            <th>Tasa de Interes</th>
            <th>Años de Financiamiento</th>
            <th>Pagos Anuales</th>
            <th>Agregar</th>

          </tr>
        </thead>
        <tbody>
          {/*=================== Contenido Tabla Clientes =================*/}


          <tr >
            {/*================= Años de Financiamiento ==================*/}
            <td>
              <input onChange={handleInputChange}
                type="text"
                name='pd_tasa_interes'></input>
            </td>

            {/*================= Pagos Anuales ==================*/}
            <td>
              <input onChange={handleInputChange}
                type="text"
                name='pd_anio_financiamiento'>
              </input>
            </td>
            {/*================= Pagos Anuales ==================*/}
            <td>
              <input onChange={handleInputChange}
                type="text"
                name='pd_pagos_anuales'>
              </input>
            </td>
            {/*================= Agregar==================*/}
            <td>
              <button onClick={SendProporcionalidad} className="btn btn-primary "> Agregar </button>
            </td>

          </tr>

        </tbody>
      </Table>
    </div>

  )
}

export default Financiamiento