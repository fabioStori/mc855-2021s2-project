import { SimpleHeader } from 'components';
import classes from './Historico.module.css';

function Historico(props) {
  return (
    <div className={classes.pageContainer}>
      <SimpleHeader title="Histórico de movimentações" />
    </div>
  );
}

export default Historico;
