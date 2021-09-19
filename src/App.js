import LandingPage from 'pages/landing/Landing';
import LoginPage from 'pages/login/LoginPage';
import Sistema from 'pages/sistema/Sistema';
import FirebaseAuth from 'poc-firebase-auth/pages/FirebaseAuth/FirebaseAuth';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/sistema" component={Sistema} />
      <Route path="/poc" component={FirebaseAuth} />
    </Switch>
  );
}

export default App;
