import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteLogin = ({ tokenP, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Redirect
            to={{
              pathname: "/Venta",
              state: { from: props.location },
            }}
          />
          
        ) : (
          <Component tokenP={tokenP} />
        )
      }
    />
  );
};

export default PrivateRouteLogin;
