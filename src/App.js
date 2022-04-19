import axios from 'axios';
import { Footer, Navbar, PrivateRoute } from 'components';
import { AuthContext } from 'contexts';
import { Login, Sistema } from 'pages';
import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledAlert, useStyles } from './App.styles';

export default function App() {
  const { isUserLoggedIn, accessToken, signOut } = useContext(AuthContext);
  const history = useHistory();
  const styles = useStyles();

  useEffect(() => {
    axios.defaults.headers.common.Authorization = `bearer ${accessToken}`;
  }, [accessToken]);

  useEffect(() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.message.includes('403')) {
          error.message =
            'Seu usuário atual não possui permissão para realizar essa ação.';
        } else if (error.message.includes('498')) {
          signOut();
          history.push('/login');
          error.message =
            'Seu tempo de acesso expirou. Por favor, faça login novamente.';
        } else if (error.message.includes('401')) {
          signOut();
          history.push('/login');
          error.message =
            'Seu usuário não está cadastrado no sistema. Por favor, entre em contato com um administrador.';
        }
        return Promise.reject(error);
      }
    );
  }, [history, signOut]);

  return (
    <div className={styles.appBackground}>
      <Navbar />
      <StyledAlert severity="warning">
        Para melhor experiência, utilize uma janela com dimensões maiores que
        1360x768
      </StyledAlert>
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
