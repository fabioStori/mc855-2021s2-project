import { useStyles } from './Tabela.styles';
import { DataGrid, ptBR, GridToolbar } from '@mui/x-data-grid';

export default function Tabela(props) {
  const styles = useStyles();
  return (
    <>
      <div className={styles.pageWrapper}>
        <DataGrid
          components={{
            Toolbar: GridToolbar,
          }}
          rows={props.rows}
          columns={props.columns}
          autoPageSize
          pagination
          disableSelectionOnClick
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </>
  );
}
