import React, { Component} from 'react';

 class DetalleIngrediente extends Component{

    state = {
        nombre: '',
        cantidad: 0
    }
   
    modificar = () => {

        console.log('modificar');
      }
    eliminar= () =>  {
        console.log('eliminar');
      }
      onChange= e =>  {
          
        console.log(e.target.name, e.target.value);
          this.setState({ [e.target.name]:e.target.value })}

     render(){
         return(
            <div>
            <div className="form-group">
            <label>Clave Ingrediente</label>
            <input type="text"  class="form-control " placeholder="Clave Ingrediente"  readonly  />
            </div>
            <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" class="form-control " placeholder="Nombre"  onChange={this.onChange} value={this.state.nombre}  />
            </div>
            <div className="form-group">
            <label>Cantidad</label>
            <input type="number" name="cantidad"  class="form-control " placeholder="Cantidad" onChange={this.onChange} value={this.state.cantidad}  min="0"/>
            </div>
            <div className="row text-center">
                <div className="col-md-6 col-sm-12">
                <button onClick={this.modificar}  className="btn btn-success">Modificar</button>
                </div>
                <div className="col-md-6 col-sm-12">
                <button onClick={this.eliminar}   className="btn btn-danger">Eliminar</button>
                </div>
            </div>
        </div>    
         )

     }
}
export default DetalleIngrediente;