import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRouteEmp = ({ tokenP, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        localStorage.getItem("token") 
        && localStorage.getItem("rol") == "Emp" || localStorage.getItem("rol") == "Admin" ? (
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

export default PrivateRouteEmp;
