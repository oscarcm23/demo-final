import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../Componentes/Animaciones";


import BuscarProyecto from "./BuscarProyecto"

import Financiamiento from "./Financiamiento";
import BuscadorProyectoFinanciamiento from "./MenuProporcionalidad/BuscadorProyectoFinanciamiento"


import BuscadorInteligente2 from "../AM/BuscadorInteligente2";


function ProporcionalidadMenu() {
  {  /*========================== Mostrar Ocultar Tabla ==========================*/}
  const [show, setShow] = useState(true);

  {  /*========================== Mostrar Ocultar Botón ==========================*/}
  const [show2, setShow2] = useState(true);

  {  /*========================== Mostrar Ocultar Datos Adicionales ==========================*/}
  const [show3, setShow3] = useState(true);

  {  /*========================== Mostrar Ocultar Datos Adicionales ==========================*/}
  const [show4, setShow4] = useState(true);


  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}

      <Animaciones mytext=" Proporcionalidad " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
        
            <th>Resumen</th>
            <th>Financiamiento</th>
    
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
                {show ? "Ver" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                <BuscadorInteligente2/>
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
                {show2 ? "Registrar Datos " : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <BuscadorProyectoFinanciamiento/>
                </div>
              )}
            </td>

          



          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ProporcionalidadMenu;
