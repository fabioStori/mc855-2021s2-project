import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  ptBR,
} from '@mui/x-data-grid';
import { StyledDataGrid, useStyles } from './Tabela.styles';

export default function Tabela(props) {
  const styles = useStyles();
  const {
    updateRows,
    searchParams,
    loading: isLoadingData,
    rows,
    columns,
  } = props;

  const renderToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => updateRows(searchParams || ['.*'])}
          >
            Atualizar
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <StyledDataGrid
        components={{
          Toolbar: renderToolBar,
        }}
        rows={rows}
        columns={columns}
        autoPageSize
        pagination
        loading={isLoadingData}
        disableSelectionOnClick
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        getRowClassName={(params) => {
          return params.row.alert ? 'alert' : '';
        }}
      />
    </div>
  );
}
