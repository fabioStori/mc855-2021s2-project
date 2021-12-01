import { ContentCopy, Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import { ContentHeader, SensoresForm, SidePage, Tabela } from 'components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate } from 'utils/format-date';
import { useStyles } from './Sensores.styles';

export default function Sensores() {
  const styles = useStyles();
  const abortController = new AbortController();
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [contentHeaderFieldValue, setContentHeaderFieldValue] = useState([]);
  const [preSelectedFields, setPreSelectedFields] = useState({});
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.35,
    },
    {
      field: 'sensor_id',
      headerName: 'Nº de patrimônio',
      flex: 0.2,
    },
    {
      field: 'last_activ',
      headerName: 'Última ativação',
      flex: 0.35,
      type: 'dateTime',
    },
    {
      field: '_id',
      headerName: 'Database ID',
      hide: true,
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
    setPreSelectedFields([]);
    setIsSidePageOpen(false);
  };

  const showDataGridLoading = () => {
    setIsLoadingData(true);
  };

  const hideDataGridLoading = () => {
    setIsLoadingData(false);
  };

  const getRowsRequest = (query) => {
    showDataGridLoading();
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/search/sensor', {
        query: query.length ? query.join('|') : '.*',
        signal: abortController.signal,
      })
      .then((response) => {
        hideDataGridLoading();
        const rows = response.data.map((row) => {
          return {
            id: row.sensor_id,
            _id: row._id,
            name: row.name,
            sensor_id: row.sensor_id,
            last_activ: row.last_activ ? formatDate(row.last_activ) : '-',
          };
        });
        setRows(rows);
      })
      .catch((error) => {
        hideDataGridLoading();
        if (error.message !== 'The user aborted a request.') {
          toast.error('Erro ao consultar sensores. ' + error.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
        }
      });
  };

  const deleteSensorRequest = (sensor) => {
    axios
      .delete(`https://api.invent-io.ic.unicamp.br/api/v1/sensor/${sensor._id}`)
      .then(() => {
        toast.success(`Sensor ${sensor.name} excluído com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        getRowsRequest(contentHeaderFieldValue);
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
    axios
      .get(`https://api.invent-io.ic.unicamp.br/api/v1/sensor/${sensor._id}`)
      .then((response) => {
        delete response.data._id;
        response.data.sensor_id = null;
        response.data.tag = null;
        setPreSelectedFields(response.data);
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
        <Tabela
          columns={columns}
          rows={rows}
          updateRows={getRowsRequest}
          loading={isLoadingData}
        />
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
