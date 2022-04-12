import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import {url,url2} from "../../../Componentes/Ocultar";
import { pEstatus1 } from "../Menu-Bom/ContinuarProyecto";


//Obtención del id del usuario con sesión activa
const cookies = new Cookies();
let validatorid = cookies.get('id_usuario');

let pId;

export const InsertDatosCats = () => {
    /*=================================== Inserción de datos en la tabla partida ===================================*/
    // Almacenamiento de los datos de una partida a insertar
    const[datos, setDatos] = useState({
        cd_id_cats:'',
        cd_no_parte: '',
        cd_descripcion: '',
        cd_meses: '',
        cd_semanas: '',
        cd_id_precio:'',
        cd_comentarios: ''
    });

    // Función que obtiene los datos introducidos en los inputs de los datos de una partida y los guarda en el objeto de datosPartida
    const handleInputChange = (event) =>{
        setDatos({
            ...datos,[event.target.name] : event.target.value ,
        })
    }

    function getIdP1 (proyecto_id){
        pId = proyecto_id;
    }
    // Función que realiza la inserción de los datos a la tabla partida en la bd 
    async function Send(dPrecio){
        const data = {
            cd_id_cats:datos.cd_id_cats,
            cd_no_parte:datos.cd_no_parte,
            cd_descripcion:datos.cd_descripcion,
            cd_meses:datos.cd_meses,
            cd_semanas:datos.cd_semanas,
            cd_cantidad:dPrecio.cd_cantidad,
            cd_id_precio:'',
            cd_comentarios:datos.cd_comentarios
        };

        const dataP = {
            precio_lista:dPrecio.precio_lista,
            precio_unitario:dPrecio.precio_unitario,
            precio_descuento:dPrecio.precio_descuento,
            precio_total:dPrecio.precio_total,
            precio_id_moneda:dPrecio.precio_id_moneda
        };

        var ListaProyectos = {
            proyecto_id:'',
            proyecto_clave:'',
            proyecto_descripcion:'',
            proyecto_id_cliente:'',
            proyecto_id_cat_c_a_sptn_ma:'',
            proyecto_fecha_creacion:'',
            proyecto_fecha_modificacion:''
        };
    
        var proyectoId = {
            proyecto_id:''
        }
        
        if(pEstatus1 === 'En revision'){
            alert('No se puede continuar el Proyecto porque se encuentra En revision')
        }else if(pEstatus1 === 'Aceptado'){
            alert('No se puede continuar el Proyecto porque ha sido Aceptado')
        }else{
            try{
                // Obtención del id del último proyecto insertado
                const resGetProyectos = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                ListaProyectos = resGetProyectos.data.data.pop();
                proyectoId.proyecto_id = ListaProyectos.proyecto_id;

                if(pId !== proyectoId.proyect && pId !== ''){
                    // Inserción a la tabla precio
                    const resPrecio = await axios.post(url + '/api/cotizador/precio/agregar', dataP);
                    // Obtención del precio_id de la inserción realizada
                    data.cd_id_precio = resPrecio.data.data.insertId;
                    await axios.post(url2 + `/api/cotizador/catd/agregar/${proyectoId.proyecto_id}`,data);
                    //console.log(pId);
                    alert('Se agregaron los datos de una categoria correctamente');
                }else{
                    //console.log(data);
                    //console.log(dataP);
                    //console.log(proyectoId.proyecto_id);
                    
                    // Inserción a la tabla precio
                    const resPrecio = await axios.post(url + '/api/cotizador/precio/agregar', dataP);
                    // Obtención del precio_id de la inserción realizada
                    data.cd_id_precio = resPrecio.data.data.insertId;
                    await axios.post(url2 + `/api/cotizador/catd/agregar/${proyectoId.proyecto_id}`,data);
                    //console.log(pId);
                    alert('Se agregaron los datos de una categoría correctamente');
                }
            }
            catch (error){
                console.log(error);
                alert('Error al agregar los datos de una categoría');
            }
        }
    }

    async function finalizarProy (){
        var ListaProyectos = {
            proyecto_id:'',
            proyecto_clave:'',
            proyecto_descripcion:'',
            proyecto_id_cliente:'',
            proyecto_id_cat_c_a_sptn_ma:'',
            proyecto_fecha_creacion:'',
            proyecto_fecha_modificacion:''
        };

        var proyectoId = {
            proyecto_id:''
        }

        const dataEstatus = {
            proyecto_estatus: 'En revision'
        }

        if(pEstatus1 === 'En revision'){
            alert('El proyecto no puede ser finalizado porque se encuentra En revision')
        }else if(pEstatus1 === 'Aceptado'){
            alert('El proyecto no puede ser finalizado porque ha sido Aceptado')
        }else{
            try {
                // Obtención del id del último proyecto insertado
                const resGetProyectos = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                ListaProyectos = resGetProyectos.data.data.pop();
                proyectoId.proyecto_id = ListaProyectos.proyecto_id;

                if(pId !== proyectoId.proyect && pId !== ''){
                    //Inserción de estatus al proyecto
                    await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/${pId}`,dataEstatus);
                    /*=============== Inserción de costos indirectos ===============*/
                    await axios.post(url2 + `/api/cotizador/ci/agregar/1/2/${pId}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/2/1/${pId}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/3/5/${pId}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/4/1/${pId}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/5/4/${pId}`);
                    /*==============================================================*/

                    /*=============== Inserción de datos AM de las categorías ===============*/
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${pId}/1`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${pId}/2`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${pId}/3`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${pId}/4`);
                    /*=======================================================================*/
                    alert('Se finalizó el proyecto correctamente');
                    alert('El proyecto entro al estatus: En revisón');
                }else{
                    //Inserción de estatus al proyecto
                    await axios.put(url2 + `/api/cotizador/proyecto/updateEstatus/${proyectoId.proyecto_id}`,dataEstatus);
                    /*=============== Inserción de costos indirectos ===============*/
                    await axios.post(url2 + `/api/cotizador/ci/agregar/1/2/${proyectoId.proyecto_id}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/2/1/${proyectoId.proyecto_id}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/3/5/${proyectoId.proyecto_id}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/4/1/${proyectoId.proyecto_id}`);
                    await axios.post(url2 + `/api/cotizador/ci/agregar/5/4/${proyectoId.proyecto_id}`);
                    /*==============================================================*/

                    /*=============== Inserción de datos AM de las categorías ===============*/
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${proyectoId.proyecto_id}/1`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${proyectoId.proyecto_id}/2`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${proyectoId.proyecto_id}/3`);
                    await axios.post(url2 + `/api/cotizador/am/AgregarAMCategorias/${proyectoId.proyecto_id}/4`);
                    /*=======================================================================*/
                    alert('Se finalizó el proyecto correctamente');
                    alert('El proyecto entro al estatus: En revisón');
                }
            }catch (error) {
                console.log(error);
                alert('Finalización del proyecto inválido');
            }
        }
    }

    const enviarDatos = (event,datosPrecio) =>{
        //console.log(datosPrecio);
        Send(datosPrecio);
        event.preventDefault()
        event.target.reset();
    }
    /*==============================================================================================================*/

    return{
        handleInputChange,
        enviarDatos,
        getIdP1,
        finalizarProy
    }
};


