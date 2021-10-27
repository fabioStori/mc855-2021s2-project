import { Container, Grid } from '@mui/material';
import { LoginArt, LoginForm } from 'components';
import classes from './Login.module.css';

export default function Login() {
  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={0} className={classes.gridContainer}>
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
