import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Box } from '@mui/material';
import ptBRLocale from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { StyledTextField, useStyles } from './CustomDatePicker.styles';

export default function CustomDatePicker({
  label,
  dateValue,
  setDateValue,
  onInvalidDate,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const styles = useStyles();

  const setErrorMessageHandler = (error) => {
    if (error === 'minDate') {
      setErrorMessage('Data muito antiga');
    }
    if (error === 'maxDate') {
      setErrorMessage('Data muito no futuro');
    }
    if (error === 'invalidDate') {
      setErrorMessage('Data inválida');
    }
    if (error === null) {
      setErrorMessage(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBRLocale}>
      <Box display="flex" flexDirection="column">
        <DatePicker
          label={label}
          value={dateValue}
          todayText="today"
          showToolbar
          showTodayButton
          onChange={(newValue) => {
            setDateValue(newValue);
          }}
          onError={(error) => {
            setErrorMessageHandler(error);
            onInvalidDate(error);
          }}
          renderInput={(params) => <StyledTextField {...params} />}
        />
        <p className={styles.dateError}>{errorMessage}</p>
      </Box>
    </LocalizationProvider>
  );
}
