import { GoogleGLogo } from 'assets';
import { useContext } from 'react';
import { AuthContext } from 'contexts';
import styles from './GoogleLoginButton.module.css';

export default function GoogleLoginButton() {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext.showloginButton ? (
        <button onClick={authContext.signIn} className={styles.button}>
          <img src={GoogleGLogo} className={styles.svg} />
          <span>Entre com o Google</span>
        </button>
      ) : (
        <button onClick={authContext.signOut} className={styles.button}>
          <img src={GoogleGLogo} className={styles.svg} />
          <span>Sair da conta</span>
        </button>
      )}
    </div>
  );
}
