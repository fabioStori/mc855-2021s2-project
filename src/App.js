import { Navbar, PrivateRoute } from 'components';
import { AuthContext } from 'contexts';
import { Itens, Login, Sensores, Sistema, TermosDeUso } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import classes from './App.module.css';

function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.appBackground}>
      <Navbar />
      <Switch>
        <PrivateRoute path="/" exact={true} component={Sistema} />
        <PrivateRoute path="/sensores" component={Sensores} />
        <PrivateRoute path="/itens" component={Itens} />

        <Route path="/login">
          {isUserLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/termos-de-uso" component={TermosDeUso} />

        <Route path="*">
          {/* Should redirect to 'page not found' route */}
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
