import React from "react";
import { Redirect, Route } from "react-router"
import ValidaRol from './ValidaRol';
import {i} from './ValidaRol';

//Validacion de Usuario Administrador

let  auth = true;

if(i=== "preventa"){

  auth = true;
}else{
  auth = false;
}
const Preventa= ({component:Component, ...rest}) => {
    <ValidaRol />

    if( i==="preventa"){
//console.log("Hola Venta")

return (
    
    <Route {...rest}>{auth? <Component/> : <Redirect to ="/"/>}   </Route>  
      
  )
    }else{
    //    console.log("No soy  de Preventa")

    }
    return (null )
    
}



export  default Preventa