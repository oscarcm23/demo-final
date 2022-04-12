import React from 'react'
import "../css/PropuestaEconomica.css";
import Table from 'react-bootstrap/Table'
import { useState } from "react";
import Animaciones from "../../../Componentes/Animaciones";
import BuscadorInteligente3 from './BuscadorInteligente3';
import BuscadorInteligente4 from './BuscadorInteligente4';



function PropuestaEconomica() {

    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(true)
    return (
        <div className="contenido-usuarios">


            <div className="table-responsive">

          <div>
           <Animaciones mytext="Propuesta Económica" /> 
          </div>

          <Table responsive id="nombreDiv">
  {/*========================== Titulos Tabla ==========================*/}
  <thead>
    <tr className="titulo-tabla-usuarios">
      <th>Editar Propuesta</th>
      <th>Administrar propuestas </th>

    </tr>
  </thead>
  <tbody>
    <tr className="">
      {/*========================== Divisa ==========================*/}
      <td>
        <button
          className="btn btn-primary modificar"
          type="button"
          onClick={() => {
            setShow(!show);
          }}
        >
          {" "}
          {show ? "Editar" : "Ocultar"}{" "}
        </button>
        {show ? (
          <div></div>
        ) : (
          <div className="arregla">
            {/*========================== Llamado al Componente ==========================*/}
            <BuscadorInteligente3/>
          </div>
        )}
      </td>

      <td>
        <button
          className="btn btn-primary modificar"
          type="button"
          onClick={() => {
            setShow2(!show2);
          }}
        >
          {" "}
          {show2 ? "Administrar" : "Ocultar"}{" "}
        </button>
        {show2 ? (
          <div></div>
        ) : (
          <div className="arregla">
            {/*========================== Llamado al Componente ==========================*/}
     {/*      <AdministrarPropuesta /> */}
     <BuscadorInteligente4/>
          </div>
        )}
      </td>

    

    </tr>
  </tbody>
</Table>




          

            </div>
        </div>
      );
    }
export default PropuestaEconomica