import React, { useState } from "react";
import "../estilos/Login.css";
import User from "../../res/user.png";
import Usuario from "../../Peticiones/api_usuarios";
import { useHistory } from "react-router-dom";
import CargaPeticion from '../Carga/CargaPeticion.jsx'

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [emailCE, setEmailCE] = useState(null);

  const [cargando, setCargando] = useState(false);

  const history = useHistory();
  

  const Login = async (e) => {
    e.preventDefault();

    let response = await Usuario.hacerLogin(user, password).then(setCargando(true));

    if (response == undefined) {
      setEmailCE("Ocurrio un error, intentalo de nuevo por favor");
      setCargando(false);
    } else if (
      response.mensaje == "Imposible autenticar, inicio de sesion no exitoso"
      
    ) {
      setEmailCE("El correo y/o contraseña no son validos");
      setCargando(false)

    } else if (response.mensaje == "Usuario inexistente") {
      setEmailCE("El usuario ingresado no existe");
      setCargando(false)

    } else if (response.token) {
      history.push(`/Venta`);
      window.location.reload();
      localStorage.setItem("token", response.token);
      localStorage.setItem("rol", response.rol);
    }
  };

  return (
    <div className="login_container">
      <div id="formContent">
        <h2 class="active loginh2"> Iniciar sesión </h2>

        <div class="fadeIn first">
          <img src={User} id="icon" alt="User Icon" className="icon_user" />
        </div>

        <form onSubmit={Login}>
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="Usuario de inicio"
            required
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="Contraseña"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" class="fadeIn fourth" value="Iniciar sesión" />

          {emailCE != null ? (
            <div className="alert alert-danger">{emailCE}</div>
          ) : (
            <span></span>
          )}
        </form>
      </div>
      <CargaPeticion cargando={cargando} />
    </div>
  );
};

export default Login;
