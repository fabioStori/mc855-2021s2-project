import { Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import { ContentHeader, SidePage, Tabela, UsuariosForm } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from 'services/constants';
import Swal from 'sweetalert2';
import { formatDate } from 'utils/format-date';
import { useStyles } from './Usuarios.styles';

export default function Usuarios() {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const renderActions = (params) => [
    <GridActionsCellItem
      key="delete"
      icon={<Delete />}
      label="Delete"
      onClick={() => deleteUser(params.row)}
    />,
  ];

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
      getActions: renderActions,
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

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/user`)
      .then((response) => {
        const rows = response.data.map((row) => {
          return {
            id: row.email,
            name: row.name,
            access: prepareAccess(row.access),
            email: row.email,
            creationDate: formatDate(row.creation_date),
          };
        });
        setRows(rows);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message !== 'The user aborted a request.') {
          toast.error(`Erro ao consultar usuários. ${error.message}`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
        }
        setIsLoading(false);
      });
  }, []);

  const deleteUserRequest = (user) => {
    axios
      .delete(`${API_BASE_URL}/user/${user.email}`)
      .then(() => {
        toast.success(`Usuário ${user.email} excluído com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        getUsers();
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
  }, [getUsers]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Usuários"
          buttonLabel="Cadastrar Novo"
          onButtonClick={onCadastrarNovoClick}
          hasInput={false}
        />
        <Tabela
          columns={columns}
          rows={rows}
          updateRows={getUsers}
          loading={isLoading}
        />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <UsuariosForm closeSidePage={onClose} updateRows={getUsers} />
        </SidePage>
      ) : null}
    </div>
  );
}
