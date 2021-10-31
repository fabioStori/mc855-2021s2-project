import { Container, Grid } from '@mui/material';
import { LoginArt, LoginForm } from 'components';
import { useStyles } from './Login.styles';

export default function Login() {
  const styles = useStyles();

  return (
    <div className={styles.pageContainer}>
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
    </div>
  );
}
