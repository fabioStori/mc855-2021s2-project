import { Navbar, PrivateRoute } from 'components';
import { AuthContext } from 'contexts';
import { Login, Sistema, TermosDeUso } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';

export default function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.appBackground}>
      <Navbar />
      <Switch>
        <Route path="/login">
          {isUserLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <PrivateRoute path="/" component={Sistema} />
        <Route path="/termos-de-uso" component={TermosDeUso} />
        <Route path="*">
          {/* Should redirect to 'page not found' route */}
        </Route>
      </Switch>
    </div>
  );
}
