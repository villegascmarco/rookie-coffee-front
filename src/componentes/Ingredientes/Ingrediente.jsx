import React, { Component} from 'react';

class Ingredientes extends Component{
    render(){
        return  this.props.ingredientes.map(e => <tr key={e.id}>
             <td>{e.nombre}</td> 
             <td>{e.cantidad}</td> 
             <td>{e.unidad}</td> 
             <td><a className="btn btn-light">Detalle</a></td> 
        </tr>)
    }

}
export default Ingredientes;