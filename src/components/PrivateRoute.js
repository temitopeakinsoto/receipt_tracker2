import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        // we may need to change this name depending on how we named our token in localstorage
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  export default PrivateRoute
  