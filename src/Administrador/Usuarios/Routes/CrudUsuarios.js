/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'


export const CrudUsuarios = (props) => {

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        rol: '', 
        email  :'',
        password:'',
        estado_login: 0        
    });

    const handleInputChange = (event) => {
        setData ({
          ...data,[event.target.name] : event.target.value ,
      })
    }

    const [datos, Setdatos] = useState()
    useEffect(() => {
        Setdatos(props.usuarios); 
    },[props.usuarios]);

    useEffect(() => {
        let i = Object.keys(props.usuarios)
         i = i.length
        setenable (Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('Modificar'));
        setenable ( Array(i).fill(true));
    },[])

    const habilitar = (key) =>{
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(props.usuarios);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'Modificar';
                    setData({
                        ...data,rol: '', 
                                email:'',
                                password:''  
                      })
                }else{
                    newArr2[i] = 'Aceptar';
                }
                newArr3[i] = !activar[i];
            }
            if(i !== key){
                newArr[i]=true;
                newArr2[i] = 'Modificar';
                newArr3[i]=true;
            }

        }   
        setenable(newArr);
        setTextBModificar(newArr2);
        setActivar(newArr3);
    }

  return (
    <div>
        <form>
            <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                {/*=================== Titulos Tabla Usuarios ====================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>ID</th>
                        <th>Administrador</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                     {/*    <th>Eliminar</th> */}
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                {/*=================== Contenido Tabla Usuarios =================*/}
                    {Object.keys(props.usuarios).map((key) => (
                        //checar aqui va los titulos
                        <tr key={props.usuarios[key].id_usuario} >
                            <td>{props.usuarios[key].id_usuario}</td>
                            <td><input className="input-name" defaultValue={props.usuarios[key].rol} onChange={handleInputChange} disabled={enable[key]} name='rol' ></input></td>
                            <td><input className="input-name" defaultValue={props.usuarios[key].email} onChange={handleInputChange}  disabled={enable[key]} name='email'  ></input> </td>
                            <td><button className="btn btn-primary Resetear" type="button" onClick={()=>{props.resetearContraseña(props.usuarios[key].id_usuario,props.usuarios[key].email)}} > Resetear </button></td>
   {/*                          <td>
                                <button 
                                className="btn btn-primary eliminar" 
                                type="button"
                                onClick={()=>props.borrar(props.usuarios[key].id_usuario)}>Eliminar 
                                </button>
                            </td> */}
                            {/*=================== Button modificar cliente ==================== props.borrar(props.usuarios[key].id_usuario)*/}
                            <td>
                                <button 
                                    className="btn btn-primary Mod" type="button"
                                    onClick={()=>{
                                        props.envioData(datos,key,data); 
                                        habilitar(key); 
                                        props.setfirst(activar[key]); 
                                    }}
                                    >{textBModificar[key]}  
                                </button>
                            <div >
                        </div>
                        </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
         </form>
    </div>
  )

   
}
