import axios from 'axios';
export default class Productos {
    constructor() {

    }
 static mostrarProductos(token) {
    
    
    let response = fetch(
        "http://glassware.pythonanywhere.com/producto/consultar", {
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
static agregarProducto(producto, token) { 
    
    let response = fetch(
        "http://glassware.pythonanywhere.com/producto/agregar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio:parseFloat(producto.precio) ,
                    fecha_registro: producto.fecha_registro,
                    ingrediente_producto: producto.ingrediente_producto

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
static modificarProducto(producto, token) { 
    console.log(JSON.stringify(producto));
    let response = fetch(
        "http://glassware.pythonanywhere.com/producto/modificar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                _id:producto._id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio:parseFloat(producto.precio) ,
                fecha_registro: producto.fecha_registro,
                ingrediente_producto: producto.ingrediente_producto
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
static eliminarProducto(producto, token) { 
    let response = fetch(
        "http://glassware.pythonanywhere.com/producto/desactivar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                _id: producto.id
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