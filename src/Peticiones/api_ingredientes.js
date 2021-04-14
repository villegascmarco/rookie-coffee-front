import axios from 'axios';
export default class Ingredientes {
    constructor() {

    }
 static mostrarIngredientes(token) {
    
    let response = fetch(
        "http://glassware.pythonanywhere.com/ingrediente/consultar", {
            method: "GET",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            })
        }
    ).then((response) => {
        if (response.ok) {
           
            return response.json();
        }
    });
    return response
}
static agregarIngrediente(ingrediente, token) { 
    let response = fetch(
        "http://glassware.pythonanywhere.com/ingrediente/agregar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                nombre: ingrediente.nombre,
                descripcion: ingrediente.descripcion,
                cantidad_disponible: parseFloat(ingrediente.cantidad_disponible),
                unidad_medida: ingrediente.unidad_medida,
                usuario: ingrediente.usuario,
                fecha_registro: ingrediente.fecha_registro

            })
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
    return response
}
static modificarIngrediente(ingrediente, token) { 
    let response = fetch(
        "http://glassware.pythonanywhere.com/ingrediente/modificar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                _id:ingrediente.id,
                nombre: ingrediente.nombre,
                descripcion: ingrediente.descripcion,
                cantidad_disponible: parseInt(ingrediente.cantidad_disponible),
                unidad_medida: ingrediente.unidad_medida,
                usuario: ingrediente.usuario,
                fecha_registro: ingrediente.fecha_registro

            })
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
    return response
}
static eliminarIngrediente(ingrediente, token) { 
    let response = fetch(
        "http://glassware.pythonanywhere.com/ingrediente/desactivar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                _id: ingrediente.id
            })
        }
    ).then((response) => {
        if (response.ok) {
            console.log(response)
            return response.json();
        }
    });
    return response
}

}