import React, { useState,useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Animaciones from "../../../Componentes/Animaciones";
//Componentes
import {EditProvs} from "../Routes/ModificarProveedor";
import {url} from "../../../Componentes/Ocultar";
import { CrudProveedores } from "../Routes/CRUDProveedores";



function AdministrarProveedor() {
  
  /*======================================== Buscador de proveedores ========================================*/
  //Almacenamiento de todos los proveedores existentes
  const[listaProv, setListaProv] = useState([]);
  
  // Almacenamiento de la clave introducida del proyecto 
  const[nombreProv,setNombreProv] = useState([]);

  // Función que realiza la consulta a la tabla proyectos 
  const getProvs = async () => {
    try{
        const resProv = await axios.get( url + '/api/cotizador/proveedor/view');
        setListaProv(resProv.data.data);
    }catch(error){
        console.log(error);
    }
  }

  //const [actualizarProvs,setActualizarProvs] = useState(false);

  useEffect(()=>{
      getProvs();
  },[])

  useEffect(()=>{
    if(nombreProv === ''){
      getProvs();
    }
},[nombreProv])
  
  //Función que realiza la busqueda de los proveedores semejantes al nombre e introducido
  const onChangeTextNombreProv = (nProv) => {
      let coincidencias = [];
      if(nProv.length>0){
          coincidencias = listaProv.filter(proveedor => {
          const regex = new RegExp(`${nProv}`, "gi");
          return proveedor.proveedor_nombre.match(regex)
          })
      }
      setListaProv(coincidencias);
      setNombreProv(nProv);
  }
  /*=======================================================================================================*/
  const {actualizacion} = EditProvs();
  const [first, setfirst] = useState(false);

  const envioData = (datos, key, data) => {
    if(first){
      actualizacion(datos[key],data);
    }
  };


  return (
    <div className="contenido-usuarios">
      <div className="head"></div>
        <div className="table-responsive">
            {/*============= Titulo Animación =============*/}
            <Animaciones mytext="Buscar proveedores" />
            {/*********Búsqueda de Lista de Proyectos por Clave ********/}
            <div className="busqueda-proyectos">
              <Table responsive id="nombreDiv">
                  <thead>
                      <tr className="titulo-tabla-usuarios">
                          <th>Nombre</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr >
                          <td>
                              <input 
                                  className="agregar"
                                  type="text"
                                  name="proveedor_nombre"
                                  onChange={e => onChangeTextNombreProv(e.target.value)}
                                  value={nombreProv}
                                  placeholder="Ingrese el nombre del proveedor" 
                              />
                          </td>
                      </tr>
                  </tbody>
              </Table>
            </div>  
            <div>
              {/*=================== Botón Mostrar Lista DIV =====================*/}
              <br />
              <CrudProveedores
                proveedores={listaProv} 
                setfirst={setfirst}
                envioData={envioData}
                //setActualizarProvs={setActualizarProvs}
              />
            </div>
      </div>      
    </div>
  );
}

export default AdministrarProveedor;