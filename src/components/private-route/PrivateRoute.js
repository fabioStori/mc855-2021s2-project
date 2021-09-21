import { useUser } from 'contexts/UserProvider';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const { isUserLoggedIn } = useUser();

  useEffect(() => {
    console.log('mount isUserLoggedIn', isUserLoggedIn);
    return () => {
      console.log('unmount isUserLoggedIn', isUserLoggedIn);
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
