import React, { useState, useEffect } from "react";
import getVentas from "../../Peticiones/api_ventas";
import "../estilos/CardDetalle.css";

const CardDetalleP = ({ token, venta, setDisplay, rol }) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [estatus, setEstatus] = useState("");
  const [fecha, setFecha] = useState("");
  const [totalVenta, setTotalVenta] = useState(0);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (venta.id !== null || venta.id !== undefined) {
      let date = new Date(venta.fecha);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }
      setId(venta._id);
      setFecha(dt + "-" + month + "-" + year);
      setTotalVenta(venta.total_venta);
      setEstatus(venta.estatus);
      setUsuario(venta.usuario);
      setDetalleVenta(venta.detalle_venta);
    } else {
      console.log("No hay datos en la venta");
    }
  }, [venta]);

  const eliminarVenta = async () => {
    debugger;
    let response = await getVentas
      .eliminarVenta(venta, token)
      .then(setCargando(true));
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
          {/*  INICIA INPUT DE USUARIO  */}

          <div className="form-group">
            <label>Usuario</label>
            <h5>{usuario}</h5>
          </div>

          {/*  INICIA INPUT DE FECHA  */}

          <div className="form-group">
            <label>Fecha</label>
            <h5>{fecha}</h5>
          </div>

          {/*  INICIA INPUT DE TOTAL  */}
          <div className="form-group">
            <label>Total de la venta</label>

            <h5>${totalVenta} MXN</h5>
          </div>

          <br />
          <div className="table-responsive">
            <table className="table">
              <thead className="table_ingredientes">
                <th>Nombre</th>
                <th>Num. comprados</th>
              </thead>
              <tbody>
                {detalleVenta ? (
                  detalleVenta.map((item) => (
                    <tr>
                      <td>{item.producto_nombre}</td>
                      <td>{item.cantidad}</td>
                    </tr>
                  ))
                ) : (
                  <span></span>
                )}
              </tbody>
            </table>
          </div>

          {/* INICIA BOTONES  */}

          {rol === "Usuario" ? null : (
            <div className="row text-center">
              <div className="col-md-12 col-sm-12">
                <button
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target="#eliminarModal"
                  value="true"
                >
                  Desactivar
                  <i class="fa fa-minus-circle ml-2"></i>
                </button>
              </div>
            </div>
          )}

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
                      eliminarVenta(id);
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
                      eliminarVenta();
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
