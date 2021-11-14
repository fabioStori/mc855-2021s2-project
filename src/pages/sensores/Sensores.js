import { ContentCopy, Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ContentHeader, SensoresForm, SidePage, Tabela } from 'components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getSensorMock } from './sensores-mock';
import { useStyles } from './Sensores.styles';

export default function Sensores() {
  const styles = useStyles();
  const abortController = new AbortController();
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [contentHeaderFieldValue, setContentHeaderFieldValue] = useState([]);
  const [preSelectedFields, setPreSelectedFields] = useState({});
  const [rows, setRows] = useState([]);
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
      field: 'last_activ',
      headerName: 'Última ativação',
      flex: 0.2,
      type: 'dateTime',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opções',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteSensor(params.row)}
        />,
        <GridActionsCellItem
          icon={<ContentCopy />}
          label="Clone"
          onClick={() => duplicateSensor(params.row)}
        />,
      ],
    },
  ];

  const onCadastrarNovoClick = () => {
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    setIsSidePageOpen(false);
  };

  const getRowsRequest = (query) => {
    fetch('https://api.invent-io.ic.unicamp.br/api/v1/search/sensor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query.length ? query.join('|') : '.*',
      }),
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao carregar os sensores.');
        }
      })
      .then((data) => {
        const rows = data.map((row) => {
          return {
            id: row.sensor_id,
            name: row.name,
            local: row.local,
            sensor_id: row.sensor_id,
            last_activ: new Date(1979, 0, 1, 0, 5),
          };
        });
        setRows(rows);
      })
      .catch((error) => {
        if (error.message !== 'The user aborted a request.') {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
        }
      });
  };

  const deleteSensorRequest = (sensor) => {
    fetch(
      `https://api.invent-io.ic.unicamp.br/api/v1/sensor/${sensor.sensor_id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success(`Sensor ${sensor.name} excluído com sucesso`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
          getRowsRequest(contentHeaderFieldValue);
        } else {
          throw new Error(`Erro ao excluir o sensor ${sensor.name}`);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const deleteSensor = (sensor) => {
    Swal.fire({
      title: `Confirmar exclusão?`,
      html: `Deseja realmente excluir o sensor: <strong>${sensor.name}</strong>?`,
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#dc3545',
      denyButtonText: `Não Excluir`,
      denyButtonColor: '#6c757d',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSensorRequest(sensor);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  const duplicateSensor = (sensor) => {
    fetch(
      `https://api.invent-io.ic.unicamp.br/api/v1/sensor/${sensor.sensor_id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao buscar informações do sensor selecionado.');
        }
      })
      .then((data) => {
        // TODO: Replace with data after get request starts working
        getSensorMock.item_id = null;
        getSensorMock.tags = null;
        setPreSelectedFields(getSensorMock);
        setIsSidePageOpen(true);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  useEffect(() => {
    getRowsRequest(contentHeaderFieldValue);
    return () => {
      abortController.abort();
    };
  }, [contentHeaderFieldValue]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Sensores"
          buttonLabel="Cadastrar Novo"
          searchLabel="Pesquisar por sensor"
          searchPlaceholder="Nome, Localização ou Patrimônio"
          onButtonClick={onCadastrarNovoClick}
          setFieldValue={setContentHeaderFieldValue}
        />
        <Tabela columns={columns} rows={rows} />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <SensoresForm
            closeSidePage={onClose}
            updateRows={getRowsRequest}
            preSelectedFields={preSelectedFields}
          />
        </SidePage>
      ) : null}
    </div>
  );
}
