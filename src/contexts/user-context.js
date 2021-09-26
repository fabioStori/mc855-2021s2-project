import { createContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  setUser: (user) => null,
  isUserLoggedIn: false,
  showloginButton: true,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onSignOutSuccess: () => {},
  onSignOutFailure: () => {},
});

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

  const context = {
    user,
    setUser,
    isUserLoggedIn,
    showloginButton,
    onLoginSuccess,
    onLoginFailure,
    onSignOutSuccess,
    onSignOutFailure,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
