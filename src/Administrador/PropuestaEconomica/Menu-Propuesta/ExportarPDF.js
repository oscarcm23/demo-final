import React from 'react';
import {jsPDF} from "jspdf";
import "jspdf-autotable";
import '../css/Exportar.css';
import {imagen} from './IMG';
import {  Cantidad,descuentoCliente,  prov, listaProv,desFabrica, costoPTN, margenGanancia, precioVenta , margenDirecto ,
  precioFinalVenta,
  costoSinIndirectos,
  costoFianalProyecto,
  datosCompletosAM,
  datosCompletosTotal
  } from  '../../../Ventas/Operaciones/OperacionesAM';



class ExportarPDF extends React.Component {

  constructor() {
    super();
    this.state = {
      datos: [
        { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
       
       
     
           
       
           
           
      ],
      datos2: [
        {descripcion: "descripcion", periodo: "mensual",   costoUnitario: "678" , dispositivos: "1",subtotal: "400"}
      ],
      datosTotales: [
        {subtotal: "$74,280", iva: "11,884", total: "86,165"}
      ],
      datosTotales2: [
        {subtotal: "$6,190", iva: "990", total: "7,180"}
      ]
    }

  }
/*  { partida: "1", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "2", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "3", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        { partida: "4", servicio: "Enero" , descripcion: "descripcion",dispositivos: "1" , subtotal: "100"  },
        */ 


  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(12);
    doc.setFont("Arial");
  

//Datos Fechas
let dia = "01";
let mes = "septiembre"
let año = "2022";
//Datos Proyectos
let claveProyecto = "2303";
let organizacion = "Delfos369";
let nombreProyecto = "Titulo Proyecto";
//Atención 
let nombreContacto = "Marco Banda, Compras OIEGSA";


    const title = "PROPUESTA ECONÓMICA";
    const fecha = "Ciudad de México a "  + dia + " " + " de " + mes + " " + " de " + " " + año;
    const proyecto = claveProyecto + " " + organizacion + " " + nombreProyecto;
    const atencion = "Atención "  + nombreContacto;
    const comentarios = "Propuesta económica correspondiente al servicio de TV de paga.";
    const importe = "IMPORTE: SETENTA Y CUATRO MIL DOSCIENTOS OCHENTA 24/100 ANTES DE IVAOIEGSA";
    const cuota = "CUOTA MENSUAL";
    const importeMensual = "IMPORTE MENSUAL UN DISPOSITIVO: SEIS MIL CIENTO NOVENTA PESOS 02/100 ANTES DE IVA"
    const condiciones = "CONDICIONES COMERCIALES"
    const vigencia= "La vigencia de la presente propuesta es de 10 días naturales."
    const propuesta="La propuesta contempla el servicio para 9 Pantallas mensual"
    const formaPago= "La forma de pago será en mensualidades de $ 687.78 antes de IVA por pantalla."
    const duracion= "Esta propuesta contempla los servicios de ENERO 2021 al mes de DICIEMBRE 2021."
    const moneda= "Los precios están expresados en moneda nacional."
    const interes="Los retrasos en pagos generarán un interés moratorio del 0.2% por cada día de atraso en el pago."
    const iva= "El cargo por refacturación es de 200.m.n. + IVA"

    const encargada="ESMERALDA RODRÍGUEZ MEDELLÍN"
    const cargo ="EJECUTIVA DE CUENTA"
    const empresa="PALO TINTO NETWORKS SA DE CV"

    var array1 = [
      {"nombre": "paco", "edad": "21"}
    ];
    
  
    array1 = array1.concat(datosCompletosAM);



    console.log(array1);
    const headers = [["NO.PARTIDA", "SERVICIO", "DESCRIPCIÓN",  "DISPOSITIVOS" ,  "SUBTOTAL"]];

    const data = [datosCompletosAM] + [datosCompletosTotal];


    
    const longitud = datosCompletosAM.length
    console.log(longitud);
    let content = {
      startY: 200,
      head: headers,
      body: data,
     
    };

  
    const headers2 = [["DESCRIPCIÓN", "PERIODO", "COSTO UNITARIO", "DISPOSITIVOS", "SUBTOTAL" ]]
    const data2 = this.state.datos2.map(elt=> [elt.descripcion , elt.periodo,  elt.costoUnitario, elt.dispositivos, elt.subtotal]);
    
    const headers3 = [["SUBTOTAL", "IVA", "TOTAL"]]
    const data3 = this.state.datosTotales.map(elt=> [elt.subtotal , elt.iva,  elt.total]);
          
    const data4 = this.state.datosTotales2.map(elt=> [elt.subtotal , elt.iva,  elt.total]);
    
      // logo la imagen debe de estar en base64 si no no la lee
    let image = new Image();
    image.src = imagen;
    doc.addImage(image,'PNG', 50, 30, 130, 70);
    doc.text(title, 230, 90);
    doc.text(fecha, 320, 120 );
    doc.text(proyecto, marginLeft, 140 );
    doc.text(atencion, marginLeft, 160 );
    doc.text(comentarios, marginLeft, 190 );
    doc.text(condiciones, marginLeft, 620);
    // doc.text(vigencia, marginLeft, 645)
    // doc.text(propuesta, marginLeft, 660)
    // doc.text(formaPago, marginLeft, 675)
    // doc.text(duracion, marginLeft, 690)
    // doc.text(moneda, marginLeft, 705)
    // doc.text(interes, marginLeft, 720)
    // doc.text(iva, marginLeft, 735)
    // doc.text(encargada, 200, 790)
    // doc.text(cargo, 225, 805)
    // doc.text(empresa, 200, 820)
    doc.autoTable(content);
    console.log(doc.lastAutoTable.finalY)
    let content2 = {
      startY: doc.lastAutoTable.finalY,
      margin:{left:410},
      head: headers3,
      body: data3,
      tableWidth:'wrap',
      // fillColor: Color 
    }

    doc.autoTable(content2);
    const p =   doc.lastAutoTable.finalY;
    
    doc.text(importe, marginLeft, p+15 );
    doc.text(cuota, marginLeft, p+ 28 );

    let content3 = {
      startY: (doc.lastAutoTable.finalY) + 35,
      head: headers2,
      body: data2,
     
    }
    doc.autoTable(content3);
    let content4 = {
      startY: (doc.lastAutoTable.finalY) + 5,
      margin: {left:420},
      head: headers3,
      body: data4,
      tableWidth:'wrap',
     
    }
    doc.autoTable(content4);
    doc.text(importeMensual, marginLeft, doc.lastAutoTable.finalY + 15);
    doc.save("PropuestaEconómica.pdf")
  }

  render() {

    return (
      <div className="exportar">

          <button className="btn btn-success " /*  disabled={true} */  onClick={() => this.exportPDF()}>Generar PDF</button>

          
       
      </div>
    );
  }
}

export default ExportarPDF;