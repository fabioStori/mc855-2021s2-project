import { Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ContentHeader, SidePage, Tabela, UsuariosForm } from 'components';
import { AuthContext } from 'contexts';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate } from 'utils/format-date';
import { useStyles } from './Usuarios.styles';

export default function Usuarios(props) {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const abortController = new AbortController();

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.25,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 0.27,
    },
    {
      field: 'access',
      headerName: 'Nível de Acesso',
      flex: 0.16,
    },
    {
      field: 'creationDate',
      headerName: 'Data e hora de criação',
      flex: 0.16,
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

  const prepareAccess = (access) => {
    switch (access.toString()) {
      case '-1':
        return 'Administração';
      case '1':
        return 'Manutenção';
      default:
        return 'Consulta';
    }
  };

  async function getUsers() {
    setIsLoading(true);
    fetch(`https://api.invent-io.ic.unicamp.br/api/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Erro ao carregar usuários`);
        }
      })
      .then((data) => {
        setIsLoading(false);
        const rows = data.map((row) => {
          return {
            id: row.email,
            name: row.name,
            access: prepareAccess(row.access),
            email: row.email,
            creationDate: formatDate(row.creation_date),
          };
        });
        setRows(rows);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  }

  const deleteUserRequest = (user) => {
    fetch(`https://api.invent-io.ic.unicamp.br/api/v1/user/${user.email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          toast.success(`Usuário ${user.email} excluído com sucesso`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
          getUsers();
        } else {
          throw new Error(`Erro ao excluir o user ${user.name}`);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const deleteUser = (user) => {
    Swal.fire({
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
        deleteUserRequest(user);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  const onClose = () => {
    setIsSidePageOpen(false);
  };

  const onCadastrarNovoClick = () => {
    setIsSidePageOpen(true);
  };

  useEffect(() => {
    getUsers();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Usuários"
          buttonLabel="Cadastrar Novo"
          onButtonClick={onCadastrarNovoClick}
          hasInput={false}
        />
        <Tabela columns={columns} rows={rows} />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <UsuariosForm closeSidePage={onClose} updateRows={getUsers} />
        </SidePage>
      ) : null}
    </div>
  );
}
