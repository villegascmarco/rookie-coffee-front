import React, { useState } from "react";
import getVentas from "../../Peticiones/api_ventas";
import { useHistory } from "react-router-dom";
import CargaPeticion from "../Carga/CargaPeticion.jsx";

const PreVenta = ({
  listaProductos,
  borrar,
  total,
  setListaProductos,
  setTotal,
  token,
}) => {
  const [cargando, setCargando] = useState(false);

  const [ticket, setTicket] = useState(null);

  const history = useHistory();

  const terminarVenta = async () => {
    let venta = {
      total: String(total),
      detalles: listaProductos,
    };
    console.log(venta);
    let response = await getVentas
      .agregarVenta(venta, token)
      .then(setCargando(true));
    if (response.mensaje === "El token enviado es invalido") {
      setCargando(false);
      history.push(`/Login`);
      localStorage.clear();
      window.location.reload();
    } else {
      setListaProductos([]);
      setTotal(0);
      setCargando(false);
      setTicket(response.contenido);
    }
    // window.location.reload();
  };

  const printDiv = () => {
    var divToPrint = document.getElementById("ticketVenta");

    var newWin = window.open("", "Print-Window");

    newWin.document.open();

    newWin.document.write(
      '<body onload="window.print()">' + divToPrint.innerHTML + "</body>"
    );

    newWin.document.close();

    setTimeout(function () {
      newWin.close();
    }, 10);
  };

  return (
    <div className="card card_ts">
      <div className="card-header">Detalle</div>
      <div class="card-body ">
        <div className="table-responsive">
          <table className="table">
            <thead className="table_ingredientes">
              <th>Nombre</th>
              <th>cantidad</th>
              <th>total</th>
              <th></th>
            </thead>
            <tbody>
              {listaProductos.map((item) => (
                <tr>
                  <td>{item.nombre}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio_historico}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        borrar(item);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total ? (
          <div>
            <div className="row text-center">
              <div className="col-md-12 mb-3 mt-5">
                <h5>Total: ${total} MXN</h5>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-12">
                <button
                  data-toggle="modal"
                  data-target="#ventaModal"
                  className="btn btn-success text-light"
                >
                  Terminar venta
                  <i class="fa fa-money ml-3"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <span></span>
        )}

        {/* INICIA MODAL VENTA */}

        <div
          class="modal fade"
          id="ventaModal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4> ¿Desea confirmar la venta?</h4>
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
                    terminarVenta();
                  }}
                  data-toggle="modal"
                  data-target="#ticketVenta"
                  class="btn btn-success"
                >
                  Confirmar
                  <i class="fa fa-check ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="ticketVenta"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h3>Ticket de compra</h3>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                ¡Gracias por tu compra! ☕
                <div className="table-responsive mb-5 mt-5">
                  <table className="table">
                    <thead>
                      <th>Producto</th>
                      <th>total</th>
                    </thead>
                    <tbody>
                      {ticket == null ? (
                        <span></span>
                      ) : (
                        ticket.detalle_venta.map((item) => (
                          <tr>
                            <td>{item.producto_nombre}</td>
                            <td>
                              ${item.cantidad * item.precio_historico} MXN
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {ticket == null ? (
                  <span></span>
                ) : (
                  <div>
                    <strong>TOTAL: </strong>
                    ${ticket.total_venta} MXN
                    <br />
                    <strong>FECHA: </strong> {ticket.fecha} <br />
                    <strong>VENTA REALIZADA POR: </strong> {ticket.usuario}
                  </div>
                )}
              </div>
              <div class="modal-footer">
              <button
                  type="button"
                  class="btn btn-info"
                  data-dismiss="modal"
                  onClick={printDiv}
                >
                 <i class="fa fa-print"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setTicket(null)}
                >
                  Continuar
                </button>
                
              </div>
                
            </div>
          </div>
        </div>
      </div>{" "}
      <CargaPeticion cargando={cargando} />
    </div>
  );
};

export default PreVenta;
