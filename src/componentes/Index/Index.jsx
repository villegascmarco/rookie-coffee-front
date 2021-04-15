import React from "react";
import "../estilos/Index.css";
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";
import IMG1 from "../../res/baguette.jpg"
import IMG2 from "../../res/cafe.jpg"
import IMG3 from "../../res/bisquet.png"
import IMG4 from "../../res/sandwitch.jpg"
import IMG5 from "../../res/people.jpg"
import IMG6 from "../../res/cafeteria.jpg"
import IMG7 from "../../res/cafeteria2.jpg"
import BackgroundSlideshow from 'react-background-slideshow'

const Index = () => {
  return (
    <div className="index_container">
      
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

      
      <div className="backgrond_images opacity-0">
      <BackgroundSlideshow images={[ IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7 ]} animationDelay = {5000} />
      </div>
    </div>
  );
};

export default Index;
