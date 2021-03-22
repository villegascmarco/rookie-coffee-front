import React, { useState, useEffect } from "react";
import ingredientesData from "../../sample/ingredientes.json";
import TituloPagina from '../TituloPagina/TituloPagina.jsx'
import '../estilos/ContenedorIngrediente.css'

import CardDetalle from "./CardDetalle.jsx";

const ContenedorCards = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState({});
  const [display, setDisplay] = useState(false);

  const obtenerIngredientes = () => {
    setIngredientes(ingredientesData);
  };

  const seleccionarIngrediente = (ingrediente) => {
    setIngrediente(ingrediente);
  };

  useEffect(() => {
    obtenerIngredientes();
  }, []);

  return (

    <div className="container mt-5 scroll">
      <TituloPagina titulo="Ingredientes" />
      <div className="row">
        <div className={display ? "col-8" : "col-12"}>
          <div>
            <div className="card">
              <div className="card-header">Tabla de ingredientes</div>
              <div class="card-body">
                <div class="table-responsive">
                  <table className="table  card-table ">
                    <thead className="table_ingredientes">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Unidad</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredientes.map((item) => (
                        <tr key={item.id}>
                          <td>{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>{item.unidad}</td>
                          <td>
                            <button
                              className="btn btn-light"
                              onClick={() => {
                                seleccionarIngrediente(item);
                                setDisplay(true);
                              }}
                            >
                              Detalle
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
          <CardDetalle ingrediente={ingrediente} />
        </div>
      </div>
    </div>
  );
};
export default ContenedorCards;
