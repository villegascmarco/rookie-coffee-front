import React, { useState, useEffect } from "react";
import apiProducto from "../../Peticiones/api_productos";
import '../estilos/CardDetalle.css'

const CardDetalleP = ({producto, setDisplay, ingredientes, tokenP}) => {
  const [modoEdicion, setModoedicion] = useState(false);
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [precio, setPrecio] = useState(0);
  const [idIngrediente, setIdIngrediente] = useState(0);

  const [ingredientesP, setIngredientesP] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  const [emailCE, setEmailCE] = useState(null);

  const [unidad, setUnidad] = useState("");

  const [ingrePro, setIngrePro] = useState({});
  const [cantIngre, setCantIngrediente] = useState(0);
  const [nombrei, setNombreI] = useState("");
  
  

  useEffect(() => {
    if (producto._id != null || producto._id != undefined) {
      setId(producto._id);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setEstatus(producto.estatus);
      setPrecio(producto.precio);
      let ingrs = [];
      producto.ingrediente_producto.forEach(element => {
        let ing={
          _id: element._id,
          cantidad_requerida: element.cantidad_requerida,
          estatus:element.estatus,
          fecha_registro: element.fecha_registro,
          ingrediente: element.ingrediente[0]._id,
          nombre:element.ingrediente[0].ingrediente,
          producto: element.producto,
          usuario: element.usuario
              };
              ingrs.push(ing);  
        
      });
      setIngredientesP(ingrs);
      setEmailCE(null);
    } else {
      console.log("No hay datos en el producto");
    }
  }, [producto]);


  

  const eliminarProducto =  async(id) => {
    // Llamar a la api de eliminar
    let produ = {
      id:id
  };
  let response = await apiProducto.eliminarProducto(produ, tokenP);
    setDisplay(false);
  };
  
  
  const eliminarIngreProd =  () => {
    if (ingrePro._id != null){
      let ingrem={
        _id : ingrePro._id,//id de detalle
        cantidad_requerida : ingrePro.cantidad_requerida,
        estatus : "Inactivo",
        fecha_registro: "",
        id_ingrediente : ingrePro.id_ingrediente, //id del ingrediente
        producto: ingrePro.producto
      };
      const encontrar = ingredientesP.filter((item) => item._id !== ingrePro._id );
      setIngredientesP([...encontrar,ingrem]);
    }else{
      const encontrar = ingredientesP.filter((item) => item.id_ingrediente !== ingrePro.id_ingrediente );
      setIngredientesP([...encontrar]);

    };
    // Llamar a la api de eliminar
    
  };
  const modificarProducto = async() => {
    let produ={
      _id:id,
      nombre: nombre,
      descripcion:descripcion ,
      precio: precio,
      fecha_registro:"",
      ingrediente_producto: ingredientesP
  
  };
  let response = await apiProducto.modificarProducto(produ, tokenP);
    setDisplay(false);
  };

  
  const modificarIngreProd = () => {
    let ingrem={
      _id : ingrePro._id,//id de detalle
      cantidad_requerida : cantIngre,
      estatus : "Activo",
      fecha_registro: "",
      ingrediente : ingrePro.id_ingrediente,
      nombre: ingrePro.nombre, //id del ingrediente
      producto: ingrePro.producto
    };
    const encontrar = ingredientesP.filter((item) => item._id !== ingrePro._id );
    
    setIngredientesP([...encontrar, ingrem]);
    
    
  };

  
  const agregarIngrediente = (e) => {
    const encontrar = ingredientesP.filter((item) => item.ingrediente == idIngrediente);
    if(encontrar == ""){
      var yourElement = document.getElementById("ingredientesc");
    var nombre = yourElement.options[yourElement.selectedIndex].text;

    let ingre1={
      cantidad_requerida: Number.parseFloat(cantidad),
      estatus : "Activo",
      nombre: nombre,
      ingrediente: parseInt(idIngrediente, 10),
      producto: id
     };
     setIngredientesP([...ingredientesP, ingre1]);
      setEmailCE(null);
    }else{
      setEmailCE("Ya existe este ingrediente en este producto");
    }
    
    
  };
  const asignarDTI = (item) =>{
    setNombreI(item.nombre);
    setCantIngrediente(item.cantidad_requerida);
    setIngrePro(item);
  };

  

  return (
    <div>
      <div className="card card_ts">
        <div className="card-header">Detalle</div>
        <div class="card-body ">
          {/*  INICIA INPUT DE CLAVE  */}


          {/*  INICIA INPUT DE NOMBRE  */}

          <div className="form-group">
            <label>Nombre</label>

            <input
              id="nombre"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              type="text"
              name="nombre"
              class="form-control "
              placeholder="Nombre"
              value={nombre} required
            />
          </div>

         

               {/*  INICIA INPUT DE DESCRIPCION  */}
          <div className="form-group">
            <label>Descripción</label>

            <input
              type="text"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
              id="descripcion"
              class="form-control "
              placeholder="Descripción"
              min="0"
              value={descripcion}
            />
          </div>

           {/*  INICIA INPUT DE PRECIO  */}
           <div className="row">
            <div class="form-group col-md-10">
            <label>Precio</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
           <span class="input-group-text" id="basic-addon1">$</span>
          </div>
          <input type="number" class="form-control" placeholder="Precio" onChange={(e) => {
                  setPrecio(e.target.value)
                }}
                min="0" value={precio}/>
            </div>
            </div>
            </div>
           {/*  INICIA select  DE ESTATUS  */}
          

          {/*  INICIA select  DE ingredientes  */}
          <div className="row">
            <div class="form-group col-md-6">
              <label>Ingrediente</label>
              <select
                name="ingredientesc"
                id="ingredientesc"
                className="form-control"
                data-id="ingrediente"
                data-nested="nested"
                onChange={(e) => {
                  setIdIngrediente(e.target.value);
                }}
              >
                <option selected>Elegir...</option>
                {ingredientes != null ?(
                ingredientes.filter((item) => 
                  item.estatus == "Activo").map((item) => (
                   <option value={item._id}>{item.nombre} - {item.unidad_medida}</option>

                          ))) : (<span></span>)} 
              </select>
              
            </div>
            </div>
            

          <label >Cantidad</label>
            <div class="form-inline">
            <small id="emailHelp" class="form-text text-muted">Se registrará  en gramos  g o mililitros ml</small>
            <input
                type="number"
                name="cantidad"
                className="form-control  mr-sm-2"
                onChange={(e) => {
                  setCantidad(e.target.value);
                }}
                min="0"
              />
            <button class="btn btn-outline-success my-2 my-sm-0" type="" onClick={() => {
                      agregarIngrediente();
                    }} ><i class="fa fa-plus"></i></button>
           </div>
           <br />
           {emailCE != null ? (
            <div className="alert alert-danger">{emailCE}</div>
          ) : (
            <span></span>
          )}
            <br />
           <div className="table-responsive">
           <table className="table">
             <thead className="table_ingredientes">
               <th>Nombre</th>
               <th>Cant. Uso</th>
               <th></th>
             </thead>
             <tbody> 
             {ingredientesP != null ? (
             ingredientesP.map((item) => (
                   <tr   className={
                    item.estatus == "Inactivo" ? "text-black-50" : null
                  }>
                     <td>{item.nombre}</td>
                     <td>{item.cantidad_requerida}</td>
                     <td><button className="btn btn-light" onClick={() => {
                       asignarDTI(item);
                     
                    }}>
                     <i class="fa fa-eye "></i></button></td>
                   </tr>
                          ))) : (<span></span>)
                          }  
             </tbody>
          </table>
           </div>

        

          <div className="row text-center">
            <div className="col-md-6 col-sm-12">
              <button
                data-toggle="modal"
                data-target="#modificarModal"
                className="btn btn-warning text-light"
              >
                Modificar
                <i class="fa fa-edit ml-2"></i>
              </button>
            </div>
            <div className="col-md-6 col-sm-12">
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#eliminarModal"
                value="true"
              >
                Eliminar
                <i class="fa fa-minus-circle ml-2"></i>
              </button>
            </div>
          </div>

          {/* INICIAN MODALS  */}
          <div
            class="modal fade"
            id="eliminarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la eliminación?</h4>
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
                    onClick={() => {
                      eliminarProducto(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Eliminar
                    <i class="fa fa-minus-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INICIA MODAL MODIFICAR */}

          <div
            class="modal fade"
            id="modificarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la modificación?</h4>
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
                      modificarProducto();
                    }}
                    class="btn btn-warning"
                  >
                    Modificar
                    <i class="fa fa-edit ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <br></br>
      <div class="card">
      <div className="card-header">Detalle ingrediente del producto</div>
        <div class="card-body">
        <div className="form-group">
            <label>Nombre</label>

            <input
              id="nombre"
              type="text"
              name="nombre"
              class="form-control "
              placeholder="Nombre"
              value={nombrei}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Cantidad</label>
            <small id="emailHelp" class="form-text text-muted">Se registrará  en gramos  g o mililitros ml</small>
            <input
              id="Cantidad"
              onChange={(e) => {
                setCantIngrediente(e.target.value);
              }}
              type="number"
              name="nombre"
              class="form-control "
              placeholder="Cantidad"
              value={cantIngre}
              min="0"
            />
          </div>
          <div className="row text-center">
            <div className="col-md-6 col-sm-12">
              <button
                data-toggle="modal"
                data-target="#modificarModalIP"
                className="btn btn-warning text-light"
              >
                Modificar
                <i class="fa fa-edit ml-2"></i>
              </button>
            </div>
            <div className="col-md-6 col-sm-12">
              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#eliminarModalIP"
                value="true"
              >
                Eliminar
                <i class="fa fa-minus-circle ml-2"></i>
              </button>
            </div>
          </div>
          </div>

          
          
        </div>


        <div
            class="modal fade"
            id="eliminarModalIP"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la eliminación?</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <div class="alert alert-danger" role="alert">
                Esta accion no se podra reevertir!
                </div>
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
                    onClick={() => {
                     eliminarIngreProd();
                    }}
                    data-dismiss="modal"
                    className="btn btn-danger"
                  >
                    Eliminar
                    <i class="fa fa-minus-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="modificarModalIP"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la modificación?</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                <div className="modal-body">
                <div class="alert alert-danger" role="alert">
                Esta accion no se podra reevertir!
                </div>
                </div>
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
                      modificarIngreProd();
                    }}
                    class="btn btn-warning"
                  >
                    Modificar
                    <i class="fa fa-edit ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
      
    </div>

    



  );
};

export default CardDetalleP;
