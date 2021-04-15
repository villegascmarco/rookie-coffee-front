import React, { useEffect, useState } from "react";

import Productos from "../../Peticiones/api_productos";

const AgregarProducto = ({ingredientes , tokenP, setAgregado}) => {

  //States del ingrediente
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [id, setId] = useState(0);
  const [addingredientes, setAddIngredientes] = useState([]);
  const [emailCE, setEmailCE] = useState(null);

  const [foto , setFoto] = useState("");


  


  
  

  const agregarIngrediente = (e) => {
    const encontrar = addingredientes.filter((item) => item.ingrediente == id);
    if(encontrar == ""){
      var yourElement = document.getElementById("ingredientes");
      var nombre = yourElement.options[yourElement.selectedIndex].text;

      let ingre1={
        cantidad_requerida:cantidad,
        nombre: nombre,
        ingrediente:id
      };
      setEmailCE(null);
    setAddIngredientes([...addingredientes, ingre1]);
    }else{
      setEmailCE("Ya existe este ingrediente en este producto");
    }
    
    
  };

  const borrarIngredienteProducto = (id) => {
    const newArrary = addingredientes.filter((item) => item.ingrediente !== id);
    setAddIngredientes(newArrary);
  };

  const base64 = (e) =>{
    if(e.target.files.length){
      if(e.target.files[0].type == "image/png"  ){
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
           let bs64= reader.result;
           setFoto(bs64);
           
         }
      }
    }
}


  
  const agrearProducto = async() =>{
    
    let producto={
        nombre: nombre,
        descripcion:descripcion ,
        precio: precio,
        fecha_registro: "",
        fot: foto,
        ingrediente_producto: addingredientes
    
    };
    
    let response = await Productos.agregarProducto(producto, tokenP);
    setAgregado(true);
  };


  return (
    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar Producto</h4>
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
            <div className="row">
            <div class="form-group col-md-12">
              <label>Nombre del producto</label>
              <input
                type="text"
                name="nombre"
                class="form-control "
                onChange={(e) => {
                  setNombre(e.target.value);
                 
                }}
              />
            </div>
            </div> 


          

            <div className="row">
            <div class="form-group col-md-12">
              <label>Pequeña descripción del nuevo producto</label>
              <input
                type="text"
                name="descripcion"
                class="form-control "
                onChange={(e) => {
                  setDescripcion(e.target.value)
                }}
                min="0"
              />
            </div>
            </div>

            <div className="row">
            <div class="form-group col-md-5">
            <label>Visualización  de foto</label>
            <img src={foto} class="rounded float-start img-fluid"></img>
            </div>
            </div>
            {emailCE != null ? (
            <div className="alert alert-danger">{emailCE}</div>
          ) : (
            <span></span>
          )}
            <div className="row">
            <div class="form-group col-md-12">
              <label>Foto</label>
              <input
                type="file"
                accept="image/png"
                name="Foto"
                class="form-group  "
                onChange={(e) => {
                  base64(e);
                }}
              />
            </div>
            </div>

           

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
                min="0"/>
            </div>
            </div>
            </div>
            
            <div className="row">
            <div class="form-group col-md-6">
              <label>Ingrediente</label>
              <select
                name="ingredientes"
                id="ingredientes"
                className="form-control"
                data-id="ingrediente"
                data-nested="nested"
                onChange={(e) => {
                  setId(e.target.value); 
                  
                 
                }}
              >
                <option selected>Elegir...</option>
                 {ingredientes.filter((item) => 
                  item.estatus == "Activo").map((item) => (
                   <option value={item._id}>{item.nombre} - {item.unidad_medida}</option>

                          ))}
              </select>
              
            </div>
            </div>
            
            <label >Cantidad <span class="badge badge-success"></span></label>
            <div class="form-inline">
            <small id="emailHelp" class="form-text text-muted">Se registrará  en gramos  g o mililitros ml</small>
            <input
                type="number"
                name="cantidad"
                className="form-control  mr-sm-2"
                onChange={(e) => {
                  setCantidad(e.target.value)
                }}
                min="0"
              />
              
            <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => {
                      agregarIngrediente();
                    }}  ><i class="fa fa-plus"></i></button>
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
             {addingredientes.map((item) => (
                   <tr>
                     <td>{item.nombre}</td>
                     <td>{item.cantidad_requerida}</td>
                     <td><button className="btn btn-danger" onClick={() => {
                        borrarIngredienteProducto(item.ingrediente);
                      }}><i class="fa fa-minus-circle"></i></button></td>
                   </tr>
                          ))}

             </tbody>
          </table>
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
            <button type="" className="btn btn-success" onClick={() => {
                      agrearProducto();
                    }}  data-dismiss="modal">
              Agregar <i class="fa fa-plus-square ml-2"></i>
            </button>
          </div>
        </div>
       
    </div>
    
  );
};
export default AgregarProducto;
