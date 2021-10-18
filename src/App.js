import { Grid } from '@mui/material';
import { Navbar, PrivateRoute, SideMenu } from 'components';
import { AuthContext } from 'contexts';
import { Itens, Login, Sensores, Sistema, Historico, TermosDeUso } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.appBackground}>
      <Navbar />
        <Switch>
          <Route path="/login">
            {isUserLoggedIn ? <Redirect to="/sistema" /> : <Login />}
          </Route>
          <Route path="/" exact={true}>
            {isUserLoggedIn ? <Redirect to="/sistema/" /> : <Login />}
          </Route>
          <Route path="/termos-de-uso" component={TermosDeUso} />
          <PrivateRoute path="/sistema/" component={Sistema} />
          <Route path="*">
            {/* Should redirect to 'page not found' route */}          
          </Route>
        </Switch>           
    </div>
  );
}

export default App;
