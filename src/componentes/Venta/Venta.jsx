import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CardProducto from "./CardProducto.jsx";
import "animate.css/animate.min.css";
import Productos from "../../Peticiones/api_productos";
import ScrollAnimation from "react-animate-on-scroll";
import PreVenta from "./PreVenta.jsx";

import "../estilos/Venta.css";

const Venta = ({ tokenP }) => {
  const [productos, setProductos] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const history = useHistory();

  const agregarProductoVenta = (producto) => {
    let cantidad = 1;

    let valProducto = listaProductos.filter(
      (item) => item.nombre == producto.nombre
    );
    if (valProducto != "") {
      cantidad = valProducto[0].cantidad + 1;
      const nuevoProducto = {
        producto: producto._id,
        nombre: producto.nombre,
        precio_historico: producto.precio,
        cantidad: cantidad,
      };

      const newArrary = listaProductos.filter(
        (item) => item.nombre !== producto.nombre
      );
      setTotal(total + nuevoProducto.precio_historico);
      setListaProductos([...newArrary, nuevoProducto]);
    } else {
      const nuevoProducto = {
        producto: producto._id,
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
    const newArray = listaProductos.filter(
      (item) => item.producto !== producto.producto
    );
    if (newArray == 0) {
      setTotal(0);
    } else {
      if (producto.cantidad > 1) {
        setTotal(total - producto.precio_historico * producto.cantidad);
      } else {
        setTotal(total - producto.precio_historico);
      }
    }
    setListaProductos(newArray);
  };

  const obtenerProductos = async (token) => {
    let response = await Productos.mostrarProductos(token);
    if (response.mensaje === "El token enviado es invalido" || response.mensaje === "El token enviado ha caducado") {
      history.push(`/Login`);
      localStorage.clear();
      window.location.reload();
    } else {
      setProductos(response);
    }
  };

  const filtrarElementos = (texto) => {
    texto = texto.toLowerCase();
    let search = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.precio.toString().includes(texto) ||
        producto.fecha_registro.toString().includes(texto)
    );

    if (texto == "") {
      obtenerProductos(tokenP)
    } else {
      setProductos(search);
    }
  };

  useEffect(() => {
    obtenerProductos(tokenP);
  }, []);

  return (
    <div className="container text-center mt-5 scroll">
      <p className="seccion">Panel de</p>
      <h1 className="titulo_seccion">Venta</h1>
      <div className="col-6">
        <div className="d-flex flex-row-reverse mr-4">
          <input
            type="text"
            name="busqueda"
            className="form-control mt-3 col-9"
            placeholder="Busqueda"
            onChange={(e) => {
              filtrarElementos(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="todo_container">
        <div className="productos_container">
          {productos.filter((producto)=> producto.estatus == "Activo").map((producto) => (
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
