import { useContext } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import googleGLogo from '../../../assets/svg/google-g-logo.svg';
import UserContext from '../../../contexts/user-context';
import styles from './GoogleLoginButton.module.css';

const clientId = process.env.REACT_APP_FIREBASE_API_KEY;

function GoogleLoginButton() {
  const userContext = useContext(UserContext);
  const { signIn } = useGoogleLogin({
    onSuccess: userContext.onLoginSuccess,
    onFailure: userContext.onLoginFailure,
    clientId,
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    accessType: 'offline',
  });

  const { signOut } = useGoogleLogout({
    clientId,
    cookiePolicy: 'single_host_origin',
    onLogoutSuccess: userContext.onSignOutSuccess,
    onFailure: userContext.onSignOutFailure,
  });

  return (
    <div>
      {userContext.showloginButton ? (
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
