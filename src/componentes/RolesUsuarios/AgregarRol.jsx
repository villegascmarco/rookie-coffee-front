import React, { useEffect, useState } from "react";
import Rol from "../../Peticiones/api_roles";

const AgregarRol = ({ token, setAgregado }) => {
  //States del rols
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregar = (e) => {
    e.preventDefault();
  };

  const agregarRol = async () => {
    let rol = {
      nombre: nombre,
      descripcion: descripcion,
    };
    let response = await Rol.agregarRol(rol, token);
    setAgregado(true);
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
              <label>Descripción</label>

              <input
                type="text"
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                id="apellido1"
                class="form-control "
                placeholder="descripción"
                min="0"
              />
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
                agregarRol();
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
export default AgregarRol;
