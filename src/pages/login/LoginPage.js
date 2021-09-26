import { Login } from 'components/login';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={styles.background}>
      <Login />
    </div>
  );
}

export default LoginPage;
