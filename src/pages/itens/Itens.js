import { ContentHeader, ItensForm, SidePage } from 'components';
import { useState } from 'react';
import { useStyles } from './Itens.styles';

export default function Itens() {
  const styles = useStyles();

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);

  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoClick');
    setIsSidePageOpen(!isSidePageOpen);
  };

  const onClose = () => {
    console.log('onClose');
    setIsSidePageOpen(false);
  };

  return (
    <div className={styles.pageContainer}>
      <ContentHeader
        title="Itens"
        buttonLabel="Cadastrar novo item"
        searchLabel="Pesquisar por item"
        searchPlaceholder="Nome ou Patrimônio"
        onButtonClick={onCadastrarNovoClick}
      />
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <ItensForm closeSidePage={onClose} />
        </SidePage>
      ) : null}
    </div>
  );
}
