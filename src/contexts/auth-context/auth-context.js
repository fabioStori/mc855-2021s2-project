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
        if (response.ok) {
          // TODO: Adjust this part during the task MC855-78
          setUserEmail(profileObj.email);
          return allowedUsers.includes(profileObj.email);
        } else {
          throw new Error('Erro ao checar permissão do usuário');
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        return false;
      });
  };

  async function onLoginSuccess(response) {
    console.log('profileObj', response);
    if (await checkUserHasPermission(response.profileObj)) {
      setUser(response.profileObj);
      setShowLoginButton(false);
      setHasPermissionError(false);
    } else {
      toast.error(
        `Usuário ${response.profileObj.email} não tem permissão para acessar a aplicação. Por favor, utilize outra conta ou entre em contato com um administrador do sistema.`,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        }
      );
      if (isUserLoggedIn) {
        signOut();
      }
      setHasPermissionError(true);
    }
  }

  const onLoginFailure = (response) => {
    toast.error('Falha no login. ' + response.details, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 4000,
    });
    console.error('Falha no Login', response);
    setShowLoginButton(true);
  };

  const onSignOutSuccess = () => {
    alert('Você foi deslogado com sucesso');
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
