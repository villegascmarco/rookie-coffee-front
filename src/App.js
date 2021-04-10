import React, {useEffect, useState} from 'react'
import Index from './componentes/Index/Index.jsx'
import SideBar from './componentes/Hamburguesa/sidebar.jsx'
import Login from './componentes/Login/Login.jsx'
import ContenedorProducto from './componentes/Productos/ContenedorProducto.jsx'
import ContenedorIngrediente from './componentes/Ingredientes/ContenedorIngrediente.jsx'
import ContenedorCardsUsuario from './componentes/Usuario/ContenedorUsuario.jsx'
import ContenedorVentas from './componentes/Ventas/ContenedorVenta.jsx'
import Venta from './componentes/Venta/Venta.jsx'
import ContenedorRoles from './componentes/RolesUsuarios/ContenedorRoles.jsx'
import Permiso from './componentes/Errores/Permiso.jsx'
import Conocenos from './componentes/Index/Conocenos.jsx'


//Rutas privadas
import PrivateRoute from './componentes/RutasPrivadas/PrivateRoute.jsx'
import PrivateRouteLogin from './componentes/RutasPrivadas/PrivateRouteLogin.jsx'
import PrivateRouteAdmin from './componentes/RutasPrivadas/PrivateRouteAdmin.jsx'
import PrivateRouteEmp from './componentes/RutasPrivadas/PrivateRouteEmp.jsx'

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
  const [rol, setRol] = useState("")

  const obtenerToken = () => {
    let tokenlocal = localStorage.getItem("token")
    let rolLocal = localStorage.getItem("rol")
    setToken(tokenlocal)
    setRol(rolLocal)
  }

  useEffect(() => {
    obtenerToken()
  }, [token])

  return (

    <div className="App">
      <SideBar pageWrapId={"container"} outerContainerId={"App"} token={token} rol={rol} setToken={setToken} />
    <div className="container">
      <Router>
      <Switch>
          <PrivateRoute path="/Venta" component={Venta} tokenP={token} />

          <PrivateRouteLogin path="/Login" component={Login} />

          <PrivateRouteEmp path="/Productos" component={ContenedorProducto} tokenP={token} />
          
          <PrivateRouteEmp path="/Ingredientes" component={ContenedorIngrediente} tokenP={token} />

          <PrivateRouteEmp path="/Ventas" component={ContenedorVentas} tokenP={token} />

          <PrivateRouteAdmin path="/Roles" component={ContenedorRoles} tokenP={token} />

          <PrivateRouteAdmin path="/Empleados" component={ContenedorCardsUsuario} tokenP={token} />
          

          <Route exact path="/">
            <Index />
          </Route>

          <Route exact path="/Permiso">
            <Permiso />
          </Route>

          <Route exact path="/Conocenos">
            <Conocenos />
          </Route>

        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
