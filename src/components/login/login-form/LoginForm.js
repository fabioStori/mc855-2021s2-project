import { Grid } from '@material-ui/core';
import { AuthContext } from 'contexts';
import { useContext } from 'react';
import GoogleLoginButton from '../google-login-button/GoogleLoginButton';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { hasPermissionError, userEmail } = useContext(AuthContext);

  return (
    <div className={styles.background}>
      <Grid container alignItems="center" className={styles.wrapper}>
        <Grid item xs={2} />
        <Grid item xs={8} className={styles.wrapper}>
          <div className={styles.gridWrapper}>
            <p className={styles.title}>Entre na sua conta</p>
            <GoogleLoginButton />
            {hasPermissionError ? (
              <p className={styles.error}>
                O email {userEmail} não tem permissão para acessar o sistema.
                Por favor, utilize outra conta ou entre em contato com um
                administrador do sistema.
              </p>
            ) : (
              <p className={styles.description}>
                Após fazer login com sua conta institucional da Unicamp, você
                será redirecionado para a página inicial do sistema.
              </p>
            )}
            <span className={styles.space}></span>
            <p className={styles.message}>
              Ainda não tem uma conta? Entre em contato com nosso suporte:
              advear.ramos@gmail.com
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
