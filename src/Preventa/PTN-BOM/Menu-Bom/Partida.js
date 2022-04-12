import React from 'react'
import {InsertDatosPartida} from '../Routes/GuardarPartida'

function Partida() {

  const{
    handleInputChangePartida,
    enviarDatosPartida
  } = InsertDatosPartida();


  return (
    <div className="contenido-usuarios">
    {/*========================== Nombre Partida ==========================*/}
      <br />
      <form action="" method="post" onSubmit={enviarDatosPartida}>
        <input
          className="agregar"
          type="text"
          name="partida_nombre"
          onChange={handleInputChangePartida}
          placeholder="Ingrese Nombre Partida"
        />

        <br />
        <br />

        {/*========================== Descripción Partida ==========================*/}
        <input
          className="agregar"
          type="text"
          name="partida_descripcion"
          onChange={handleInputChangePartida}
          placeholder="ingrese Descripción Partida"
        />

        <br />
        <br />
        {/*========================== Botón Agregar Partidas ==========================*/}
        <button className="btn btn-success">Agregar Datos Partida</button>
      </form>
      <br />
      <br />
  </div>
  
  )
}

export default Partida