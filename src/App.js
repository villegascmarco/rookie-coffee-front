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
import PrivateRouteLogin from './componentes/RutasPrivadas/PrivateRouteLogin.jsx'
import PrivateRouteAdmin from './componentes/RutasPrivadas/PrivateRouteAdmin.jsx'
import PrivateRouteEmp from './componentes/RutasPrivadas/PrivateRouteEmp.jsx'
import PrivateRouteVenta from './componentes/RutasPrivadas/PrivateRouteVenta.jsx'

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
  const [usuario, setUsuario] = useState("")

  const obtenerToken = () => {
    let tokenlocal = localStorage.getItem("token")
    let rolLocal = localStorage.getItem("rol")
    let nombreLocal = localStorage.getItem("usuario")
    setToken(tokenlocal)
    setRol(rolLocal)
    setUsuario(nombreLocal)
  }

  useEffect(() => {
    obtenerToken()
  }, [token])

  return (

    <div className="App">
      <SideBar pageWrapId={"container"} outerContainerId={"App"} token={token} rol={rol} setToken={setToken} usuario = {usuario} />
    <div className="container">
      <Router>
      <Switch>


          <PrivateRouteVenta exact path="/Venta" component={Venta} tokenP={token} rol={rol} />
          
          <PrivateRouteLogin path="/Login" component={Login} />

          <PrivateRouteEmp path="/Productos" component={ContenedorProducto} tokenP={token} rol={rol} />
          
          <PrivateRouteEmp path="/Ingredientes" component={ContenedorIngrediente} tokenP={token} rol={rol} />

          <PrivateRouteEmp path="/Ventas" component={ContenedorVentas} tokenP={token} rol={rol} />

          <PrivateRouteAdmin path="/Roles" component={ContenedorRoles} tokenP={token} rol={rol} />

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
