/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import Cookies from "universal-cookie";
import {url, url2} from "../../../Componentes/Ocultar";
import { pEstatus1 } from "./ContinuarProyecto";
/*============== Operacions PTN BOM ==============*/
import { precioUnitario, calcularDescuento, Total} from "../Operaciones/Operaciones";
import ModalPtnDatos from "../Routes/ModalPtnDatos";


//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');

let parId;
let validaOperacion = false;

export function getIdPar (partida_id){
  parId = partida_id;
}


function DatosSP({clave} ) {



  function checa(){

    validaOperacion = !validaOperacion;
    
    }
  console.log(clave);
  
  const [modalShow, setModalShow] = useState(false);
  /*  console.log("---- Precio Unitario ----- ") */
  /*PARAMETROS   precioUnitario(precioLista, Descuento) */
  /*   console.log( precioUnitario( 100 , 10 ))
    console.log(" ------------- ") */

  /*   console.log("---- Calcular Descuento ----- ") */
  /*  /*PARAMETROS  calcularDescuento(precioLista, precioUnitario ) */
  /*   console.log( calcularDescuento( 100 , 10 )) */
  /*   console.log(" ------------- ") */

  /*   console.log("---- Calcular Total ----- ") */

  /*PARAMETROS  calcularDescuento(Cantidad , Precio Unitario); */
  /*  console.log( Total( 1 , 90 )) */
  /*   console.log(" ------------- ")
  
   */

  /*=================================== Obtención de datos en la tabla precio ===================================*/
  // Almacenamiento de los datos
  
  const [datos, setDatos] = useState({
    precio_lista: '',
    precio_unitario: '',
    precio_descuento: '',
    sp_cantidad: '',
    precio_total: '',
    precio_id_moneda:''
  });
  
  const handleInputChange = (event) => {
    setDatos({
      ...datos,[event.target.name]: event.target.value,
    });
  };
    
  /*useEffect(() => {
    let total = '';
    let precio_u = '';
    let desc_ = '';
    if (datos.precio_unitario !== '' && datos.sp_cantidad !== '') {
      const total = Total(datos.precio_unitario, datos.sp_cantidad)
      setDatos({ ...datos, precio_total: total })
      const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
      setDatos({ ...datos, precio_descuento: desc });
    }
    if (datos.precio_unitario == '' || datos.sp_cantidad =='') {
      setDatos({ ...datos, precio_total: total , precio_descuento:desc_ })
    }
    if (datos.precio_lista !== '' && datos.precio_descuento !== '' && datos.precio_unitario !== '') {
      precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
      const total = Total(precio_u, datos.sp_cantidad);
      setDatos({ ...datos, precio_unitario: precio_u , precio_total:total});
    }
  },[datos.precio_unitario, datos.precio_lista, datos.precio_descuento, datos.sp_cantidad])*/

///CALCULAR DESCUENTO
      /*================================================================================*/
      useEffect(()=>{

        if(datos.precio_lista !=='' && datos.precio_unitario !==''  && validaOperacion === false){
          const desc = calcularDescuento(datos.precio_lista, datos.precio_unitario);
          const total = Total(datos.precio_unitario,datos.sp_cantidad)
          setDatos({ ...datos,precio_total:total, precio_descuento: desc });}
       
        if(datos.precio_lista === '' || datos.precio_unitario === ''){
          setDatos({ ...datos,precio_descuento:''});
        }

        },[datos.sp_cantidad,datos.precio_lista,datos.precio_unitario])


///CALCULAR PRECIO UNITARIO
      /*===================================================================================================================*/
      useEffect(()=>{
        let precio_u='';
        if (datos.precio_lista !== '' &&  datos.precio_descuento !== ''  &&  validaOperacion ===true) {
          precio_u = precioUnitario(datos.precio_lista, datos.precio_descuento);
          const total = Total(precio_u, datos.sp_cantidad);
          if( datos.precio_descuento < 0 || datos.precio_descuento > 100 ){
          // alert("Advertencia Porcentaje Invalido")
          }
          setDatos({ ...datos, precio_total:total,precio_unitario:precio_u});
        }
      
      },[datos.precio_descuento,datos.precio_lista,datos.sp_cantidad])

      //OBTENER TOTALES

//checar
           /*===================================================================================================================*/
           useEffect(()=>{

            if(datos.precio_unitario === '' || datos.sp_cantidad === ''){
              setDatos({ ...datos,precio_total:''});
            } 
          
          },[,datos.precio_unitario,datos.sp_cantidad])
      
/*===========================================================================*/

  /*=================================== Buscador de proveedores ===================================*/
  // Almacenamiento de los proveedores existentes
  const [ListaProv, setListaProv] = useState ([]);

  // Almacenamiento del id del proveedor encontrado en la busqueda
  var proveedorId = {proveedor_id:''}

  // Almacenamiento del nombre del proveedor a buscar
  const [nombreProv, setNombreProv] = useState('');

  // Almacenamiento de los proveedores semejantes al texto introducido en el input
  const [suggestionsProv, setSuggestionsProv] = useState ([]);

  // Función que realiza la consulta a la tabla proveedores
  useEffect (() => {
    async function listaProvs(){
      try {
        const respuesta = await axios.get(url + "/api/cotizador/proveedor/view");
        setListaProv(respuesta.data.data);
      } catch (error) {}
    }
    listaProvs();
  },[])

  // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
  const onChangeTextProv = (nombreProveedor) => {
    let coincidencias = [];
    if(nombreProveedor.length>0){
      coincidencias = ListaProv.filter(proveedor => {
        const regex = new RegExp(`${nombreProveedor}`, "gi");
        return proveedor.proveedor_nombre.match(regex)
      })
    }
    setSuggestionsProv(coincidencias);
    setNombreProv(nombreProveedor);
  }

  // Función que obtiene el nombre del cliente seleccionado
  const onSuggestHandlerProv = (nombreProveedor) => {
    setNombreProv(nombreProveedor);
    setSuggestionsProv([]);
  }
  /*============================================================================================*/

  /*=================================== Buscador de marcas con respecto al proveedor seleccionado ===================================*/
  // Almacenamiento de los proveedores existentes
  const [listaMarca, setListaMarca] = useState ([]);

  // Almacenamiento del id del proveedor encontrado en la busqueda
  var marcaId = { marca_id:''}

  // Almacenamiento del nombre del proveedor a buscar
  const [nombreMarca, setNombreMarca] = useState('');

  // Almacenamiento de los proveedores semejantes al texto introducido en el input
  const [suggestionsMarca, setSuggestionsMarca] = useState ([]);

  // Función que realiza la consulta a la tabla proveedores
  useEffect (() => {
    // Obtención del id del proveedor que se seleccionó en la búsqueda
    let i = Object.keys(ListaProv);
    for (let c = 0; c < i.length; c++) {
      if (nombreProv === ListaProv[c].proveedor_nombre) {
        proveedorId.proveedor_id = ListaProv[c].proveedor_id
        console.log('proveedor id:',proveedorId);
      }        
    }
    async function listaMarcas(){
      try {
        const respuesta = await axios.get(url2 + `/api/cotizador/provmarcas/view/${proveedorId.proveedor_id}`);
        setListaMarca(respuesta.data.data);
      } catch (error) {}
    }
    if(proveedorId.proveedor_id !== ''){
      listaMarcas();
    }
  },[nombreProv])

  // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
  const onChangeTextMarca = (nombreMarca) => {
    let coincidencias = [];
    if(nombreMarca.length>0){
      coincidencias = listaMarca.filter(marca => {
        const regex = new RegExp(`${nombreMarca}`, "gi");
        return marca.marca_nombre.match(regex)
      })
    }
    setSuggestionsMarca(coincidencias);
    setNombreMarca(nombreMarca);
  }

  // Función que obtiene el nombre del cliente seleccionado
  const onSuggestHandlerMarca = (nombreMarca) => {
    setNombreMarca(nombreMarca);
    setSuggestionsMarca([]);
  }
  
  /*============================================================================================*/
  
  /*=================================== Obtención de los id's de las categorias para insertar en la tabla servicio_producto ===================================*/
  // Almacenamiento de los datos
  const[datosCategoria, setDatosCategoria] = useState  ({
      categoria_id: '',
  });

  // Obtención de los id's dependiendo del select
  const handleInputChangeCategoria = (event) =>{
      setDatosCategoria({
          ...datosCategoria, [event.target.name] : event.target.value
      })
  }
  /*=========================================================================================================================================================*/

  /*============================= Inserción de datos en las tablas servicio_producto, precio, proveedor, marca, proveedor_marca y psp =============================*/
  /*=================================== Obtención de datos para la tabla servicio_producto ===================================*/
  // Almacenamiento de los datos
  const[datosSP, setDatosSP] = useState  ({
          sp_no_parte: '',
          sp_descripcion: '',
          sp_meses: '',
          sp_semanas: '',
          sp_cantidad: '',
          sp_comentarios: ''
  });

  // Obtención de los datos introducidos en los input
  const handleInputChangeSP = (event) =>{
      setDatosSP({
          ...datosSP, [event.target.name] : event.target.value
      })
  }
  /*==========================================================================================================================*/

  // Almacenamiento de la última partida insertada
  var ListaPartida = {
      partida_id:'',
      partida_nombre:'',
      partida_descripcion:''
  };


  // Almacenamiento del id de la última partida insertada 
  var partidaId = {
      partida_id:''
  }
  
  // Función que realiza las inserciones a las tablas y la consulta a la tabla partidas
  async function SendSP (){
      const dataSP = {
          sp_no_parte: datosSP.sp_no_parte,
          sp_descripcion: datosSP.sp_descripcion,
          sp_meses: datosSP.sp_meses,
          sp_semanas: datosSP.sp_semanas,
          sp_cantidad: datos.sp_cantidad,
          sp_id_precio:'',
          sp_id_categoria:datosCategoria.categoria_id,
          sp_comentarios: datosSP.sp_comentarios
      };

      const dataPrecio = {
        precio_lista: datos.precio_lista,
        precio_unitario: datos.precio_unitario,
        precio_descuento: datos.precio_descuento,
        precio_total: datos.precio_total,
        precio_id_moneda: datos.precio_id_moneda
      };

      // Obtención del id del proveedor que se seleccionó en la búsqueda
    let i = Object.keys(ListaProv);
    for (let c = 0; c < i.length; c++) {
      if (nombreProv === ListaProv[c].proveedor_nombre) {
        proveedorId.proveedor_id = ListaProv[c].proveedor_id
        //console.log('proveedor id:',proveedorId);
      }        
    }
      // Obtención del id de la marca que se seleccionó en la búsqueda
      let m = Object.keys(listaMarca);
      for (let c = 0; c < m.length; c++) {
        if (nombreMarca === listaMarca[c].marca_nombre) {
          marcaId.marca_id = listaMarca[c].marca_id
          //console.log('marca id:',marcaId);
        }        
      }

      if(pEstatus1 === 'En revision'){
        alert('No se puede continuar el Proyecto porque se encuentra En revision')
      }else if(pEstatus1 === 'Aceptado'){
          alert('No se puede continuar el Proyecto porque ha sido Aceptado')
      }else{
        try{
          // Inserción a la tabla precio
          const resPrecio = await axios.post(url + '/api/cotizador/precio/agregar', dataPrecio);
          // Obtención del precio_id de la inserción realizada
          dataSP.sp_id_precio = resPrecio.data.data.insertId;

          // Obtención del id de la última partida insertada del ultimo proyecto insertado del usuario que esta activo
          const resGetPartida = await axios.get(url2 + `/api/cotizador/partida/viewPU/${validatorid}`);
          ListaPartida = resGetPartida.data.data.pop();
          partidaId.partida_id = ListaPartida.partida_id;

          //Inserción a las tablas sp , psp, y sp_proveedor_marcas
          if(parId !== partidaId.partida_id && parId !== '' ){
            //console.log(parId);
            await axios.post(url2 + `/api/cotizador/sp/agregar/${parId}/${proveedorId.proveedor_id}/${marcaId.marca_id}`, dataSP);
            //console.log('Despues de la insersión:', parId);
            alert('Servico/producto registrado exitosamente')
          }else{
            //console.log(partidaId.partida_id);
            await axios.post(url2 + `/api/cotizador/sp/agregar/${partidaId.partida_id}/${proveedorId.proveedor_id}/${marcaId.marca_id}`, dataSP);
            alert('Servico/producto registrado exitosamente')
          }
        }catch (error){
        alert('Registro de Servico/producto invalido')
        console.log(error);
        }
      }
  }
  const enviarDatosSP = (event) =>{
      SendSP();
      event.preventDefault()
      event.target.reset();
     
  }

  const [modalShow1, setModalShow1] = useState(true)
  const [proyecto_id, Setproyecto_id] = useState([])
  const lista = async (clave) =>{
    console.log(clave);
    try {
      const respuesta = await axios.get(`http://localhost:4001/api/cotizador/proyecto/viewModal/${clave}`);
      Setproyecto_id(respuesta.data.reSql)
    
      
    } catch (error) {
      console.log(error)
      
    }
    
    
 }
 console.log(clave);
 
  /*===============================================================================================================================================================*/
  
  return (

    <div className="contenido-usuarios">
        <button type="button" className="btn btn-primary" onClick={() => {setModalShow(true);lista (clave)}} >
          Ver partidas agregadas
        </button><br/><br/>
      {modalShow && modalShow1 ?   
      <ModalPtnDatos
      show={modalShow}
      proyecto_id={proyecto_id}
      onHide={() => setModalShow(false)}  
     
      />
         :  ''  } 
      
        {/*========================== Tabla Datos PTN ==========================*/}
        <form action="" method="post" onSubmit={enviarDatosSP}>
            <Table responsive id="nombreDiv">
            {/*========================== Titulos Tabla ==========================*/}
            <thead>
                <tr className="titulo-tabla-usuarios">
                <th>No. De Parte</th>
                <th>Descripción</th>
                <th> Duración Meses </th>
                <th> Entrega </th>
                <th> Moneda </th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                {/*========================== Número de Parte ==========================*/}
                <td>
                    <input
                    className="agregar"
                    type="text"
                    name="sp_no_parte"
                    onChange={handleInputChangeSP}
                    placeholder="No. Parte"
                    />
                </td>
                {/*========================Descripcion Producto ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="sp_descripcion"
                    onChange={handleInputChangeSP}
                    placeholder="Descripción"
                    />
                </td>
                {/*========================Meses ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="number"
                    name="sp_meses"
                    min="0"
                    onChange={handleInputChangeSP}
                    placeholder="Meses"
                    />
                </td>
                {/*======================== Semanas ==========================*/}
                <td>
                    <input
                    className="agregar"
                    type="number"
                    name="sp_semanas"
                    min="0"
                    onChange={handleInputChangeSP}
                    placeholder="Entrega semanas"
                    />
                </td>
                {/*======================== Moneda ==========================*/}
                <td>
                    <select id="moneda" name="precio_id_moneda" onChange={handleInputChange}>
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
                <th>Función</th>
                <th>Cantidad</th>
                <th>Precio Lista</th>
                <th>Precio Unitario</th>
                <th> Descuento (%)</th>
                <th> Total </th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                {/*======================== Cantidad ==========================*/}
                <td>
                <label className="switch">
  <input type="checkbox" id="checa"     onClick={checa}/>
  <span className="slider"></span>
</label>
                    
                  
                </td>
               
               
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="sp_cantidad"
                    value={datos.sp_cantidad}
                    onChange={handleInputChange}
                    placeholder="Cantidad "
                    
                    />
                </td>
                {/*======================== Precio Lista ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="precio_lista"
                    value={datos.precio_lista}
                    onChange={handleInputChange}
                    placeholder="Precio Lista"
                    
                    />
                </td>

                {/*======================== Precio Unitario ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    value={datos.precio_unitario}
                    name="precio_unitario"
                    onChange={handleInputChange}
                    placeholder="Precio unitario"
                    step="any"
                    />
                </td>
                {/*======================== Descuento==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    value={datos.precio_descuento}
                    name="precio_descuento"
                    onChange={handleInputChange}
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
                <th>Proveedor</th>
                <th>Marca</th>
                <th>Comentarios </th>
                <th>Categoría </th>
                <th> - </th>
                </tr>
            </thead>
            <tbody>
                <tr className="">
                {/*======================== Proveedor ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="proveedor_nombre"
                    onChange={e => onChangeTextProv(e.target.value)}
                    value={nombreProv}
                    placeholder="Proveedor"
                    />
                    {suggestionsProv && suggestionsProv.map((suggestionProv,i)=>
                      <div key={i} className="selectCliente" onClick={() => onSuggestHandlerProv(suggestionProv.proveedor_nombre)}>
                      {suggestionProv.proveedor_nombre}
                      </div>
                    )}
                </td>
                {/*======================== Marca ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="marca_nombre"
                    onChange={e => onChangeTextMarca(e.target.value)}
                    value={nombreMarca}
                    placeholder="Marca"
                    />
                    {suggestionsMarca && suggestionsMarca.map((suggestionMarca,i)=>
                      <div key={i} className="selectCliente" onClick={() => onSuggestHandlerMarca(suggestionMarca.marca_nombre)}>
                      {suggestionMarca.marca_nombre}
                      </div>
                    )}
                </td>

                {/*======================== Comentarios ==========================*/}
                <td>
                    {" "}
                    <input
                    className="agregar"
                    type="text"
                    name="sp_comentarios"
                    onChange={handleInputChangeSP}
                    placeholder="Comentarios"
                    />
                </td>
                {/*======================== Categorias ==========================*/}
                <td>
                    {" "}
                    <select id="lista-opciones" name="categoria_id" onChange={handleInputChangeCategoria}>
                    <option value={0}></option>
                    <option value={1}>Tecnología Principal</option>
                    <option value={2}>Sub-tecnología</option>
                    <option value={3}>Equipamiento</option>
                    <option value={4}>Licencia</option>
                    <option value={5}>Soporte</option>
                    <option value={6}>Implementación</option>
                    </select>
                </td>
                {/*======================== Agregra Datos  ==========================*/}
                <td>
                    <button className="btn btn-primary" > Agregar</button>
                    {/* <button className="btn btn-primary" onClick={() => { enviarDatosDP(); enviarDatosSP(); enviarDatosM(); }}> Agregar</button> */}
                </td>
                </tr>
            </tbody>
            </Table>
        </form>
    </div>
  );
}

export default DatosSP;
