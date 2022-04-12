import React from "react";
import "../css/registroUsuarios.css";
import {useRegistro} from '../Routes/useRegistro';


function Registro() {
  const {  
    handleInputChange,
    enviarDatos
  } = useRegistro();

  return (

    <div className="contenido-main-registro">
      <div className="scene flex">
        <section className="card-body">
          <form  action="" method="post" className="card-form" onSubmit = {enviarDatos}>
            <h2 >
              <span>Registrar Usuarios</span>
            </h2>
            <label htmlFor="rol">Tipo rol: </label>

            <select id="rol" name="rol" required onChange={handleInputChange}>
              
            <option value="-----">--------------</option>
              <option value="administrador">Administrador</option>
              <option value="preventa">Preventa</option>
              <option value="venta">Venta</option>
            </select>
            <br />
            <br />

            <label htmlFor="user" className=" label">
              Correo
            </label>
            <input
              id="user"
              type="email"
              name ="email"
              onChange={handleInputChange}
              className="card-input"
              placeholder="Ingrese Correo"
            />

            <label htmlFor="user2" className=" label">
              Repetir Correo
            </label>
            <input
              id="user2"
              type="text"
              name= "remail"
              onChange={handleInputChange}
              className="card-input"
              placeholder="Repita el Correo"
            />

            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleInputChange}
              className="card-input"
              data-type="password"
              placeholder="Ingrese Contraseña"
            />

            <div className="boton-login">
              <button className="login" type="submit">
                <span>Registrar</span>
              </button>


            </div>
          </form>
        </section>
      </div>

      <br/>
      <br/>

<br/>

    </div>
  );
}

export default Registro;