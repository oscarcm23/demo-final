import axios from 'axios';
import React from 'react'
import Table from 'react-bootstrap/Table'
import { url2 } from '../../../Componentes/Ocultar';


export const CrudColaboradores = (props) => {
    const deleteColab = async (cId) => {
        const confirmacion = window.confirm("¿Seguro que quieres borrar este Colaborador?" );
        if (confirmacion) {
            try {
                await axios.delete(url2 + `/api/cotizador/colaboradores/delete/${cId}`);
                alert('Colaborador eliminado exitosamente');
            } catch (error) {
                alert('Error al eliminar Colaborador');
            }
        }else {
        }
    };
    

    return (
        <div>
            {/*===================     Tabla Proveedores   ========================*/}
            <Table responsive striped bordered hover size="sm" className="tablas">
                <thead>
                    {/*=================== Titulos Tabla Proveedores ===================*/}
                    <tr className="titulo-tabla-usuarios">
                        <th>ID</th>
                        <th>Colaborador</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {/*=================== Tabla de los colaboradores de un Proyecto =================*/}
                    {Object.keys(props.colabs).map((key) => (
                    <tr key={props.colabs[key].colab_id}>
                        <td>{props.colabs[key].id_usuario}</td>
                        {/*=================== Nombre/Email del Colaborador =================*/}
                        <td>{props.colabs[key].email}</td>
                        {/*=================== Botón Eliminar =================*/}
                        <td>
                            {" "}
                            <button
                                className="btn btn-primary eliminar"
                                type="button"
                                onClick={() => {deleteColab(props.colabs[key].colab_id)}}
                            >Eliminar
                            </button>
                        </td>
                    </tr>  
                    ))}
                </tbody>
            </Table>
        </div>
    )
}