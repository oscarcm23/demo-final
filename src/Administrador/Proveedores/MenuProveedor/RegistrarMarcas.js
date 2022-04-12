import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InsertDatosMarca } from '../Routes/GuardarMarca';
import {url} from "../../../Componentes/Ocultar";


function RegistrarMarcas() {
  /*=================================== Buscador de proveedores ===================================*/
    
    // Almacenamiento del nombre del proveedor a buscar
    const [nombreProv, setNombreProv] = useState('');

    // Almacenamiento de los proveedores semejantes al texto introducido en el input
    const [suggestionsProv, setSuggestionsProv] = useState ([]);

    // Almacenamiento de los proveedores existentes para el buscador
    const [ListaProv, setListaProv] = useState ([]);


    // Función que realiza la consulta a las tablas servicio_producto y proveedores
    async function getDatosProveedores(){
        
        try{
            
            const respuesta = await axios.get(url + "/api/cotizador/proveedor/view");
            setListaProv(respuesta.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
      getDatosProveedores();
    },[])

    // Función que realiza la busqueda de los clientes semejantes a al nombre introducido 
    const onChangeTextProv = (nombreProveedor) => {
        let coincidencias = [];
        if(nombreProveedor.length>0){
        coincidencias = ListaProv.filter(proveedor => {
            const regex = new RegExp(`${nombreProveedor}`, "gi");
            return proveedor.proveedor_nombre.match(regex)
        })
        }
        setSuggestionsProv(coincidencias);
        setNombreProv(nombreProveedor);
    }

    // Función que obtiene el nombre del cliente seleccionado
    const onSuggestHandlerProv = (nombreProveedor) => {
        setNombreProv(nombreProveedor);
        setSuggestionsProv([]);
    }
    /*============================================================================================*/
    
    const {enviarDatosMarca,handleInputChange} = InsertDatosMarca();

  return (
    <div className="contenido-main-registro">
        <div className="scene flex">
          <section className="card-body">
            <form  method="post" className="card-form" onSubmit = {(e) => {enviarDatosMarca(e,nombreProv,ListaProv)}}>
                {/*========= Registrar Clientes========= */}
              <h2 >  <span>Registrar Marcas</span> </h2>
   {/*========= Nombre Proveedor ========= */}
                 <label htmlFor="user" className=" label">
                    Nombre Proveedor
                 </label>
              <input
                id="user"
                type="text"
                name='nombre_proveedor'
                className="card-input"
                onChange={e => onChangeTextProv(e.target.value)}
                value={nombreProv}
                placeholder="Ingrese Nombre del Proveedor"
              />
              {suggestionsProv && suggestionsProv.map((suggestionProv,i)=>
              <div key={i} className="selectCliente" onClick={() => onSuggestHandlerProv(suggestionProv.proveedor_nombre)}>
              {suggestionProv.proveedor_nombre}
              </div>
              )}
    {/*========= Marca ========= */}
              <label htmlFor="user2" className=" label">
             Marca
              </label>
              <input
                id="user2"
                type="text"
                name ="marca_nombre"
                onChange={handleInputChange}
                className="card-input"
                placeholder="Ingrese Marca"
              />
  
    {/*========= Botón Registrar ========= */}
              <div className="boton-login">
                <button className="login" type="submit">
                  <span>Registrar</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
  )
}

export default RegistrarMarcas