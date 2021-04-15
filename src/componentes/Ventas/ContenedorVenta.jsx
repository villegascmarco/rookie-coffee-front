import React, { useState, useEffect } from "react";
import ventasData from "../../sample/venta.json";
import TituloPagina from "../TituloPagina/TituloPagina.jsx";
import CardDetalle from "./CardDetalle.jsx";
import "../estilos/ContenedorIngrediente.css";
import getVentas from "../../Peticiones/api_ventas";
import CargaPeticion from "../Carga/CargaPeticion.jsx";
import { useHistory } from "react-router-dom";

const ContenedorVenta = ({ tokenP, rol }) => {
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({});
  const [display, setDisplay] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [srchVentas, setSrchVentas] = useState("general");
  const [fechaIni, setFechaIni] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const history = useHistory();

  const obtenerVentas = async (token) => {
    
    let response;
    if (fechaIni && srchVentas === "especifico") {
      response = await getVentas
        .mostrarVentas(token, "especifico", fechaIni, fechaFin)
        .then(setCargando(true));
    } else {

      if (srchVentas === "especifico" && fechaIni == "") {
        response = await getVentas
          .mostrarVentas(token, "general")
          .then(setCargando(true));

      }  else {
        response = await getVentas
        .mostrarVentas(token, srchVentas)
        .then(setCargando(true));
        setFechaIni("")
        setFechaFin("")
      }
    }
    if (
      response.mensaje === "El token enviado es invalido" ||
      response.mensaje === "El token enviado ha caducado"
    ) {
      setCargando(false);
      history.push(`/Login`);
      localStorage.clear();
      window.location.reload();
    } else {
      setCargando(false);
      setVentas(response.contenido);
    }
  };

  const seleccionarVenta = (venta) => {
    debugger;
    setVenta(venta);
  };

  useEffect(() => {
    obtenerVentas(tokenP);
  }, [display, srchVentas, fechaFin]);

  return (
    <div className="container mt-5 scroll">
      <TituloPagina titulo="Ventas realizadas" />

      <div className="row">
        <div className="col-6">
          <label>Filtrar por:</label>

          <select
            name="ventas-busqueda"
            className="form-control col-3"
            value={srchVentas}
            onChange={(e) => {
              setSrchVentas(e.target.value);
            }}
          >
            <option value="general">Todas</option>
            <option value="dia">Día</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="especifico">Fecha especifica</option>
          </select>
        </div>
        {srchVentas === "especifico" ? (
          <div className="col-6 mt-2">
            <br />
            <label className="mr-2">Consultar de:</label>
            <input
              type="date"
              name=""
              className="mr-1"
              onChange={(e) => {
                setFechaIni(e.target.value);
              }}
              id="fechaIn"
            />
            a
            <input
              type="date"
              name=""
              className="ml-1"
              onChange={(e) => {
                setFechaFin(e.target.value);
              }}
              id="fechaFin"
            />
          </div>
        ) : null}
      </div>
      <br />

      <div className="row">
        <div className={display ? "col-8 tabla_ts" : "col-12 tabla_ts"}>
          <div>
            <div className="card">
              <div className="card-header">Tabla de Ventas</div>
              <div class="card-body">
                <div class="table-responsive table_chiquita">
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
                      {ventas
                        .filter((item) => item.estatus === "Activo")
                        .map((item) => (
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
            token={tokenP}
            rol = {rol}
          />
        </div>
      </div>
      <CargaPeticion cargando={cargando} />
    </div>
  );
};
export default ContenedorVenta;
