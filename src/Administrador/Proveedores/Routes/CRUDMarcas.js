import React ,{useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'


export const CrudMarcas = (props) => {

    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        marca_nombre:''  
    });
    const handleInputChange = (event) => {
        setData({
          ...data,[event.target.name] : event.target.value
      })
    }

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        setDatos(props.marcas); 
    },[props.marcas]);

    useEffect(() => {
        let i = Object.keys(props.marcas)
         i = i.length
        setenable(Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('Modificar'));
    },[props.marcas])

    const habilitar = (key) =>{
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(props.marcas);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'Modificar';
                    setData({
                        ...data,marca_nombre:''
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
            {/*===================     Tabla Proveedores   ========================*/}
            <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                    {/*=================== Titulos Tabla Proveedores ===================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {/*=================== Contenido Tabla Marcas =================*/}
                    {Object.keys(props.marcas).map((key) => (
                    <tr key={props.marcas[key].marca_id}>
                        <td>{props.marcas[key].marca_id}</td>
                        {/*=================== Nombre de la marca =================*/}
                        <td>
                            <input
                            className="input-name"
                            defaultValue={props.marcas[key].marca_nombre}
                            onChange={handleInputChange}
                            disabled={enable[key]}
                            name="marca_nombre"
                            ></input>
                        </td>
                        {/*=================== Botón modificar =================*/}
                        <td>
                            {" "}
                            <button
                                className="btn btn-primary Mod"
                                type="button"
                                onClick={() => {
                                habilitar(key);
                                props.envioData(datos,key,data); 
                                props.setfirst(activar[key]);
                                }}
                            >{textBModificar[key]}
                            </button>
                        </td>
                    </tr>  
                    ))}
                </tbody>
            </Table>
        </div>
    )
}