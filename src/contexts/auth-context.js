import { CircularProgress } from '@material-ui/core';
import { createContext, useEffect, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import classes from './auth-context.module.css';
import { useStyles } from './auth-context.styles';

const AuthContext = createContext({
  user: null,
  route: null,
  setUser: (user) => null,
  setRoute: (route) => null,
  isUserLoggedIn: false,
  showloginButton: true,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onSignOutSuccess: () => {},
  onSignOutFailure: () => {},
  signIn: () => {},
  signOut: () => {},
});

const clientId = process.env.REACT_APP_CLIENT_ID;

export const AuthContextProvider = (props) => {
  const [showloginButton, setShowLoginButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [user, setUser] = useState(null);
  const isUserLoggedIn = !!user;
  const styles = useStyles();

  const onLoginSuccess = (res) => {
    console.log('Sucesso no login', res);
    setUser(res.profileObj);
    setShowLoginButton(false);
  };

  const onLoginFailure = (res) => {
    console.log('Falha no login', res);
    setShowLoginButton(true);
  };

  const onSignOutSuccess = () => {
    alert('Você foi deslogado com sucesso');
    setUser(null);
    setShowLoginButton(true);
  };

  const onSignOutFailure = () => {
    alert('Você não foi deslogado com sucesso');

    setShowLoginButton(false);
  };

  const { signIn, loaded: loginLoaded } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    accessType: 'offline',
  });

  const { signOut } = useGoogleLogout({
    clientId,
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: onSignOutSuccess,
    onFailure: onSignOutFailure,
  });

  useEffect(() => {
    if (loginLoaded) {
      setIsLoading(false);
    }
  }, [loginLoaded]);

  const context = {
    user,
    setUser,
    route,
    setRoute,
    isUserLoggedIn,
    showloginButton,
    onLoginSuccess,
    onLoginFailure,
    onSignOutSuccess,
    onSignOutFailure,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={context}>
      {isLoading ? (
        <div className={classes.container}>
          <CircularProgress size={75} className={styles.circularProgress} />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
