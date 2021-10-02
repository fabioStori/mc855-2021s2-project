import { Navbar } from 'components/layout';
import PrivateRoute from 'components/private-route/PrivateRoute';
import AuthContext from 'contexts/auth-context';
import { LoginPage, Sensores, Sistema, TermosDeUso } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import classes from './App.module.css';

function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.appBackground}>
      <Navbar></Navbar>
      <Switch>
        <PrivateRoute path="/" exact={true} component={Sistema} />
        <PrivateRoute path="/sensores" exact={true} component={Sensores} />

        <Route path="/login">
          {isUserLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="/termos-de-uso" exact={true} component={TermosDeUso} />

        <Route path="*">
          {/* Should redirect to 'page not found' route */}
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
