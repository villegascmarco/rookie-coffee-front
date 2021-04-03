import React, { useState, useEffect } from "react";
import '../estilos/CardDetalle.css'

const CardDetalleP = ({producto, setDisplay}) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [fecha_registro, setFecha_registro] = useState("");
  const [precio, setPrecio] = useState(0);
  const [ingredientes, setIngredientes] = useState([])

  useEffect(() => {
    if (producto.id !== null || producto.id !==undefined) {
      setId(producto.id);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setEstatus(producto.estatus);
      setFecha_registro(producto.fecha_registro);
      setPrecio(producto.precio);
      setIngredientes(producto.ingredientes);
    } else {
      console.log("No hay datos en el producto");
    }
  }, [producto]);

  const eliminarProducto = (id) => {
    // Llamar a la api de eliminar
    setDisplay(false)
  };

  const modificarProducto = () => {
    let producto = {
      id: id,
      nombre: nombre
    };

    console.log(producto)

    setDisplay(false)
  };

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">Detalle</div>
        <div class="card-body ">
          {/*  INICIA INPUT DE CLAVE  */}

          <div className="form-group">
            <label>Clave producto</label>
            <input
              id="id"
              type="number"
              class="form-control "
              placeholder="Clave Producto"
              value={id}
              readOnly
            />
          </div>

          {/*  INICIA INPUT DE NOMBRE  */}

          <div className="form-group">
            <label>Nombre</label>

            <input
              id="nombre"
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

          {/*  INICIA INPUT DE PRECIO  */}

          <div className="form-group">
            <label>Precio</label>

            <input
              type="number"
              onChange={(e) => {
                setPrecio(e.target.value);
              }}
              id="precio"
              class="form-control "
              placeholder="Precio"
              min="0"
              value={precio}
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
              id="descripcion"
              class="form-control "
              placeholder="Descripcion"
              min="0"
              value={descripcion}
            />
          </div>
           {/*  INICIA INPUT DE FECHA REGISTRO  */}
          <div className="form-group">
            <label>Fecha registro</label>
            <input
              type="text"
              onChange={(e) => {
                setFecha_registro(e.target.value);
              }}
              id="fecha_registro"
              class="form-control "
              placeholder="Fecha registro"
              value={fecha_registro}
              readOnly
            />
          </div>
           {/*  INICIA select  DE ESTATUS  */}
          <div className="form-group">
            <label>Estatus</label>
            <select
              name="estatus"
              class="form-control"
              value={estatus}
              onChange={(e) => {
                setEstatus(e.target.value);
              }}
            >
              <option>Elegir...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/*  INICIA select  DE ingredientes  */}
          <div className="row">
            <div class="form-group col-md-6">
              <label>Ingrediente</label>
              <select
                name="unidades"
                className="form-control"
                data-id="ingrediente"
                data-nested="nested"
                onChange={(e) => {
                 
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
               <th></th>
             </thead>
             <tbody>
              {/* INICIA BOTONES 
             {ingredientes.map((item) => (<tr>
              <td>{item.nombre}</td>
              <td>{item.cantidadU}</td>

            </tr>))} */}
               
            

             </tbody>
          </table>
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
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#eliminarModal"
                value="true"
              >
                Eliminar
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
                      eliminarProducto(id);
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
                      modificarProducto();
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

export default CardDetalleP;
