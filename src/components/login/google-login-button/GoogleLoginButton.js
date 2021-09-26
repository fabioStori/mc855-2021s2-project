import { useContext } from 'react';
import googleGLogo from '../../../assets/svg/google-g-logo.svg';
import UserContext from '../../../contexts/user-context';
import styles from './GoogleLoginButton.module.css';

function GoogleLoginButton() {
  const userContext = useContext(UserContext);

  return (
    <div>
      {userContext.showloginButton ? (
        <button onClick={userContext.signIn} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Entre com o Google</span>
        </button>
      ) : (
        <button onClick={userContext.signOut} className={styles.button}>
          <img src={googleGLogo} className={styles.svg} />
          <span>Sair da conta</span>
        </button>
      )}
    </div>
  );
}
export default GoogleLoginButton;
