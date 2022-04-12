import axios from 'axios';
import {url2} from "../../../Componentes/Ocultar";

export const EditProvs = () => {
   
    const actualizacion = (data,datos)=>{
        Send(data,data.proveedor_id, datos)        
    }

    const  Send = async (data,id,datos)=> {
        const dataActualizacion ={
            proveedor_nombre:data.proveedor_nombre,
            proveedor_telefono:data.proveedor_telefono,
            proveedor_email:data.proveedor_email
        };

        const prueba = Object.keys(datos);
        
        for(let keys of prueba){
            if(datos[keys]!==''){
                dataActualizacion[keys]=datos[keys]   
            }    
        } 

        try {
            const respuesta = await axios.post(url2 + `/api/cotizador/proveedor/edit/${id}`,dataActualizacion);
            const respuestaBack = respuesta.data.msg;
            console.log(respuestaBack);
            alert(respuestaBack);  
        } catch (error) {
            console.log(error);
            alert('Error al actualizar el Proveedor');
        }
    }

    return {
        actualizacion 
    }
};