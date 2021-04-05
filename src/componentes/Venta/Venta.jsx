import React, { useState, useEffect } from "react";
import CardProducto from "./CardProducto.jsx";
import ProductosData from "../../sample/productos.json";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import PreVenta from "./PreVenta.jsx";
import uniqid from "uniqid";

import "../estilos/Venta.css";

const Venta = ({tokenP}) => {
  const [productoSel, setProductoSel] = useState({});
  const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarProductoVenta = (producto) => {
    const nuevoProducto = {
      id: uniqid(),
      producto: producto.id,
      nombre: producto.nombre,
      precio_historico: producto.precio,
      cantidad: 0,
    };
    setTotal(total + nuevoProducto.precio_historico);
    setListaProductos([...listaProductos, nuevoProducto]);
  };

  const borrarProductoVenta = (producto) => {
    const newArrary = listaProductos.filter((item) => item.id !== producto.id);
    setTotal(total - producto.precio_historico);
    setListaProductos(newArrary);
  };

  const obtenerProductos = () => {
    let productoActivos = ProductosData.filter((producto) =>
      producto.estatus.includes("Activo")
    );
    setProductos(productoActivos);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="container text-center mt-5 scroll">
      <p className="seccion">Panel de</p>
      <h1 className="titulo_seccion">Venta</h1>
      <div className="todo_container">
        <div className="productos_container">
          {productos.map((producto) => (
            <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
              <CardProducto
                producto={producto}
                agregar={agregarProductoVenta}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
      <div className="detalle-venta">
        <PreVenta
          listaProductos={listaProductos}
          borrar={borrarProductoVenta}
          total={total}
          setTotal={setTotal}
          setListaProductos = {setListaProductos}
          token={tokenP}
        />
      </div>
    </div>
  );
};

export default Venta;
