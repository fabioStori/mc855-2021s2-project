import PrivateRoute from 'components/private-route/PrivateRoute';
import UserContext from 'contexts/user-context';
import { LoginPage, Sistema } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function App() {
  const userContext = useContext(UserContext);

  return (
    <Switch>
      <PrivateRoute path="/" exact={true} component={Sistema} />
      <Route path="/login">
        {!userContext.isUserLoggedIn && <LoginPage />}
        {userContext.isUserLoggedIn && <Redirect to="/sistema" />}
      </Route>

      <Route path="*">
        {/* Should redirect to 'page not found' route */}
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
