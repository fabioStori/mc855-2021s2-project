import { AuthContext } from 'contexts';
import { useContext, useEffect } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { isUserLoggedIn, route, setRoute } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!isUserLoggedIn) {
      setRoute(location.pathname);
    }

    if (isUserLoggedIn && !!route && route !== '/') {
      history.push(route);
    }

    return () => {
      if (isUserLoggedIn && !!route) {
        setRoute(null);
      }
    };
  }, [isUserLoggedIn, route, history, setRoute, location]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
