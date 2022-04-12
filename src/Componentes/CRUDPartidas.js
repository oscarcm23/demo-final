import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import { EditSP } from '../Preventa/PTN-BOM/Routes/ModificarSP';
import Animaciones from './Animaciones';
import { CrudSp } from './CRUDSP';

import {url, url2} from "./Ocultar";

export const CrudPartidas = (props) => {
    /*======================================== Habilitar/Deshabilitar secciones ========================================*/
    const[show,setShow] = useState(true);//Tabla servicios/productos
    const [enable, setenable] = useState([]);//Inputs
    /*==================================================================================================================*/

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    const [show1,setShow1] = useState([]);
    /*=====================================================================*/

    /*================================================== Partidas ==================================================*/
        /*========================= Editar =========================*/

        const [data,setData] = useState ({
            partida_nombre:'',
            partida_descripcion:''      
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
        })
        }

        const [datos, Setdatos] = useState();
        

        useEffect(() => {
            Setdatos(props.partidas); 
        },[props.partidas]);


        useEffect(() => {
            let i = Object.keys(props.partidas);
            i = i.length;
            setenable(Array(i).fill(true)); 
            setActivar(Array(i).fill(true));
            setShow1(Array(i).fill(true));
            setTextBModificar(Array(i).fill('Modificar'));
            setTextBVer(Array(i).fill('Mostrar'));
        },[props.partidas])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            const newArr3 = [];
            let c = Object.keys(props.partidas);
            c = c.length;
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'Modificar';
                        setData({
                            ...data,partida_nombre:'',
                                    partida_descripcion:''  
                        })
                    }else{
                        newArr2[i] = 'Aceptar';
                    }
                    newArr3[i] = !activar[i];
                }
                if(i !== key){
                    newArr[i] = true;
                    newArr2[i] = 'Modificar';
                    newArr3[i] = true;
                }
    
            }   
            setenable(newArr);
            setTextBModificar(newArr2);
            setActivar(newArr3);
        }
    
        const habilitar1 = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            let c = Object.keys(props.partidas);
            c = c.length;
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !show1[i];
                    setShow(!show);
                    if(show1[i] === false){
                        newArr2[i] = 'Mostrar';
                    }else{
                        newArr2[i] = 'Ocultar';
                    }
                }
                if(i !== key){
                    newArr[i]=true;
                    newArr2[i] = 'Mostrar';
                }
            }   
            setShow1(newArr);
            setTextBVer(newArr2);
        }
        /*==========================================================*/

        /*=================================== Eliminación de una partida y sus servicios/productos ===================================*/
        async function SendDeletePartida(id){
            getDatosSP(id);
            //console.log(listaSP);
            const confirmacion = window.confirm("¿Seguro que quieres borrar esta Partida?" );

            if(confirmacion){
                let cSP = Object.keys(listaSP);
                for(let c = 0; c < cSP;c++){
                    try {
                        await axios.delete(`http://localhost:4001/api/cotizador/precio/delete/${listaSP[c].sp_id_precio}`);
                        setShow(!show);
                    } catch (error) {}
                }
                try{
                    await axios.delete(`http://localhost:4001/api/cotizador/partida/delete/${id}`);
                    alert('Partida eliminada exitosamene');
                } catch (error) {
                    console.log(error);
                    alert('Eliminación de partida invalido')
                }
            }else{

            }
            
        }
        /*============================================================================================================================*/
    /*==============================================================================================================*/

    /*================================================== servicios/productos ==================================================*/
        /*========================= Resumen - servicios/productos de una partida =========================*/
        // Almacenamiento del los servicios_productos
        const[listaSP, setListaSP] = useState([]);

        // Almacenamiento de los proveedores existentes para el buscador
        const [ListaProv, setListaProv] = useState ([]);


        // Función que realiza la consulta a las tablas servicio_producto y proveedores
        async function getDatosSP(partida_id){
            try{
                const resPSP = await axios.get(url2 +`/api/cotizador/partida/viewPSP/${partida_id}`);
                setListaSP(resPSP.data.data);
                const respuesta = await axios.get(url +"/api/cotizador/proveedor/view");
                setListaProv(respuesta.data.data);
            }catch(error){
                console.log(error);
            }
        }
        /*================================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first,setfirst] = useState(false);

        const {actualizacionSP} = EditSP();

        const envioDataSp = (nP, dataProv, nM, dataM,newdata, key, data) => {
            if(first){
                actualizacionSP(nP[key],dataProv,nM[key],dataM,data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*=========================================================================================================================*/
    return (
        <div>
           {/* <form> */}
                <Animaciones mytext="Partidas" />

                <Table responsive  striped bordered hover size="sm">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Eliminar</th>
                            <th>Modificar</th>
                            <th>Servicios/Productos</th>
                        </tr>
                    </thead>
                                    
                    <tbody>
                        {Object.keys(props.partidas).map((key) => (    
                            //checar aqui va los titulos
                            <tr key={props.partidas[key].partida_id} >
                                <td>{props.partidas[key].partida_id}</td>
                                <td>
                                    <input 
                                    id={props.partidas[key].partida_id}
                                    className="input-name" 
                                    defaultValue={props.partidas[key].partida_nombre} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="partida_nombre" 
                                    ></input>
                                </td>
                                <td>
                                    <input
                                    className="input-name" 
                                    defaultValue={props.partidas[key].partida_descripcion} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="partida_descripcion" 
                                    ></input>
                                </td> 
                                <td>
                                    <button 
                                    className="btn btn-primary eliminar"
                                    onClick={()=>{SendDeletePartida(props.partidas[key].partida_id)}}
                                    >Eliminar</button></td>
                                <td>
                                    <button 
                                    className="btn btn-primary modificar" 
                                    onClick={()=>{
                                        habilitar(key); 
                                        props.envioDataPar(datos, key, data);
                                        props.setfirst(activar[key]);;
                                    }}
                                    >{textBModificar[key]}
                                    </button> 
                                </td> 
                                <td>
                                    <button 
                                    className="btn btn-primary detalles" 
                                    onClick={() => {
                                        habilitar1(key);
                                        getDatosSP(props.partidas[key].partida_id);
                                    }}
                                    >
                                        {textBVer[key]}
                                    </button>
                                </td> 
                            </tr>  
                        ))}
                    </tbody>          
                </Table>
                {show ? (
                    <div></div>
                ):(
                    <div>
                    {/*=================== Botón Mostrar Lista DIV =====================*/}
                    <br />
                        <CrudSp
                        sp={listaSP}
                        proveedores={ListaProv}
                        setfirst={setfirst}
                        envioDataSP={envioDataSp}
                        />    
                    </div>
                )}
            {/* </form> */}
        </div>
    )
}