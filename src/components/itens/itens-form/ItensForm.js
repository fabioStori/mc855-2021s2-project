import { MultipleTextInputs, TextInput } from 'components';
import { AuthContext } from 'contexts';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

export default function ItensForm({
  closeSidePage,
  updateRows = (query) => {},
  preSelectedFields = {},
}) {
  const methods = useForm({
    defaultValues: preSelectedFields ? preSelectedFields : itensEmptyValues,
  });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();
  const { accessToken } = useContext(AuthContext);

  let responseCode;

  async function onSubmitAndClose(data) {
    console.log('data', data);
    fetch('https://api.invent-io.ic.unicamp.br/api/v1/item', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          responseCode = response.status;
          toast.success('Item cadastrado com sucesso', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
          closeSidePage();
          updateRows(['.*']);
        } else {
          responseCode = response.status;
          throw new Error(`Erro ao cadastrar o item. Erro: ${responseCode}`);
        }
      })
      .catch((error) => {
        responseCode = error;
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  }

  async function onSubmitAndReset(data) {
    console.log('data', data);
    fetch('https://api.invent-io.ic.unicamp.br/api/v1/item', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          responseCode = response.status;
          toast.success('Item cadastrado com sucesso', {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
          reset(itensEmptyValues);
          updateRows(['.*']);
        } else {
          responseCode = response.status;
          throw new Error(`Erro ao cadastrar o item. Erro: ${responseCode}`);
        }
      })
      .catch((error) => {
        responseCode = error;
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  }

  const onClearAll = () => {
    reset(itensEmptyValues);
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
          helperText={field.helperText}
        />
      ))}
      {MultipleTextInputsFields.map((field) => (
        <MultipleTextInputs
          key={field.name}
          isRequired={
            field.name !== 'location_blacklist' &&
            field.name !== 'location_whitelist'
          }
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
