/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Animaciones from "../../../Componentes/Animaciones";
// Componentes
 import Partida from "../Menu-Bom/Partida";
 import DatosSP from "../Menu-Bom/DatosSP";
 import Categorias from "../Menu-Bom/Categorias";
 

function DatosPTN(props) {
  
  /*========================== Mostrar Ocultar Tabla ==========================*/ 
  const [show, setShow] = useState(true);

  
  return (
    <div className="contenido-usuarios">
      {/*========================== Titulos ==========================*/}
      <div>
        {" "}
        <Animaciones mytext="Datos PTN" />{" "}
      </div>
      {/*========================== Tabla Datos partida==========================*/}
      <div className="arregla">
        <Partida/>
      {/*========================== Tabla Datos PTN ==========================*/}
      
        <DatosSP clave={props.clave}/>
        {/*========================== Añadir Categorias ==========================
        Solo cuando se termine el proyecto */}
        <div className="contenido-usuarios">
          <button
          className="btn btn-primary modificar"
          type="button"
          onClick={() => {
            setShow(!show);
          }}
          >
          {" "}
          {show ? "Agregar categorias" : "Ocultar Categorias"}{" "}
          </button>

          {show ? (
            <div></div>
            ) : (
            <div className="arregla">
              {/*======================== Llamar al componente Categorias ==========================*/}
              <Categorias />
            </div>
          )}
        </div>
      </div>
      
      
    </div>
  );
}

export default DatosPTN;