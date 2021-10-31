import { Checkbox, Grid } from '@mui/material';
import { AuthContext } from 'contexts';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../google-login-button/GoogleLoginButton';
import { StyledFormControlLabel, useStyles } from './LoginForm.styles';

export default function LoginForm() {
  const { hasPermissionError, userEmail } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const styles = useStyles();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className={styles.background}>
      <Grid container alignItems="center" className={styles.wrapper}>
        <Grid item xs={2} />
        <Grid item xs={8} className={styles.wrapper}>
          <div className={styles.gridWrapper}>
            <p className={styles.title}>Entre na sua conta</p>
            <GoogleLoginButton disabled={!checked} />
            <div className={styles.checkboxWrapper}>
              <Checkbox
                size="small"
                checked={checked}
                onChange={handleChange}
              />
              <p className={styles.description}>
                Eu li e aceito os <Link to="/termos-de-uso">termos de uso</Link>{' '}
                termos de uso (obrigatório)
              </p>
            </div>
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
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
