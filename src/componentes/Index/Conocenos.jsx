import React from "react";
import "../estilos/Index.css";
import img1 from '../../res/cafeteria.jpg'
import logo from '../../res/logo.png'
import mision from '../../res/m.png'
import vision from '../../res/v.png'
import valores from '../../res/va.png'
import { Link } from "react-router-dom";
import { Wave } from "react-animated-text";

const Conocenos = () => {
  return (
    <div className="container px-md-5 text-center ">
      
      <img class="img-fluid m-3 " src={logo} alt="" />

    <div class="row">
    <div class="col-md-7">
    <img class="img-fluid rounded-lg shadow-lg"  src={img1} height="500" width="750" alt="" />
    </div>

    <div class="col-md-5 ">
      <br /><br />
    <p className="text-justify">
      Cada día, acudimos a trabajar con la esperanza de conseguir dos cosas: compartir el mejor café con nuestros amigos y contribuir a que el mundo sea un poco mejor.

      </p>
      <br></br>
      <p className="text-justify">
      Así fue cuando abrió la primera tienda Rookie Coffe en 1971, y así continúa siendo hoy.
En aquel entonces, la empresa era una sola tienda en la calzada de los héroes, una calle histórica en León Guanajuato. 
      Desde su estrecho escaparate, Rookie Coffe ofrecía algunos de los mejores cafés en grano recién tostados del mundo. El nombre, en una banda de música alternativa.

      </p><br></br>
      <p className="text-justify">
      Una empresa donde no solo se honrase al café y a su rica tradición, sino donde, también, se crease una sensación de conexión.
Rookie coffe ofrece distintos productos desde alimentos hasta bebidas calientes como frías, café expresso, capuccino, sándwiches. Etc. 
      </p>
      
    </div>

  </div><br /><br />

  <div class="row">

    <div class="col-md-4 col-sm-12 mb-4  cta_store ">
    <img class="img-fluid" src={mision} alt="" width="150" height="150"/>
    <h3 class="my-4">Mision</h3>
     <p className="text-justify"> Inspirar y nutrir el espíritu humano; una persona, una taza de café y una comunidad a la vez.</p>
    </div>

    <div class="col-md-4 col-sm-12 mb-4 p-3 cta_store">
    <img class="img-fluid" src={vision} alt="" width="150" height="150"/>
    <h3 class="my-4">Vision</h3>
    <p className="text-justify"> Posicionarse como el principal proveedor de cafés finos del mundo, sin comprometer jamás sus principios,
     y proporcionar a sus clientes y socios una experiencia inspiradora que enriquezca su día.</p>
    </div>

    <div class="col-md-4 col-sm-12 mb-4 p-3 cta_store">
    <img class="img-fluid" src={valores} alt="" width="150" height="150"/>
    <h3 class="my-4">Valores</h3>
    <ul className="text-justify">
      <li>Innovación</li>
      <li>Responsabilidad</li>
      <li>Impulso</li>
      <li>Fe</li>
      <li>Respeto</li>
      <li>Talento</li>
    </ul>

    </div>
  </div>

</div>
  );
};

export default Conocenos;
