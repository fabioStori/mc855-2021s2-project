import { useStyles } from './Tabela.styles';
import { DataGrid, ptBR, nlNL } from '@mui/x-data-grid';

export default function Tabela (props) {

  const styles = useStyles();  
  return (
    <>
      <div className={styles.pageWrapper}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}          
          autoPageSize pagination          
          disableSelectionOnClick  
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}        
        />
      </div>      
    </>
  )
}