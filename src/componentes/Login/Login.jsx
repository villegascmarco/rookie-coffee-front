import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import "../estilos/Login.css";
import User from '../../res/user.png'
import Usuario from "../../Peticiones/api_usuarios";
import { useHistory } from 'react-router-dom'

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();



  const Login = async(e) => {
    debugger
    e.preventDefault()
    let response = await Usuario.hacerLogin(user, password)
    if(response != null || response != undefined) {
      history.push(`/Venta`);
      window.location.reload(); 
    }
  };

  return (
    <div className="login_container">
      <div id="formContent">
        <h2 class="active loginh2"> Iniciar sesión </h2>

        <div class="fadeIn first">
          <img
            src={User}
            id="icon"
            alt="User Icon"
            className="icon_user"
          />
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
                setUser(e.target.value)
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
                setPassword(e.target.value)
            }}
          />
          <input type="submit" class="fadeIn fourth"  value="Iniciar sesión" />
        </form>

        <div id="formFooter">
          <a class="underlineHover forgot" href="#">
            Olvide mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
