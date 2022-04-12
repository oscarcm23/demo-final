import React from "react";
import { Redirect, Route } from "react-router"
import ValidaRol from './ValidaRol';
import {i} from './ValidaRol';

//Validacion de Usuario Administrador

function actualizapage(){
  window.location.href="";
}

let  auth = true;

if(i=== "venta"){

  auth = true;
}else{
  auth = false;
}


const Venta= ({component:Component, ...rest}) => {
    <ValidaRol />

    if( i==="venta"){
//console.log("Hola Venta")

return (
    
    <Route {...rest}>{auth? <Component/> : <Redirect to ="../"/>}   </Route>  

    
      
  )
    }else{
        //console.log("No soy  de Ventas")

    }
    return (null )
    
}



export  default Venta