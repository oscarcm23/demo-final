import axios from 'axios';
import { url2 } from "../../../Componentes/Ocultar";

export const EditAM = () => {

    const actualizacion = (dataPar, dataCats, data, newdata) => {
        let amId = '';
        let oldDataPar = '';
        let amP = Object.keys(dataPar);
        amP = amP.length;
        for (let c = 0; c < amP; c++) {
            if (data === dataPar[c].partida_nombre) {
                amId = dataPar[c].am_id;
                oldDataPar = dataPar[c];
                //console.log(amId);
                //console.log(oldDataPar);
            }
        }

        let oldDataCat = '';
        let amC = Object.keys(dataCats);
        amC = amC.length;
        for (let c = 0; c < amC; c++) {
            if (data === dataCats[c].cat_nombre) {
                amId = dataCats[c].amc_id;
                oldDataCat = dataCats[c];
                //console.log(amId);
            }
        }
        //console.log(dataPar);
        //console.log(dataCats);
        Send(oldDataPar, oldDataCat, amId, newdata)
    }

    async function Send(dataPar, dataCat, amId, newdata) {
        console.log('Datos partida:', dataPar);
        console.log('Datos categoria:', dataCat);
        const newData = {
            am_desc_cliente: newdata.desc_cliente,
            am_margen_ganancia: newdata.margen_ganancia,
            am_cantidad: newdata.cantidad,
            am_descuento_fabrica: newdata.desc_fabrica
        };

        const newData1 = {
            amc_desc_cliente: newdata.desc_cliente,
            amc_margen_ganancia: newdata.margen_ganancia,
            amc_cantidad: newdata.cantidad,
            amc_desc_fabrica: newdata.desc_fabrica
        };

        const dataActualizacion = {
            am_desc_cliente: dataPar.am_desc_cliente,
            am_margen_ganancia: dataPar.am_margen_ganancia,
            am_cantidad: dataPar.am_cantidad,
            am_descuento_fabrica: dataPar.am_descuento_fabrica
        };

        const dataActualizacion1 = {
            amc_desc_cliente: dataCat.amc_desc_cliente,
            amc_margen_ganancia: dataCat.amc_margen_ganancia,
            amc_cantidad: dataCat.amc_cantidad,
            amc_desc_fabrica: dataCat.amc_desc_fabrica
        };

        const k = Object.keys(newData);
        const k1 = Object.keys(newData1);
        if (dataPar !== '') {
            for (let keys of k) {
                if (newData[keys] !== '') {
                    dataActualizacion[keys] = newData[keys];
                }
            }
        } else {
            for (let keys of k1) {
                if (newData1[keys] !== '') {
                    dataActualizacion1[keys] = newData1[keys];
                }
            }
        }


        try {
            console.log('Nuevos datos partida:', dataActualizacion);
            console.log('Nuevos datos categoria:', dataActualizacion1);
            // console.log(proyecto_id);
            if (dataPar !== '') {
                const respuesta = await axios.post(url2 + `/api/cotizador/am/EditAMPar/${amId}`, dataActualizacion);
                const respuestaBack = respuesta.data.msg;
                alert(respuestaBack);
            } else {
                const respuesta2= await axios.post(url2 + `/api/cotizador/am/EditAMCats/${amId}`, dataActualizacion1);
                const respuestaBack2 = respuesta2.data.msg;
                alert(respuestaBack2);
            }
        } catch (error) {
            console.log(error);
            alert('Error al editar los datos AM');
        }
    }
    return {
        actualizacion
    }
};


