import axios from "axios";
import { useState } from "react";
import {url2} from "../../../Componentes/Ocultar";




export const InsertDatosMarca = () => {
    /*=================================== Inserción de datos en la tabla proveedor ===================================*/

    // Almacenamiento de los datos
    const[datosMarca, setDatosMarca] = useState({
        marca_nombre:''
    })
    // Función que obtiene los datos introducidos en los inputs 
    const handleInputChange = (event) =>{
        setDatosMarca({
            ...datosMarca,[event.target.name] : event.target.value ,
        })
    }
    // Almacenamiento del id del proveedor encontrado en la busqueda
    var proveedorId = {proveedor_id:''}

    // Función que realiza la inserción de los datos a la tabla proveedor en la bd 
    async function SendMarca (nombreProv,ListaProv){
        //console.log(nombreProv);

        // Obtención del id del proveedor que se seleccionó en la búsqueda
        let i = Object.keys(ListaProv);
        for (let c = 0; c < i.length; c++) {
            if (nombreProv === ListaProv[c].proveedor_nombre) {
                proveedorId.proveedor_id = ListaProv[c].proveedor_id
                console.log('proveedor id:',proveedorId);
            }        
        }
        const data = {
            marca_nombre:datosMarca.marca_nombre
        };

        console.log("proveedor id", proveedorId.proveedor_id);
        if (proveedorId.proveedor_id !== 38 && datosMarca.marca_nombre !== ''){
            try{
            
                const respuesta = await axios.post( url2 +`/api/cotizador/marca/agregar/${proveedorId.proveedor_id}`, data); 
                const respuestaBack = respuesta.data.msg
                console.log(respuestaBack)
                alert(respuestaBack)
            }catch (error){
                console.log(error);
                alert('Registro de marca invalido')
            }
        }else{
            alert('¡ERROR! Debes ingresar todos los campos solicitados')
        }
    }

    const enviarDatosMarca = (event,nombreProv, ListaProv) =>{
        SendMarca(nombreProv, ListaProv);
        event.preventDefault()
        event.target.reset();
    }

    
    
    /*==============================================================================================================*/
    return{
        handleInputChange,
        enviarDatosMarca
    }
};
