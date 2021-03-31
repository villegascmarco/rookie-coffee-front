import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteAdmin = ({ tokenP, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem("token") 
        && localStorage.getItem("rol") == "admin" ? (
          <Component tokenP={tokenP} />
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
