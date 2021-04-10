import React, { useState, useEffect } from "react";
import CardProducto from "./CardProducto.jsx";
import ProductosData from "../../sample/productos.json";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import PreVenta from "./PreVenta.jsx";
import uniqid from "uniqid";

import "../estilos/Venta.css";

const Venta = ({ tokenP }) => {
  const [productoSel, setProductoSel] = useState({});
  const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarProductoVenta = (producto) => {
    let cantidad = 1;

    let valProducto = listaProductos.filter(
      (item) => item.nombre == producto.nombre
    );
    if (valProducto != "") {
      cantidad = valProducto[0].cantidad + 1;
      const nuevoProducto = {
        producto: producto.id,
        nombre: producto.nombre,
        precio_historico: producto.precio,
        cantidad: cantidad,
      };

      const newArrary = listaProductos.filter((item) => item.nombre !== producto.nombre);
      setTotal(total + nuevoProducto.precio_historico);
      setListaProductos([...newArrary, nuevoProducto]);

    } else {
      const nuevoProducto = {
        producto: producto.id,
        nombre: producto.nombre,
        precio_historico: producto.precio,
        cantidad: cantidad,
      };

      setTotal(total + nuevoProducto.precio_historico);
      setListaProductos([...listaProductos, nuevoProducto]);
    }
  };

  const borrarProductoVenta = (producto) => {
    debugger;
    const newArray = listaProductos.filter((item) => item.producto !== producto.producto);
    if (newArray == 0) {
      setTotal(0);
    } else {
      if(producto.cantidad > 1){
        setTotal(total - (producto.precio_historico * producto.cantidad))
      } else {
        setTotal(total - producto.precio_historico);
      }
    }
    setListaProductos(newArray);
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
          setListaProductos={setListaProductos}
          token={tokenP}
        />
      </div>
    </div>
  );
};

export default Venta;
