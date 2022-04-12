import React from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import Divisa from "./Divisa";
import ResumenAM from "./ResumenAM";
import BuscadorInteligente from "./BuscadorInteligente";




function AmMenu() {
   /*========================== Mostrar Ocultar Tabla ==========================*/
  const [show, setShow] = useState(true);

   /*========================== Mostrar Ocultar Botón ==========================*/
  const [show2, setShow2] = useState(true);

   /*========================== Mostrar Ocultar Datos Adicionales ==========================*/
  const [show3, setShow3] = useState(true);

   /*========================== Mostrar Ocultar Datos Adicionales ==========================*/
  const [show4, setShow4] = useState(true);


  return (
    <div className="contenido-usuarios">
      {/*======================= Titulo Animación =======================*/}

      <Animaciones mytext=" AM " />

      {/*========================== Tabla  Categorias ==========================*/}
      <Table responsive id="nombreDiv">
        {/*========================== Titulos Tabla ==========================*/}
        <thead>
          <tr className="titulo-tabla-usuarios">
            <th>Divisa</th>
            <th>Resumen AM</th>
            <th>Costos Indirectos</th>
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
                {show ? "Agregar" : "Ocultar"}{" "}
              </button>
              {show ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                   <Divisa/>
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
                {show2 ? "ver" : "Ocultar"}{" "}
              </button>
              {show2 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
                <ResumenAM/>
                </div>
              )}
            </td>



            <td>
              <button
                className="btn btn-primary modificar"
                type="button"
                onClick={() => {
                  setShow4(!show4);
                }}
              >
                {" "}
                {show4 ? "Ver " : "Ocultar "}{" "}
              </button>
              {show4 ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
    {/*           <CostosIndirectos/> */}
   < BuscadorInteligente/>


                </div>
              )}
            </td>


          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AmMenu;
