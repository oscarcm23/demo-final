import React from 'react'
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../Componentes/Animaciones";

import CalculaDescuento from './CalculaDescuento';
import pdf from "../../Componentes/Manual_Usuario.pdf"


function MenuHeramientas() {
            //Habilitar/Deshabilitar tabla del resumen AM
            const [show, setShow] = useState(true)
            const [show2, setShow2] = useState(true)
  return (
 
 
    <div className="contenido-usuarios">


    <Animaciones mytext= " Herramientas " />
    
    {/*========================== Tabla  Categorias ==========================*/}
    <Table responsive id="nombreDiv">
      {/*========================== Titulos Tabla ==========================*/}
      <thead>
        <tr className="titulo-tabla-usuarios">
          <th>Calculara de Descuento % </th>
          <th>Manual de Usuario </th>
        {/*   <th>------ </th> */}
        </tr>
      </thead>
      <tbody>
        <tr className="">
          {/*========================== Divisa ==========================*/}
          <td>
            <button
              className="btn btn-primary Mod"
              type="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              {" "}
              {show ? "Calcular" : "Ocultar"}{" "}
            </button>
            {show ? (
              <div></div>
            ) : (
              <div className="arregla">
                {/*========================== Llamado al Componente ==========================*/}
              < CalculaDescuento/>
              </div>
            )}
          </td>


          <td>

          <form method="get" action={pdf}>
          <button    className="btn btn-primary PDF" > Descargar PDF

       <span></span>
          </button>
         </form>
           
          
          </td>
    
    
    
        </tr>
      </tbody>
    </Table>
    
    
    
    
        </div>
  )
}

export default MenuHeramientas