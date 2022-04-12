import React ,{useEffect, useState} from 'react';
import Table from "react-bootstrap/Table";
import {Modal , Button} from "react-bootstrap";
import axios from 'axios';
import ResumenAM from '../../../Ventas/AM/Menu-AM/ResumenAM';

const ModalPtnDatos = (props) => {
   console.log(props.proyecto_id);
 
         
   return (
    <>
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Datos de Partidas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive  striped bordered hover size="sm">
        <thead>
            <tr className="titulo-tabla-usuarios">
              <th>partida_nombre</th>
              <th>Partida_descripcion</th>
              <th> N° parte</th>
              <th>Meses</th>
              <th>Semanas</th>
              <th>Cantidad</th>
              <th>Categoria</th>
              <th>Total</th>
              <th>Moneda</th>
            </tr>
          </thead>
          <tbody>
        
        {Object.keys(props.proyecto_id).map((key) => (    
            <tr key={props.proyecto_id[key].sp_id} >
                <td>{props.proyecto_id[key].partida_nombre}</td>   
                <td>{props.proyecto_id[key].partida_descripcion}</td>   
                <td>{props.proyecto_id[key].sp_no_parte}</td>  
                <td>{props.proyecto_id[key].sp_meses}</td>  
                <td>{props.proyecto_id[key].sp_semanas}</td> 
                <td>{props.proyecto_id[key].sp_cantidad}</td>
                <td>{props.proyecto_id[key].categoria_nombre}</td>
                <td>{props.proyecto_id[key].precio_total}</td>
                <td>{props.proyecto_id[key].moneda_nombre}</td>      
            </tr>))}        
        </tbody>            
        </Table>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default ModalPtnDatos