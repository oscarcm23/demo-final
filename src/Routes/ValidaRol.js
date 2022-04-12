import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export let authAdmin1;
export let authPreventa1;
export let authVenta1;
export let i = "";
export let validator = cookies.get('rol');
//export let validator = 'administrador';

// console.log(validator);


export function foo() {
    //console.log(Cookies.get('id_usuario'));
    if (validator === "administrador") {
        i = "administrador";
    } else if (validator === "preventa") {
        i = "preventa";
    } else if (validator === "venta") {
        i = "venta";
    } else {
        i = "null";

    }
   // console.log(i); // local
}
foo()



export default class ValidaUsuario extends React.Component {
    render() {
        

        if(this.state.rol[0]=== "admin"){
         //   console.log("soy admin");

            authAdmin1 =false;

            return(
                <div>
                    <h1>Hola Admin</h1>
                </div>
            )
        }else if  (this.state.rol[0]=== "preventa"){
        //    console.log("Soy Preventa");
            authPreventa1=true;
            return(
                <div>
                    <h1>Hola Preventa</h1>
                </div>
            )
        }else if  (this.state.rol[0]=== "venta"){
         //   console.log("Soy de Ventas");
            authVenta1=true;
            return(
                <div>
                    <h1>Hola Ventas</h1>
                </div>
            )
        }else{
            console.log("ERROR");
            return(
                <div>
                    <h1>Existe un Error;</h1>
                </div>
            )

        }

    }

}