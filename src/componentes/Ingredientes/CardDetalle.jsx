import React, { useState, useEffect } from "react";
import '../estilos/CardDetalle.css'

const CardDetalle = ({ingrediente, setDisplay}) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [estatus, setEstatus] = useState("");

  useEffect(() => {
    if (ingrediente.id != null || ingrediente.id != undefined) {
      setId(ingrediente.id);
      setNombre(ingrediente.nombre);
      setCantidad(ingrediente.cantidad);
      setEstatus(ingrediente.estatus)
    } else {
      console.log("No hay datos en el ingrediente");
    }
  }, [ingrediente]);

  const eliminarIngrediente = (id) => {
    // Llamar a la api de eliminar
    setDisplay(false)
  };

  const modificarIngrediente = () => {
    let ingrediente = {
      id: id,
      nombre: nombre,
      cantidad: cantidad,
    };

    console.log(ingrediente)

    setDisplay(false)
  };

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">Detalle</div>
        <div class="card-body ">
          {/*  INICIA INPUT DE CLAVE  */}

          <div className="form-group">
            <label>Clave Ingrediente</label>
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

          {/*  INICIA INPUT DE CANTIDAD  */}

          <div className="form-group">
            <label>Cantidad</label>

            <input
              type="number"
              onChange={(e) => {
                setCantidad(e.target.value);
              }}
              id="cantidad"
              class="form-control "
              placeholder="Cantidad"
              min="0"
              value={cantidad}
            />
          </div>

                    {/*  INICIA INPUT DE ESTATUS  */}

                    <div className="form-group">
            <label>Estado</label>

            <select
              name="estado"
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
                      eliminarIngrediente(id);
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
                      modificarIngrediente();
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
