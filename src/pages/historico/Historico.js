import { Devices, Sensors } from '@mui/icons-material';
import { Box, Switch, FormControlLabel } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import {
  CustomDatePicker,
  MultipleTextInputs,
  SimpleHeader,
  Tabela,
} from 'components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate } from 'utils/format-date';
import { useStyles } from './Historico.styles';
import { itemPopUp } from './itemPopUp';
import { sensorPopUp } from './sensorPopUp';

const searchEmptyValues = {
  itens: [],
  sensores: [],
};

export default function Historico(props) {
  const methods = useForm({ defaultValues: searchEmptyValues });
  const { control } = methods;
  const styles = useStyles();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [afterDateValue, setAfterDateValue] = useState(null);
  const [beforeDateValue, setBeforeDateValue] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);
  const [searchSensorValue, setSearchSensorValue] = useState([]);
  const [searchItemValue, setSearchItemValue] = useState([]);
  const [showRangeError, setShowRangeError] = useState(null);
  const [rows, setRows] = useState([]);
  const abortController = new AbortController();

  const columns = [
    {
      field: 'id',
      headerName: 'Database ID',
      hide: true,
    },
    {
      field: 'item_name',
      headerName: 'Nome do item',
      flex: 0.3,
    },
    {
      field: 'sensor_name',
      headerName: 'Nome do sensor',
      flex: 0.3,
    },
    {
      field: 'event_timestamp',
      headerName: 'Ativação',
      flex: 0.2,
      type: 'dateTime',
    },

    {
      field: 'actions',
      headerName: 'Opções',
      type: 'actions',
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Devices />}
          label="Ver Item"
          onClick={() => showItem(params.row)}
        />,
        <GridActionsCellItem
          icon={<Sensors />}
          label="Ver Sensor"
          onClick={() => showSensor(params.row)}
        />,
      ],
    },
  ];

  const showItem = (data) => {
    console.log('showItem', data);
    Swal.fire({
      customClass: { popup: 'swal-wide' },
      title: `Informações do Item`,
      html: itemPopUp(data),
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#dc3545',
    });
  };

  const showSensor = (data) => {
    console.log('showSensor', data);
    Swal.fire({
      customClass: { popup: 'swal-wide' },
      title: `Informações do Sensor`,
      html: sensorPopUp(data),
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#dc3545',
    });
  };

  const toggleOnlyAlertSwitch = (event) => {
    setOnlyAlerts(event.target.checked);
  };

  const showDataGridLoading = () => {
    setIsLoadingData(true);
  };

  const hideDataGridLoading = () => {
    setIsLoadingData(false);
  };

  const getRowsRequest = (searchParams) => {
    const start_timestamp =
      new Date(searchParams.afterDateValue).getTime() / 1000;
    const end_timestamp =
      new Date(searchParams.beforeDateValue).getTime() / 1000;
    const item_query = searchParams.searchItemValue;
    const sensor_query = searchParams.searchSensorValue;
    showDataGridLoading();
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/search/event', {
        sensor_query: sensor_query.length ? sensor_query.join('|') : '.*',
        item_query: item_query.length ? item_query.join('|') : '.*',
        start_timestamp_range: start_timestamp ? start_timestamp : null,
        end_timestamp_range: end_timestamp ? end_timestamp : null,
        signal: abortController.signal,
        alert_only: onlyAlerts,
      })
      .then((response) => {
        hideDataGridLoading();
        const rows = response.data.map((row) => {
          return {
            id: row._id,
            item: row.item,
            item_name: row.item.name,
            sensor: row.sensor,
            sensor_name: row.sensor.name,
            event_timestamp: row.event_timestamp
              ? formatDate(row.event_timestamp * 1000)
              : '-',
            alert: row.alert,
          };
        });
        setRows(rows);
      })
      .catch((error) => {
        hideDataGridLoading();
        if (error.message !== 'The user aborted a request.') {
          toast.error('Erro ao consultar movimentações. ' + error.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
        }
      });
  };

  useEffect(() => {
    if (invalidDate === null) {
      if (
        afterDateValue &&
        beforeDateValue &&
        beforeDateValue <= afterDateValue
      ) {
        setShowRangeError(true);
      } else {
        setShowRangeError(false);
        getRowsRequest({
          searchItemValue: searchItemValue,
          searchSensorValue: searchSensorValue,
          afterDateValue: afterDateValue,
          beforeDateValue: beforeDateValue,
        });
      }
    }
    return () => {
      abortController.abort();
    };
  }, [
    afterDateValue,
    beforeDateValue,
    searchSensorValue,
    searchItemValue,
    invalidDate,
    onlyAlerts,
  ]);

  return (
    <div className={styles.pageContainer}>
      <SimpleHeader title="Histórico de movimentações" />

      <Box
        className={styles.wrapper}
        display={'flex'}
        flexDirection={{ xs: 'column', md: 'row' }}
        gap="12px"
        padding="18px"
      >
        <div>
          <div className={styles.dateWrapper}>
            <CustomDatePicker
              label="A partir de"
              dateValue={afterDateValue}
              setDateValue={setAfterDateValue}
              onInvalidDate={setInvalidDate}
            />
            <CustomDatePicker
              label="Até"
              dateValue={beforeDateValue}
              setDateValue={setBeforeDateValue}
              onInvalidDate={setInvalidDate}
            />
          </div>
          {showRangeError && (
            <p className={styles.dateError}>
              Período selecionado inválido - "A partir de" deve conter uma data
              anterior à data em "Antes de"
            </p>
          )}
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={onlyAlerts}
                  color="error"
                  onChange={(event) => toggleOnlyAlertSwitch(event)}
                />
              }
              label="Somente alertas"
            />
          </div>
        </div>
        <Box width={{ xs: '100%', md: '40%' }}>
          <MultipleTextInputs
            name="searchSensor"
            control={control}
            hasSearchIcon={true}
            setFieldValue={setSearchSensorValue}
            label="Pesquisar por Sensor"
            placeholder="Pesquisar por Sensor"
            helperText="Pressione ENTER para salvar um valor."
          />
        </Box>
        <Box width={{ xs: '100%', md: '40%' }}>
          <MultipleTextInputs
            name="searchItem"
            control={control}
            hasSearchIcon={true}
            setFieldValue={setSearchItemValue}
            label="Pesquisar por Item"
            placeholder="Pesquisar por Item"
            helperText="Pressione ENTER para salvar um valor."
          />
        </Box>
      </Box>
      <Tabela
        columns={columns}
        rows={rows}
        updateRows={getRowsRequest}
        searchParams={{
          searchItemValue: searchItemValue,
          searchSensorValue: searchSensorValue,
          afterDateValue: afterDateValue,
          beforeDateValue: beforeDateValue,
        }}
        loading={isLoadingData}
      />
    </div>
  );
}
