import React, { useState, useEffect } from "react";
import Rol from "../../Peticiones/api_roles";
import "../estilos/CardDetalle.css";

const CardDetalle = ({ rol, setDisplay, token }) => {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState("");


  useEffect(() => {
    if (rol._id != null || rol._id != undefined) {
      setId(rol._id);
      setNombre(rol.nombre);
      setDescripcion(rol.descripcion);
      setEstatus(rol.estatus);
      
    } else {
      console.log("No hay datos en el rol");
    }
  }, [rol]);

  const eliminarRol = async (id) => {
    let response = await Rol.eliminarRol(id, token);
    setDisplay(false);
  };

  const activarRol = async (id) => {
    let response = await Rol.activarRol(id, token);
    setDisplay(false);
  };

  const modificarRol = async() => {
    debugger
    let rol = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      estatus: estatus,

    };

    let response = await Rol.modificarRol(rol, token)
    setDisplay(false);
  };

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">Detalle</div>
        <div class="card-body ">
          {/*  INICIA INPUT DE ID  */}

          <div className="form-group">
            <label>ID ROL</label>
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

          {/*  INICIA INPUT DE DESCRIPCION  */}

          <div className="form-group">
            <label>Descripcion</label>

            <input
              type="text"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              id="apellido1"
              class="form-control "
              placeholder="descripcion"
              min="0"
              value={descripcion}
            />
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
                className={estatus == "Activo" ? "btn btn-danger" : "btn btn-success"}
                data-toggle="modal"
                data-target={
                  estatus == "Activo" ? "#eliminarModal" : "#activarModal"
                }
                value="true"
              >
                {estatus == "Activo" ? "Eliminar" : "Activar"}
                <i class="fa fa-minus-circle ml-2"></i>
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
                  <h4> ¿Desea confirmar la eliminación?</h4>
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
                      eliminarRol(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Eliminar
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
                      activarRol(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Activar
                    <i class="fa fa-minus-circle ml-2"></i>
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
                      modificarRol();
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
