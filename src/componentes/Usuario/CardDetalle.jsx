import React, { useState, useEffect } from "react";
import Usuario from "../../Peticiones/api_usuarios";
import "../estilos/CardDetalle.css";
import getRoles from "../../Peticiones/api_roles";

const CardDetalle = ({ usuario, setDisplay, token }) => {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [rfc, setRfc] = useState("");
  const [nombreAcceso, setNombreAcceso] = useState("");
  const [constraseña, setContraseña] = useState("");
  const [estatus, setEstatus] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    debugger
    if (usuario._id != null || usuario._id != undefined) {
      setId(usuario._id);
      setNombre(usuario.nombre);
      setApellido1(usuario.apellido_1);
      setApellido2(usuario.apellido_2);
      setRfc(usuario.rfc);
      setNombreAcceso(usuario.nombre_acceso);
      setContraseña(usuario.contrasena);
      setEstatus(usuario.estatus);
      setRolUsuario(usuario.rol_usuario);
    } else {
      console.log("No hay datos en el usuario");
    }
  }, [usuario]);

  useEffect(() => {
    obtenerRoles(token);
  }, []);

  const obtenerRoles = async (token) => {
    let response = await getRoles.mostrarRoles(token);
    setRoles(response);
  };

  const desactivarUsuario = async (id) => {
    let response = await Usuario.eliminarUsuario(id, token);
    setDisplay(false);
  };

  const activarUsuario = async (id) => {
    let response = await Usuario.activarUsuario(id, token);
    setDisplay(false);
  };

  const modificarUsuario = async () => {
    debugger;
    let usuario = {
      id: id,
      nombre: nombre,
      apellido_1: apellido1,
      apellido_2: apellido2,
      rfc: rfc,
      nombre_acceso: nombreAcceso,
      rol_usuario: rolUsuario,
    };

    let response = await Usuario.modificarUsuario(usuario, token);
    setDisplay(false);
  };

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">Detalle</div>
        <div class="card-body ">
          {/*  INICIA INPUT DE ID  */}

          <div className="form-group">
            <label>ID Usuario</label>
            <input
              id="clave"
              type="number"
              class="form-control "
              placeholder="Clave Ingrediente"
              value={id}
              readOnly
            />
          </div>

          {/*  INICIA INPUT DE NOMBRE  */}

          <div className="form-group">
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
              value={nombre}
            />
          </div>

          {/*  INICIA INPUT DE APELLIDO_1  */}

          <div className="form-group">
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
              value={apellido1}
            />
          </div>

          {/*  INICIA INPUT DE APELLIDO_2  */}

          <div className="form-group">
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
              value={apellido2}
            />
          </div>

          {/*  INICIA INPUT DE APELLIDO_2  */}

          <div className="form-group">
            <label>RFC</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                setRfc(e.target.value);
              }}
              id="rfc"
              class="form-control "
              placeholder="RFC"
              min="0"
              value={rfc}
            />
          </div>

          {/*  INICIA INPUT DE NOMBRE ACCESO  */}

          <div className="form-group">
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
              value={nombreAcceso}
            />
          </div>

          {/*  INICIA INPUT DE ROL USUARIO  */}

          <div className="form-group">
            <label>Tipo usuario</label>

            <select
              name="estado"
              class="form-control"
              value={rolUsuario}
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

          {/* INICIA BOTONES  */}

          <div className="row text-center">
            <div className="col-md-6 col-sm-12">
              <button
                data-toggle="modal"
                data-target="#modificarModal"
                className="btn btn-warning text-light"
              >
                Modificar
                <i class="fa fa-edit ml-2"></i>
              </button>
            </div>
            <div className="col-md-6 col-sm-12">
              <button
                className={
                  estatus == "Activo" ? "btn btn-danger" : "btn btn-success"
                }
                data-toggle="modal"
                data-target={
                  estatus == "Activo" ? "#eliminarModal" : "#activarModal"
                }
                value="true"
              >
                {estatus == "Activo" ? "Desactivar" : "Activar"}
                {estatus == "Activo" ? (
                  <i class="fa fa-minus-circle ml-2"></i>
                ) : (
                  <i class="fa fa-check-circle ml-2"></i>
                )}
              </button>
            </div>
          </div>

          {/* INICIAN MODALS  */}
          <div
            class="modal fade"
            id="eliminarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la desactivación?</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
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
                    type="button"
                    onClick={() => {
                      desactivarUsuario(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Desactivar
                    <i class="fa fa-minus-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="activarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la Activacion?</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
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
                    type="button"
                    onClick={() => {
                      activarUsuario(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Activar
                    <i class="fa fa-check-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INICIA MODAL MODIFICAR */}

          <div
            class="modal fade"
            id="modificarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la modificación?</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
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
                    type="button"
                    data-dismiss="modal"
                    onClick={() => {
                      modificarUsuario();
                    }}
                    class="btn btn-warning"
                  >
                    Modificar
                    <i class="fa fa-edit ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CardDetalle;
