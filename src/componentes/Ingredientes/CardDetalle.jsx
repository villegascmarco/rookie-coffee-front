import React, { useState, useEffect } from "react";

const CardDetalle = (props) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    if (props.ingrediente.id != null || props.ingrediente.id != undefined) {
      setId(props.ingrediente.id);
      setNombre(props.ingrediente.nombre);
      setCantidad(props.ingrediente.cantidad);
    } else {
      console.log("No hay datos en el ingrediente");
    }
  }, [props]);

  const eliminarIngrediente = (id) => {
    // Llamar a la api de eliminar
    window.location.reload();
  };

  const modificarIngrediente = () => {
    let ingrediente = {
      id: id,
      nombre: nombre,
      cantidad: cantidad,
    };

    window.location.reload();
  };

  return (
    <div>
      <div className="card">
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

          {/* INICIA BOTONES  */}

          <div className="row text-center">
            <div className="col-md-6 col-sm-12">
              <button
                data-toggle="modal"
                data-target="#modificarModal"
                className="btn btn-success"
              >
                Modificar
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
                    class="btn btn-primary"
                  >
                    Eliminar
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
                    class="btn btn-primary"
                  >
                    Modificar
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
