import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';
import { StyledCircularProgress, useStyles } from './auth-context.styles';

const AuthContext = createContext({
  user: null,
  route: null,
  setUser: (user) => null,
  setRoute: (route) => null,
  isUserLoggedIn: false,
  hasPermissionError: false,
  showloginButton: true,
  userEmail: '',
  accessToken: '',
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
  const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const styles = useStyles();
  let isUserLoggedIn = !!user;

  async function onLoginSuccess(userData) {
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/login', {
        email: userData.profileObj.email,
        access_token: userData.tokenObj.access_token,
        id_token: userData.tokenId,
      })
      .then((response) => {
        setAccessToken(response.data.access_token);
        setUserEmail(userData.email);
        setUser(userData.profileObj);
        setShowLoginButton(false);
        setHasPermissionError(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        if (isUserLoggedIn) {
          signOut();
        }
        setHasPermissionError(true);
      });
  }

  const onLoginFailure = (response) => {
    const errorMessage = response.details ? response.details : response.error;
    toast.error('Falha no login. ' + errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 4000,
    });
    console.error('Falha no Login', response);
    setShowLoginButton(true);
  };

  const onSignOutSuccess = () => {
    setUser(null);
    setShowLoginButton(true);
    setHasPermissionError(false);
  };

  const onSignOutFailure = (response) => {
    alert('Você não foi deslogado com sucesso. ' + response.details);
    setShowLoginButton(false);
  };

  const { signIn, loaded: loaded } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId,
    cookiePolicy: 'single_host_origin',
    prompt: 'select_account',
    accessType: 'offline',
    isSignedIn: true,
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
    accessToken,
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
          <StyledCircularProgress
            size={75}
            className={styles.circularProgress}
          />
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
