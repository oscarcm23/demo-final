import axios from 'axios';
import {url2} from "../Componentes/Ocultar";
import {pEstatus} from '../Preventa/PTN-BOM/Routes/CRUDProyectos';

export const EditPrecio = () => {
    const actualizacionPrecio = (estado,data,newdata)=>{
        if(estado){
            SendUpdatePrecio(estado,data,data.precio_id, data.sp_id, newdata)  
        }else{
            SendUpdatePrecio(estado,data,data.precio_id, data.cd_id, newdata)
        }
            
    }

    async function SendUpdatePrecio (estado,data, precio_id, id, newdata){

        const dataActualizacion1 = {
            precio_lista: data.precio_lista, 
            precio_unitario:data.precio_unitario,
            precio_descuento:data.precio_descuento,
            precio_total:data.precio_total,
            precio_id_moneda:data.precio_id_moneda
        };
        const dataActualizacion2= {
            sp_cantidad:''
        };

        const dataActualizacion3= {
            cd_cantidad:''
        };

        const k = Object.keys(newdata);
        for(let keys of k){
            if(newdata[keys] !== ''){
                dataActualizacion1[keys] = newdata[keys];
            }
        }

        if(estado){
            if(newdata.cantidad !== '' && newdata.cantidad !== data.sp_cantidad){
                dataActualizacion2.sp_cantidad = newdata.cantidad
            }else{
                dataActualizacion2.sp_cantidad = data.sp_cantidad
            }
        }else{
            if(newdata.cantidad !== '' && newdata.cantidad !== data.cd_cantidad){
                dataActualizacion3.cd_cantidad = newdata.cantidad
            }else{
                dataActualizacion3.cd_cantidad = data.cd_cantidad
            }
        }
         
        if(pEstatus === 'En revision'){
            alert('El proyecto no puede ser editado porque se encuentra En revision')
        }else if(pEstatus === 'Aceptado'){
            alert('El proyecto no puede ser editado porque ha sido Aceptado')
        }else{
            try {
                //console.log('Precios:',dataActualizacion1);
                if(estado){
                    //console.log('Cantidad_sp:',dataActualizacion2);
                    await axios.post(url2 + `/api/cotizador/precio/edit/${precio_id}`,dataActualizacion1);
                    await axios.post(url2 + `/api/cotizador/sp/editCant/${id}`,dataActualizacion2);
                    alert('Precio editado exitosamente');
                }else{
                    //console.log('Cantidad_cd:',dataActualizacion3);
                    await axios.post(url2 + `/api/cotizador/precio/edit/${precio_id}`,dataActualizacion1);
                    await axios.post(url2 + `/api/cotizador/catd/editCant/${id}`,dataActualizacion3);
                    alert('Precio editado exitosamente');           
                }
                // console.log(dataActualizacion1);
                // console.log(id);
            } catch (error) {
            console.log(error);
            alert('Edición de precio invalido');
            }
        }


    }
    return {
        actualizacionPrecio
    }
};


    