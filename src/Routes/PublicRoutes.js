import React from "react";
import { Redirect, Route } from "react-router"
import ValidaRol from './ValidaRol';
import {i} from './ValidaRol';


//Validacion de Usuario Administrador
let  auth = true;


if(i=== "null"){

  auth = true;
  console.log("No valido")
  
}else{
  auth = false;
}


const PublicRoutes = ({component:Component, ...rest}) => {

    <ValidaRol />
    
    if( i=== "null"){
console.log("Usuario No Encontrado")

return (  
    <Route {...rest}>{auth? <Component/> : <Redirect to ="/no-found"/>}   </Route>     
  )
    } else{
        console.log("Usuario logueado")

    }
    return (null )
    
}



export  default PublicRoutes