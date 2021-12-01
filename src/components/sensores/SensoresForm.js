import axios from 'axios';
import { MultipleTextInputs, TextInput } from 'components';
import { useState } from 'react';
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

export default function SensoresForm({
  closeSidePage,
  updateRows = (query) => {},
  preSelectedFields = {},
  editMode = false,
}) {
  const methods = useForm({
    defaultValues: preSelectedFields ? preSelectedFields : sensoresEmptyValues,
  });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitAndClose(data) {
    setIsLoading(true);
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/sensor', data)
      .then(() => {
        toast.success('Sensor cadastrado com sucesso', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        closeSidePage();
        updateRows(['.*']);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        setIsLoading(false);
      });
  }

  async function onSubmitAndReset(data) {
    setIsLoading(true);
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/sensor', data)
      .then(() => {
        toast.success('Sensor cadastrado com sucesso', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        reset(sensoresEmptyValues);
        updateRows(['.*']);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        setIsLoading(false);
      });
  }

  async function onSubmitEditAndClose(data) {
    setIsLoading(true);
    const sensorId = data._id;
    delete data._id;
    axios
      .put(
        `https://api.invent-io.ic.unicamp.br/api/v1/sensor/${sensorId}`,
        data
      )
      .then(() => {
        toast.success('Item cadastrado com sucesso', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        closeSidePage();
        updateRows(['.*']);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        setIsLoading(false);
      });
  }

  const onClearAll = () => {
    reset(sensoresEmptyValues);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <p className={styles.title}>
          {editMode ? 'Editar Cadastro do Sensor' : 'Cadastrar Novo Sensor'}
        </p>

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
          isRequired={field.name !== 'types'}
          name={field.name}
          control={control}
          isForm={true}
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          style={{ margin: '20px 0', width: '100%' }}
        />
      ))}
      {editMode ? (
        <>
          <StyledPrimaryButton
            onClick={handleSubmit(onSubmitEditAndClose)}
            loading={isLoading}
            variant="contained"
          >
            Salvar alterações
          </StyledPrimaryButton>
        </>
      ) : (
        <>
          <StyledPrimaryButton
            onClick={handleSubmit(onSubmitAndClose)}
            loading={isLoading}
            variant="contained"
          >
            Cadastrar e fechar
          </StyledPrimaryButton>

          <StyledSecondaryButton
            onClick={handleSubmit(onSubmitAndReset)}
            loading={isLoading}
            variant="contained"
          >
            Cadastrar e limpar
          </StyledSecondaryButton>
        </>
      )}
    </div>
  );
}
