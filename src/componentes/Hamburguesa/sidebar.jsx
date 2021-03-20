import React from "react";
import { elastic as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        Inicio
      </a>

      <a className="menu-item" href="/Venta">
        Venta
      </a>

      <a className="menu-item" href="/Producto">
        Producto
      </a>

      <a className="menu-item" href="/Ingrediente">
        Ingrediente
      </a>

      <a className="menu-item" href="/Empleados">
        Empleados
      </a>
    </Menu>
  );
};
