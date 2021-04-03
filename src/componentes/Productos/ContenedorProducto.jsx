import React, { useState, useEffect } from "react";
import productosData from "../../sample/productos.json";
import TituloPagina from '../TituloPagina/TituloPagina.jsx'
import CardDetalleP from './CardDetalleP.jsx'
import AgregarProducto from './AgregarProducto.jsx'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import '../estilos/ContenedorIngrediente.css'


const ContenedorProducto = () => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [display, setDisplay] = useState(false);
    const [productoBackup, setProductoBackup] = useState([]);

    const [state, setState] = useState({
      estado: false,
    });

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    


    const obtenerProductos = () => {
        setProductos(productosData);
        setProductoBackup(productosData)
      };
    const seleccionaProducto = (producto) => {
        setProducto(producto);
      };

      

      const filtrarElementos=(texto)=>{
        let search=productos.filter(producto => producto.nombre.toLowerCase().includes(texto)  ||  
        producto.precio.toString().includes(texto) ||   producto.fecha_registro.includes(texto));
        
        if (texto == "") {
          consultarInactivos();
        } else {
          setProductos(search);
        }
      };

      const consultarInactivos = () => {
        if (state.estado) {
          let productosFiltrados = productosData.filter((producto) =>
          producto.estatus.includes("Inactivo")
          );
          setProductos(productosFiltrados);
        } else {
          let productoFiltradosAC = productosData.filter((producto) =>
          producto.estatus.includes("Activo")
          );
          setProductos(productoFiltradosAC);
        }
      };
    
      useEffect(() => {
        obtenerProductos();
      }, []);
    
       

      useEffect(() => {
        consultarInactivos();
      }, [display, state.estado]);


    
    return (
        <div className="container mt-5 scroll">
          <TituloPagina titulo="Productos" />
          
            <div className="row">

            <div className="col-5">
           
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
                  <div className="card-header">Tabla de Productos</div>
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
                        <thead className="table_ingredientes">
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Fecha registro</th>
                            <th scope="col">Estatus</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((item) => (
                            <tr key={item.id}>
                              <td>{item.nombre}</td>
                              <td>{item.precio}</td>
                              <td>{item.descripcion}</td>
                              <td>{item.fecha_registro}</td>
                              <td>{item.estatus}</td>
                              <td>
                              <button
                                  className="btn btn-light"
                                  onClick={() => {
                                    seleccionaProducto(item);
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
            <CardDetalleP 
              producto={producto} 
              display={display}
              setDisplay={setDisplay}/>
                                  
            </div>
          </div>
    
          <div class="modal fade" id="agregar" tabindex="-1" role="dialog" aria-hidden="true">
          <AgregarProducto/>     
             </div>
        </div>
        
        
        
        
        
        );

};
export default ContenedorProducto;
