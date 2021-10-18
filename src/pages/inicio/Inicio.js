import { SimpleHeader } from 'components';
import styles from './Inicio.module.css';

function Inicio(props) {
  return (
    <>
      <div className={styles.pageContainer}>
        <SimpleHeader
          title="Página Inicial"                    
        />
      </div>
    </>
  );
}

export default Inicio;
