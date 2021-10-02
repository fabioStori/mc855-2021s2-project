import { useContext } from 'react';
import googleGLogo from '../../../assets/svg/google-g-logo.svg';
import AuthContext from '../../../contexts/auth-context';
import styles from './GoogleLoginButton.module.css';

function GoogleLoginButton() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext.showloginButton ? (
        <button onClick={authContext.signIn} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Entre com o Google</span>
        </button>
      ) : (
        <button onClick={authContext.signOut} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Sair da conta</span>
        </button>
      )}
    </div>
  );
}
export default GoogleLoginButton;
