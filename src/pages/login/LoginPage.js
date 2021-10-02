import { Login } from 'components/login';
import classes from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={classes.background}>
      <Login />
    </div>
  );
}

export default LoginPage;
