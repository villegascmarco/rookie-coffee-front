import React, { useState, useEffect } from "react";
import ingredientesData from "../../sample/ingredientes.json";
import TituloPagina from '../TituloPagina/TituloPagina.jsx'
import AgregarIngrediente from '../Ingredientes/AgregarIngrediente.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../estilos/ContenedorIngrediente.css'

import CardDetalle from "./CardDetalle.jsx";

const ContenedorCards = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState({});
  const [display, setDisplay] = useState(false);
  const [ingredientBackup, setIngredienteBackup] = useState([]);


  const obtenerIngredientes = () => {
    setIngredientes(ingredientesData);
    setIngredienteBackup(ingredientesData);
  };

  const seleccionarIngrediente = (ingrediente) => {
    setIngrediente(ingrediente);
  };
  const filtrarElementos=(texto)=>{
    let search=ingredientes.filter(ingrediente => ingrediente.nombre.toLowerCase().includes(texto)  ||  
     ingrediente.cantidad.toString().includes(texto) ||   ingrediente.unidad.toLowerCase().includes(texto));
    
    if(texto == ''){
      setIngredientes(ingredientBackup);
    }else{
      
      setIngredientes(search);
    }
    
    
  };
  useEffect(() => {
    obtenerIngredientes();
  }, []);

  useEffect(() => {
    obtenerIngredientes();
    console.log("Se actuliazo la tabla")
  }, [display]);

  return (

    <div className="container mt-5 scroll">
      <TituloPagina titulo="Ingredientes" />
      
        <div className="row">
          <div className="col-5">
            <input type="text"
                    name="busqueda" 
                    class="form-control " 
                    placeholder="Busqueda"  
                    onChange={(e) => {
                       filtrarElementos(e.target.value);
                    }}/>
          </div>
          <div className="col-5">
          </div>
          <div className="col-2">
             <button type="button" class="btn btn-success" data-toggle="modal" data-target="#agregar" value="true">
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
                              }}>
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
          setDisplay={setDisplay}/>
        </div>
      </div>

      <div class="modal fade" id="agregar" tabindex="-1" role="dialog" aria-hidden="true">
                      <AgregarIngrediente />
         </div>
    </div>
    
  );
};
export default ContenedorCards;
