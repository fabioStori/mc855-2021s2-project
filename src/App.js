import LandingPage from 'pages/Landing';
import FirebaseAuth from 'poc-firebase-auth/pages/FirebaseAuth/FirebaseAuth';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/poc" component={FirebaseAuth} />
    </Switch>
  );
}

export default App;
