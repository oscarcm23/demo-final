import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';



import {url2} from "../Componentes/Ocultar";


const cookies = new Cookies();
const estado = () => {
  if (cookies.get('estado_login') === "0") {
    return false

  } else {
    return true
  }
}

function CambioContraseña() {
  const [datos, setDatos] = useState({
    password: '',
    estado_login: 1
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos, [event.target.name]: event.target.value
    })
  }
  const id = cookies.get('id_usuario')
  
  async function Send (){
    console.log("soy el id adentro del send", id)
    const data = {
      password: datos.password,
      estado_login: 1
    };
    if (datos.password === datos.repassword && datos.email !== "") {
      try {
        const respuesta = await axios.post(url2 + `/api/cotizador/edit/pass/${id}`, data)
        const send2 = respuesta.data;
        console.log(send2)

        alert('Contraseña actualizada')
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Las contraseñas no coinciden");
    }


  }
  const enviarDatos = (event) =>{
    Send();
    event.preventDefault();
    event.target.reset();
  }

 

  console.log("este es el estado login de cambio contraseña: " );
  console.log(estado());

  return (
    <>
      {estado() ? "" : (<div className="contenido-main-registro">
        <div className="scene flex">
          <section className="card-body">
            <form action='' method="post" className="card-form" onSubmit={enviarDatos} >
              <h2 >
                <span>Actualizar Contraseña</span>
              </h2>
              <label htmlFor="password" className=" label">
                Contraseña Nueva
              </label>
              <input
                id="password"
                type="password"
                name='password'
                onChange={handleInputChange}
                className="card-input"
                placeholder="Ingrese Contraseña Nueva"
                data-type="password"
              />

              <label htmlFor="password" className=" label">
                Repetir Contraseña
              </label>
              <input
                id="password2"
                type="password"
                name="repassword"
                onChange={handleInputChange}
                className="card-input"
                placeholder="Repita la Contraseña"
                data-type="password"
              />

              <div className="boton-login">
                <button className="login" type="submit">
                  <span>Actualizar</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>)}
    </>
  )
}

export default CambioContraseña