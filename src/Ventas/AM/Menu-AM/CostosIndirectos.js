import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import Animaciones from "../../../Componentes/Animaciones";
import {costosIndirectos, equivale,  totalIndirecto} from "../../Operaciones/OperacionesAM";
import { EditCI } from '../Routes/ModificarPorcentajesCI';

function CostosIndirectos(props) {
    /*========================== Mostrar/Ocultar ==========================*/
    const [activar, setActivar] = useState([]);
    const [textBModificar,setTextBModificar] = useState([]);//Texto de los botones de modificar
    /*=====================================================================*/

    /*========================== Habilitar/Deshabilitar ==========================*/
    const [enable, setenable] = useState([]);//Inputs
    /*============================================================================*/

    const [data,setData] = useState ({
        porcentaje:''
    });

    const handleInputChange = (event) => {
        setData({
          ...data,[event.target.name] : event.target.value
        })
    }
    
    useEffect(() => {
        let i = Object.keys(costosIndirectos)
        i = i.length
        setenable(Array(i).fill(true));
        setActivar(Array(i).fill(true));
        setTextBModificar(Array(i).fill('Modificar'));
        //console.log('Porcentajes CI%:',props.ci);
    },[costosIndirectos])

    const habilitar = (key) =>{
        //console.log(costosIndirectos[key]);
        key = parseInt(key);
        const newArr =[] 
        const newArr2 = [];
        const newArr3 = [];
        let c = Object.keys(costosIndirectos);
        c = c.length;
        for (let i = 0 ; i < c ; i++){
            if(i === key){
                newArr[i] = !enable[i];
                if(enable[i] === false){
                    newArr2[i] = 'Modificar';
                    setData({
                        ...data, porcentaje :''
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

    const {actualizacion} = EditCI();

    const envioData = (key) => {
        if(activar[key] === false){
            actualizacion(props.ci,costosIndirectos[key],data);
        }
    }

  return (
      
    <div className="contenido-usuarios">
  <br/>   
   <div> <Animaciones mytext="Costos Indirectos" /> </div>

   <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                    {/*=================== Titulos Tabla Clientes ===================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>Descripción</th>
                        <th>Equivale a % </th>
                        <th>Total </th>
                        <th>Modificar</th>
 
                    </tr>
                </thead>
                <tbody>
                    {/*=================== Contenido Tabla Clientes =================*/}

                    {Object.keys(costosIndirectos).map((key) => (
                        <tr key={costosIndirectos[key]}>
                            {/*================= Descripción==================*/}
                            <td>{costosIndirectos[key]}</td>

                            {/*================= Equivale ==================*/}
                            <td className="editar" >
                                        <input
                                        className="input-name"
                                        type="number"
                                        defaultValue={equivale[key]}
                                        disabled={enable[key]} 
                                        onChange={handleInputChange}
                                        name="porcentaje" 
                                        ></input> 
                                    </td>
                            {/*================= Total Indirecto ==================*/}
                            <td>{ totalIndirecto[key]}</td>
                            {/*================= Editar==================*/}
                            <td>
                                <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    habilitar(key);
                                    envioData(key);
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

export default CostosIndirectos