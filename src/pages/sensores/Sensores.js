import { ContentHeader, SensoresForm, SidePage } from 'components';
import { useState } from 'react';
import { useStyles } from './Sensores.styles';

export default function Sensores() {
  const styles = useStyles();

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);

  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoSensorClick');
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    console.log('onClose');
    setIsSidePageOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <ContentHeader
        title="Sensores"
        buttonLabel="Cadastrar novo"
        searchLabel="Pesquisar por sensor"
        searchPlaceholder="Nome, Localização ou Patrimônio"
        onButtonClick={onCadastrarNovoClick}
      />
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <SensoresForm closeSidePage={onClose} />
        </SidePage>
      ) : null}
    </div>
  );
}
