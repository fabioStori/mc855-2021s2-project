import { SimpleHeader } from 'components';
import { useStyles } from './Inicio.styles';

export default function Inicio(props) {
  const styles = useStyles();

  return (
    <div className={styles.pageContainer}>
      <SimpleHeader title="Página Inicial" />
    </div>
  );
}
