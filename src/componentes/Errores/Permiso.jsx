import React from "react";
import Server from '../../res/permiso.svg'
import "../estilos/Error.css";

const Permiso = () => {
  return (
    
    <div className="text-center ">
      <div className="error-msj">
       <div className="title">
       <section class="error-container">
              <span>O</span>
              <span><span class="screen-reader-text"></span></span>
              <span>p</span>
              <span className="rotar">s</span>
              <span className="rotar">!</span>
        </section> 
         </div> 
      <img src={Server} alt="error" className = "error-img"/>
      <h2 className="msj">
      Intenta iniciar sesión, si persiste el error ponte en contacto con el administrador. 
      </h2>
    </div>
    </div>
  );
};

export default Permiso;
