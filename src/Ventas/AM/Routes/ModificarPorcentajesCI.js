import axios from 'axios';
import { url2 } from "../../../Componentes/Ocultar";

export const EditCI = () => {

    const actualizacion = (data, catCI, newdata) => {
        let ciId = '';
        let oldDataCI = '';
        let ciD = Object.keys(data);
        ciD = ciD.length;
        for (let c = 0; c < ciD; c++) {
            if (catCI === data[c].cci_nombre) {
                ciId = data[c].ci_id;
                oldDataCI = data[c].ci_porcentaje;
                //console.log(amId);
                //console.log(oldDataPar);
            }
        }

        // console.log('ci_id:',ciId);
        // console.log('Old data:',oldDataCI);
        // console.log('New data:',newdata);
        //console.log(dataCats);
        Send(oldDataCI, ciId, newdata)
    }

    async function Send(oldData, ciId, newdata) {

        const newData = {
            ci_porcentaje: newdata.porcentaje
        }

        const dataActualizacion = {
            ci_porcentaje: oldData
        };

        const k = Object.keys(newData);
        if (newData[k] !== '') {
            dataActualizacion[k] = newData[k];
        }



        try {
            //console.log('Nuevos datos CI:',dataActualizacion);
            //console.log('ci_id:',ciId);
            const respuesta = await axios.post(url2 + `/api/cotizador/ci/edit/${ciId}`, dataActualizacion);
            const respuestaBack = respuesta.data.msg;
            alert(respuestaBack);
            

        } catch (error) {
            console.log(error);
            alert('Error al editar el porcentaje');
        }
    }
    return {
        actualizacion
    }
};


