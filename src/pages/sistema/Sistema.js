import GoogleLoginButton from 'components/login/google-login-button/GoogleLoginButton';
import styles from './Sistema.module.css';

function Sistema(props) {
  return (
    <>
      <GoogleLoginButton></GoogleLoginButton>
      <div className={styles.background}>Essa é a pagina do sistema</div>
    </>
  );
}

export default Sistema;
