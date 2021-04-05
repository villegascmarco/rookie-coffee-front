export default class getVentas {
    constructor() {

    }

    // CONSULTA DE VENTAS

    static mostrarVentas(token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/venta/consultar", {
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

    
    // ELIMINAR EL VENTA

    static eliminarVenta(id, token) {
        let response = fetch(
            "http://glassware.pythonanywhere.com/venta/eliminar", {
                method: "POST",
                headers: new Headers({
                    "x-access-tokens": token,
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    "_id": id
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