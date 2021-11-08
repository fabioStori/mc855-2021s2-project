import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    alignItems: 'center',
    height: 'calc(100% - 112px)',
    backgroundColor: 'var(--white)',
    padding: '18px',
  },
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiButton-root': {
    color: 'var(--primary-blue)',
  },
  '& .MuiButton-textPrimary': {
    color: 'var(--primary-blue) !important',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 500,
  },
}));
