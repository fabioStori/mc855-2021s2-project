import { ContentHeader } from 'components';
import classes from './Itens.module.css';

function Itens() {
  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoClick');
  };

  return (
    <div className={classes.pageContainer}>      
      {/* The code below is just for testing the ContentHeaderComponent */}
      <ContentHeader
        title="Itens"
        buttonLabel="Cadastrar novo item"
        searchLabel="Pesquisar por item"
        searchPlaceholder="Nome ou Patrimônio"
        onButtonClick={onCadastrarNovoClick}
      />
    </div>
  );
}

export default Itens;
