import { Footer, Navbar, PrivateRoute } from 'components';
import Snackbar from 'components/shared/snackbar/Snackbar';
import { AuthContext } from 'contexts';
import { Login, Sistema } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';

export default function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.appBackground}>
      <Navbar />
      <Snackbar />
      <Switch>
        <Route path="/login">
          {isUserLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <PrivateRoute path="/" component={Sistema} />
        <Route path="*">
          <Redirect to="/not-found" />
          {/* Should redirect to 'page not found' route */}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
