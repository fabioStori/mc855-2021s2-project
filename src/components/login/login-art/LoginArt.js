import { LoginWhiteDots } from 'assets';
import styles from './LoginArt.module.css';

export default function LoginArt() {
  return (
    <div className={styles.wrapper}>
      <img src={LoginWhiteDots} className={styles.svg} alt="inventio-logo" />
      <div className={styles.background} />
    </div>
  );
}
