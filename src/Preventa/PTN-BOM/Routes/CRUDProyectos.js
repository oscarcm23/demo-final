import axios from 'axios';
import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Animaciones from '../../../Componentes/Animaciones';

//Componentes
import {url, url2} from "../../../Componentes/Ocultar";
import { EditPartida } from '../../../Routes/ModificarPartida';
import { EditCats } from '../../../Routes/ModificarCategorias';
import { CrudPartidas } from '../../../Componentes/CRUDPartidas';
import { CrudCategorias } from '../../../Componentes/CRUDCategorias';

let pId;
export let pEstatus;

export const CrudProyectos = (props) => {
    /*======================================== Habilitar/Deshabilitar ========================================*/
    const [enable, setenable] = useState([]);// Inputs
    const [activar, setActivar] = useState([]);
    /*=========================================================================================================*/

    /*========================== Mostrar/Ocultar ==========================*/
    const[show,setShow] = useState(true); //Menu resumen
    const[show2,setShow2] = useState(true); //Lista de partidas
    const[show3,setShow3] = useState(true); //Lista de categorias
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    const [show4,setShow4] = useState([]);
    const [textBVer,setTextBVer] = useState([]);// Texto de los botones de mostrar
    /*=====================================================================*/

    /*================================================== Proyectos ==================================================*/
        /*========================= Editar =========================*/
        const [data,setData] = useState ({
            proyecto_clave:'',
            proyecto_descripcion:''        
        });

        const handleInputChange = (event) => {
            setData ({
            ...data,[event.target.name] : event.target.value ,
            })
        }

        const [datos, Setdatos] = useState();
        // Almacenamiento del nombre del cliente a buscar
        const [nombreC, setNombreC] = useState([]);
        // Almacenamiento de los clientes semejantes al texto introducido en el input
        const [suggestionsClientes, setSuggestionsClientes] = useState ([]);

        //const [sCInput, setScInput] = useState([]);

        useEffect(() => {
            Setdatos(props.suggestionsP);
        },[props.suggestionsP]);


        useEffect(() => {
            let i = Object.keys(props.suggestionsP)
            i = i.length
            setenable(Array(i).fill(true));
            setShow4(Array(i).fill(true));
            setActivar(Array(i).fill(true));
            setTextBModificar(Array(i).fill('Modificar'));
            setTextBVer(Array(i).fill('Mostrar'));
            const arrayNombresC = []
            //console.log(enable);
            for(let c = 0 ; c < i ;c++){
                arrayNombresC[c] = props.suggestionsP[c].nombre_cliente;
            }
            setNombreC(arrayNombresC);

            
        },[props.suggestionsP])

        
        const habilitar = (key) =>{
            key = parseInt(key);
            const newArr =[] 
            const newArr2 = [];
            const newArr3 = [];
            let p = Object.keys(props.suggestionsP);
            p = p.length;
            for (let i = 0 ; i < p ; i++){
                if(i === key){
                    newArr[i] = !enable[i];
                    if(enable[i] === false){
                        newArr2[i] = 'Modificar';
                        setData({
                            ...data,proyecto_clave:'',
                                    proyecto_descripcion:''  
                        })
                    }else{
                        newArr2[i] = 'Aceptar';
                    }
                    newArr3[i] = !activar[i];
                }
                if(i !== key){
                    newArr[i]=true;
                    newArr2[i] = 'Modificar';
                    newArr3[i]=true;
                }

            }   
            setenable(newArr);
            setTextBModificar(newArr2);
            setActivar(newArr3);

            const arrayNombresC = [];

            if (activar === true){
                for(let c = 0 ; c < p ;c++){
                    if(c === key){
                        arrayNombresC[c] = '';
                    }else{
                        arrayNombresC[c] = nombreC[c];
                    }
                
                }
                setNombreC(arrayNombresC);
            }
        }

        const habilitar1 = (key) =>{
            key = parseInt(key);
            const newArr =[];
            const newArr2 = [];
            let c = Object.keys(props.suggestionsP);
            c = c.length;
            for (let i = 0 ; i < c ; i++){
                if(i === key){
                    newArr[i] = !show4[i];
                    setShow(!show);
                    if(show4[i] === false){
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
            setShow4(newArr);
            setTextBVer(newArr2);
        }
        /*==========================================================*/

        /*=================================== Buscador de clientes ===================================*/
        // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
        const onChangeTextCliente = (nombreCliente, key) => {
            let coincidencias = [];
            if(nombreCliente.length>0){
            coincidencias = props.clientes.filter(cliente => {
                const regex = new RegExp(`${nombreCliente}`, "gi");
                return cliente.nombre_cliente.match(regex)
                })
            }
            setSuggestionsClientes(coincidencias);

            key = parseInt(key);
            let i = Object.keys(props.suggestionsP)
            i = i.length;
            const arrayNombresC = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresC[c] = nombreCliente;
                }else{
                    arrayNombresC[c] = nombreC[c];
                }
            }
            setNombreC(arrayNombresC);

            // const arraySC = [];
            // for(let c = 0 ; c < i ; c++){
            //     arraySC[c] = coincidencias;
            // }
            // setScInput(arraySC);

            //console.log('clientes de cada input:',arraySC);
            //setNombreC1(nombreCliente);
            //console.log('nombres clientes:',nombreC);
        }

        // Función que obtiene el nombre del cliente seleccionado
        const onSuggestHandler = (nC, key) => {
            //console.log(nC);
            key = parseInt(key);
            let i = Object.keys(props.suggestionsP)
            i = i.length;
            const arrayNombresC = []
            for(let c = 0 ; c < i ;c++){
                if(c === key){
                    arrayNombresC[c] = nC;
                }else{
                    arrayNombresC[c] = nombreC[c];
                }
            }
            setNombreC(arrayNombresC);
            //console.log('array de nombreC seleccionado:', nombreC);
            //setNombreC(nombreC);
            setSuggestionsClientes([]);
        }
        function getProyEstatus(st){
            pEstatus = st;
        }

        function getIdP (proyecto_id){
            pId = proyecto_id;
            let i = Object.keys(props.suggestionsP);
            i = i.length;
            for(let c = 0; c < i ; c++){
                if(pId === props.suggestionsP[c].proyecto_id){
                    getProyEstatus(props.suggestionsP[c].proyecto_estatus)
                }
            }
            console.log(pEstatus);
        }

    
        /*============================================================================================*/
    /*===============================================================================================================*/
    
    /*================================================== Partidas ==================================================*/
        /*========================= Resumen - Partidas de un proyecto =========================*/
        // Almacenamiento de las partidas
        const[listaPartidas, setListaPartidas] = useState([]);
        
        // Función que realiza la consulta a la tabla partida
        async function getDatosPartida(proyecto_id){
            try{
                const resPP = await axios.get(url2 + `/api/cotizador/partida/viewPP/${proyecto_id}`);
                    setListaPartidas(resPP.data.data);
            }catch(error){
                console.log(error);
            }
        }
        /*=====================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first,setfirst] = useState(false);

        const {actualizacionPar} = EditPartida();
        
        const envioDataPartida = (data, key, newdata) => {
            if(first){
                actualizacionPar(data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*==============================================================================================================*/

    /*================================================== Categorias ==================================================*/
        /*========================= Resumen - Categorias de un proyecto =========================*/
        // Almacenamiento de los datos de las categorias
        const[listaCategorias, setListaCategorias] = useState([]);
        
        // Función que realiza la consulta a la tabla partida
        async function getDatosCats(proyecto_id){
            try{
                const resCtsP = await axios.get(url2 + `/api/cotizador/catd/view/${proyecto_id}`);
                    setListaCategorias(resCtsP.data.data);
            }catch(error){
                console.log(error);
            }
        }
        /*=====================================================================================*/

        /*========================= Envío de nuevos datos =========================*/
        const [first1,setfirst1] = useState(false);

        const {actualizacionCats} = EditCats();
        
        const envioDataCats = (data, key, newdata) => {
            if(first1){
                actualizacionCats(data[key], newdata);
            }
        }
        /*=========================================================================*/
    /*==============================================================================================================*/


    return (
        <div>
           {/* <form> */}
                {/****************************Lista de los Proyectos Creados ****************************************/}
                {/*============= Titulo Animación =============*/}
                <Animaciones mytext="Proyectos " />

                <Table responsive  striped bordered hover size="sm">
                    <thead>
                        <tr className="titulo-tabla-usuarios">
                            <th>ID</th>
                            <th>Clave</th>
                            <th>Descripción</th>
                            <th>Cliente</th>
                            <th>Fecha de creación</th>
                            <th>Fecha de modificación</th>
                            <th>Estatus</th>
                            <th>Modificar</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                                    
                    <tbody>
                        {Object.keys(props.suggestionsP).map((key) => (    
                            <tr key={props.suggestionsP[key].proyecto_id} >
                                <td>{props.suggestionsP[key].proyecto_id}</td>  
                                <td>
                                    <input 
                                    className="input-name" 
                                    defaultValue={props.suggestionsP[key].proyecto_clave} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="proyecto_clave" 
                                    ></input>
                                </td>   
                                <td>
                                    <input 
                                    className="input-name" 
                                    defaultValue={props.suggestionsP[key].proyecto_descripcion} 
                                    disabled={enable[key]} 
                                    onChange={handleInputChange}
                                    name="proyecto_descripcion" 
                                    ></input>
                                </td>  
                                <td>
                                {" "}
                                <input
                                    className="agregar"
                                    type="text"
                                    name="nombre_cliente"
                                    disabled={enable[key]}
                                    value={nombreC[key]}
                                    onChange={e => onChangeTextCliente(e.target.value,key)}
                                    />
                                    {Object.keys(suggestionsClientes).map((i)=>
                                    <div 
                                    key={i}
                                    className="selectCliente" 
                                    onClick={() => onSuggestHandler(suggestionsClientes[i].nombre_cliente, key)}
                                    >
                                        {suggestionsClientes[i].nombre_cliente}
                                    </div>
                                    )}
                                </td> 
                                <td>{props.suggestionsP[key].proyecto_fecha_creacion}</td>
                                <td>{props.suggestionsP[key].proyecto_fecha_modificacion}</td>
                                <td>{props.suggestionsP[key].proyecto_estatus}</td>
                                <td>
                                    <button 
                                    className="btn btn-primary modificar" 
                                    onClick={()=>{
                                        props.envioDataP(nombreC,props.clientes,datos,key,data);
                                        habilitar(key); 
                                        props.setfirst(activar[key]);
                                    }}
                                    >
                                        {textBModificar[key]}
                                    </button> 
                                </td> 
                                <td>
                                    <button 
                                    className="btn btn-primary detalles" 
                                    onClick={() => { 
                                        getIdP(props.suggestionsP[key].proyecto_id);
                                        habilitar1(key);
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
                    <div className='arregla'>
                        <div className='contenido-usuarios'>
                            <div className="table-responsive">
                                <div>
                                    <Animaciones mytext="Resumen" /> 
                                </div>
                                <Table responsive id="nombreDiv">
                                    {/*========================== Titulos Tabla ==========================*/}
                                    <thead>
                                        <tr className="titulo-tabla-usuarios">
                                            <th>Resumen Partidas</th>
                                            <th>Resumen Categorias</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="">
                                            {/*========================== Divisa ==========================*/}
                                            <td>
                                                <button
                                                className="btn btn-primary modificar"
                                                type="button"
                                                onClick={() => {
                                                getDatosPartida(pId); 
                                                setShow2(!show2);
                                                setShow3(true);
                                                }}
                                                >
                                                {" "}
                                                {show2 ? "Mostrar" : "Ocultar"}{" "}
                                                </button>
                                                {show2 ? (
                                                <div></div>
                                                ) : (
                                                    <div className='arregla'>
                                                        <div className='contenido-usuarios'>
                                                            {/*=================== Botón Mostrar Lista DIV =====================*/}
                                                            <br />
                                                            <CrudPartidas
                                                            partidas={listaPartidas}
                                                            setfirst={setfirst}
                                                            envioDataPar={envioDataPartida}
                                                            />   
                                                        </div> 
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                className="btn btn-primary modificar"
                                                type="button"
                                                onClick={() => {
                                                    getDatosCats(pId);
                                                    setShow3(!show3);
                                                    setShow2(true);
                                                }}
                                                >
                                                {" "}
                                                {show3 ? "Mostrar" : "Ocultar"}{" "}
                                                </button>
                                                {show3 ? (
                                                <div></div>
                                                ) : (
                                                <div className="arregla">
                                                    <div className='contenido-usuarios'>
                                                    {/*========================== Llamado al Componente ==========================*/}
                                                    <CrudCategorias
                                                    dcats={listaCategorias}
                                                    setfirst={setfirst1}
                                                    envioData={envioDataCats}
                                                    />
                                                    </div>
                                                </div>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                )}
            {/* </form> */}
        </div>
    )
}