import React from "react";
import { useState } from "react";
import "../css/PTN_BOM.css";
import Table from "react-bootstrap/Table";


import Animaciones from "../../../Componentes/Animaciones";
import NuevoProyecto from "../Menu-Bom/NuevoProyecto";
import ContinuarProyecto from "../Menu-Bom/ContinuarProyecto";
import Proyectos from "../Menu-Bom/ResumenProyectos";
import { InsertDatosPartida } from '../Routes/GuardarPartida';
import { getIdPar } from '../Menu-Bom/DatosSP';
import { InsertDatosCats } from "../Routes/GuardarDatosCategorias";

function PTN_BOM() {
  {
    /*========================== Mostrar Ocultar Tabla ==========================*/
  }
  const [show, setShow] = useState(true);

  {
    /*========================== Mostrar Ocultar Botón ==========================*/
  }
  const [show2, setShow2] = useState(true);

  {
    /*========================== Mostrar Ocultar Datos Adicionales ==========================*/
  }
  const [show3, setShow3] = useState(true);

  const {getIdP} = InsertDatosPartida();
  const {getIdP1} = InsertDatosCats();
  
  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}

      <Animaciones mytext="PTN BOM " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th>Nuevo Proyecto</th>
            <th>Continuar Proyecto</th>
            <th> Resumen </th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            {/*========================== Nuevo Proyecto ==========================*/}
            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  getIdP('');
                  getIdPar('');
                  getIdP1('');
                  setShow(!show);
                  setShow2(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show ? "Añadir" : "Ocultar Proyecto"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <NuevoProyecto />
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow2(!show2);
                  setShow(true);
                  setShow3(true);
                }}
              >
                {" "}
                {show2 ? "Continuar" : "Ocultar Proyecto"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <ContinuarProyecto />
                </div>
              )}
            </td>

            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow3(!show3);
                  setShow(true);
                  setShow2(true);
                }}
              >
                {" "}
                {show3 ? "Ver Proyectos" : "Ocultar Proyecto"}{" "}
              </button>
              {show3 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                  <Proyectos />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PTN_BOM;