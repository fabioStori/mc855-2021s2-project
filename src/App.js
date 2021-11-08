import { Footer, Navbar, PrivateRoute } from 'components';
import { AuthContext } from 'contexts';
import { Login, Sistema } from 'pages';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

export default function App() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.appBackground}>
      <Navbar />
      <ToastContainer />
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
