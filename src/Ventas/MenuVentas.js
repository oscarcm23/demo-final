import React from 'react'
import "../css/menuVentas.css"
import Cookies from 'universal-cookie';

const cookies = new Cookies();



function archivo() {
  const cierreSesion=()=>{

    cookies.remove('id_usuario',{path:"/"});
    cookies.remove('rol',{path:"/"});
    window.location.href="../Login.js";


  };


  return (
    <div className="contenedor">

      <nav className="main-menu-ventas">
        <ul>

        <div className="administrador-user">
            <li>
              <i className="bi bi-person-circle fa-2x"></i>
              <span className="nav-text">Ventas</span>
            </li>
          </div>


          <li>
            <a href="/">
              <i className="fa fa-home fa-2x"></i>
              <span className="nav-text">
                Home
              </span>
            </a>

          </li>


          
          <li className="has-subnav">
            <a href="/menu-clientes">
              <i className="bi bi-list"></i>
              <span className="nav-text">
            Menú Clientes
              </span>
            </a>           
          </li>


          <li className="has-subnav">
            <a href="/menu-proveedores">
              <i className="bi bi-list"></i>
              <span className="nav-text">
            Menú Proveedores
              </span>
            </a>           
          </li>






          <li className="has-subnav">
            <a href="/am">
              <i className="bi bi-briefcase-fill fa-2x"></i>
              <span className="nav-text">
          AM
              </span>
            </a>           
          </li>


          <li className="has-subnav">
            <a href="/proporcionalidad">
              <i className="bi bi-check2-circle fa-2x"></i>
              <span className="nav-text">
        Proporcionalidad
              </span>
            </a>           
          </li>


          
          <li className="has-subnav">
            <a href="/propuesta-economica">
              <i className="bi bi-check2-circle fa-2x"></i>
              <span className="nav-text">
         Propuesta Económica
              </span>
            </a>           
          </li>




          <li className="has-subnav">
            <a href="/calculadora">
              <i className="bi bi-calculator-fill"></i>
              <span className="nav-text">
              calculadora
              </span>
            </a>

          </li>
        </ul>

        <ul className="logout">
          <li>
          <a href="#" onClick={cierreSesion}   >
             
              <i className="fa fa-power-off fa-2x"></i>
              <span className="nav-text">
               Salir      
                 <div> </div>  
          
              </span>
             </a>
          
          </li>
        </ul>
      </nav>





    </div>

  )
}

export default archivo