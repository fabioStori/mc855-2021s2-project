import { Login } from 'components/login';
import AuthContext from 'contexts/auth-context';
import { useContext } from 'react';
import classes from './LoginPage.module.css';

function LoginPage() {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <div className={classes.background}>
      <Login />
    </div>
  );
}

export default LoginPage;
