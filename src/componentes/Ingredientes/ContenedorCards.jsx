import React from 'react'

import ingredientes from '../../sample/ingredientes.json'

import Ingredientes from './Ingrediente.jsx'
import DetalleIngrediente from './DetalleIngrediente.jsx'

const ContenedorCards = ()=> {
    const state = {
        ingredientes: ingredientes
      }
    return (
        <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="card">
              <div className="card-header">
                Tabla de ingredientes
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table className="table  card-table ">
                    <thead className="table-warning">
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Unidad</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <Ingredientes ingredientes={state.ingredientes} />
                    </tbody>
                  </table>
                </div>
              </div> 
            </div> {/* Termina card*/}
          </div> {/* Termina col-8*/}

          <div className="col-4">
            <div className="card">
              <div className="card-header">
                Detalle
              </div>
              <div class="card-body ">
                <DetalleIngrediente />


              </div>
            </div> {/* Termina card*/}
          </div>{/* Termina col-4*/}
        </div>
        {/* Div del row */}
      </div> 
    )
}
export default ContenedorCards