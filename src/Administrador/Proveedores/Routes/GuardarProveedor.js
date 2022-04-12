import axios from "axios";
import { useState } from "react";
import { url } from "../../../Componentes/Ocultar";



export const InsertDatosProvedor = () => {
    /*=================================== Inserción de datos en la tabla proveedor ===================================*/

    // Almacenamiento de los datos
    const [datosProv, setDatosProv] = useState({
        proveedor_nombre: '',
        proveedor_telefono: '',
        proveedor_email: ''
    });

    // Función que obtiene los datos introducidos en los inputs 
    const handleInputChange = (event) => {
        setDatosProv({
            ...datosProv, [event.target.name]: event.target.value,
        })
    }

    // Función que realiza la inserción de los datos a la tabla proveedor en la bd 
    async function SendProveedor() {
        const data = {
            proveedor_nombre: datosProv.proveedor_nombre,
            proveedor_telefono: datosProv.proveedor_telefono,
            proveedor_email: datosProv.proveedor_email
        };
        //console.log(id);
        if (data.proveedor_nombre !== '') {
            console.log(data.proveedor_nombre)
            try {

                const respuesta = await axios.post(url + '/api/cotizador/proveedor/agregar', data);
                const respuestaBack = respuesta.data.msg
                console.log(respuestaBack)
                alert(respuestaBack)
            }
            catch (error) {
                console.log(error);
            }
        } else {
            alert("Error en el registro, verifica que los datos ingresados sean correctos")

        }
    }

    const enviarDatosProv = (event) => {
        SendProveedor();
        event.preventDefault()
        event.target.reset();
    }



    /*==============================================================================================================*/
    return {
        handleInputChange,
        enviarDatosProv
    }
};
