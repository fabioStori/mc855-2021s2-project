import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import axios from 'axios';
import { ContentHeader, ItensForm, SidePage, Tabela } from 'components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formatDate } from 'utils/format-date';
import { useStyles } from './Itens.styles';

export default function Itens() {
  const styles = useStyles();
  const abortController = new AbortController();
  const [isSidePageOpen, setIsSidePageOpen] = useState(false);
  const [shouldUseEditMode, setShouldUseEditMode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [contentHeaderFieldValue, setContentHeaderFieldValue] = useState([]);
  const [preSelectedFields, setPreSelectedFields] = useState({});
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.25,
    },
    {
      field: 'item_id',
      headerName: 'Número de Patrimônio',
      flex: 0.25,
    },
    {
      field: 'last_activity',
      headerName: 'Última movimentação',
      flex: 0.3,
      type: 'dateTime',
    },
    {
      field: '_id',
      headerName: 'Database ID',
      hide: true,
    },
    {
      field: 'actions',
      headerName: 'Opções',
      type: 'actions',
      flex: 0.15,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteItem(params.row)}
        />,
        <GridActionsCellItem
          icon={<ContentCopy />}
          label="Clone"
          onClick={() => duplicateItem(params.row)}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => editItem(params.row)}
        />,
      ],
    },
  ];

  const onCadastrarNovoClick = () => {
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    setShouldUseEditMode(false);
    setPreSelectedFields([]);
    setIsSidePageOpen(false);
  };

  const showDataGridLoading = () => {
    setIsLoadingData(true);
  };

  const hideDataGridLoading = () => {
    setIsLoadingData(false);
  };

  const prepareData = (data) => {
    delete data._id;
    data.item_id = null;
    data._id = null;
    data.tags = null;
    data.location_blacklist = data.location_blacklist
      ? data.location_blacklist
      : [];
    data.location_whitelist = data.location_whitelist
      ? data.location_whitelist
      : [];
    return data;
  };

  const getRowsRequest = (query) => {
    showDataGridLoading();
    axios
      .post('https://api.invent-io.ic.unicamp.br/api/v1/search/item', {
        query: query.length ? query.join('|') : '.*',
        signal: abortController.signal,
      })
      .then((response) => {
        hideDataGridLoading();
        const rows = response.data.map((row) => {
          console.log(row.last_activity);
          return {
            id: row.item_id,
            _id: row._id,
            item_id: row.item_id,
            name: row.name,
            last_activity: row.last_activity
              ? formatDate(row.last_activity[0].event_timestamp * 1000)
              : '-',
          };
        });
        setRows(rows);
      })
      .catch((error) => {
        hideDataGridLoading();
        if (error.message !== 'The user aborted a request.') {
          toast.error('Erro ao consultar itens. ' + error.message, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 4000,
          });
        }
      });
  };

  const deleteItemRequest = (item) => {
    axios
      .delete(`https://api.invent-io.ic.unicamp.br/api/v1/item/${item._id}`)
      .then(() => {
        toast.success(`Item ${item.name} excluído com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
        getRowsRequest(contentHeaderFieldValue);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const deleteItem = (item) => {
    Swal.fire({
      title: `Confirmar exclusão?`,
      html: `Deseja realmente excluir o item: <strong>${item.name}</strong>?`,
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#dc3545',
      denyButtonText: `Não Excluir`,
      denyButtonColor: '#6c757d',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemRequest(item);
      } else if (result.isDenied) {
        Swal.close();
      }
    });
  };

  const duplicateItem = (item) => {
    axios
      .get(`https://api.invent-io.ic.unicamp.br/api/v1/item/${item._id}`)
      .then((response) => {
        const preparedData = prepareData(response.data);
        setPreSelectedFields(preparedData);
        setIsSidePageOpen(true);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  const editItem = (item) => {
    axios
      .get(`https://api.invent-io.ic.unicamp.br/api/v1/item/${item._id}`)
      .then((response) => {
        // const preparedData = prepareData(response.data);
        setShouldUseEditMode(true);
        setPreSelectedFields(response.data);
        setIsSidePageOpen(true);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      });
  };

  useEffect(() => {
    getRowsRequest(contentHeaderFieldValue);
    return () => {
      abortController.abort();
    };
  }, [contentHeaderFieldValue]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Itens"
          buttonLabel="Cadastrar novo"
          searchLabel="Pesquisar por item"
          searchPlaceholder="Nome ou Patrimônio"
          onButtonClick={onCadastrarNovoClick}
          setFieldValue={setContentHeaderFieldValue}
        />
        <Tabela
          columns={columns}
          rows={rows}
          updateRows={getRowsRequest}
          loading={isLoadingData}
        />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <ItensForm
            closeSidePage={onClose}
            updateRows={getRowsRequest}
            preSelectedFields={preSelectedFields}
            editMode={shouldUseEditMode}
          />
        </SidePage>
      ) : null}
    </div>
  );
}
