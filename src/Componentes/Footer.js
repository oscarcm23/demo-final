import React from 'react'
import "./css/footer.css"



function Footer() {
    return (
  
//============ Footer Página Web ============
        <div className="footer">
            
{/* //============ Redes Sociales ============ */}
            <div className="redes-sociales">
                <h4>
                    <a href="tel:+525568434433" target="_blank" rel="noreferrer" > <i className="bi bi-telephone-fill"></i></a>
                    <a href={"https://goo.gl/maps/6eWcbzw6Z1xK37rEA"} target="_blank" rel="noreferrer" >    <i className="bi bi-geo-alt-fill"></i> </a>
                    <a href={"mailto:contacto@palotinto.com?Subject=Información"} target="_blank" rel="noreferrer"> <i className="bi bi-envelope-fill"></i></a>
                    <a href={"https://www.linkedin.com/company/palo-tinto-networks/"} target="_blank" rel="noreferrer" > <i className="bi bi-linkedin"></i> </a>
                </h4>
            </div>
                 <div className="box1">
                    <h3>Herramienta Web</h3>
                 </div>
        </div>
    )
}

export default Footer