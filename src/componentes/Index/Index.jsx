import React from "react";
import "../estilos/Index.css";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";
import IMG1 from "../../res/baguette.jpg"
import IMG2 from "../../res/cafe.jpg"
import IMG3 from "../../res/bisquet.png"

const Index = () => {
  return (
    <div className="index_container">
      {/* <div className="image_first"> <img src={IMG1} alt="inside"/></div> */}
      <div className="title_company">
        <h2 className="welcome">Bienvenido a</h2>
        <Wave
          text="Rookie Coffe"
          effect="verticalFadeIn"
          effectChange={1}
          effectDirection="up"
          iterations={1}
        />
      </div>

      <div className="cta_container">
        <Link to="/Login" className="cta_store">
          Entrar al sistema
          <i className="fa fa-coffee ml-2"></i>
        </Link>
      </div>

      <div className="image_first"><img src={IMG1} className="img2" alt="people"/></div>
      <div className="image_second"><img src={IMG2} className="img2" alt="people"/></div>
      <div className="image_third"><img src={IMG3} className="img2" alt="people"/></div>
    </div>
  );
};

export default Index;
