import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import { url, url2 } from '../../../Componentes/Ocultar';
import Cookies from 'universal-cookie';
import {Partida_catalogo} from '../../../Ventas/Operaciones/totalPartida';
import AdministrarPropuesta from './AdministrarPropuesta';
import PEconomica from './PEconomica';





const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
//let validatorrol = cookies.get('rol');
let validatorrol ="administrador";
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');


function BuscadorInteligente3() {

    const { 
        getTotalPar,
        getPorcentajesPar,
        getTotalCats,
        getPorcentajesCats,
        getDivisaProy,
        getPorcentajesCI} = Partida_catalogo();


  //Habilitar/Deshabilitar tabla del resumen AM
  const [show, setShow] = useState(true)



    const[listaProyectos, setListaProyectos] = useState([]);


    const[suggestions,setSuggestions] = useState([]);


    const[claveP,setClaveP] = useState([]);

    /*== Función que realiza la consulta a la tabla proyectos ==*/
    useEffect(()=>{
        const getProyectos = async () => {
            try{
                if(validatorrol === "administrador"){
                    const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
                    setListaProyectos(resProy.data.data);
                }else{
                    const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                    setListaProyectos(resProy.data.data);
                }
            }catch(error){
                console.log(error);
            }
        }
        getProyectos();
       
    },[])

   /*== Función que realiza la busqueda de los proyectos semejantes a la clave introducida ==*/
   const onChangeTextClaveP = (claveP) => {
    let coincidencias = [];
    if(claveP.length>0){
        coincidencias = listaProyectos.filter(proyecto => {
        const regex = new RegExp(`${claveP}`, "gi");
        return proyecto.proyecto_clave.match(regex)
        })
    }
    setSuggestions(coincidencias);
    setClaveP(claveP);
}

async function consultarTotalesP(id){          //console.log(id)
    try{
        const resTotPar = await axios.get(url2 + `/api/cotizador/am/viewTotalesPartidas/${id}`);
        getTotalPar(resTotPar.data.data);

        const resAMPar = await axios.get(url2 + `/api/cotizador/am/viewAMPartidas/${id}`);
        getPorcentajesPar(resAMPar.data.data);

        const resTotCats = await axios.get(url2 + `/api/cotizador/am/viewTotalesCategorias/${id}`);
        getTotalCats(resTotCats.data.data);

        const resAMCats = await axios.get(url2 + `/api/cotizador/am/viewAMCategorias/${id}`);
        getPorcentajesCats(resAMCats.data.data);

        const dProy = await axios.get(url2 + `/api/cotizador/am/viewDivisa/${id}`);
        getDivisaProy(dProy.data.data);

        const resCI = await axios.get(url2 + `/api/cotizador/ci/view/${id}`);
        getPorcentajesCI(resCI.data.data);

    }catch (error){
        console.log(error);
    }
    
    //console.log('Categorias',totalCategorias);
}



  return (


    <div className="contenido-usuarios">




            <div className="busqueda-proyectos">
              
              
              
                    <Table responsive id="nombreDiv">
                        <thead>
                            <tr className="azul">
                                <th>Clave Proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>
                                <input className="agregar"
                                        type="text"
                                        name="proyecto_clave"
                                        onChange={e => onChangeTextClaveP(e.target.value)}
                                        value={claveP}
                                        placeholder="Ingresa la clave del Proyecto" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                                   {/*============= Titulo Animación =============*/}
                <div> <Animaciones mytext="Proyectos " /> </div>

<Table responsive  striped bordered hover size="sm">
    <thead>
        <tr className="titulo-tabla-usuarios">
            <th>ID</th>
            <th>Clave</th>
            <th>Descripción</th>
            <th>Cliente</th>
            <th>Fecha de creción</th>
            <th>Estatus</th>
            <th>Resumen AM</th>
        </tr>
    </thead>
                       
    <tbody>
        {Object.keys(suggestions).map((key) => (    
            //checar aqui va los titulos
            <tr key={suggestions[key].proyecto_id} >
                <td>{suggestions[key].proyecto_id}</td>   
                <td>{suggestions[key].proyecto_clave}</td>  
                <td>{suggestions[key].proyecto_descripcion}</td>  
                <td>{suggestions[key].nombre_cliente}</td> 
                <td>{suggestions[key].proyecto_fecha_creacion}</td>
                <td>{suggestions[key].proyecto_estatus}</td> 
                <td>
                    <button 
                    className="btn btn-primary Ver" 
                    onClick={() => {
                    
                       consultarTotalesP(suggestions[key].proyecto_id);

                        
                        setShow(!show);}}
                    >{show ? 'Ver mas':'Ocultar proyecto'}</button>

{show ? (
                <div></div>
              ) : (
                <div className="arregla">
                  {/*========================== Llamado al Componente ==========================*/}
    {/*           <CostosIndirectos/> */}
    
    <PEconomica/>

                </div>
              )}
                </td> 
            </tr>  
        ))}
    </tbody>          
</Table>


                    </div>







                    
    </div>
  )
}

export default BuscadorInteligente3