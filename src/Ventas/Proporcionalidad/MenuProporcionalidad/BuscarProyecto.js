import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import Proporcionalidad from "./Proporcionalidad";




function BuscarProyecto() {

  {  /*========================== Mostrar Ocultar Tabla ==========================*/}
  const [show, setShow] = useState(true);



  return (

    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}
      <div> <Animaciones mytext="Buscar Proyecto" /> </div>

      {/*=======================  Tabla Nuevo Proyecto ======================= */}

      <Table responsive id="nombreDiv">

        {/*======================= Titulos Tabla ======================= */}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th>Clave</th>         
          </tr>
        </thead>

        <tbody>
          <tr className="">

            {/*=======================  Clave proyecto ======================= */}
            <td>
              <input
                className="agregar"
                type="text"
                name="clave"

                placeholder="ingrese Clave"
              />
            </td>
         
          </tr>
        </tbody>
      </Table>

      {/*=======================  Boton Buscar proyecto Proporcionalidad ======================= */}
      <button className="btn btn-primary Ver" type="button" onClick={() => { setShow(!show); }}>  {show ? 'Buscar' : 'Ocultar '}    </button>
      {show ? (
        <div >

        </div>
      ) : (
        <div className="arregla">
       <Proporcionalidad/>
        </div>
      )}






    </div>

  )

}

export default BuscarProyecto