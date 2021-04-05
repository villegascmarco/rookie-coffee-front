import React, { useState, useEffect } from "react";
import ventasData from "../../sample/venta.json";
import TituloPagina from "../TituloPagina/TituloPagina.jsx";
import CardDetalle from "./CardDetalle.jsx";
import "../estilos/ContenedorIngrediente.css";
import getVentas from '../../Peticiones/api_ventas'
import CargaPeticion from '../Carga/CargaPeticion.jsx'
import { useHistory } from "react-router-dom";

const ContenedorVenta = ({tokenP}) => {
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({});
  const [display, setDisplay] = useState(false);
  const [productoBackup, setProductoBackup] = useState([]);
  const [cargando, setCargando] = useState(false);

  const history = useHistory();

  const obtenerVentas = async (token) => {
    debugger
    let response = await getVentas.mostrarVentas(token).then(setCargando(true));
    if (response.mensaje === "El token enviado es invalido") {
      setCargando(false);
      history.push(`/Login`);
      localStorage.clear();
      window.location.reload();
    } else {
      setCargando(false);
      setVentas(response);
    }
  };
  const seleccionarVenta = (venta) => {
    setVenta(venta);
  };

  useEffect(() => {
    obtenerVentas(tokenP);
  }, [display]);

  return (
    <div className="container mt-5 scroll">
      <TituloPagina titulo="Ventas realizadas" />

      <div className="row">
        <div className="col-5">{/* INPUT DE BUSQUEDA */}</div>
        <div className="col-5"></div>
      </div>
      <br />

      <div className="row">
        <div className={display ? "col-8 tabla_ts" : "col-12 tabla_ts"}>
          <div>
            <div className="card">
              <div className="card-header">Tabla de Ventas</div>
              <div class="card-body">
                <div class="table-responsive">
                  <table className="table  card-table ">
                    <thead className="table_ingredientes">
                      <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Cant. Productos</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.map((item) => (
                        <tr key={item._id}>
                          <td>{item.usuario}</td>
                          <td>{item.fecha}</td>
                          <td>{item.detalle_venta.length}</td>
                          <td>${item.total_venta} MXN</td>
                          <td>
                            <button
                              className="btn btn-light"
                              onClick={() => {
                                seleccionarVenta(item);
                                setDisplay(true);
                              }}
                            >
                              Detalle
                              <i class="fa fa-eye ml-2"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 " style={{ display: display ? "block" : "none" }}>
          <CardDetalle
            venta={venta}
            display={display}
            setDisplay={setDisplay}
          />
        </div>
      </div>
      <CargaPeticion cargando={cargando} />
    </div>
  );
};
export default ContenedorVenta;
