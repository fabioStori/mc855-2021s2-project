import { GridToolbar, ptBR } from '@mui/x-data-grid';
import { StyledDataGrid, useStyles } from './Tabela.styles';

export default function Tabela(props) {
  const styles = useStyles();
  return (
    <div className={styles.pageWrapper}>
      <StyledDataGrid
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
  );
}
