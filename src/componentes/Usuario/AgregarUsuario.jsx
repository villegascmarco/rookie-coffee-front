import React, { useEffect, useState } from "react";
import Usuario from "../../Peticiones/api_usuarios";
import getRoles from "../../Peticiones/api_roles";

const AgregarUsuario = ({ token, setAgregado }) => {
  //States del usuario
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [rfc, setRfc] = useState("");
  const [nombreAcceso, setNombreAcceso] = useState("");
  const [constraseña, setContraseña] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");

  const [roles, setRoles] = useState([]);

  const agregar = (e) => {
    e.preventDefault();
  };

  const agregarUsuario = async () => {
    let usuario = {
      nombre: nombre,
      apellido_1: apellido1,
      apellido_2: apellido2,
      rfc: rfc,
      nombre_acceso: nombreAcceso,
      contrasena: constraseña,
      estatus: "Activo",
      rol_usuario: rolUsuario,
    };
    // let response = await Usuario.agregarUsuario(usuario, token);
    // setAgregado(true);
  };

  useEffect(() => {
    obtenerRoles(token);
  }, []);

  const obtenerRoles = async (token) => {
    let response = await getRoles.mostrarRoles(token);
    setRoles(response);
  };

  return (
    <div class="modal-dialog">
      <form onSubmit={agregar}>
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar usuario</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div class="form-group col-md-12">
              <label>Nombre</label>

              <input
                id="name"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                type="text"
                name="nombre"
                class="form-control "
                placeholder="Nombre"
              />
            </div>

            <div class="form-group col-md-12">
              <label>Apellido paterno</label>

              <input
                type="text"
                onChange={(e) => {
                  setApellido1(e.target.value);
                }}
                id="apellido1"
                class="form-control "
                placeholder="apellido paterno"
                min="0"
              />
            </div>

            <div class="form-group col-md-12">
              <label>Apellido materno</label>
              <input
                type="text"
                onChange={(e) => {
                  setApellido2(e.target.value);
                }}
                id="apellido2"
                class="form-control "
                placeholder="apellido materno"
                min="0"
              />
            </div>

            <div class="form-group col-md-12">
              <label>RFC</label>

              <input
                type="text"
                onChange={(e) => {
                  setRfc(e.target.value);
                }}
                id="rfc"
                class="form-control "
                placeholder="RFC"
                min="0"
              />
            </div>

            <div class="form-group col-md-12">
              <label>Usuario</label>

              <input
                type="text"
                onChange={(e) => {
                  setNombreAcceso(e.target.value);
                }}
                id="usuario"
                class="form-control "
                placeholder="usuario"
                min="0"
              />
            </div>

            <div class="form-group col-md-12">
              <label>Contraseña</label>

              <input
                type="text"
                onChange={(e) => {
                  setContraseña(e.target.value);
                }}
                id="constraseña"
                class="form-control "
                placeholder="constraseña"
                min="0"
              />
            </div>

            <div class="form-group col-md-6">
              <label>Rol usuario</label>

              <select
                name="RolUsuario"
                class="form-control"
                onChange={(e) => {
                  setRolUsuario(e.target.value);
                }}
              >
                <option>Elegir...</option>
                {roles
                  .filter((item) => item.estatus == "Activo")
                  .map((item) => (
                    <option value={item._id}>{item.nombre}</option>
                  ))}
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-success"
              data-dismiss="modal"
              onClick={() => {
                agregarUsuario();
              }}
            >
              Agregar <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AgregarUsuario;
