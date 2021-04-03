import axios from 'axios';
export default class getIngredientes {
    constructor() {

    }
 static mostrarIngredientes(token) {
    let response = fetch(
        "http://glassware.pythonanywhere.com/ingredientes/consultar", {
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
}