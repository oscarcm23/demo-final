import React from 'react'
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";



function PEconomica() {
  return (

    <div className="contenido-usuarios">

<br/>
       <div>
          <Animaciones mytext="Datos a Imprimir en la Propuesta" />
        </div>



<Table striped bordered hover>
  <thead>
    <tr>
      <th>Proyecto</th>
      <th>Lugar</th>
      <th>Fecha</th>
      <th>Atención</th>
      <th>Editar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>----------</td>
      <td>----------</td>
      <td>----------</td>
      <td>----------</td>
      <td>

      <button className="btn btn-primary Mod"> Editar </button>
      </td>
    </tr>
     
  </tbody>
</Table>

    </div>
  )
}

export default PEconomica