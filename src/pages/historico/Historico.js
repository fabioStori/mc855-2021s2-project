import { Box } from '@mui/material';
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
import { useStyles } from './Historico.styles';

const searchEmptyValues = {
  itens: [],
  sensores: [],
};

export default function Historico(props) {
  const methods = useForm({ defaultValues: searchEmptyValues });
  const { control } = methods;
  const styles = useStyles();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [afterDateValue, setAfterDateValue] = useState(null);
  const [beforeDateValue, setBeforeDateValue] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);
  const [searchSensorValue, setSearchSensorValue] = useState(null);
  const [searchItemValue, setSearchItemValue] = useState(null);
  const [showRangeError, setShowRangeError] = useState(null);
  // const [rows, setRows] = useState([]);
  const abortController = new AbortController();

  const columns = [
    {
      field: 'itemName',
      headerName: 'Nome do item',
      flex: 0.4,
    },
    {
      field: 'sensorName',
      headerName: 'Nome do sensor',
      flex: 0.4,
    },
    {
      field: 'time',
      headerName: 'Data/Hora',
      flex: 0.3,
      type: 'dateTime',
    },
  ];

  const rows = [
    {
      id: 1,
      itemName: 'Analisador de Redes Vetorial',
      sensorName: 'Sensor 10',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 2,
      itemName: 'Ultramicrótomo Ultracut UCT',
      sensorName: 'Sensor 8',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 3,
      itemName: 'Implantador de Íons',
      sensorName: 'Sensor 7',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 4,
      itemName: 'Network Analyzer',
      sensorName: 'Sensor 6',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 5,
      itemName: 'Analisador de espectro óptico',
      sensorName: 'Sensor 5',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 6,
      itemName: 'Bioanalyzer',
      sensorName: 'Sensor 4',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 7,
      itemName: 'Sequenciador DNA SANGER',
      sensorName: 'Sensor 3',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 8,
      itemName: 'Canhão para biobalística',
      sensorName: 'Sensor 2',
      time: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 9,
      itemName: 'Tocador de Fita Cassete',
      sensorName: 'Sensor 1',
      time: new Date(1979, 0, 1, 0, 5),
    },
  ];

  const showDataGridLoading = () => {
    setIsLoadingData(true);
  };

  const hideDataGridLoading = () => {
    setIsLoadingData(false);
  };

  const getRowsRequest = (query) => {
    showDataGridLoading();
    axios
      .post('https://httpstat.us/200', {
        query: query.length ? query.join('|') : '.*',
        signal: abortController.signal,
      })
      .then((response) => {
        hideDataGridLoading();
        // const rows = response.data.map((row) => {
        //   return {
        //     id: row.item_id,
        //     _id: row._id,
        //     item_id: row.item_id,
        //     name: row.name,
        //     last_activity: row.last_activity
        //       ? formatDate(row.last_activity)
        //       : '-',
        //   };
        // });
        // setRows(rows);
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
        // TODO: MAKE REQUEST TO UPDATE TABLE
        setShowRangeError(false);
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
        loading={isLoadingData}
      />
    </div>
  );
}
