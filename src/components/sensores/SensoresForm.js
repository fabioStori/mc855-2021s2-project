import { MultipleTextInputs, TextInput } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  StyledClearAllButton,
  StyledClearAllIcon,
  StyledPrimaryButton,
  StyledSecondaryButton,
  useStyles,
} from './SensoresForm.styles';
import {
  MultipleTextInputsFields,
  sensoresEmptyValues,
  TextInputsFields,
} from './SensoresFormFields';

export default function SensoresForm({ closeSidePage }) {
  const methods = useForm({ defaultValues: sensoresEmptyValues });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();

  const requestUrl = 'https://httpstat.us/401';
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
      toast.success('Sensor cadastrado com sucesso', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
      closeSidePage();
    } else {
      toast.error(`Erro ao cadastrar o sensor. Erro: ${responseCode}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
    }
  }

  async function onSubmitAndReset(data) {
    console.log('onSubmitAndReset formData', data);

    if (await postRequest(requestUrl, data)) {
      toast.success('Sensor cadastrado com sucesso', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
      reset();
    } else {
      toast.error(`Erro ao cadastrar o sensor. Erro: ${responseCode}`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
    }
  }

  const onClearAll = () => {
    console.log('onClearAll');
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <p className={styles.title}>Cadastrar Novo Sensor</p>

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
