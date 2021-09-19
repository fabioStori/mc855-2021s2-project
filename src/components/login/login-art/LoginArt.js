import styles from './LoginArt.module.css';
import whiteDots from '../../../assets/svg/login-white-dots.svg';

function LoginArt() {
  return (
    <div className={styles.wrapper}>
      <img src={whiteDots} className={styles.svg} />
      <div className={styles.background}></div>
    </div>
  );
}

export default LoginArt;
