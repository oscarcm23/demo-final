import React from 'react'
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import { categoriasUnicas,   totalCategoriasUSD2} 
     from "../../Operaciones/OperacionesAM";




function Categorias() {
  return (
    
    <div className="contenido-usuarios">

       <br/>

            <div> <Animaciones mytext="Resumen Categorias" /> </div>
 
            <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>Descripción</th>
                        <th > Total </th>
                     {/*    <th>  % </th>
                        <th>Proporcional MESA DE AYUDA </th>
                        <th>TOTAL</th>
                        <th>TOTAL MENSUAL</th>
                        <th>Financiamiento</th>
                        <th>Editar</th> */}
                    </tr>
                </thead>
                <tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(categoriasUnicas).map((key) => (
                        <tr key={categoriasUnicas[key]}>
                            
                            {/*================= Descripción  ==================*/}
                            <td>{categoriasUnicas[key]}</td>
                            <td>{"$ "}{totalCategoriasUSD2[key]}</td>
                            {/*================= Precio Venta ==================*/}
                          
                        </tr>
                    ))}
                </tbody>
            </Table>




        
    </div>
  )
}

export default Categorias