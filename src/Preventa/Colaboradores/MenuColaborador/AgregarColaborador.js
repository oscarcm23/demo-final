import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { url, url2 } from '../../../Componentes/Ocultar';

const cookies = new Cookies();
//Obtención del rol del usuario con sesión activa
let validatorrol = cookies.get('rol');
//Obtención del id del usuario con sesión activa
let validatorid = cookies.get('id_usuario');
console.log("soy el id del usuario", validatorid)
function Colaborador() {

  /*======================================== Buscadores de proyectos y usuarios ========================================*/
  // Almacenamiento de todos los proyectos existentes
  const [listaProyectos, setListaProyectos] = useState([]);

  // Almacenamiento de los proyectos que tienen la clave semejante a la instroducida
  const [suggestionsProyecto, setSuggestionsProyectos] = useState([]);

  // Almacenamiento de la clave introducida del proyecto
  const [claveP, setClaveP] = useState([]);

  // Almacenamiento de todos los usuarios existentes
  const [listaUsuarios, setListaUsuarios] = useState([]);

  // Almacenamiento de los usuarios semejantes al email instroducido
  const [suggestionsUsuarios, setSuggestionsUsuarios] = useState([]);

  // Almacenamiento del email introducido
  const [emailU, setEmailU] = useState([]);

  // Almacenamiento del estado del id_usuario
  const [idUsuariosState, setIdUsuarios] = useState();

  // Almacenamiento del id_proyecto
  const [idProyectoState, setIdProyecto] = useState();

  // Función que realiza la consulta a la tabla proyecto
  useEffect(() => {
    const getProyectos = async () => {
      try {
        if (validatorrol === "administrador") {
          const resProy = await axios.get(url + '/api/cotizador/proyecto/viewadmin');
          setListaProyectos(resProy.data.data);
          console.log(resProy.data.data)
        } else {
          const resProy = await axios.get(url2 + `/api/cotizador/proyecto/viewpreventas/${validatorid}`);
          setListaProyectos(resProy.data.data);
          console.log("hola soy el else del getproyectos", resProy.data.data)
        }
        const users = await axios.get(url + '/api/cotizador/registro');
        setListaUsuarios(users.data.reSql);
        console.log("hola soy el users data", users.data.reSql)

      } catch (error) {
        console.log(error);
      }
    }
    //console.log(listaUsuarios);
    getProyectos();
  }, [])

  // Función que realiza la busqueda de los proyectos semejantes a la clave introducida 
  const onChangeTextClaveP = (claveP) => {
    let coincidencias = [];
    if (claveP.length > 0) {
      coincidencias = listaProyectos.filter(proyecto => {
        const regex = new RegExp(`${claveP}`, "gi");
        return proyecto.proyecto_clave.match(regex)
      })
    }
    setSuggestionsProyectos(coincidencias);
    setClaveP(claveP);
  }

  // Función que obtiene la clave del proyecto seleccionado
  const onSuggestHandlerProyecto = (clave, proyecto_id) => {
    setClaveP(clave);
    setSuggestionsProyectos([]);
    setIdProyecto(proyecto_id)
    console.log("id_proyecto: ", proyecto_id)
    console.log("hola soy la clave del proyecto", clave)
  }

  // Función que realiza la busqueda de los usuarios semejantes al email introducido
  const onChangeTextEmail = (email) => {
    let coincidencias = [];
    if (email.length > 0) {
      coincidencias = listaUsuarios.filter(usuario => {
        const regex = new RegExp(`${email}`, "gi");
        return usuario.email.match(regex)
      })
    }
    setSuggestionsUsuarios(coincidencias);
    setEmailU(email);
  }

  // Función que obtiene el email del usuario seleccionado
  const onSuggestHandlerEmail = (email, id_usuario) => {
    setEmailU(email);
    setSuggestionsUsuarios([]);
    setIdUsuarios(id_usuario);
    console.log("id usuario dentro del onsuggest", id_usuario)
  }

  // Almacenamiento del id cliente encontrado en la busqueda
  var proyectoId = { proyecto_id: '' }

  const [passwordState, setPassword] = useState({
    password: '',
  })

  const handleInputChange = (event) => {
    setPassword({
      ...passwordState, [event.target.name]: event.target.value
    })
  }

  // Función que realiza la inserción del colaborador 
  async function Send() {

    const mandarInformacion = {
      colab_id_usuario: idUsuariosState,
      colab_id_proyecto: idProyectoState,
      password: passwordState,
      validatorid
    }
    //Obtención del id del cliente que se seleccionó en la búsqueda
    // let i = Object.keys(listaProyectos);
    // for (let c = 0; c < i.length; c++) {
    //   if (claveP === listaProyectos[c].proyecto_clave) {
    //     proyectoId.proyecto_id = listaProyectos[c].proyecto__id
    //     console.log("id del proyecto escogido", proyectoId);
    //   }        
    // }
    console.log("soy el idUsuariosState", idUsuariosState)
    console.log("soy el idproyecto", idProyectoState)
    console.log("soy password", passwordState)
    if (idUsuariosState !== undefined) {
      if (idProyectoState !== undefined) {
        if (passwordState !== '') {
          try {
            const respuesta = await axios.post(url + '/api/cotizador/colaboradores/insert', mandarInformacion);
            const send2 = respuesta.data.msg;
            console.log("send2: ", send2)
            // para que al hacer submit del form se vuelva a poner en blanco el formulario y se puedan seguir asignando nuevos proyectos
            setPassword({
              password: '',
            })
            setClaveP([])
            setEmailU([])
            alert(send2)
          } catch (error) {
            console.log(error)
          }
        } else {
          alert('¡ERROR! Debes ingresar tu contraseña')
        }
      } else {
        alert('¡ERROR! Ingresa la clave del proyecto al que quieres añadir un colaborador')
      }
    } else {
      alert("¡ERROR! Debes completar todos los campos")
    }

  }

  /*=======================================================================================================*/

  return (
    <div className="contenido-main-registro">
      <div className="scene flex">
        <section className="card-body">

          <h2 >
            <span>Agregrar Colaborador</span>
          </h2>
          <label htmlFor="user" className=" label">
            Correo del Colaborador
          </label>
          <input
            id="user"
            type="text"
            name='email'
            className="card-input"
            value={emailU}
            onChange={e => onChangeTextEmail(e.target.value)}
            placeholder="Ingrese Correo del Colaborador"
          />
          {suggestionsUsuarios && suggestionsUsuarios.map((suggestionU, i) =>
            <div key={i} className="selectCliente" onClick={() => onSuggestHandlerEmail(suggestionU.email, suggestionU.id_usuario)}>
              {suggestionU.email}
            </div>
          )}


          <label htmlFor="user" className=" label">
            Clave del Proyecto
          </label>
          <input
            id="user"
            type="text"
            name='proyecto_clave'
            className="card-input"
            value={claveP}
            onChange={e => onChangeTextClaveP(e.target.value)}
            placeholder="Ingrese Clave del Proyecto"
          />
          {suggestionsProyecto && suggestionsProyecto.map((suggestionP, i) =>
            <div key={i} className="selectCliente" onClick={() => onSuggestHandlerProyecto(suggestionP.proyecto_clave, suggestionP.proyecto_id)}>
              {suggestionP.proyecto_clave}
            </div>
          )}



          <label htmlFor="password" className=" label">
            Contraseña
          </label>
          <input
            id="user2"
            type="password"
            name="password"
            onChange={handleInputChange}
            className="card-input"
            placeholder="Ingrese su Contraseña"
            data-type="password"
            value={passwordState.password}
          />

          <div className="boton-login">
            <button className="login" onClick={(event) => { Send(); event.preventDefault() }}>
              <span>Agregar al Proyecto</span>
            </button>
          </div>

        </section>
      </div>
    </div>
  )
}

export default Colaborador