import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Cookies from 'universal-cookie';

//Componentes
import "../css/Proyectos.css";
import Animaciones from '../../../Componentes/Animaciones';
import {CrudProyectos} from '../Routes/CRUDProyectos';
import { EditProyecto } from '../Routes/ModificarProyectos';
import {url, url2} from "../../../Componentes/Ocultar";


const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');

function Proyectos() {

    /*========================== Mostrar/Ocultar ==========================*/
    //Condicionales para almacenar datos
    const [show,setShow] = useState(true);//Lista de proyectos del usuario activo
    const [show1,setShow1] = useState(true);//Lista de proyectos en los que colabora el usuario activo

    const [show2,setShow2] = useState(true);//Tabla de proyectos
    /*=====================================================================*/

    /*======================================== Buscador de proyectos ========================================*/
    // Almacenamiento de todos los proyectos existentes
    const[listaProyectos, setListaProyectos] = useState([]);

    // Almacenamiento de los proyectos que tienen la clave semejante a la instroducida
    const[suggestionsProyecto,setSuggestionsProyectos] = useState([]);
    
    // Almacenamiento de la clave introducida del proyecto
    const[claveP,setClaveP] = useState([]);

    // Almacenamiento de los clientes existentes
    const [ListaC, setListaC] = useState ([]);

    // Función que realiza la consulta a la tabla proyecto
    useEffect(()=>{
        const getProyectos = async () => {
            try{
                if(validatorrol === "administrador"){
                    const resProy = await axios.get(url +'/api/cotizador/proyecto/viewadmin');
                    setListaProyectos(resProy.data.data);
                }else{
                    if(show === false){
                        const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                        setListaProyectos(resProy.data.data);
                      }else if(show1 === false){
                        const resProy = await axios.get(url2 + `/api/cotizador/colaboradores/viewProyectos/${validatorid}`);
                        setListaProyectos(resProy.data.data);
                      }
                }
                const resC = await axios.get(url + "/api/cotizador/clientes/view");
                setListaC(resC.data.reSql);
            }catch(error){console.log(error);}
        }
        //console.log('Proyectos:',listaProyectos);
        getProyectos();
    },[show,show1])
    
    // Función que realiza la busqueda de los proyectos semejantes a la clave introducida 
    const onChangeTextClaveP = (claveP) => {
        let coincidencias = [];
        if(claveP.length>0){
            coincidencias = listaProyectos.filter(proyecto => {
            const regex = new RegExp(`${claveP}`, "gi");
            return proyecto.proyecto_clave.match(regex)
            })
        }
        setSuggestionsProyectos(coincidencias);
        setClaveP(claveP);
    }
    /*=======================================================================================================*/

    /*=================================== Edición de los datos de un proyecto ===================================*/
    const [first, setfirst] = useState(false);
    
    const {actualizacionProy} = EditProyecto();

    const envioDataProy =  (cliente, dataCliente, data, key, newdata) => {
        if(first){
            actualizacionProy(cliente[key],dataCliente,data[key],newdata);
        } 
    }
    /*===========================================================================================================*/

    /*===========================================================================================================*/
    return (
        <div className="contenido-usuarios">
            <Table responsive id="nombreDiv">
                {/*========================== Titulos Tabla ==========================*/}
                <thead>
                    <tr className="titulo-tabla-usuarios">
                        <th>Mis Proyectos</th>
                        <th>Otros Proyectos</th>
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
                            setShow1(true);
                            show ? setShow2(false):setShow2(true);
                            }}
                            >
                            {" "}
                            {show ? "Mostrar" : "Ocultar"}{" "}
                            </button>
                        </td>
                        <td>
                            <button
                            className="btn btn-primary modificar"
                            type="button"
                            onClick={() => {
                            setShow1(!show1);
                            setShow(true);
                            show1 ? setShow2(false):setShow2(true);
                            }}
                            >
                            {" "}
                            {show1 ? "Mostrar" : "Ocultar"}{" "}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            {show2 ? (
                <div></div>
            ):(
                <div className="table-responsive">
                {/*============= Titulo Animación =============*/}
                <Animaciones mytext="Buscar proyectos" />

                {/*********Búsqueda de Lista de Proyectos por Clave ********/}
                <div className="busqueda-proyectos">
                    <Table responsive id="nombreDiv">
                        <thead>
                            <tr className="titulo-tabla-usuarios">
                                <th>Búsqueda por clave</th>
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
                                        placeholder="Ingrese clave del proyecto" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div>
                    {/*=================== Botón Mostrar Lista DIV =====================*/}
                    <br />
                    <CrudProyectos
                        suggestionsP={suggestionsProyecto}
                        clientes={ListaC}
                        setfirst={setfirst}
                        envioDataP={envioDataProy}
                    />    
                </div>
            </div>
            )}
        </div>
    );
}
export default Proyectos