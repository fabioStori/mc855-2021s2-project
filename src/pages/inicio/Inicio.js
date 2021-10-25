import { SimpleHeader } from 'components';
import styles from './Inicio.module.css';

export default function Inicio(props) {
  return (
    <div className={styles.pageContainer}>
      <SimpleHeader title="Página Inicial" />
    </div>
  );
}
