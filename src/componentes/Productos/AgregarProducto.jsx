import React, { useEffect, useState } from "react";

const AgregarProducto = () => {

  //States del ingrediente
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [ingrediente, setIngrediente] = useState([]);
  

  const agregar = (e) => {
    e.preventDefault();
  };

  const agrearProducto = (e) => {
      let producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        fecha_registro: ""
      }
      console.log(producto)
  };

  return (
    <div class="modal-dialog">
      <form onSubmit={agregar}>
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar Producto</h4>
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
            <div className="row">
            <div class="form-group col-md-12">
              <label>Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                class="form-control "
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            </div>
            <div className="row">
            <div class="form-group col-md-12">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                class="form-control "
                onChange={(e) => {
                  setPrecio(e.target.value)
                }}
                min="0"
              />
            </div>
            </div>
            <div className="row">
            <div class="form-group col-md-12">
              <label>Pequeña descripción del nuevo producto</label>
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
            </div>
            <div className="row">
            <div class="form-group col-md-6">
              <label>Ingrediente</label>
              <select
                name="unidades"
                className="form-control"
                data-id="ingrediente"
                data-nested="nested"
                onChange={(e) => {
                  setIngrediente(e.target.value);
                }}
              >
                <option selected>Elegir...</option>
                <option value="g">Crema</option>
              </select>
              
            </div>
            </div>
            
            <label >Cantidad</label>
            <div class="form-inline">
            <input
                type="number"
                name="cantidad"
                className="form-control  mr-sm-2"
                onChange={(e) => {
                  setCantidad(e.target.value)
                }}
                min="0"
              />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i class="fa fa-plus"></i></button>
           </div>
            <br />
           <div className="table-responsive">
           <table className="table">
             <thead className="table_ingredientes">
               <th>Nombre</th>
               <th>Cant. Uso</th>
             </thead>
             <tbody>
               <td></td>

             </tbody>
          </table>
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
            <button type="submit" className="btn btn-success" onClick={() => {
                      agrearProducto();
                    }}>
              Agregar <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AgregarProducto;
