import PrivateRoute from 'components/private-route/PrivateRoute';
import { UserProvider } from 'contexts/UserProvider';
import LandingPage from 'pages/landing/Landing';
import LoginPage from 'pages/login/LoginPage';
import Sistema from 'pages/sistema/Sistema';
import FirebaseAuth from 'poc-firebase-auth/pages/FirebaseAuth/FirebaseAuth';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function App() {
  let match = useRouteMatch();
  return (
    <UserProvider>
      <Switch>
        <Route path="/" exact={true} component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/poc" component={FirebaseAuth} />
        <PrivateRoute path="/sistema" component={Sistema} />
      </Switch>
    </UserProvider>
  );
}

export default App;
