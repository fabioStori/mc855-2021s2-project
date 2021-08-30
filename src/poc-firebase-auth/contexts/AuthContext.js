import React, { createContext, useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { auth } from '../../firebase';
import styles from './AuthContext.module.css';

const AuthContext = createContext({
  currentUser: {},
  signup: (email, password) => {},
  login: (email, password) => {},
  resetPassword: (email) => {},
  updateEmail: (email) => {},
  updatePassword: (password) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(email, password) {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const context = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={context}>
      {loading ? (
        <div className={styles.container}>
          <Spinner animation="border"></Spinner>
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
