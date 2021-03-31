import React, {useEffect, useState} from 'react'
import Index from './componentes/Index/Index.jsx'
import SideBar from './componentes/Hamburguesa/sidebar.jsx'
import Login from './componentes/Login/Login.jsx'
import ContenedorProducto from './componentes/Productos/ContenedorProducto.jsx'
import ContenedorIngrediente from './componentes/Ingredientes/ContenedorIngrediente.jsx'
import ContenedorCardsUsuario from './componentes/Usuario/ContenedorUsuario.jsx'
import Venta from './componentes/Venta/Venta.jsx'
import ContenedorRoles from './componentes/RolesUsuarios/ContenedorRoles.jsx'
import Permiso from './componentes/Errores/Permiso.jsx'


//Rutas privadas
import PrivateRoute from './componentes/RutasPrivadas/PrivateRoute.jsx'
import PrivateRouteLogin from './componentes/RutasPrivadas/PrivateRouteLogin.jsx'
import PrivateRouteAdmin from './componentes/RutasPrivadas/PrivateRouteAdmin.jsx'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  
} from "react-router-dom";



function App() {

  const [token, setToken] = useState("")
  const obtenerToken = () => {
    let tokenlocal = localStorage.getItem("token")
    setToken(tokenlocal)
  }

  useEffect(() => {
    obtenerToken()
  }, [token])

  return (

    <div className="App">
      <SideBar pageWrapId={"container"} outerContainerId={"App"} token={token} setToken={setToken} />
    <div className="container">
      <Router>
      <Switch>
          <PrivateRoute path="/Venta" component={Venta} />

          <PrivateRouteLogin path="/Login" component={Login} />

          <PrivateRouteAdmin path="/Productos" component={ContenedorProducto} />
          
          <PrivateRouteAdmin path="/Ingredientes" component={ContenedorIngrediente} />
          
          <PrivateRouteAdmin path="/Roles" component={ContenedorRoles} tokenP={token} />

          <PrivateRouteAdmin path="/Empleados" component={ContenedorCardsUsuario} tokenP={token} />

          <Route exact path="/">
            <Index />
          </Route>

          <Route exact path="/Permiso">
            <Permiso />
          </Route>
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
