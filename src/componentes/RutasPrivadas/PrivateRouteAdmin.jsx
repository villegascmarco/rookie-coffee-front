import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteAdmin = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem("token") 
        && localStorage.getItem("rol") == "Admin" ? (
          <Component tokenP={tokenP} rol={rol} />
        ) : (
          <Redirect
            to={{
              pathname: "/Permiso",
              state: { from: props.location },
            }}
            />
        )
      }
    />
  );
};

export default PrivateRouteAdmin;
