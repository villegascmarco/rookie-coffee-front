import React from "react";
import Server from '../../res/server.svg'
import "../estilos/Error.css";

const Permiso = () => {
  return (
    <div className="text-center error-msj">
        <h1 className="title">Oops...</h1>
      <img src={Server} alt="error" className = "error-img"/>
      <h2 className="msj">
        Al parecer no cuentas con los permisos necesarios para acceder a esta
        ubicación por favor ponte en contacto con el administrador
      </h2>
    </div>
  );
};

export default Permiso;
