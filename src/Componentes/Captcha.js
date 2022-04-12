import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import {passwordCaptcha} from "../Componentes/Ocultar";




let dis = true;
console.log("prueba")
/*  Funcion Captcha Validación Correcta */

function onChange(value) {
/*   console.log("Captcha value:", value);
   */
  console.log("Validación Correcta")
  dis=false;

  <div className="boton-registro">
            <button className="card-button" type="submit"   >
                <span>Registrar --------------</span>
              </button>
            </div>
}




/*  Funcion Captcha Validación Incorrecta */

function onErrored(value) {
  /*   console.log("Captcha value:", value);
     */
    console.log("Validación Incorrecta")
  
  }



function Captcha() {
  return (

    <div className="re-Captcha">
          
    {/*========== ReCAPTCHA Seguridad ==========*/}
     <ReCAPTCHA
     sitekey= {passwordCaptcha}
     onChange={onChange}
     onErrored={onErrored}
     />


   </div>
  )
}

export default Captcha