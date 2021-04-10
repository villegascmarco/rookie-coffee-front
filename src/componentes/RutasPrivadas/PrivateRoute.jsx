import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ tokenP, rol, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component tokenP={tokenP} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) 
      }
    />
  );
};

export default PrivateRoute;
