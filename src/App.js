import React, {useEffect, useState} from 'react'
import Index from './componentes/Index/Index.jsx'
import SideBar from './componentes/Hamburguesa/sidebar.jsx'
import Login from './componentes/Login/Login.jsx'
import ContenedorProducto from './componentes/Productos/ContenedorProducto.jsx'
import ContenedorIngrediente from './componentes/Ingredientes/ContenedorIngrediente.jsx'
import ContenedorCardsUsuario from './componentes/Usuario/ContenedorUsuario.jsx'
import Venta from './componentes/Venta/Venta.jsx'


//Rutas privadas
import PrivateRoute from './componentes/RutasPrivadas/PrivateRoute.jsx'

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
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Productos" >
            <ContenedorProducto />
          </Route>
          <Route path="/Ingredientes"  component={() => <ContenedorIngrediente  tokenP={token} />}>
          </Route>
          <Route path="/Empleados">
            <Route exact path="/Empleados" component={() => <ContenedorCardsUsuario  tokenP={token} />} />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
         
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
