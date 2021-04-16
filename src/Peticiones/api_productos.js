
export default class Productos {
   
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
                    precio: parseFloat(producto.precio) ,
                    fecha_registro: producto.fecha_registro,
                    foto:producto.foto,
                    ingrediente_producto: producto.ingrediente_producto

            })
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
    return response
}
static modificarProducto(producto, token) { 
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
                foto:producto.foto,
                fecha_registro: producto.fecha_registro,
                ingrediente_producto: producto.ingrediente_producto
            })
        }
    ).then((response) => {
        if (response.ok) {
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
            return response.json();
        }
    });
    return response
}
static activarProducto(id, token) { 
    let response = fetch(
        "http://glassware.pythonanywhere.com/producto/reactivar", {
            method: "POST",
            headers: new Headers({
                "x-access-tokens": token,
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                _id: id
            })
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
    return response
}

static upload(formData) { 
    let response = fetch(
        "https://api.cloudinary.com/v1_1/dg8xjgxd0/image/upload", {
            method: "POST",
            body: formData
        }
    ).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
    return response
}



}