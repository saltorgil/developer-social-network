import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === null || (!isAuthenticated && !loading) ? (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
}

export default PrivateRoute;
