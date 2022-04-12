import React, { useState } from "react";
import { useRegistro } from '../Routes/ModificarUsuarios';
import axios from 'axios';
import Animaciones from "../../../Componentes/Animaciones";
import { CrudUsuarios } from "../Routes/CrudUsuarios";
import {url, url2} from "../../../Componentes/Ocultar";


function AdministrarUsuarios() {

     /*========================== Mostrar Ocultar Tabla ==========================*/  
    const [show, setShow] = useState(true);
    

    const {actualizacion} = useRegistro();
    const [first, setfirst] = useState(false)

    
    const [listaUsuarios, setlistaUsarios] = useState([]);

    // const borrarUsuario = async (dato) => {
    //     console.log("borrar");
    //     console.log(dato);
    //     const confirmacion = window.confirm("¿Seguro que quieres borrar este registro?" );
    //     if (confirmacion) {
    //         console.log(dato);
    //         const respuesta = await axios.delete(url2 + `/api/cotizador/delete/${dato}`);
    //         console.log(respuesta.data);
    //         llamado();
    //     } else {
    //         llamado();
    //     }
    // };
   
    // **********reset contraseña*********
    
    const resetearContraseña = async (id_usuario, email) => {
        const estado_login = 0
        let newpassword = email
        // console.log("este es el email", email)
        // console.log("este es el id usuario", id_usuario)
        const respuesta = await axios.post(url2 + `/api/cotizador/edit/pass/${id_usuario}`, {password:newpassword, estado_login});
        const respuestaBack = respuesta.data.msg
        alert(respuestaBack)
    }


    /*=================== Leer todos los usuarios registrados  =================*/
    const llamadoUsuario = async () =>{
       const respuesta = await axios.get(url + '/api/cotizador/registro');
       setlistaUsarios(respuesta.data.reSql);
       setShow(!show)
       //setShow(!show)
    }
    /*==========================================================================*/
    // const llamado = async () =>{
    //    const respuesta = await axios.get(url + '/api/cotizador/registro');
    //    setlistaUsarios(respuesta.data.reSql);
    //    setShow(show)
    // }

    const envioData = async (datos, key, data) => {
        if(first){
        //   console.log(datos[key])
        //   console.log(data)
          actualizacion(datos[key],data);
        }
      };
      
  return (
        
        <div className="contenido-usuarios">
          <div className="head"></div>
          <div className="table-responsive">
          <div>
              {/*======================= Titulo Animación =======================*/}
               <Animaciones   mytext= "Lista de Usuarios"      /> 
         </div>

  {/*================= Botón Mostrar/Ocultar Lista ==================*/}
                <div>
                    <button className="btn btn-primary modificar" type="button" onClick={()=>llamadoUsuario()} >  {show ? 'Mostrar Lista' : 'Ocultar Lista'} </button>
                    {show ? (
                        <div >
                        {/*=================== Ocultar Lista DIV  =====================*/}
                        </div>
                    ) : (
                        <div >
                        {/*=================== Botón Mostrar Lista DIV====================*/}
                            <br />
                            {/*===================     Tabla Usuarios    ====================*/}
                            <div> 
                                <CrudUsuarios 
                                    usuarios={listaUsuarios} 
                                    //borrar={borrarUsuario} 
                                    setfirst={setfirst}
                                    resetearContraseña={resetearContraseña}
                                    envioData = {envioData}
                                />
                            </div>         
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AdministrarUsuarios;