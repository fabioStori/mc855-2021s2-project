import { ContentHeader } from 'components';
import classes from './Sensores.module.css';

export default function Sensores() {
  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoSensorClick');
  };

  return (
    <div className={classes.pageContainer}>
      <ContentHeader
        title="Sensores"
        buttonLabel="Cadastrar novo"
        searchLabel="Pesquisar por sensor"
        searchPlaceholder="Nome, Localização ou Patrimônio"
        onButtonClick={onCadastrarNovoClick}
      />
    </div>
  );
}
