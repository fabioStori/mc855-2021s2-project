import { TextInput, SelectInput } from 'components';
import { AuthContext } from 'contexts';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
  const { handleSubmit, reset, register, control } = methods;
  const styles = useStyles();
  const { accessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitAndClose(data) {
    data.creation_date = Date.now();
    setIsLoading(true);
    fetch(`https://api.invent-io.ic.unicamp.br/api/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ao cadastrar o usuário "${data.name}".`);
        }
      })
      .then((data) => {
        closeSidePage();
        setIsLoading(false);
        toast.success(`Usuário "${data.user}" cadastrado com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        updateRows();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  }

  async function onSubmitAndReset(data) {
    data.creation_date = Date.now();
    setIsLoading(true);
    fetch(`https://api.invent-io.ic.unicamp.br/api/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ao cadastrar o usuário "${data.name}".`);
        }
      })
      .then((data) => {
        reset(usuariosEmptyValues);
        setIsLoading(false);
        toast.success(`Usuário "${data.user}" cadastrado com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        updateRows();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
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
