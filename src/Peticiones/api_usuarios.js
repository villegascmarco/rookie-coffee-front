export default class getUsuarios {
    constructor() {

    }

    // CONSULTA DE USUARIOS

    static mostrarUsuarios(token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/usuario/consultar", {
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

    // OBTENER NAVEGADOR DE USUARIO

    static obtenerNavegador() {
        navigator.saysWho = (() => {
            const {
                userAgent
            } = navigator
            let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
            let temp

            if (/trident/i.test(match[1])) {
                temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

                return `IE ${temp[1] || ''}`
            }

            if (match[1] === 'Chrome') {
                temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

                if (temp !== null) {
                    return temp.slice(1).join(' ').replace('OPR', 'Opera')
                }

                temp = userAgent.match(/\b(Edg)\/(\d+)/)

                if (temp !== null) {
                    return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)')
                }
            }

            match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
            temp = userAgent.match(/version\/(\d+)/i)

            if (temp !== null) {
                match.splice(1, 1, temp[1])
            }

            return match.join(' ')
        })()

        return navigator.saysWho // outputs: `Chrome 89`
    }

    // OBTENER IP DEL USUARIO

    static async obtenerIP() {
        let response = await fetch('http://api.ipify.org/?format=json');
        let data = await response.json();
        return data.ip
    }

    // LOGIN DE LOS USUARIOS

    static async hacerLogin(usuario, contraseña) {
        let response = await fetch(
            "http://glassware.pythonanywhere.com/security/login", {
                method: "POST",
                headers: new Headers({
                    //Cabecera para autenticación, usuario = 'Candecandelario', contraseña = '123'
                    'Authorization': 'Basic ' + btoa(`${usuario}:${contraseña}`),

                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "dispositivo": this.obtenerNavegador(),
                    "direccion_ip": await this.obtenerIP()

                }),
            }

        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // CERRARS SESION

    static cerrarSesion(token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/security/logout", {
                method: "POST",
                headers: new Headers({
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

    // ELIMINAR AL USUARIO

    static eliminarUsuario(id, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/usuario/desactivar", {
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

    // ACTIVAR A LOS USUARIOS DESACTIVADOS

    static activarUsuario(id, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/usuario/reactivar", {
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

    // AGREGAR USUARIO

    static agregarUsuario(usuario, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/usuario/agregar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    apellido_1: usuario.apellido_1,
                    apellido_2: usuario.apellido_2,
                    contrasena: usuario.contrasena,
                    estatus: usuario.estatus,
                    nombre: usuario.nombre,
                    nombre_acceso: usuario.nombre_acceso,
                    rfc: usuario.rfc,
                    rol_usuario: usuario.rol_usuario
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

    static modificarUsuario(usuario, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/usuario/modificar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    _id: usuario.id,
                    apellido_1: usuario.apellido_1,
                    apellido_2: usuario.apellido_2,
                    estatus: usuario.estatus,
                    nombre: usuario.nombre,
                    nombre_acceso: usuario.nombre_acceso,
                    rfc: usuario.rfc,
                    rol_usuario: usuario.rol_usuario
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