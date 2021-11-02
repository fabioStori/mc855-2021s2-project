import { GoogleGLogo } from 'assets';
import { useContext } from 'react';
import { AuthContext } from 'contexts';
import SVG from 'react-inlinesvg';
import styles from './GoogleLoginButton.module.css';

export default function GoogleLoginButton({ disabled }) {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext.showloginButton ? (
        <button
          onClick={authContext.signIn}
          className={disabled ? styles.disabledButton : styles.button}
          disabled={disabled}
        >
          <SVG
            src={GoogleGLogo}
            className={disabled ? styles.disabledSvg : styles.svg}
          />
          <span>Entre com o Google</span>
        </button>
      ) : (
        <button onClick={authContext.signOut} className={styles.button}>
          <SVG
            src={GoogleGLogo}
            className={disabled ? styles.disabledSvg : styles.svg}
          />
          <span>Sair da conta</span>
        </button>
      )}
    </div>
  );
}
