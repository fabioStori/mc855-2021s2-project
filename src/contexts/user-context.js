import { createContext, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

const UserContext = createContext({
  user: null,
  setUser: (user) => null,
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

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showloginButton, setShowLoginButton] = useState(true);
  const isUserLoggedIn = !!user;

  const onLoginSuccess = (res) => {
    console.log('Sucesso no login');
    setUser(res.profileObj);
    setShowLoginButton(false);
  };

  const onLoginFailure = () => {
    console.log('Falha no login');
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

  const { signIn } = useGoogleLogin({
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

  const context = {
    user,
    setUser,
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
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
