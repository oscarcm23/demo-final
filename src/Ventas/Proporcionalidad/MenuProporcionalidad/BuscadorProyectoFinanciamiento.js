import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import Cookies from 'universal-cookie';
import Animaciones from "../../../Componentes/Animaciones";
import Financiamiento from './Financiamiento';
import ModificarFinanciamiento from './ModificarFinanciamiento';
import { url, url2 } from "../../../Componentes/Ocultar";
const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');


function BuscadorProyectoFinanciamiento() {
    /*== Almacenamiento de todos los proyectos existentes ==*/
    const [listaProyectos, setListaProyectos] = useState([]);

    /*== Almacenamiento de los proyectos que tienen la clave semejante a la instroducida ==*/
    const [suggestions, setSuggestions] = useState([]);

    /*== Almacenamiento de la clave introducida del proyecto ==*/
    const [claveP, setClaveP] = useState([]);
    // Almacenamiento del ID asignado 
    const [idAsignado, setIdAsignado] = useState();

    //Habilitar/Deshabilitar tabla del financiamiento
    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(true)


    const getProyectos = async () => {
        try {
            if (validatorrol === "administrador") {
                const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
            } else {
                const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                setListaProyectos(resProy.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    /*== Función que realiza la consulta a la tabla proyectos ==*/
    useEffect(() => {
        getProyectos();
    }, [claveP])

    /*== Función que realiza la busqueda de los proyectos semejantes a la clave introducida ==*/
    const onChangeTextClaveP = (claveP) => {
        let coincidencias = [];
        if (claveP.length > 0) {
            coincidencias = listaProyectos.filter(proyecto => {
                const regex = new RegExp(`${claveP}`, "gi");
                return proyecto.proyecto_clave.match(regex)
            })
        }
        setSuggestions(coincidencias);
        setClaveP(claveP);
    }
    /*============================================================================================================*/
    return (
        <div className="contenido-usuarios">
            {/*======================= Titulo Animación =======================*/}
            <div> <Animaciones mytext="Divisa" /> </div>
            {/*********Búsqueda de Proyectos AM ********/}

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
                                    placeholder="Clave Proyecto" />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {/****************************Lista de los Proyectos Creados ****************************************/}
                {/*============= Titulo Animación =============*/}
                <div> <Animaciones mytext="Proyectos" /> </div>

                <Table responsive striped bordered hover size="sm">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>ID</th>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Cliente</th>
                            <th>Fecha de creción</th>
                            <th>Financiamiento</th>
                            <th>Modificar Financiamiento</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(suggestions).map((key) => (
                            <tr key={suggestions[key].proyecto_id} >
                                <td>{suggestions[key].proyecto_id}</td>
                                <td>{suggestions[key].proyecto_clave}</td>
                                <td>{suggestions[key].proyecto_descripcion}</td>
                                <td>{suggestions[key].nombre_cliente}</td>
                                <td>{suggestions[key].proyecto_fecha_creacion}</td>
                                <td>
                                    <button
                                        className="btn btn-primary Ver"
                                        onClick={() => {
                                            setIdAsignado(suggestions[key].proyecto_id)
                                            setShow2(!show2);
                                        }}
                                    >
                                        {" "}
                                        {show2 ? "Agregar Datos " : "Ocultar"}{" "}
                                    </button>

                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary Mod"
                                        onClick={() => {
                                            setIdAsignado(suggestions[key].proyecto_id)
                                            setShow(!show);
                                        }}
                                    >
                                        {" "}
                                        {show ? "Modificar Datos" : "Ocultar"}{" "}
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {show ? (
                    <div></div>
                ) : (
                    <div className="arregla">
                        <br />
                        {/*========================== Llamado al Componente modificar financiamiento ==========================*/}
                        <ModificarFinanciamiento propIdProyecto={idAsignado} />
                    </div>
                )}
                {show2 ? (
                    <div></div>
                ) : (
                    <div className="arregla">
                        <br />
                        {/*========================== Llamado al Componente agregar financiamiento==========================*/}
                        <Financiamiento propIdProyecto={idAsignado} />
                    </div>
                )}

                {/* {idAsignado !== null ? <Financiamiento propIdProyecto={idAsignado} /> : null} */}
                {/* {idAsignado !== null ? <ModificarFinanciamiento propIdProyecto={idAsignado} /> : null} */}
            </div>


        </div>
    )
}

export default BuscadorProyectoFinanciamiento