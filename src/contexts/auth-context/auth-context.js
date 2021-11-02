import { CircularProgress } from '@material-ui/core';
import { createContext, useEffect, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useStyles } from './auth-context.styles';

const AuthContext = createContext({
  user: null,
  route: null,
  setUser: (user) => null,
  setRoute: (route) => null,
  isUserLoggedIn: false,
  hasPermissionError: false,
  showloginButton: true,
  userEmail: '',
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onSignOutSuccess: () => {},
  onSignOutFailure: () => {},
  signIn: () => {},
  signOut: () => {},
});

const clientId = process.env.REACT_APP_CLIENT_ID;

// TODO: Remove next line during the task MC855-78
const allowedUsers = [
  'f196631@dac.unicamp.br',
  'f171036@dac.unicamp.br',
  'g172111@dac.unicamp.br',
  'a193325@dac.unicamp.br',
  'jufborin@unicamp.br',
  'soraia@ic.unicamp.br',
];

export const AuthContextProvider = (props) => {
  const [showloginButton, setShowLoginButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const styles = useStyles();
  let isUserLoggedIn = !!user;

  const checkUserHasPermission = (profileObj) => {
    return fetch(`'https://httpstat.us/200'`, {
      method: 'GET',
    })
      .then((response) => {
        // TODO: Adjust this part during the task MC855-78
        setUserEmail(profileObj.email);
        return allowedUsers.includes(profileObj.email);
      })
      .catch(() => {
        console.error('ERROR CHECKING USER PERMISSION');
        return false;
      });
  };

  async function onLoginSuccess(res) {
    console.log('profileObj', res);
    if (await checkUserHasPermission(res.profileObj)) {
      console.log('Usuário tem permissão para acessar a aplicação');
      setUser(res.profileObj);
      setShowLoginButton(false);
      setHasPermissionError(false);
    } else {
      console.error(
        `Usuário ${res.profileObj.email} não tem permissão para acessar a aplicação`
      );
      if (isUserLoggedIn) {
        signOut();
      }
      setHasPermissionError(true);
    }
  }

  const onLoginFailure = (res) => {
    console.log('Falha no login', res);
    setShowLoginButton(true);
  };

  const onSignOutSuccess = () => {
    alert('Você foi deslogado com sucesso');
    setUser(null);
    setShowLoginButton(true);
    setHasPermissionError(false);
  };

  const onSignOutFailure = () => {
    alert('Você não foi deslogado com sucesso');

    setShowLoginButton(false);
  };

  const { signIn, loaded: loaded } = useGoogleLogin({
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
    isUserLoggedIn = !!user;
    if (loaded) {
      setIsLoading(false);
    }
  }, [loaded, user]);

  const context = {
    user,
    setUser,
    route,
    setRoute,
    isUserLoggedIn,
    hasPermissionError,
    showloginButton,
    userEmail,
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
        <div className={styles.container}>
          <CircularProgress size={75} className={styles.circularProgress} />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
