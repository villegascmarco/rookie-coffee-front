import React from "react";
import { elastic as Menu } from "react-burger-menu";
import Usuario from '../../Peticiones/api_usuarios'
import { Link } from "react-router-dom";

export default (props) => {
  
  const cerrarSesion = async() => {
    let response = await Usuario.cerrarSesion(props.token)
    props.setToken("")
    localStorage.clear()
  }




  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        Inicio
      </a>

      <a className="menu-item" style={{ display: props.token ? "block" : "none" }} href="/Venta">
        Venta
      </a>

      <a className="menu-item" style={{ display: props.token ? "block" : "none" }} href="/Productos">
        Producto
      </a>

      <a className="menu-item" style={{ display: props.token ? "block" : "none" }} href="/Ingredientes">
        Ingrediente
      </a>

      <a className="menu-item" style={{ display: props.token ? "block" : "none" }} href="/Empleados">
        Empleados
      </a>
      <button
        type="button"
        onClick={() => {
          cerrarSesion()
        }}
        className="btn btn-danger"
        style={{ display: props.token ? "block" : "none" }}
      >
        Cerrar sesión
        <i class="fa fa-sign-out ml-2"></i>
      </button>
    </Menu>
  );
};
