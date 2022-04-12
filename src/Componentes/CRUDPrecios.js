import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'

//Componentes
import Animaciones from './Animaciones';
import { precioUnitario, calcularDescuento, Total} from "../Preventa/PTN-BOM/Operaciones/Operaciones";

export const CrudPrecios = (props) => {
    /*================================================== Partidas ==================================================*/
        /*========================= Editar =========================*/
        const [activar, setActivar] = useState(true)

        const [data,setData] = useState ({
            cantidad:'',
            precio_lista:'', 
            precio_unitario:'',
            precio_descuento:'',
            precio_total:'',
            precio_id_moneda:''
        });

        const handleInputChange = (event) => {
            setData ({
                ...data,[event.target.name] : event.target.value ,
            })
        }
        
        const [enable, setenable] = useState([]);
        const [datos, Setdatos] = useState();

        useEffect(() => {
            Setdatos(props.precios); 
        },[props.precios]);


        useEffect(() => {
            let i = Object.keys(props.precios)
            i = i.length
            //console.log(i)
            setenable(Array(i).fill(true)); 
        },[props.precios])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr = [] 
            let p = Object.keys(props.precios);
            p = p.length;
            for (let i = 0 ; i < p ; i++){
                if(i === key){
                    newArr[i]=!enable[i];
                }
                if(i !== key){
                    newArr[i]=true;
                }
            }   
            setenable(newArr); 

            setActivar(!activar);
            if(activar === true){   
                if(props.estado){
                    setData ({
                        ...data, cantidad: props.precios[key].sp_cantidad,
                                precio_lista:props.precios[key].precio_lista, 
                                precio_unitario:props.precios[key].precio_unitario,
                                precio_descuento:props.precios[key].precio_descuento,
                                precio_total:props.precios[key].precio_total  
                    })
                }else{
                    setData ({
                        ...data, cantidad: props.precios[key].cd_cantidad,
                                precio_lista:props.precios[key].precio_lista, 
                                precio_unitario:props.precios[key].precio_unitario,
                                precio_descuento:props.precios[key].precio_descuento,
                                precio_total:props.precios[key].precio_total  
                    })
                }  
            }  
        }
        /*==========================================================*/

        /*=================================== Operaciones de los datos de los precios ===================================*/
  useEffect(()=>{
    let precio_u='';
    if (data.precio_lista !== '' &&  data.precio_descuento !== '' && data.cantidad !== '') {
      precio_u = precioUnitario(data.precio_lista, data.precio_descuento);
      const total = Total(precio_u, data.cantidad);
      setData({ ...data, precio_unitario: precio_u , precio_total:total});
    }
  
  },[data.precio_lista,data.precio_descuento])
  /*================================================================================*/
  useEffect(()=>{
    let total='';
    let desc_='';
    if (data.precio_unitario !== '' && data.cantidad !== '') {
      const total = Total(data.precio_unitario, data.cantidad)
      setData({ ...data, precio_total: total })
    }
    if (data.precio_unitario == '' || data.cantidad == '') {
      setData({ ...data, precio_total: total , precio_descuento:desc_ })
    }
  },[data.precio_unitario,data.cantidad])
  /*================================================================================*/
  useEffect(()=>{
    if(data.precio_lista !=='' && data.precio_unitario !==''){
      const desc = calcularDescuento(data.precio_lista, data.precio_unitario);
      setData({ ...data, precio_descuento: desc });}
    },[data.precio_unitario])
    
  /*===================================================================================================================*/
        
    return (
        <div>
           {/* <form> */}
           <Animaciones mytext="Precios" />
            <Table responsive id="nombreDiv"  striped bordered hover size="sm">
                <thead>
                    <tr className="titulo-tabla-usuarios">
                        <th>ID</th>
                        <th>Cantidad</th>
                        <th>Precio Lista</th>
                        <th>Precio Unitario</th>
                        <th>Desc(%)</th>
                        <th>Precio Total</th>
                        <th>Moneda</th>
                        <th>Modificar</th>
                    </tr>
                    </thead>

                    <tbody>
                        {Object.keys(props.precios).map((key) => (    
                        <tr key={props.precios[key].precio_id}>
                            <td>{props.precios[key].precio_id}</td>
                            <td>
                                <input
                                className="input-name"
                                type="number" 
                                placeholder={activar ? 
                                    (props.estado ? props.precios[key].sp_cantidad : props.precios[key].cd_cantidad) : ""}
                                defaultValue={data.cantidad}
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                name="cantidad"
                                ></input>
                            </td>
                            <td>
                                <input
                                className="input-name"
                                type="number" 
                                placeholder={activar ? props.precios[key].precio_lista : ""} 
                                defaultValue={data.precio_lista}
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                name="precio_lista" 
                                ></input>  
                            </td> 
                            <td>
                                <input
                                className="input-name"
                                type="number" 
                                placeholder={activar ? props.precios[key].precio_unitario : ""} 
                                defaultValue={data.precio_unitario}
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                name="precio_unitario" 
                                ></input>  
                            </td>  
                            <td>
                                <input
                                className="input-name"
                                type="number" 
                                placeholder={activar ? props.precios[key].precio_descuento : ""} 
                                defaultValue={data.precio_descuento}
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                name="precio_descuento" 
                                ></input>  
                            </td> 
                            <td>
                                <input
                                className="input-name" 
                                placeholder={props.precios[key].precio_total} 
                                defaultValue={data.precio_total}
                                //disabled={true}
                                readOnly
                                disabled={true} 
                                //onChange={handleInputChange}
                                name="precio_total" 
                                ></input>  
                            </td> 
                            <td>
                                <select 
                                id="lista-opciones" 
                                name="precio_id_moneda" 
                                defaultValue={props.precios[key].precio_id_moneda} 
                                disabled={enable[key]} 
                                onChange={handleInputChange}
                                >
                                    <option value={0}></option>
                                    <option value={1}>MXN</option>
                                    <option value={2}>USD</option>
                                </select>
                            </td>
                            <td>
                                <button 
                                className="btn btn-primary modificar"
                                onClick={()=>{
                                    habilitar(key); 
                                    props.envioDataPrecio(props.estado,datos, key, data);
                                    props.setfirst(activar);
                                }}
                                >
                                    {activar ? "Modificar" : "Aceptar"}
                                </button>
                            </td>    
                        </tr>  
                        ))
                        }
                    </tbody>
            </Table>
            {/* </form> */}
        </div>
    )
}