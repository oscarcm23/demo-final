import React from 'react'
import { useRegistro } from "../Routes/registroClientes"


function Clientes() {
  const {
    handleInputChange,
    enviarDatos
  }=useRegistro()

    return (
        <div className="contenido-main-registro">
        <div className="scene flex">
          <section className="card-body">
            <form  method="post" className="card-form" onSubmit = {enviarDatos}>
                {/*========= Registrar Clientes========= */}
              <h2 >  <span>Registrar Clientes</span> </h2>
   {/*========= Nombre Cliente========= */}
                 <label htmlFor="user" className=" label">
                    Nombre Cliente
                 </label>
              <input
                id="user"
                type="text"
                name='nombre_cliente'
                className="card-input"
                onChange={handleInputChange}
                placeholder="Nombre Cliente"
              />
    {/*========= Razón Social ========= */}
              <label htmlFor="user2" className=" label">
                Razón Social
              </label>
              <input
                id="user2"
                type="text"
                name ="razon_social"
                onChange={handleInputChange}
                className="card-input"
                placeholder="Razón Social"
              />
  
   {/*========= FALTA Teléfono ========= */}
  <label htmlFor="user2" className=" label">
              Contacto (Teléfono)
              </label>
              <input
                id="user2"
                type="number"
                name ="telefono"
                onChange={handleInputChange}
                className="card-input"
                placeholder="Ingrese Número Telefónico"
              />
   {/*========= FALTA Dirección ========= */}
     <label htmlFor="user2" className=" label">
             Dirección
              </label>
              <input
                id="user2"
                type="text"
                name ="cliente_direccion"
                onChange={handleInputChange}
                className="card-input"
                placeholder="Ingrese Dirección"
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

        <br/>
        <br/>



      </div>
    )
}

export default Clientes