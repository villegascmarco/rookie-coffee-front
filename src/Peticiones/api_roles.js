export default class getUsuarios {
    constructor() {

    }

    // CONSULTAR ROLES

    static mostrarRoles(token) {
        let response = fetch(
            "http://moimorua.pythonanywhere.com/rol-usuario/consultar", {
                method: "POST",
                headers: new Headers({
                    //Cabecera para autenticación, usuario = 'Candecandelario', contraseña = '123'
                    // 'Authorization': 'Basic ' + btoa('CandeCandelario:123'),

                    //Cabecera para token
                    "x-access-tokens": token,

                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({}),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // ELIMINAR EL ROL

    static eliminarRol(id, token) {
        let response = fetch(
            "http://moimorua.pythonanywhere.com/rol-usuario/desactivar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "_id": id
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // ACTIVAR A LOS ROLES DESACTIVADOS

    static activarRol(id, token) {
        let response = fetch(
            "http://moimorua.pythonanywhere.com/rol-usuario/reactivar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "_id": id
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // MODIFICAR USUARIO

    static modificarRol(rol, token) {
        let response = fetch(
            "http://moimorua.pythonanywhere.com/rol-usuario/modificar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    _id: rol.id,
                    estatus: rol.estatus,
                    nombre: rol.nombre,
                    descripcion: rol.descripcion
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // AGREGAR ROL

    static agregarRol(rol, token) {
        let response = fetch(
            "http://moimorua.pythonanywhere.com/rol-usuario/agregar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    nombre: rol.nombre,
                    descripcion: rol.descripcion
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

}