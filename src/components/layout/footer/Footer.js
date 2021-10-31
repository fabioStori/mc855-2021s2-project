import { Link } from 'react-router-dom';
import { useStyles } from './Footer.styles';

export default function Footer() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <p className={styles.text}>Inventio - 2021</p>
      <Link to="/termos-de-uso" className={styles.text}>
        Termos de Uso
      </Link>
    </div>
  );
}
