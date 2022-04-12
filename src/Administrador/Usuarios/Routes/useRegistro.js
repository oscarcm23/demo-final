import  {useState} from 'react';
import axios from 'axios';
import {url} from "../../../Componentes/Ocultar";
export const useRegistro = () => {
     const [datos,setDatos] = useState ({
          rol: '', 
          email  :'',
          remail :'',
          password:''
           
   });

   const handleInputChange = (event) => {
    //console.log(event.target.value)
    setDatos ({
        ...datos,[event.target.name] : event.target.value ,
    })
}

async function Send (){

    const data= {
        rol: datos.rol,
        email : datos.email,
        password : datos.password,
        estado_login:false
       
    };

    if(datos.email == datos.remail   && datos.email != ""  )  
    {
        if(datos.password != ""){

            if (datos.rol != ""){

           
                try {
                    const respuesta = await axios.post(url + '/api/cotizador/registro',data);
                    const send2= respuesta.data;
                    console.log(send2.msg);
                    alert(send2.msg);    
                                    
                    } catch (error) {
                        console.log(error);
                    alert('No se Guardo el registro, verifique los datos');    
                        
                    }

            }else{
                alert('Seleccione un Rol'); 
            }
        
        }else{
            alert('Ingrese una contraseña');



        }
      
        
    }
    else {
        alert('Error en la sección de Correo, verifique que sean iguales o que no esten vacíos los datos');
    }
 

}


    const enviarDatos = (event) => {  
        Send();
        event.preventDefault();
        //guardado de datos
        event.target.reset();
    }


    return {

        handleInputChange,
        enviarDatos
    }
};