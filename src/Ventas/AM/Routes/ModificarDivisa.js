import axios from 'axios';
import {url2} from "../../../Componentes/Ocultar";

export const EditDivisa = () => {

    const actualizacionDivisa = (data,newdata)=>{
        SendUpdatePrecio(data,data.proyecto_id, newdata)      
    }

    async function SendUpdatePrecio (data, proyecto_id, newdata){
        
        const dataActualizacion = {
            proyecto_valor_dolar: data.proyecto_valor_dolar
        };

        const k = Object.keys(newdata);
        for(let keys of k){
            if(newdata[keys] !== ''){
                dataActualizacion[keys] = newdata[keys];
            }
            
        }
         
        try {
            // console.log(dataActualizacion);
            // console.log(proyecto_id);
            const respuesta = await axios.put(url2 + `/api/cotizador/proyecto/updateDiv/${proyecto_id}`,dataActualizacion);
            const send2= respuesta.data.msg;
            alert(send2);
            } catch (error) {
            console.log(error);
            alert('Edición de Divisa invalido');
            }
    }
    return {
        actualizacionDivisa
    }
};


    