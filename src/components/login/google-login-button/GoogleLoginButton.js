import React, { useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import googleGLogo from '../../../assets/svg/google-g-logo.svg';
import styles from './GoogleLoginButton.module.css';

const clientId =
  '618063545396-3ebb0fs8cc30mm53gftl6nnlaq1rs3do.apps.googleusercontent.com';

function GoogleLoginButton() {
  const [showloginButton, setShowloginButton] = useState(true);
  const history = useHistory();

  const onLoginSuccess = (res) => {
    console.log('Sucesso no login:', res.profileObj);
    setShowloginButton(false);
    history.push('/sistema');
  };

  const onLoginFailure = (res) => {
    console.log('Falha no login:', res);
    setShowloginButton(true);
  };

  const onSignOutSuccess = () => {
    alert('Você foi deslogado com sucesso');
    history.push('/login');
    setShowloginButton(true);
  };

  const onSignOutFailure = () => {
    alert('Você não foi deslogado com sucesso');
    setShowloginButton(false);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onFailure: onLoginFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: onSignOutSuccess,
    onFailure: onSignOutFailure,
  });

  return (
    <div>
      {showloginButton ? (
        <button onClick={signIn} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Entre com o Google</span>
        </button>
      ) : (
        <button onClick={signOut} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Sair da conta</span>
        </button>
      )}
    </div>
  );
}
export default GoogleLoginButton;
