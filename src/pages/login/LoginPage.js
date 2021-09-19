import Login from 'components/login/login/Login';
import styles from './LoginPage.module.css';

function LoginPage(props) {
  return (
    <div className={styles.background}>
      <Login />
    </div>
  );
}

export default LoginPage;
