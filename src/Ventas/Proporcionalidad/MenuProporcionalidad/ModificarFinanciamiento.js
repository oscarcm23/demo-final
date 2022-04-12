import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import {  url2 } from "../../../Componentes/Ocultar";

function ModificarFinanciamiento(prop) {
    // id del proyecto del que queremos ver la proporcionalidad
    const idProyecto = prop.propIdProyecto
    console.log("este es el idProyecto en modificar financiamiento", idProyecto)

    // almacenamiento de las proporcionalidades 
    const [listaFinanciamiento, setListaFinanciamiento] = useState([]);

    //llamado al endpoint para visualizar las proporcionalidades guardadas en la BD
    useEffect(() => {
        async function llamadiListaFinanciamiento() {
            try {
                const respuesta = await axios.get(url2 + `/api/cotizador/proporcionalidad/view/${idProyecto}`)
                setListaFinanciamiento(respuesta.data.data[0])
                console.log("este es el lista financiaamiento en el useeefect",respuesta.data.data[0])

            } catch (error) {
                console.log(error)
            }
        }
        llamadiListaFinanciamiento();
    }, [])



    // const [datosProporcionalidad, setDatosProporcionalidad] = useState({
    //     pd_tasa_interes: '',
    //     pd_anio_financiamiento: '',
    //     pd_pagos_anuales: ''

    //   })
    // Función que obtiene los datos introducidos en los inputs 
    const handleInputChange = (event) => {
        console.log("listaFinanciamiento", listaFinanciamiento)
        setListaFinanciamiento({
            ...listaFinanciamiento, [event.target.name]: event.target.value,
        })
    }
    // Función que realiza la inserción de los datos a la tabla proporcionalidad en la bd 

    async function SendProporcionalidadModificada() {
        console.log(idProyecto)
        const data = {
            pd_tasa_interes: listaFinanciamiento.pd_tasa_interes,
            pd_anio_financiamiento: listaFinanciamiento.pd_anio_financiamiento,
            pd_pagos_anuales: listaFinanciamiento.pd_pagos_anuales
        };
        try {
            const respuestaUpdate = await axios.put(url2 + `/api/cotizador/proporcionalidad/update/${idProyecto}`, data);
            const respuestaUpdateBack = respuestaUpdate.data.msg
            alert(respuestaUpdateBack)
        } catch (error) {
            console.log(error)
        }

    }

    return (

        <div className="contenido-usuarios">

            <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>ID</th>
                        <th>Tasa de Interes</th>
                        <th>Años de Financiamiento</th>
                        <th>Pagos Anuales</th>
                        <th>Modificar</th>

                    </tr>
                </thead>
                <tbody>
                        <tr key={listaFinanciamiento.pd_id}>
                            {/*================= ID ==================*/}
                            <td>
                                {listaFinanciamiento.pd_id}
                            </td>
                            {/*================= Años de Financiamiento ==================*/}
                            <td>
                                <input
                                    onChange={handleInputChange}
                                    defaultValue={listaFinanciamiento.pd_tasa_interes}
                                    type="text"
                                    name='pd_tasa_interes'></input>
                            </td>

                            {/*================= Pagos Anuales ==================*/}
                            <td>
                                <input
                                    onChange={handleInputChange}
                                    defaultValue={listaFinanciamiento.pd_anio_financiamiento}
                                    type="text"
                                    name='pd_anio_financiamiento'>
                                </input>
                            </td>
                            {/*================= Pagos Anuales ==================*/}
                            <td>
                                <input
                                    onChange={handleInputChange}
                                    defaultValue={listaFinanciamiento.pd_anio_financiamiento}
                                    type="text"
                                    name='pd_pagos_anuales'>
                                </input>
                            </td>
                            {/*================= Agregar==================*/}
                            <td>
                                <button onClick={SendProporcionalidadModificada} className="btn btn-primary Mod"> Modificar </button>
                            </td>

                        </tr>
                </tbody>
            </Table>
        </div>

    )
}
export default ModificarFinanciamiento