import axios from 'axios';
import { url2 } from "../../../Componentes/Ocultar";


export const useRegistro = () => {

    const actualizacion = (data, datos) => {
        //console.log(data);
        //console.log(datos);
        Send(data, data.id_usuario, datos);
        //console.log(data.id_usuario);
    }

    async function Send(data, id, datos) {

        const dataActulizacion = {
            rol: data.rol,
            email: data.email,
        };


        const prueba = Object.keys(datos);
        for (let keys of prueba) {
            if (datos[keys] !== '') {
                dataActulizacion[keys] = datos[keys]
            }
        }

        //console.log(dataActulizacion);
        try {
            const respuesta = await axios.post(url2 + `/api/cotizador/edit/${id}`, dataActulizacion);
            const send2 = respuesta.data.msg;
            console.log(send2);
            alert(send2);

        } catch (error) {
            console.log(error);

        }

    }
    return {
        actualizacion,

    }
};