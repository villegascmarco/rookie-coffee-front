import React, { useState, useEffect } from "react";
import CardProducto from "./CardProducto.jsx";
import ProductosData from "../../sample/productos.json";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "../estilos/Venta.css";

const Venta = () => {
  const [productoSel, setProductoSel] = useState({});
  const [productos, setProductos] = useState([]);

  const obtenerProductos = () => {
    let productoActivos = ProductosData.filter((producto) =>
        producto.estatus.includes("Activo")
      );
    setProductos(productoActivos)
  }

  useEffect(() => {
    obtenerProductos()
  },[])

  return (
    <div className="container text-center mt-5 scroll">
      <p className="seccion">Panel de</p>
      <h1 className="titulo_seccion">Venta</h1>
      <div className="productos_container col-8">
        {productos.map((producto) => (
          <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
            <CardProducto 
            producto={producto} 
            setProductoSel={setProductoSel}
            productoSel={productoSel}/>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default Venta;
