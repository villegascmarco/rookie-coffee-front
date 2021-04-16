import React, { useState, useEffect } from "react";
import apiProducto from "../../Peticiones/api_productos";
import '../estilos/CardDetalle.css'

const CardDetalleP = ({producto, setDisplay, ingredientes, tokenP}) => {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [idIngrediente, setIdIngrediente] = useState(0);

  const [ingredientesP, setIngredientesP] = useState([]);
  const [cantidad, setCantidad] = useState(0);

  const [emailCE, setEmailCE] = useState(null);


  const [estatus, setEstatus] = useState("");
  const [foto, setFoto] = useState("");

  const [publicId, setPublicId] = useState("");

  
  

  useEffect(() => {
    if (producto._id != null || producto._id != undefined) {
      setId(producto._id);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setEstatus(producto.estatus);
      setPrecio(producto.precio);
      setFoto(producto.foto);
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
  
  
  const eliminarIngreProd =  (e) => {
      const encontrar = ingredientesP.filter((item) => item.ingrediente !== e.ingrediente );
      setIngredientesP([...encontrar]);
      
    
  };

  const base64 = async(e) =>{
    const formData = new FormData();
    formData.append("file",e.target.files[0] );
    formData.append("upload_preset", "shhk904s");

    let response = await apiProducto.upload(formData);
    setPublicId(response.public_id);

}

  const modificarProducto = async() => {
    let produ={
      _id:id,
      nombre: nombre,
      descripcion:descripcion ,
      precio: precio,
      fecha_registro:"",
      foto:publicId,
      ingrediente_producto: ingredientesP
  
  };
  let response = await apiProducto.modificarProducto(produ, tokenP);
    setDisplay(false);
  };

  

  const activarProducto = async (id) => {
    let response = await apiProducto.activarProducto(id, tokenP);
    setDisplay(false);
  };

  
  const agregarIngrediente = (e) => {
    const encontrar = ingredientesP.filter((item) => item.ingrediente == idIngrediente);
    if(encontrar == ""){
      var yourElement = document.getElementById("ingredientesc");
    var nombre = yourElement.options[yourElement.selectedIndex].text;
    let uni="";
      if(nombre.includes("- kg")){
        uni ="g"
      }else if(nombre.includes("- l")){
        uni ="ml"
      }else if(nombre.includes("- ml")){
        uni ="ml"
      }else if(nombre.includes("- g")){
        uni ="g"
      }

    let ingre1={
      cantidad_requerida: Number.parseFloat(cantidad),
      nombre: nombre,
      ingrediente: parseInt(idIngrediente),
      producto: id,
      unidad:uni
     };
     setIngredientesP([...ingredientesP, ingre1]);
      setEmailCE(null);
    }else{
      setEmailCE("Ya existe este ingrediente en este producto, si desea aumentar la cantidad elimine el ingrediente de la lista y vuelva agregar");
    }
    
    
  };


  

  return (
    <div id="detalleP">
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

            <div className="row">
            <div class="form-group col-md-5">
            <label>Visualización  de foto</label>
            <img src={foto} width="100px" class=""></img>
            </div>
            </div>

            <div className="row">
            <div class="form-group col-md-12">
              <label>Foto</label>
              <input
                type="file"
                accept="image/jpg"
                name="Foto"
                class="form-group  "
                onChange={(e) => {
                  base64(e);
                }}
              />
            </div>
            </div>
          {/*  INICIA select  DE ingredientes  */}
          <div className="row">
            <div class="form-group col-md-7">
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
            
          {/*  INICIA select  DE CANTIDAD  */}
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
            {/*  INICIA ALERTA  */}
           {emailCE != null ? (
            <div className="alert alert-danger">{emailCE}</div>
          ) : (
            <span></span>
          )}
            <br />

             {/*  INICIA TABLA INGREDINETE PRODUCTO  */}
           <div className="table-responsive">
           <table className="table">
             <thead className="table_ingredientes">
               <th>Nombre</th>
               <th>Cant. Uso</th>
               <th>Unidad</th>
               <th></th>
             </thead>
             <tbody> 
             {ingredientesP != null ? (
             ingredientesP.map((item) => (
                   <tr  key={item.ingrediente} className={
                    item.estatus == "Inactivo" ? "text-black-50" : null
                  }>
                     <td>{item.nombre}</td>
                     <td>{item.cantidad_requerida}</td>
                     <td>{item.unidad}</td>
                     <td><button className="btn btn-danger" onClick={() => {
                       eliminarIngreProd(item);
                    }}>
                     <i class="fa fa-minus-circle"></i></button></td>
                   </tr>
                          ))) : (<span></span>)
                          }  
             </tbody>
          </table>
           </div>
               {/*  TERMINA TABLA INGREDIENTE PRODUCTO */}            
        
            {/*  BOTONES DE DESACTIVAR O MODIFICAR */} 
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
                className={
                  estatus == "Activo" ? "btn btn-danger" : "btn btn-success"
                }
                data-toggle="modal"
                data-target={
                  estatus == "Activo" ? "#eliminarModal" : "#activarModal"
                }
                value="true"
              >
                {estatus == "Activo" ? "Desactivar" : "Activar"}
                {estatus == "Activo" ? (
                  <i class="fa fa-minus-circle ml-2"></i>
                ) : (
                  <i class="fa fa-check-circle ml-2"></i>
                )}
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
                    Desactivar
                    <i class="fa fa-minus-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="activarModal"
            tabindex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4> ¿Desea confirmar la Activacion?</h4>
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
                      activarProducto(id);
                    }}
                    data-dismiss="modal"
                    className="btn btn-success"
                  >
                    Activar
                    <i class="fa fa-check-circle ml-2"></i>
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
      
      
    </div>

    



  );
};

export default CardDetalleP;
