import { Grid } from '@material-ui/core';
import GoogleLoginButton from '../google-login-button/GoogleLoginButton';
import styles from './LoginForm.module.css';

function LoginForm() {
  return (
    <div className={styles.background}>
      <Grid container alignItems="center" className={styles.wrapper}>
        <Grid item xs={2} />
        <Grid item xs={8} className={styles.wrapper}>
          <div className={styles.gridWrapper}>
            <p className={styles.title}>Entre na sua conta</p>
            <GoogleLoginButton></GoogleLoginButton>
            <p className={styles.description}>
              Após fazer login com sua conta institucional da Unicamp, você será
              redirecionado para a página inicial do sistema.
            </p>
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

export default LoginForm;
