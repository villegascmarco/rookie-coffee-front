import React, { useEffect, useState } from "react";

const AgregarIngrediente = () => {

  //States del ingrediente
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [unidad, setUnidad] = useState("")
  const [descripcion, setDescripcion] = useState("")
  

  const agregar = (e) => {
    e.preventDefault();
  };

  const agregarIngrediente = (e) => {
      let ingrediente = {
        nombre: nombre,
        cantidad: cantidad,
        unidad_medida: unidad,
        descripcion: descripcion,
        fecha_registro: ""
      }
      console.log(ingrediente)
  };

  return (
    <div class="modal-dialog">
      <form onSubmit={agregar}>
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar Ingrediente</h4>
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
              <label>Nombre del ingrediente</label>
              <input
                type="text"
                name="nombre"
                class="form-control "
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div class="form-group col-md-12">
              <label>Cantidad a agregar</label>
              <input
                type="number"
                name="cantidad"
                class="form-control "
                onChange={(e) => {
                  setCantidad(e.target.value)
                }}
                min="0"
              />
            </div>

            <div class="form-group col-md-12">
              <label>Descripción del ingrediente</label>
              <input
                type="text"
                name="descripcion"
                class="form-control "
                onChange={(e) => {
                  setDescripcion(e.target.value)
                }}
                min="0"
              />
            </div>

            <div class="form-group col-md-6">
              <label>Unidad</label>
              <select
                name="unidades"
                class="form-control"
                data-id="ingrediente"
                data-nested="nested"
                onChange={(e) => {
                  setUnidad(e.target.value);
                }}
              >
                <option selected>Elegir...</option>
                <option value="g">Gramos</option>
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
            <button type="submit" class="btn btn-success" onClick={() => {
                      agregarIngrediente();
                    }}>
              Agregar <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AgregarIngrediente;
