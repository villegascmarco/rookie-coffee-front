import React, { useState } from "react";
import "../estilos/Login.css";
import User from '../../res/user.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const Login = (e) => {
    e.preventDefault()
    if(!password) {
        setError(true)
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
            type="email"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="Correo electronico"
            required
            onChange={(e) => {
                setEmail(e.target.value)
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
          <input type="submit" class="fadeIn fourth" value="Iniciar sesión" />
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
