import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ContentHeader, ItensForm, SidePage, Tabela } from 'components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'redux/snackbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useStyles } from './Itens.styles';


export default function Itens() {
  const styles = useStyles();
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);

  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoClick');
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    console.log('onClose');
    setIsSidePageOpen(false);
  };

  const deleteItem = (item) => {
    MySwal.fire({
      title: `Confirma exclusão?`,
      html: `Deseja realmente excluir o item: <strong>${item.name}</strong>?`,
      showDenyButton: true,
      confirmButtonText: 'Exluir',
      confirmButtonColor: '#dc3545',
      denyButtonText: `Não Excluir`,
      denyButtonColor: '#6c757d',
      icon: 'question',
    }).then((result) => {      
      if (result.isConfirmed) {
        //TODO: ajax request to delete
        dispatch(setSnackbar(true, 'success', 'Item excluído com sucesso'));
      } else if (result.isDenied) {        
        MySwal.close();
      }
    });  
  }

  const duplicateItem = (item) => {
    setIsSidePageOpen(true);
    console.log(item);
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.4,
    },
    {
      field: 'lastMov',
      headerName: 'Última movimentação',
      flex: 0.3,
      type: 'dateTime',
    },
    {
      field: 'actions',
      headerName: 'Opções',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => deleteItem(params.row)}/>,
        <GridActionsCellItem icon={<ContentCopyIcon />} label="Clone" onClick={() => duplicateItem(params.row)}/>,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      name: 'Analisador de Redes Vetorial',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 2,
      name: 'Ultramicrótomo Ultracut UCT',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    { id: 3, name: 'Implantador de Íons', lastMov: new Date(1979, 0, 1, 0, 5) },
    { id: 4, name: 'Network Analyzer', lastMov: new Date(1979, 0, 1, 0, 5) },
    {
      id: 5,
      name: 'Analisador de espectro óptico',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    { id: 6, name: 'Bioanalyzer', lastMov: new Date(1979, 0, 1, 0, 5) },
    {
      id: 7,
      name: 'Sequenciador DNA SANGER',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 8,
      name: 'Canhão para biobalística',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 9,
      name: 'Tocador de Fita Cassete',
      lastMov: new Date(1979, 0, 1, 0, 5),
    },
    
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Itens"
          buttonLabel="Cadastrar novo"
          searchLabel="Pesquisar por item"
          searchPlaceholder="Nome ou Patrimônio"
          onButtonClick={onCadastrarNovoClick}
        />
        <Tabela columns={columns} rows={rows} />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <ItensForm closeSidePage={onClose} />
        </SidePage>
      ) : null}
    </div>
  );
}
