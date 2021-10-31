import { MultipleTextInputs, TextInput } from 'components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSnackbar } from 'redux/snackbar';
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

export default function ItensForm({ closeSidePage }) {
  const methods = useForm({ defaultValues: itensEmptyValues });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();
  const dispatch = useDispatch();

  const requestUrl = 'https://httpstat.us/200';
  let responseCode;

  const postRequest = (url, data) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then((response) => {
        responseCode = response.status;
        return response.ok;
      })
      .catch((response) => {
        responseCode = response;
        return false;
      });
  };

  async function onSubmitAndClose(data) {
    console.log('onSubmitAndClose formData', data);

    if (await postRequest(requestUrl, data)) {
      dispatch(setSnackbar(true, 'success', 'Item cadastrado com sucesso'));
      closeSidePage();
    } else {
      dispatch(
        setSnackbar(
          true,
          'error',
          `Erro ao cadastrar o item. Erro: ${responseCode}`
        )
      );
    }
  }

  async function onSubmitAndReset(data) {
    console.log('onSubmitAndReset formData', data);

    if (await postRequest(requestUrl, data)) {
      dispatch(setSnackbar(true, 'success', 'Item cadastrado com sucesso'));
      reset();
    } else {
      dispatch(
        setSnackbar(
          true,
          'error',
          `Erro ao cadastrar o item. Erro: ${responseCode}`
        )
      );
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
    </div>
  );
}
