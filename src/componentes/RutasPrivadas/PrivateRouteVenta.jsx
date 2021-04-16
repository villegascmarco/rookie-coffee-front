import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteEmp = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem("token") &&
        (localStorage.getItem("rol") == "Usuario") ? (
          <Component tokenP={tokenP} rol = {rol} />
        ) : (
          <Redirect
            to={{
              pathname: "/Ventas",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouteEmp;
