import { ContentHeader, SensoresForm, SidePage, Tabela } from 'components';
import { useState } from 'react';
import { useStyles } from './Sensores.styles';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.2,
    },
    {
      field: 'local',
      headerName: 'Localização',
      flex: 0.2,
    },
    {
      field: 'patrimonio',
      headerName: 'Nº de patrimônio',
      flex: 0.2,
    },
    {
      field: 'lastActiv',
      headerName: 'Última ativação',
      flex: 0.2,
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
      name: 'Porta Entrada Principal',
      local: 'Local 1',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 2,
      name: 'Corredor Principal',
      local: 'Local 2',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 3,
      name: 'Porta IC',
      local: 'Local 3',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 4,
      name: 'Corredor IC',
      local: 'Local 4',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 5,
      name: 'Porta Sala 1',
      local: 'Local 5',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 6,
      name: 'Porta Sala 2',
      local: 'Local 6',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 7,
      name: 'Porta Sala 3',
      local: 'Local 10',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 8,
      name: 'Porta Entrada Principal',
      local: 'Local 12',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 9,
      name: 'Corredor Principal',
      local: 'Local 13',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 10,
      name: 'Porta IC',
      local: 'Local 19',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Sensores"
          buttonLabel="Cadastrar novo"
          searchLabel="Pesquisar por sensor"
          searchPlaceholder="Nome, Localização ou Patrimônio"
          onButtonClick={onCadastrarNovoClick}
        />
        <Tabela columns={columns} rows={rows} />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <SensoresForm closeSidePage={onClose} />
        </SidePage>
      ) : null}
    </div>
  );
}
