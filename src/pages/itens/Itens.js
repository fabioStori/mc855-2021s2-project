import { ContentHeader, ItensForm, SidePage, Tabela } from 'components';
import { useState } from 'react';
import { useStyles } from './Itens.styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Itens() {
  const styles = useStyles();

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);

  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoClick');
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    console.log('onClose');
    setIsSidePageOpen(false);
  };

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
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        <GridActionsCellItem icon={<ContentCopyIcon />} label="Clone" />,
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
