import { Box } from '@mui/material';
import { CustomDatePicker, MultipleTextInputs, SimpleHeader } from 'components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './Historico.styles';

const searchEmptyValues = {
  itens: [],
  sensores: [],
};

export default function Historico(props) {
  const methods = useForm({ defaultValues: searchEmptyValues });
  const { control } = methods;
  const styles = useStyles();
  const [afterDateValue, setAfterDateValue] = useState(null);
  const [beforeDateValue, setBeforeDateValue] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);
  const [searchSensorValue, setSearchSensorValue] = useState(null);
  const [searchItemValue, setSearchItemValue] = useState(null);
  const [showRangeError, setShowRangeError] = useState(null);

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
              label="Antes de"
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
            helperText="Pressione enter para salvar um valor"
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
            helperText="Pressione enter para salvar um valor"
          />
        </Box>
      </Box>
    </div>
  );
}
