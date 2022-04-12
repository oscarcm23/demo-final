import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'

export const CrudClientes = (props) => {
    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        nombre_cliente: '', 
        razon_social:'',
        telefono:'',
        cliente_direccion:''        
    });

    const handleInputChange = (event) => {
        setData ({
          ...data,[event.target.name] : event.target.value ,
      })
    }
    
    const [datos, Setdatos] = useState()

    useEffect(() => {
        Setdatos(props.clientes); 
    },[props.clientes]);

    useEffect(() => {
        let i = Object.keys(props.clientes)
         i = i.length
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('Modificar'));
        setenable ( Array(i).fill(true));
    },[])

    const habilitar = (key) =>{
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(props.clientes);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'Modificar';
                    setData({
                        ...data,nombre_cliente: '', 
                                razon_social:'',
                                telefono:'',
                                cliente_direccion:''   
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
                {/*===================     Tabla Clientes   ========================*/}
                <Table responsive striped bordered hover size="sm" className="tablas">
                    <thead>
                        {/*=================== Titulos Tabla Clientes ===================*/}
                        <tr className="titulo-tabla-usuarios">
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Razón Social</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                    {/*         <th>Eliminar</th> */}
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*=================== Contenido Tabla Clientes =================*/}
                        {Object.keys(props.clientes).map((key) => (
                            <tr key={props.clientes[key].cliente_id}>
                            <td>{props.clientes[key].cliente_id}</td>
                            <td>
                                <input
                                className="input-name"
                                defaultValue={props.clientes[key].nombre_cliente}
                                onChange={handleInputChange}
                                disabled={enable[key]}
                                name="nombre_cliente"
                                ></input>
                            </td>
                            {/*================= Razón Social ==================*/}
                            <td>
                                <input
                                className="input-name"
                                defaultValue={props.clientes[key].razon_social}
                                onChange={handleInputChange}
                                disabled={enable[key]}
                                name="razon_social"
                                ></input>{" "}
                            </td>
                            {/*================= Teléfono ==================*/}
                            <td>
                                <input
                                className="input-name"
                                defaultValue={props.clientes[key].telefono}
                                onChange={handleInputChange}
                                disabled={enable[key]}
                                name="telefono"
                                ></input>{" "}
                            </td>
                            {/*================= Dirección==================*/}
                            <td>
                                <input
                                className="input-name"
                                defaultValue={props.clientes[key].cliente_direccion}
                                onChange={handleInputChange}
                                disabled={enable[key]}
                                name="cliente_direccion"
                                ></input>{" "}
                            </td>
                            <td>
                                {" "}
                                <button
                                    className="btn btn-primary Mod"
                                    type="button"
                                    onClick={() => {
                                    props.envioData(datos,key,data); 
                                    habilitar(key); 
                                    props.setfirst(activar[key]) ; 
                                    }}
                                >{textBModificar[key]}
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </form>

            <br/>
        </div>
    )
}