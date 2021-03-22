import React from 'react'
import '../estilos/TituloPagina..css'

const TituloPagina = (props) => {
    return (
        <div className="text-center mb-4">
            <p className="seccion">Seccion</p>
            <h1 className="titulo_seccion">{props.titulo}</h1>
        </div>
    )
}

export default TituloPagina
