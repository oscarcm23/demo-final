import  {useState} from 'react';
import axios from 'axios';



import {url2} from "../Componentes/Ocultar";
import { pEstatus } from '../Preventa/PTN-BOM/Routes/CRUDProyectos';

export const EditPartida = () => {

    const actualizacionPar = (data,newdata)=>{
        SendUpdatePartida(data,data.partida_id,newdata)      
    }

    async function SendUpdatePartida (data,id,newdata){
        const dataActualizacion = {
            partida_nombre:data.partida_nombre, 
            partida_descripcion:data.partida_descripcion
        };
        
        const k = Object.keys(newdata);
        for(let keys of k){
            if(newdata[keys]!==''){
                dataActualizacion[keys] = newdata[keys]
            }    
        } 
        

        if(pEstatus === 'En revision'){
            alert('El proyecto no puede ser editado porque se encuentra En revision')
        }else if(pEstatus === 'Aceptado'){
            alert('El proyecto no puede ser editado porque ha sido Aceptado')
        }else{
            try {
                await axios.put(url2 + `/api/cotizador/partida/update/${id}`,dataActualizacion);
                alert('Partida editada exitosamente'); 
            }catch (error){
                alert('Edición de Partida invalido');
                console.log(error);
            }
        } 
    }
    return {
        actualizacionPar
    }
};


    