import { Container, Grid } from '@material-ui/core';
import { LoginArt, LoginForm } from '..';
import styles from './Login.module.css';

function Login(props) {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Grid container spacing={0} className={styles.gridContainer}>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={6}>
          <LoginArt />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
