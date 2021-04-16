import React, { useState, useEffect } from "react";
import ingredientes from "../../Peticiones/api_ingredientes";
import "../estilos/CardDetalle.css";

const CardDetalle = ({ ingrediente, setDisplay, token }) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [unidad, setUnidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState("");

  useEffect(() => {
    if (ingrediente._id != null || ingrediente._id != undefined) {
      setId(ingrediente._id);
      setNombre(ingrediente.nombre);
      setCantidad(ingrediente.cantidad_disponible);
      setUnidad(ingrediente.unidad_medida);
      setEstatus(ingrediente.estatus);
      setDescripcion(ingrediente.descripcion);
    } else {
      console.log("No hay datos en el ingrediente");
    }
  }, [ingrediente]);

  const eliminarIngrediente = async () => {
    let ingre = {
      id: id,
    };
    let response = await ingredientes.eliminarIngrediente(ingre, token);
    setDisplay(false);
  };

  const modificarIngrediente = async () => {
    let ingre = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      cantidad_disponible: cantidad,
      unidad_medida: unidad,
      usuario: 1,
      fecha_registro: "",
    };
    let response = await ingredientes.modificarIngrediente(ingre, token);
    setDisplay(false);
  };




const activarIngrediente = async (id) => {
  let response = await ingredientes.activarIngrediente(id, token);
  setDisplay(false);
};

 

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">
          Detalle
          <button class="close" onClick={() => setDisplay(false)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="card-body ">
          {/*  INICIA INPUT DE CLAVE  */}

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

          <div className="form-group ">
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

          {/*  INICIA INPUT DE CANTIDAD  */}

          <div className="form-group col-11">
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

          <div className="form-group col-11">
            <label>Unidad</label>
            <select
              name="estado"
              class="form-control"
              value={unidad}
              onChange={(e) => {
                setUnidad(e.target.value);
              }}
            >
              <option value="g">Gramos</option>
              <option value="kg">Kilogramos</option>
              <option value="l">Litros</option>
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
                      eliminarIngrediente();
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
                      activarIngrediente(id);
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
