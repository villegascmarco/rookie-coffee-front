import React, { useState, useEffect } from "react";
import getUsuarios from "../../Peticiones/api_usuarios";
import TituloPagina from "../TituloPagina/TituloPagina.jsx";
import AgregarUsuario from "./AgregarUsuario.jsx";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../estilos/ContenedorUsuario.css";

import CardDetalle from "./CardDetalle.jsx";

const ContenedorCardsUsuario = ({ tokenP }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [display, setDisplay] = useState(false);
  const [agregado, setAgregado] = useState(false);

  
  const [state, setState] = useState({
    estado: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const obtenerUsuarios = async (token) => {
    let response = await getUsuarios.mostrarUsuarios(token);
    setUsuarios(response);
  };

  const filtrarElementos = (texto) => {
    texto = texto.toLowerCase();
    let search = usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.apellido_1.toLowerCase().includes(texto) ||
        usuario.nombre_acceso.toLowerCase().includes(texto)
    );

    if (texto == "") {
      obtenerUsuarios(tokenP);
    } else {
      setUsuarios(search);
    }
  };

  const seleccionarUsuario = (usuario) => {
    setUsuario(usuario);
  };

  useEffect(() => {
    obtenerUsuarios(tokenP);
    setAgregado(false)
  }, [state.estado, display, agregado]);

  return (
    <div className="container mt-5 scroll">
      <TituloPagina titulo="Empleados" />

      {/* BOTON DE AGREGAR */}
      <div className="row">
        <div className="col-10"></div>
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
      </div>

      <br />

      <div className="row">
        <div className={display ? "col-8 tabla_ts" : "col-12 tabla_ts"}>
          <div>
            <div className="card">
              <div className="card-header">Tabla de usuarios</div>
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
                <div class="table-responsive">
                  <table className="table  card-table ">
                    <thead className="table_usuario">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Estado</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios
                        .filter((item) =>
                          state.estado == true
                            ? item.estatus == "Inactivo"
                            : item.estatus == "Activo"
                        )
                        .map((item) => (
                          <tr
                            key={item.id}
                            className={
                              item.estatus == "Inactivo" ? "text-black-50" : null
                            }
                          >
                            <td>{item.nombre}</td>
                            <td>{`${item.apellido_1} ${item.apellido_2} `}</td>
                            <td>{item.nombre_acceso}</td>
                            <td>{item.estatus}</td>
                            <td>
                              <button
                                className="btn btn-light"
                                onClick={() => {
                                  seleccionarUsuario(item);
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
            token={tokenP}
            usuario={usuario}
            display={display}
            setDisplay={setDisplay}
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
        <AgregarUsuario 
          token={tokenP} 
          setAgregado={setAgregado}
        />
      </div>
    </div>
  );
};
export default ContenedorCardsUsuario;
