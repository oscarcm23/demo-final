import React from 'react';
import Table from 'react-bootstrap/Table'
import { useState } from "react";
import Animaciones from "../../../Componentes/Animaciones";
import ExportarPDF from './ExportarPDF';
import axios from 'axios';
import { url2 } from '../../../Componentes/Ocultar';

function AdministrarPropuesta() {
  const [show, setShow] = useState(true)

  // cambio de estatus en el la base de datos del proyecto seleccionado a validado
  async function cambioEstatusProyectoValidad(){
    try{
      const data = {
        proyecto_estatus: 'Validado'
      }
      console.log(data)
      const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/72`, data);
      const send2 = respuesta.data
      console.log(send2)
      alert("Estatus del proyecto actualizado")
    } catch(error){
      console.log(error)
    }
  }
  // cambio de estatus en el la base de datos del proyecto seleccionado a rechazado
  async function cambioEstatusProyectoRechazado(){
    try{
      const data = {
        proyecto_estatus: 'Rechazado'
      }
      const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/73`, data);
      const send2 = respuesta.data
      console.log(send2)
      alert("Estatus del proyecto actualizado")
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="contenido-usuarios">


      <div className="table-responsive">
      <br/>      <br/>

        <div>
          <Animaciones mytext="Validación" />
        </div>

        <Table responsive id="nombreDiv">
          {/*========================== Titulos Tabla ==========================*/}
          <thead>
            <tr className="titulo-tabla-usuarios">
           {/*    <th>Propuestas</th> */}
              <th>Rechazar Proyecto</th>
              <th>Validar Proyecto</th>
              <th>Imprimir</th>

            </tr>
          </thead>
          <tbody>
            <tr className="">
              {/*========================== Divisa ==========================*/}



              <td>

                <button className="btn btn-primary PDF" onClick={()=>{cambioEstatusProyectoRechazado()}} type="button"> Rechazar </button>


              </td>


              <td>

                <button className="btn btn-primary" onClick={()=>{cambioEstatusProyectoValidad()}} type="button"> Validar </button>
              </td>


              <td>
                <ExportarPDF />
              </td>


            </tr>
          </tbody>
        </Table>






      </div>

    </div>
  )
}

export default AdministrarPropuesta