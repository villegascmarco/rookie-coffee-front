import React, {useState} from 'react'
import '../estilos/Carga.css'
import SyncLoader from "react-spinners/SyncLoader";

const CargaPeticion = ({cargando}) => {

    let [color, setColor] = useState("#3B504A");

    if (!cargando) return null
    return (
        <div className="loader-container">
            <div className="loader">
                <SyncLoader size={30} color={color} />
            </div>
        </div>
    )
}

export default CargaPeticion
