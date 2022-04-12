import  {useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {valida}  from "../Login";
import {url} from "../../../Componentes/Ocultar";



const cookies =new Cookies();
export const useLogin = () => {

    const [datos,setDatos] = useState ({
        rol: '',
        email  :'',
        password:''
    });
    const handleInputChange = (event) => {
           setDatos ({
            ...datos,[event.target.name] : event.target.value ,
    })
    }
    
    async function Send (){
        const data= {
            email : datos.email,
            password : datos.password       
    };
    
        // el URL se tiene que cambiar por la ruta donde ira alojado la aplicación
        const respuesta = await axios.post( url + '/api/cotizador/login',data);
        const send2= respuesta.data;
        console.log(send2)
        cookies.set('id_usuario', send2.id_usuario , {path:"/"});
        cookies.set('rol', send2.rol, {path:"/"});
        cookies.set('estado_login', send2.estado_login, {path:"/"});
        console.log(cookies.get('estado_login'));
        window.location.href="../";

        //console.log(send2.id_usuario);
        //alert('Información valida');
}
    const enviarDatos = (event) => {  
        if(valida===true){
            Send();
            event.preventDefault();
           //guardado de datos
            event.target.reset();
        }else{
            event.preventDefault();
            //guardado de datos
             event.target.reset();
        }
     
      
    }
    return {
        handleInputChange,
        enviarDatos
    }
};