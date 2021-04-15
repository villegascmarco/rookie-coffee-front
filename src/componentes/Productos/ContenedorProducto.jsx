import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Ingredientes from "../../Peticiones/api_ingredientes";
import Productos from "../../Peticiones/api_productos";
import TituloPagina from '../TituloPagina/TituloPagina.jsx'
import CardDetalleP from './CardDetalleP.jsx'
import AgregarProducto from './AgregarProducto.jsx'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import '../estilos/ContenedorIngrediente.css'
import CargaPeticion from '../Carga/CargaPeticion.jsx'


const ContenedorProducto = ({tokenP}) => {
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({});
    const [display, setDisplay] = useState(false);
    const [productoBackup, setProductoBackup] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);

    const [agregado, setAgregado] = useState(false);

    const [state, setState] = useState({
      estado: false,
    });
    const history = useHistory();

    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [cargando, setCargando] = useState(false);
    
      const obtenerProductos = async (token) => {
        let response = await Productos.mostrarProductos(token).then(setCargando(true));
        if (response.mensaje === "El token enviado es invalido" ||
            response.mensaje === "El token enviado ha caducado") {
          setCargando(false);
          history.push(`/Login`);
          localStorage.clear();
          window.location.reload();
          
          
        } else {
          setProductoBackup(response);
          setProductos(response);
          setCargando(false);
          
        }
        
      };

      const obtenerIngredientes = async (token) => {
        let response = await Ingredientes.mostrarIngredientes(token).then(setCargando(true));
        if (response.mensaje === "El token enviado es invalido" ||
            response.mensaje === "El token enviado ha caducado")  {
          setCargando(false);
          history.push(`/Login`);
          localStorage.clear();
          window.location.reload();
          
          
        } else {
          setIngredientes(response);
          setCargando(false);
          
        }

        
        
      };

    const seleccionaProducto = (producto) => {
        setProducto(producto);
      };

      

      const filtrarElementos=(texto)=>{
        texto= texto.toLowerCase()
        let search=productos.filter(producto =>
          producto.nombre.toLowerCase().includes(texto)  ||  
          producto.precio.toString().includes(texto) ||   
          producto.fecha_registro.toString().includes(texto));
        
        if (texto == "") {
          setProductos(productoBackup);
        } else {
          setProductos(search);
        }
      };

      useEffect(() => {
        obtenerIngredientes(tokenP);
        obtenerProductos(tokenP);
        setAgregado(false);
      }, [display, state.estado, agregado]);


    
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
                      label="Mostrar inactivos"
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
                            <th scope="col">Descripción</th>
                            <th scope="col">Fecha registro</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.filter((item) =>
                          state.estado == true
                            ? item.estatus == "Inactivo"
                            : item.estatus == "Activo"
                        ).map((item) => (
                            <tr key={item.id}
                          className={
                            item.estatus == "Inactivo" ? "text-black-50" : null
                          }>
                              <td>{item.nombre}</td>
                              <td>${item.precio} MXN</td>
                              <td>{item.descripcion}</td>
                              <td>{item.fecha_registro}</td>
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
              setDisplay={setDisplay} 
              ingredientes={ingredientes}
              tokenP={tokenP}

              />
                                  
            </div>
            
          </div>
    
          <div class="modal fade" id="agregar" tabindex="-1" role="dialog" aria-hidden="true">
          <AgregarProducto ingredientes={ingredientes} tokenP={tokenP} setAgregado={setAgregado}/>     
             </div>
             <CargaPeticion cargando={cargando} />
        </div>
        
        
        
        
        
        );

};
export default ContenedorProducto;
