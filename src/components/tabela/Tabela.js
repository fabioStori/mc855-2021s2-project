import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  ptBR
} from '@mui/x-data-grid';
import { StyledDataGrid, useStyles } from './Tabela.styles';

export default function Tabela(props) {
  const styles = useStyles();
  const updateRows = props.updateRows;
  const searchParams = props.searchParams;
  const isLoadingData = props.loading;

  function CustomToolBar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <RefreshButton />
      </GridToolbarContainer>
    );
  }

  function RefreshButton() {
    return (
      <Stack direction="row" spacing={2}>
        <Button
          variant="text"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={() => updateRows(searchParams ? searchParams : ['.*'])}
        >
          Atualizar
        </Button>
      </Stack>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <StyledDataGrid
        components={{
          Toolbar: CustomToolBar,
        }}
        rows={props.rows}
        columns={props.columns}
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
