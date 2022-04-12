import  {useState} from 'react';
import axios from 'axios';
import {url2} from "../../../Componentes/Ocultar";


export const EditProyecto = () => {
     /*=================================== Edición de los datos de un proyecto ===================================*/
    const actualizacionProy = (nombreCliente,dataClientes,data,newdata)=>{
        const clienteId = {};
        let i = Object.keys(dataClientes);
        if(nombreCliente !== data.nombre_cliente){
            for (let c = 0; c < i.length; c++) {
                if (nombreCliente === dataClientes[c].nombre_cliente){
                    clienteId.proyecto_id_cliente = dataClientes[c].cliente_id;
                }
            }
        //console.log('id cliente:', clienteId);
        }
        SendEditProy(nombreCliente,clienteId.proyecto_id_cliente,data, newdata,data.proyecto_id) 
   }
   
    // Función que realiza la inserción del proyecto
    async function SendEditProy (nombreCliente,cliente_id,dataP,newdataP,proyecto_id){
        const dataActualizacion ={
            proyecto_clave:dataP.proyecto_clave,
            proyecto_descripcion: dataP.proyecto_descripcion,
            proyecto_id_cliente: dataP.proyecto_id_cliente
        }
        //console.log(dataP);
        const k = Object.keys(newdataP);
        for(let keys of k){
            if(newdataP[keys] !== '' && newdataP.proyecto_descripcion !== '' && nombreCliente !== dataP.nombre_cliente && nombreCliente !== ''){
                //console.log('Los 3 datos no son nulos');
                dataActualizacion[keys] = newdataP[keys];
                dataActualizacion.proyecto_id_cliente = cliente_id;
            }
            else if(newdataP[keys] !== ''){
                //console.log('proyecto_clave y proyecto_descripcion no son nulos');
                dataActualizacion[keys] = newdataP[keys];
            }else if(nombreCliente !== dataP.nombre_cliente && nombreCliente !== ''){
                //console.log('nombre_cliente no es nulo');
                dataActualizacion.proyecto_id_cliente = cliente_id;
            }
        }
        if(dataP.proyecto_estatus === 'En revision'){
            alert('El proyecto no puede ser editado porque se encuentra En revision')
        }else if(dataP.proyecto_estatus === 'Aceptado'){
            alert('El proyecto no puede ser editado porque ha sido Aceptado')
        }else{
            try{
                console.log('Datos actualizados: ',dataActualizacion);
                //console.log('Id proyecto: ', proyecto_id);
                await axios.post(url2 + `/api/cotizador/proyecto/update/${proyecto_id}`, dataActualizacion);
                alert('Proyecto editado exitosamente');
            }catch (error){
                alert('Edición de proyecto invalido');
            }
        }
    }

    /*===========================================================================================================*/
    return {
        actualizacionProy
    }
};