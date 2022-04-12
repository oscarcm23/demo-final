import  {useState} from 'react';
import axios from 'axios';

import {url} from "../../../Componentes/Ocultar";

export const useRegistro = () => {
     const [datos,setDatos] = useState ({
          nombre_cliente: '', 
          razon_social:'',
          telefono: '',
          cliente_direccion: ''
           
   });

   const handleInputChange = (event) => {
    //console.log(event.target.value)
    setDatos ({
        ...datos,[event.target.name] : event.target.value ,
    })
    
}

async function Send (){

    const data= {
        nombre_cliente: datos.nombre_cliente,
        razon_social: datos.razon_social,
        telefono: datos.telefono,
        cliente_direccion: datos.cliente_direccion
    };

   
    if(datos.nombre_cliente !== "" && datos.razon_social !== ""){
        try {

            const respuesta = await axios.post(url +'/api/cotizador/clientes/agregar',data);
            const send2= respuesta.data.msg;
            console.log(send2);
            alert(send2);
                
            }
        catch (error) {
                console.log(error);
                
            }
    }else{
        alert('Llene el nombre del Cliente y la Razón Social');
    }
     
}
    const enviarDatos = (event) => {  
        Send();
        event.preventDefault();
        //guardado de datos
        event.target.reset();
    }


    return {

        handleInputChange,
        enviarDatos
    }
};