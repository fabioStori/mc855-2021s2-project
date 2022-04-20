import { TextInput, SelectInput } from 'components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from 'services/constants';
import {
  StyledClearAllButton,
  StyledClearAllIcon,
  StyledPrimaryButton,
  StyledSecondaryButton,
  useStyles,
} from './UsuariosForm.styles';
import {
  SelectInputsFields,
  usuariosEmptyValues,
  TextInputsFields,
} from './UsuariosFields';

export default function UsuariosForm({ closeSidePage, updateRows = () => {} }) {
  const methods = useForm({
    defaultValues: usuariosEmptyValues,
  });
  const { handleSubmit, reset, control } = methods;
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitAndClose(data) {
    data.creation_date = Date.now();
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/user`, data)
      .then(() => {
        updateRows();
        closeSidePage();
        toast.success(`Usuário "${data.email}" cadastrado com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
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
    data.creation_date = Date.now();
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/user`, data)
      .then(() => {
        updateRows();
        reset(usuariosEmptyValues);
        toast.success(`Usuário "${data.name}" cadastrado com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
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
    reset(usuariosEmptyValues);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headWrapper}>
        <p className={styles.title}>Cadastrar Novo Usuário</p>

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
      {SelectInputsFields.map((field) => (
        <SelectInput
          key={field.name}
          name={field.name}
          control={control}
          label={field.label}
          values={field.values}
          helperText={field.helperText}
          defaultValue={field.values[0].value}
        />
      ))}
      <span className={styles.helper}>
        <p>Níveis de permissão:</p>
        <ul>
          <li>Consulta: Consulta de itens, sensores e histórico.</li>
          <li>
            Manutenção: Consulta, cadastro e deleção de itens e sensores.
            Consulta de histórico.
          </li>
          <li>Administração: Acesso à todas as funcionalidades do sistema.</li>
        </ul>
      </span>

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
    </div>
  );
}
