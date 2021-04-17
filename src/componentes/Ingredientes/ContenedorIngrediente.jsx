import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Ingredientes from "../../Peticiones/api_ingredientes";
import TituloPagina from "../TituloPagina/TituloPagina.jsx";
import AgregarIngrediente from "../Ingredientes/AgregarIngrediente.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CargaPeticion from "../Carga/CargaPeticion.jsx";

import "../estilos/ContenedorIngrediente.css";

import CardDetalle from "./CardDetalle.jsx";

const ContenedorCards = ({ tokenP, rol }) => {
  const [ingredientes, setIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState({});
  const [display, setDisplay] = useState(false);
  const [bkup, setBkup] = useState([]);
  const [agregado, setAgregado] = useState(false);

  const [state, setState] = useState({
    estado: false,
  });

  const history = useHistory();

  const [cargando, setCargando] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const obtenerIngredientes = async (token) => {
    let response = await Ingredientes.mostrarIngredientes(token).then(
      setCargando(true)
    );
    if (
      response.mensaje === "El token enviado es invalido" ||
      response.mensaje === "El token enviado ha caducado"
    ) {
      setCargando(false);
      history.push(`/Login`);
      localStorage.clear();
      window.location.reload();
    } else {
      setIngredientes(response);
      setBkup(response);
      setCargando(false);
    }
  };

  const seleccionarIngrediente = (ingrediente) => {
    setIngrediente(ingrediente);
  };

  const filtrarElementos = (texto) => {
    texto = texto.toLowerCase();
    let search = ingredientes.filter(
      (ingrediente) =>
        ingrediente.nombre.toLowerCase().includes(texto) ||
        ingrediente.cantidad_disponible.toString().includes(texto) ||
        ingrediente.unidad_medida.toLowerCase().includes(texto)
    );

    if (texto === "") {
      setIngredientes(bkup);
    } else {
      setIngredientes(search);
    }
  };

  useEffect(() => {
    obtenerIngredientes(tokenP);
  }, []);

  useEffect(() => {
    obtenerIngredientes(tokenP);
    setAgregado(false);
  }, [state.estado, display, agregado]);

  return (
    <div className="container mt-5 scroll">
      <TituloPagina titulo="Ingredientes" />
      <div className="row">
        <div className="col-10"></div>
        {rol == "Admin" ? null : (
          <div className="col-2">
            <button
              type="button"
              class="btn btn-success"
              data-toggle="modal"
              data-target="#agregar"
              value="true"
            >
              Agregar
              <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        )}
      </div>

      <br />

      <div className="row">
        <div className={display ? "col-8 tabla_ts" : "col-12 tabla_ts"}>
          <div>
            <div className="card">
              <div className="card-header">Tabla de ingredientes</div>
              {/* SWITCH MOSTRAR INACTIVOS */}

              <div className="row">
                <div className="col-6">
                  <div className="ml-2 mt-3">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.estado}
                          onChange={handleChange}
                          name="estado"
                        />
                      }
                      label="Mostar inactivos"
                      labelPlacement="start"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex flex-row-reverse mr-4">
                    <input
                      type="text"
                      name="busqueda"
                      className="form-control mt-3 col-6"
                      placeholder="Busqueda"
                      onChange={(e) => {
                        filtrarElementos(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive  table_chiquita">
                  <table className="table  card-table  ">
                    <thead className="table_ingredientes">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Unidad</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredientes
                        .filter((item) =>
                          state.estado == true
                            ? item.estatus == "Inactivo"
                            : item.estatus == "Activo"
                        )
                        .map((item) => (
                          <tr
                            key={item.id}
                            className={
                              item.estatus == "Inactivo"
                                ? "text-black-50"
                                : null
                            }
                          >
                            <td>{item.nombre}</td>
                            <td>{item.cantidad_disponible}</td>
                            <td>{item.unidad_medida.toUpperCase()}</td>
                            <td>
                              <button
                                className="btn btn-light"
                                onClick={() => {
                                  seleccionarIngrediente(item);
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
            ingrediente={ingrediente}
            display={display}
            setDisplay={setDisplay}
            token={tokenP}
            rol={rol}
          />
        </div>
      </div>

      <div
        class="modal fade"
        id="agregar"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <AgregarIngrediente token={tokenP} setAgregado={setAgregado} />
      </div>
      <CargaPeticion cargando={cargando} />
    </div>
  );
};
export default ContenedorCards;
