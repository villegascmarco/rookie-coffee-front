import React from "react";
import { elastic as Menu } from "react-burger-menu";
import Usuario from "../../Peticiones/api_usuarios";
import { useHistory } from "react-router-dom";

const Sidebar = (props) => {
  const history = useHistory();

  const cerrarSesion = async () => {
    let response = await Usuario.cerrarSesion(props.token);
    props.setToken("");
    localStorage.clear();
  };

  return (
    // Pass on our props
    
    <Menu {...props}>
      {props.usuario ? 
      (
      <h6 className="usuario">
        Bienvenido, {props.usuario}!
      </h6>
      ) : (
      null
      )}
      
      <a className="menu-item" href="/">
        Inicio
      </a>
      

      <a
        className="menu-item"
        style={{
          display:
            props.token && (props.rol == "Usuario")

              ? "block"
              : "none",
        }}
        href="/Venta"
      >
        Venta
      </a>

      <a
        className="menu-item"
        style={{
          display:
            props.token && (props.rol == "Usuario" || props.rol == "Admin")

              ? "block"
              : "none",
        }}
        href="/Productos"
      >
        Producto
      </a>

      <a
        className="menu-item"
        style={{
          display:
            props.token && (props.rol == "Usuario" || props.rol == "Admin")

              ? "block"
              : "none",
        }}
        href="/Ingredientes"
      >
        Ingrediente
      </a>


      <a
        className="menu-item"
        style={{
          display:
            props.token && (props.rol == "Usuario" || props.rol == "Admin")
              ? "block"
              : "none",
        }}
        href="/Ventas"
      >
        Ventas
      </a>

      <a
        className="menu-item"
        style={{
          display: props.token && props.rol == "Admin" ? "block" : "none",
        }}
        href="/Empleados"
      >
        Empleados
      </a>

      <a
        className="menu-item"
        style={{
          display: props.token && props.rol == "Admin" ? "block" : "none",
        }}
        href="/Roles"
      >
        Roles
      </a>

      <a className="menu-item" href="/Conocenos">
        Conocenos
      </a>


      <button
        type="button"
        onClick={() => {
          cerrarSesion();
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

export default Sidebar;
