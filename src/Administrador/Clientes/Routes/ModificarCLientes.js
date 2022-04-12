import  {useState} from 'react';
import axios from 'axios';
import {url2} from "../../../Componentes/Ocultar";

export const useRegistro = () => {
   
    const actualizacion = (data,datos)=>{
        Send(data,data.cliente_id, datos)        
    }

    const  Send = async (data,id,datos)=> {
        const dataActualizacion ={
            nombre_cliente:data.nombre_cliente,
            razon_social : data.razon_social,
            telefono:data.telefono,
            cliente_direccion:data.cliente_direccion
        };
            //console.log(data);
            //console.log(id);
            //console.log(datos);
        const prueba = Object.keys(datos);
            for(let keys of prueba){
                if(datos[keys]!=''){
                    dataActualizacion[keys]=datos[keys]   
                }    
            } 

        try {
            //const respuesta = await axios.put(url2 + `/api/cotizador/clientes/update/${id}`,dataActulizacion);
            //console.log(respuesta.data) ;
            const respuesta = await axios.post(url2 + `/api/cotizador/clientes/update/${id}`,dataActualizacion);
            const respuestaBack = respuesta.data.msg;
            console.log(respuestaBack);
            alert(respuestaBack);    
            } catch (error) {
            console.log(error);
                
            }
    }
    return {
            actualizacion   
        }
};