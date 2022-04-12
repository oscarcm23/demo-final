import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import Cookies from 'universal-cookie';
import Animaciones from "../../../Componentes/Animaciones";
import {url, url2} from "../../../Componentes/Ocultar";
import { EditDivisa } from '../Routes/ModificarDivisa';
const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');




function Divisa() {
    /*== Almacenamiento de todos los proyectos existentes ==*/
    const[listaProyectos, setListaProyectos] = useState([]);

    /*== Almacenamiento de los proyectos que tienen la clave semejante a la instroducida ==*/
    const[suggestions,setSuggestions] = useState([]);
    
    /*== Almacenamiento de la clave introducida del proyecto ==*/
    const[claveP,setClaveP] = useState([]);

    const getProyectos = async () => {
        try{
            if(validatorrol === "administrador"){
                const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
                setListaProyectos(resProy.data.data);
            }else{
                const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
                setListaProyectos(resProy.data.data);
            }
        }catch(error){
            console.log(error);
        }
    }
    /*== Función que realiza la consulta a la tabla proyectos ==*/
    useEffect(()=>{
        getProyectos();
    },[claveP])
    
    /*== Función que realiza la busqueda de los proyectos semejantes a la clave introducida ==*/
    const onChangeTextClaveP = (claveP) => {
        let coincidencias = [];
        if(claveP.length>0){
            coincidencias = listaProyectos.filter(proyecto => {
            const regex = new RegExp(`${claveP}`, "gi");
            return proyecto.proyecto_clave.match(regex)
            })
        }
        setSuggestions(coincidencias);
        setClaveP(claveP);
    }

    const {actualizacionDivisa} = EditDivisa();

    const [firts, setFirts] = useState (false);

    function EnviarDivisa(data, key, newdata){
        if(firts){
            // console.log('Old Data:',data[key]);
            // console.log('New Data:',newdata);
            actualizacionDivisa(data[key],newdata);
        }
    }
    /*================================================== Divisa ==================================================*/
        /*========================= Editar =========================*/
        const [activar, setActivar] = useState(true)

        const [data,setData] = useState ({
            proyecto_valor_dolar:''     
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
        })
        }

        const [enable, setenable] = useState([]);
        const [datos, Setdatos] = useState();
        const [newdata, setNewData] = useState([]);
        

        useEffect(() => {
            Setdatos(suggestions); 
        },[suggestions]);


        useEffect(() => {
            let i = Object.keys(suggestions)
            i = i.length
            //console.log(i)

            setenable(Array(i).fill(true)); 
        },[suggestions])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr = [] 
            let p = Object.keys(suggestions);
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
        }
        /*==========================================================*/
    /*============================================================================================================*/
  return (
    <div className="contenido-usuarios">
            {/*======================= Titulo Animación =======================*/}
            <div> <Animaciones mytext="Divisa" /> </div>
                {/*********Búsqueda de Proyectos AM ********/}

                <div className="busqueda-proyectos">
                    <Table responsive id="nombreDiv">
                        <thead>
                            <tr className="azul">
                                <th>Clave Proyecto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>
                                <input className="agregar"
                                        type="text"
                                        name="proyecto_clave"
                                        onChange={e => onChangeTextClaveP(e.target.value)}
                                        value={claveP}
                                        placeholder="Clave Proyecto" />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {/****************************Lista de los Proyectos Creados ****************************************/}
                {/*============= Titulo Animación =============*/}
                <div> <Animaciones mytext="Proyectos" /> </div>

                <Table responsive  striped bordered hover size="sm">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>ID</th>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Cliente</th>
                            <th>Fecha de creción</th>
                            <th>Estatus</th>
                            <th>Valor dolar</th>
                            <th>Plazo meses</th>
                            <th>Divisa</th>
                            
                        </tr>
                    </thead>         
                    <tbody>
                        {Object.keys(suggestions).map((key) => (    
                            //checar aqui va los titulos
                            <tr key={suggestions[key].proyecto_id} >
                                <td>{suggestions[key].proyecto_id}</td>   
                                <td>{suggestions[key].proyecto_clave}</td>  
                                <td>{suggestions[key].proyecto_descripcion}</td>  
                                <td>{suggestions[key].nombre_cliente}</td> 
                                <td>{suggestions[key].proyecto_fecha_creacion}</td>
                                <td>{suggestions[key].proyecto_estatus}</td> 
                                <td>
                                    <input 
                                    className="input-name" 
                                    defaultValue={suggestions[key].proyecto_valor_dolar} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="proyecto_valor_dolar" 
                                    ></input>
                                </td>
                                <td>{suggestions[key].proyecto_plazo_meses}</td> 
                                <td>
                                    <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        EnviarDivisa(datos,key,data);
                                        habilitar(key);
                                        setActivar(!activar)
                                        setFirts(activar)
                                    }}
                                    >
                                        {activar ? "Modificar":"Aceptar"}
                                    </button>
                                </td> 
                            </tr>  
                        ))}
                    </tbody>          
                </Table>
            </div>


    </div>
  )
}

export default Divisa