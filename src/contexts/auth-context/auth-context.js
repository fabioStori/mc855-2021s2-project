import axios from 'axios';
import { noop } from 'lodash';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { toast } from 'react-toastify';
import { API_BASE_URL } from 'services/constants';
import { StyledCircularProgress, useStyles } from './auth-context.styles';

const AuthContext = createContext({
  user: null,
  route: null,
  setUser: noop,
  setRoute: noop,
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
  const { children } = props;
  const [showloginButton, setShowLoginButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!user);
  const styles = useStyles();

  const onLoginFailure = useCallback(
    (response) => {
      const errorMessage = response.details ? response.details : response.error;
      toast.error(`Falha no login. ${errorMessage}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
      // eslint-disable-next-line
      console.error('Falha no Login', response);
      setShowLoginButton(true);
    },
    [setShowLoginButton]
  );

  const onSignOutSuccess = useCallback(() => {
    setUser(null);
    setShowLoginButton(true);
    setHasPermissionError(false);
  }, [setUser, setShowLoginButton, setHasPermissionError]);

  const onSignOutFailure = useCallback(
    (response) => {
      // eslint-disable-next-line
      alert(`Você não foi deslogado com sucesso. ${response.details}`);
      setShowLoginButton(false);
    },
    [setShowLoginButton]
  );

  const { signOut } = useGoogleLogout({
    clientId,
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: onSignOutSuccess,
    onFailure: onSignOutFailure,
  });

  const onLoginSuccess = useCallback(
    async (userData) => {
      axios
        .post(`${API_BASE_URL}/login`, {
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
    },
    [isUserLoggedIn, signOut]
  );

  const { signIn, loaded } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId,
    cookiePolicy: 'single_host_origin',
    prompt: 'select_account',
    accessType: 'offline',
    isSignedIn: true,
  });

  useEffect(() => {
    setIsUserLoggedIn(!!user);
    if (loaded) {
      setIsLoading(false);
    }
  }, [loaded, user]);

  const context = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

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
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthContext;
