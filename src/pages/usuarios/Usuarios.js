import { Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Tabela, TextInput } from 'components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { StyledLoadingButton, useStyles } from './Usuarios.styles';

export default function Usuarios(props) {
  const styles = useStyles();
  const methods = useForm({ defaultValues: { user: '' } });
  const { handleSubmit, reset, control } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const MySwal = withReactContent(Swal);
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

  async function onSubmit(data) {
    console.log('onSubmit formData', data);
    setIsLoading(true);

    if (await postRequest(requestUrl, data)) {
      reset();
      setIsLoading(false);
      toast.success(`Usuário "${data.user}" cadastrado com sucesso`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 4000,
      });
    } else {
      setIsLoading(false);
      toast.error(
        `Erro ao cadastrar o usuário "${data.user}". Erro: ${responseCode}`,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        }
      );
    }
  }

  const deleteUser = (user) => {
    MySwal.fire({
      title: `Confirmar exclusão?`,
      html: `Deseja realmente excluir o usuário: <strong>${user.email}</strong>?`,
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#dc3545',
      denyButtonText: `Não Excluir`,
      denyButtonColor: '#6c757d',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        //TODO: ajax request to delete
        toast.success(`Usuário ${user.email} excluído com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      } else if (result.isDenied) {
        MySwal.close();
      }
    });
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.25,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 0.25,
    },
    {
      field: 'creationDate',
      headerName: 'Data de criação',
      flex: 0.25,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opções',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteUser(params.row)}
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      name: 'Fabio Stori',
      email: 'f196631@dac.unicamp.br',
      creationDate: new Date(2021, 0, 1, 0, 5),
    },
    {
      id: 2,
      name: 'Fabio Stori',
      email: 'f196631@dac.unicamp.br',
      creationDate: new Date(2020, 0, 1, 0, 5),
    },
    {
      id: 3,
      name: 'Adevair Santana Ramos',
      email: 'a193325@dac.unicamp.br',
      creationDate: new Date(2019, 0, 1, 0, 5),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <p className={styles.title}>Usuários</p>
        <TextInput
          name="user"
          control={control}
          label="Cadastrar novo usuário"
          placeholder="Email do usuário"
          helperText="Cadastre apenas e-mails do Google para maior segurança."
        />
        <StyledLoadingButton
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          loading={isLoading}
        >
          Cadastrar
        </StyledLoadingButton>
      </div>

      <Tabela columns={columns} rows={rows} />
    </div>
  );
}
