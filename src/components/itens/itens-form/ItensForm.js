import { Alert, Snackbar } from '@mui/material';
import { MultipleTextInputs, TextInput } from 'components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledClearAllButton,
  StyledClearAllIcon,
  StyledPrimaryButton,
  StyledSecondaryButton,
  useStyles,
} from './ItensForm.styles';
import {
  itensEmptyValues,
  MultipleTextInputsFields,
  TextInputsFields,
} from './ItensFormFields';

const postRequest = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export default function ItensForm({ closeSidePage }) {
  const methods = useForm({ defaultValues: itensEmptyValues });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const requestUrl = 'https://httpstat.us/200';

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  async function onSubmitAndClose(data) {
    console.log('onSubmitAndClose formData', data);

    if (await postRequest(requestUrl, data)) {
      console.log('HANDLE SUCCESS ON SUBMISSION');
      setOpenSuccessSnackbar(true);
      closeSidePage();
    } else {
      console.log('HANDLE ERROR ON SUBMISSION');
      setOpenErrorSnackbar(true);
    }
  }

  async function onSubmitAndReset(data) {
    console.log('onSubmitAndReset formData', data);

    if (await postRequest(requestUrl, data)) {
      console.log('HANDLE SUCCESS ON SUBMISSION');
      setOpenSuccessSnackbar(true);
      reset();
    } else {
      console.log('HANDLE ERROR ON SUBMISSION');
      setOpenErrorSnackbar(true);
    }
  }

  const onClearAll = () => {
    console.log('onClearAll');
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <p className={styles.title}>Cadastrar Novo Item</p>

        <StyledClearAllButton
          onClick={onClearAll}
          variant="outlined"
          startIcon={<StyledClearAllIcon />}
        >
          Limpar campos
        </StyledClearAllButton>
      </div>
      {TextInputsFields.map((field) => (
        <TextInput
          key={field.name}
          name={field.name}
          control={control}
          label={field.label}
          placeholder={field.placeholder}
        />
      ))}
      {MultipleTextInputsFields.map((field) => (
        <MultipleTextInputs
          key={field.name}
          name={field.name}
          control={control}
          isForm={true}
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          style={{ margin: '20px 0', width: '100%' }}
        />
      ))}

      <StyledPrimaryButton
        onClick={handleSubmit(onSubmitAndClose)}
        variant="contained"
      >
        Cadastrar e fechar
      </StyledPrimaryButton>

      <StyledSecondaryButton
        onClick={handleSubmit(onSubmitAndReset)}
        variant="contained"
      >
        Cadastrar e limpar
      </StyledSecondaryButton>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Item cadastrado com sucesso
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          Erro ao cadastrar o item
        </Alert>
      </Snackbar>
    </div>
  );
}
