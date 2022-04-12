import React from 'react'


function Animaciones(props) {
  return (

      /*========= Animación de Titulos========= */
     <div className="container">
                    <div className="box">
                   {/*========= Titulo Animación========= */}
                        <div className="title">
                            <span className="block"></span>
                            <h1 > {props.mytext}<span></span></h1>
                        </div>
                 {/*========= Subtitulo Animación ========= */}
                        <div className="role">
                            <div className="block"></div>
                            <p>Palo Tinto Networks.</p>
                        </div>

                    </div>
                </div>
  )
}

export default Animaciones