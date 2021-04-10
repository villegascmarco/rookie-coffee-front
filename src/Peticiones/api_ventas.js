export default class getVentas {
    constructor() {

    }

    // CONSULTA DE VENTAS

    static async mostrarVentas(token, metodo_busqueda) {
        let response = await fetch(
            "http://glassware.pythonanywhere.com/venta/consultar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,

                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    metodo_busqueda: metodo_busqueda
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // CONSULTA DE VENTAS ESPECIFICA FECHA

    static async mostrarVentas(token, metodo_busqueda, fecha_inicial, fecha_final) {
        if (fecha_inicial) {
            let response = await fetch(
                "http://glassware.pythonanywhere.com/venta/consultar", {
                    method: "POST",
                    headers: new Headers({
                        "x-access-tokens": token,

                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        metodo_busqueda: metodo_busqueda,
                        fecha_inicial: fecha_inicial+"T00:00:00",
                        fecha_final: fecha_final+"T00:00:00"
                    }),
                }
            ).then((response) => {
                if (response.ok) {
                    return response.json();
                }
            });
            return response
        } else if (metodo_busqueda) {
            let response = await fetch(
                "http://glassware.pythonanywhere.com/venta/consultar", {
                    method: "POST",
                    headers: new Headers({
                        "x-access-tokens": token,

                        "Content-Type": "application/json",
                    }),
                    body: JSON.stringify({
                        metodo_busqueda: metodo_busqueda,
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


    // ELIMINAR EL VENTA

    static eliminarVenta(venta, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/venta/desactivar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "_id": venta._id,
                    "fecha": venta.fecha
                    // fecha
                }),
            }
        ).then((response) => {
            if (response.ok) {
                return response.json();
            }
        });
        return response
    }

    // AGREGAR VENTA

    static agregarVenta(venta, token) {
        debugger
        let response = fetch(
            "http://glassware.pythonanywhere.com/venta/registrar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    total_venta: venta.total,
                    detalles: venta.detalles
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