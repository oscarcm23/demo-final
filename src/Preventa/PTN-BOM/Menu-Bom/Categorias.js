import React, { useState,useEffect } from 'react'
import Table from "react-bootstrap/Table";
import axios from 'axios';
import Cookies from 'universal-cookie';

//Componentes
import { InsertDatosCats } from '../Routes/GuardarDatosCategorias';
/*============== Operacions PTN BOM ==============*/
import { precioUnitario, calcularDescuento, Total} from "../Operaciones/Operaciones";
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');

function Categorias() {
    /*=================================== Obtención de datos en la tabla precio ===================================*/
    // Almacenamiento de los datos
    const [datos, setDatos] = useState({
        precio_lista: '',
        precio_unitario: '',
        precio_descuento: '',
        cd_cantidad: '',
        precio_total: '',
        precio_id_moneda:''
    });
    
    const handleInputChangePrecio = (event) => {
        setDatos({
        ...datos,[event.target.name]: event.target.value,
        });
    };

    /*=================== Operaciones de los datos de la tabla precio ===================================*/
    useEffect(()=>{
        let precio_u='';
        if (datos.precio_lista !== '' &&  datos.precio_descuento !== '' && datos.cd_cantidad !== '') {
        precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
        const total = Total(precio_u, datos.cd_cantidad);
        setDatos({ ...datos, precio_unitario: precio_u , precio_total:total});
        }
    
    },[datos.precio_lista,datos.precio_descuento])
    /*================================================================================*/
    useEffect(()=>{
        let total='';
        let desc_='';
        if (datos.precio_unitario !== '' && datos.cd_cantidad !== '') {
        const total = Total(datos.precio_unitario, datos.cd_cantidad)
        setDatos({ ...datos, precio_total: total })
        }
        if (datos.precio_unitario == '' || datos.cd_cantidad == '') {
        setDatos({ ...datos, precio_total: total , precio_descuento:desc_ })
        }
    },[datos.precio_unitario,datos.cd_cantidad])
    /*================================================================================*/
    useEffect(()=>{
        if(datos.precio_lista !=='' && datos.precio_unitario !==''){
        const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
        setDatos({ ...datos, precio_descuento: desc });}
        },[datos.precio_unitario])
        
    /*===================================================================================================================*/
    /*=============================================================================================================*/
    const {enviarDatos,handleInputChange,finalizarProy} = InsertDatosCats();
    
    return (
        <div className="contenido-usuarios">
            <form action="" method="post" onSubmit = {(e) => {enviarDatos(e, datos)}}>
                <Table responsive id="nombreDiv">
                {/*========================== Titulos Tabla ==========================*/}
                <thead>
                    <tr className="titulo-tabla-usuarios">
                    <th>Categoria</th>
                    <th>No. De Parte</th>
                    <th>Descripción</th>
                    <th>Duración Meses </th>
                    <th>Entrega</th>
                    <th>Moneda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                    {/*======================== Categorias ==========================*/}
                    <td>
                        {" "}
                        <select id="lista-opciones" name="cd_id_cats" onChange={handleInputChange}>
                            <option value={0}></option>
                            <option value={1}>Capacitación</option>
                            <option value={2}>Accesorios</option>
                            <option value={3}>Servicios PTN</option>
                            <option value={4}>Mesa de Ayuda</option>
                            
                        </select>
                    </td>
                    {/*========================== Número de Parte ==========================*/}
                    <td>
                        <input
                        className="agregar"
                        type="text"
                        name="cd_no_parte"
                        onChange={handleInputChange}
                        placeholder="No. Parte"
                        />
                    </td>
                    {/*========================Descripcion Producto ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="text"
                        name="cd_descripcion"
                        onChange={handleInputChange}
                        placeholder="Descripción"
                        />
                    </td>
                    {/*========================Meses ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="cd_meses"
                        min="0"
                        onChange={handleInputChange}
                        placeholder="Meses"
                        />
                    </td>
                    {/*======================== Semanas ==========================*/}
                    <td>
                        <input
                        className="agregar"
                        type="number"
                        name="cd_semanas"
                        min="0"
                        onChange={handleInputChange}
                        placeholder="Entrega semanas"
                        />
                    </td>
                    {/*======================== Moneda ==========================*/}
                    <td>
                        <select id="moneda" name="precio_id_moneda" 
                        onChange={handleInputChangePrecio}
                        >
                            <option value={0}></option>
                            <option value={1}>MXN</option>
                            <option value={2}>USD</option>
                        </select>
                    </td>
                    </tr>
                </tbody>
                </Table>
                {/*======================== Tabla Números ==========================*/}
                <Table responsive id="nombreDiv">
                <thead>
                    <tr className="titulo-tabla-usuarios">
                    <th>Cantidad</th>
                    <th>Precio Lista</th>
                    <th>Precio Unitario</th>
                    <th>Descuento (%)</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                    {/*======================== Cantidad ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="cd_cantidad"
                        value={datos.cd_cantidad}
                        onChange={handleInputChangePrecio}
                        placeholder="Cantidad "
                        
                        />
                    </td>
                    {/*======================== Precio Lista ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        name="precio_lista"
                        value={datos.precio_lista}
                        onChange={handleInputChangePrecio}
                        placeholder="Precio Lista"
                        
                        />
                    </td>

                    {/*======================== Precio Unitario ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        value={datos.precio_unitario}
                        name="precio_unitario"
                        onChange={handleInputChangePrecio}
                        placeholder="Precio unitario"
                        step="any"
                        />
                    </td>
                    {/*======================== Descuento==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="number"
                        value={datos.precio_descuento}
                        name="precio_descuento"
                        onChange={handleInputChangePrecio}
                        placeholder="Descuento"
                        min="0"
                        step="any"
                        />
                    </td>
                    {/*======================== Total ==========================*/}
                    <td>
                        {" "}
                        <input
                        className="agregar"
                        type="text"
                        name="precio_total"
                        value={datos.precio_total}
                        readOnly
                        placeholder="Total"
                        step="any"
                        />
                    </td>
                    </tr>
                </tbody>
                </Table>
                {/*========================== Datos PTN ==========================*/}
                <Table responsive id="nombreDiv">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>Comentarios</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            {/*======================== Comentarios ==========================*/}
                            <td>
                                {" "}
                                <input
                                className="agregar"
                                type="text"
                                name="cd_comentarios"
                                onChange={handleInputChange}
                                placeholder="Comentarios"
                                />
                            </td>
                            <td>
                                {/*=======================  Boton Agregar Categoria ======================= */}
                                <button className="btn btn-primary" type="submit">Agregar</button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
            </form>
            <button className="btn btn-primary modificar" onClick={() => finalizarProy()}>Finalizar proyecto</button>
        </div>
    )
}

export default Categorias