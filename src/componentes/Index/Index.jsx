import React from "react";
import "../estilos/Index.css";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";

const Index = () => {
  return (
    <div className="index_container">
      <h1 className="title_company">
        <h2 className="welcome">Bienvenido al sistema de</h2>
        <Wave
          text="Rookie Coffe"
          effect="verticalFadeIn"
          effectChange={1}
          effectDirection="up"
          iterations={1}
        />
      </h1>

      <p className="about">
        Bienvenido al sistema de Rookie coffe, en este podras llevar a cabo
        diferentes procesos, como la venta de productos, registro en inventario
        actualización de precios, entre muchas cosas mas. <br/> <br/><strong> ¡Disfruta del sistema!</strong>
      </p>

      <div className="cta_container">
        <Link to="/Login" className="cta_store">
          Entrar al sistema
        </Link>
      </div>
    </div>
  );
};

export default Index;
