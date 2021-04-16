import React, { useState } from "react";
import ingredientes from "../../Peticiones/api_ingredientes";

const AgregarIngrediente = ({token, setAgregado}) => {

  //States del ingrediente
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [unidad, setUnidad] = useState("")
  const [descripcion, setDescripcion] = useState("")
  


  const agregarIngrediente = async() => {
      let ingre = {
          nombre:nombre,
          descripcion: descripcion,
          cantidad_disponible: cantidad,
          unidad_medida: unidad,
          usuario: 1,
          fecha_registro: ""
      };
      let response = await ingredientes.agregarIngrediente(ingre, token);
      

      setAgregado(true);
      
  };

 

  return (
    <div class="modal-dialog"> 
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
            <div class="form-group col-md-10">
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
                <option value="kg">Kilogramos</option>
                <option value="l">Litros</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button
            id="btnCerrar"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-success" onClick={() => {
                      agregarIngrediente();
                    }}  data-dismiss="modal">
              Agregar <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        </div>
    </div>
  );
};
export default AgregarIngrediente;
