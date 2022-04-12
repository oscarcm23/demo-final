export const operaciones = ()=>{
//TOTAL EN BASE A LOS PARAMETROS PRECIO LISTA , CANTIDAD Y DESCUENTO
    const total = (p_lista,cantidad,descuento) => {   
        if (p_lista === "" && cantidad === "" && descuento === ""){
            p_lista = 0;
            cantidad = 0;
            descuento = 0;
            const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
            return resultado*(1-(Number.parseFloat(descuento)/100));
    
        }
        else if (p_lista !== "" && cantidad === "" && descuento === ""){
            descuento = 0;
            cantidad = 0;
            const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
            return resultado*(1-(Number.parseFloat(descuento)/100));
        }
    
        else if(cantidad !== '' && p_lista === "" && descuento === "" ){
            p_lista=0;
            descuento= 0;
            const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
            return resultado*(1-(Number.parseFloat(descuento)/100));
            }
    
        else if(descuento !== "" && p_lista === "" && cantidad === ""){
           cantidad=0;
           p_lista= 0;
            const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
            return resultado*(1-(Number.parseFloat(descuento)/100));
            }
        else if(cantidad !== '' && p_lista !== "" && descuento === "" ){
            descuento= 0;
            const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
            return resultado*(1-(Number.parseFloat(descuento)/100));
        }    
            
            else {
                const resultado = (Number.parseFloat(p_lista) * Number.parseFloat(cantidad))
                return resultado*(1-(Number.parseFloat(descuento)/100));
            }         
        };
//PRECIO UNITARIO EN BASE TOTAL(LINEA 3-OPERACIONES.JS) Y CANTIDAD
    const precio_u = (total, cantidad)=> Number.parseFloat(total)/Number.parseFloat(cantidad) ;
//  DESCUENTO EN BASE CON LOS PARAMETROS PRECIO LISTA Y PRECIO UNITARIO
    const descuento_1= (precio_u,precio_l)=>{
       let operacion =(Number.parseFloat(precio_u)/Number.parseFloat(precio_l))
       return((1-operacion)*100);

    }
        
        
// TOTAL CANTIDAD Y PRECIO UNITARIO
    const total_1 = (cantidad,precio_u)=> (Number.parseFloat(cantidad))*(Number.parseFloat(precio_u));  
    return {
        total,
        precio_u,
        descuento_1,
        total_1        
    };
    

}


