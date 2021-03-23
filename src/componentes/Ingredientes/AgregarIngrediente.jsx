import React, {useEffect , useState} from 'react'

const AgregarIngrediente = () => {
    const [datos, setDatos] = useState({
        nombre: '',
        cantidad: 0,
       // unidades: {
       //     id: ''
       // }
    })
    

    const agregar = (e) => {
        e.preventDefault()

    }
    const onChange= (e) =>  { 
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
           // unidades: {id: e.target.value}
        })
    }
    
    return (
        <div class="modal-dialog" >
        <form onSubmit={agregar}>
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar Ingrediente</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <div class="form-group col-md-12">
          <label>Nombre</label>
            <input type="text"
                    name="nombre" 
                    class="form-control " 
                    placeholder="Nombre"    
                    onChange = {onChange}/>
          </div>
          <div class="form-group col-md-12">
          <label>Nombre</label>
          <label>Cantidad</label>
            <input type="number" 
                    name="cantidad" 
                    class="form-control " 
                    placeholder="cantidad" 
                    onChange = {onChange} min="0"  />
          </div>
          
           
            <div class="form-group col-md-6">
            <label>Unidad</label>
            <select name="unidades" class="form-control" onChange = {onChange}>
                <option selected>Elegir...</option>
                <option value="3">Gramos</option>
            </select>
          </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary">Agregar</button>
          </div>
        </div>
        
      </form>
      </div>
        
        )

}
export default AgregarIngrediente;