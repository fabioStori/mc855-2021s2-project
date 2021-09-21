import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext({
  currentUser: {},
  setCurrentUser: (user) => {},
  isUserLoggedIn: {},
  setIsUserLoggedIn: (isLoggedIn) => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState();

  const context = {
    currentUser,
    setCurrentUser,
    isUserLoggedIn,
    setIsUserLoggedIn,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
