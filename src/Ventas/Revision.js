import React from 'react'

import Table from 'react-bootstrap/Table'


function Revision() {
    return (
        <div className="contenido-usuarios">



  <div className="titulo-proyectos">
                    <h1>RESUMEN </h1>

                    <select id="lista-proyectos">
                        <option value="lista 1">Nombre Proyecto</option>
                        <option value="lista 2">Nombre Proyecto 2</option>
                        <option value="lista 3">Nombre Proyecto 3</option>
                    </select>

                </div>
                
             <Table responsive id="nombreDiv">
                    <thead>
                     <tr className="azul" >
                            <th></th>
                            <th></th>
                       
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>Capacitación</td>
                            <td>160003</td>
                        
                            
                        </tr>
                        <tr className="color">
                        <td>Accesorios</td>
                            <td>80807</td>
                        
                            
                        </tr>


                        <tr className="">
                        <td>Servicios PTN</td>
                            <td>371.36</td>
                         
                            
                        </tr>

                        <tr className="">
                        <td>Mesa de Ayuda</td>
                            <td>371.36</td>
                         
                            
                        </tr>

                    </tbody>
                </Table>

            <div className="table-responsive">

                <div className="titulo-proyectos">
                    <h1>Lista de Proyectos </h1>

                </div>
                <br />
                <br />



                <Table responsive id="nombreDiv">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>Descripción</th>
                            <th>PRECIO VENTA</th>
                            <th>%</th>
                            <th>Proporcionar MESA DE AYUDA</th>
                            <th>TOTAL</th>
                            <th>TOTAL MENSUAL</th>
                            <th>Financiamiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>Swithches</td>
                            <td>1073.98</td>
                            <td>24% </td>
                            <td>1193</td>
                            <td>2267.93</td>
                            <td></td>
                            <td></td>
                         
                        </tr>

                        <tr className="">
                        <td>Routers</td>
                            <td>1073.98</td>
                            <td>24% </td>
                            <td>1193</td>
                            <td>2267.93</td>
                            <td></td>
                            <td></td>
                         
                        </tr>
                        
                        <tr className="">
                        <td>Servidores</td>
                            <td>1073.98</td>
                            <td>24% </td>
                            <td>1193</td>
                            <td>2267.93</td>
                            <td></td>
                            <td></td>
                         
                        </tr>

    
                        <tr className="">
                        <td>Consultoría</td>
                            <td>1073.98</td>
                            <td>24% </td>
                            <td>1193</td>
                            <td>2267.93</td>
                            <td></td>
                            <td></td>
                         
                        </tr>

    
                        <tr className="green">
                        <td>Totales</td>
                            <td>1073.98</td>
                            <td>24% </td>
                            <td>1193</td>
                            <td>2267.93</td>
                            <td></td>
                            <td></td>
                         
                        </tr>

    
                        <tr className="">
                        <td></td>
                            <td></td>
                            <td>Comprobación</td>
                            <td>$</td>
                            <td></td>
                            <td></td>
                            <td></td>
                         
                        </tr>

                   










                    </tbody>
                </Table>



              

                
                <div className="boton-cotizador"  >
                    
                    <button className="btn btn-success">Imprimir</button> 

                    
                </div>





            </div>
        </div>
      );
    }
export default Revision