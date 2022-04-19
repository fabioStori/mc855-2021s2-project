import { makeStyles } from '@material-ui/core';
import { styled, ToggleButtonGroup } from '@mui/material';

export const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: 'var(--white)',
    height: '100%',
    boxShadow: '3px 4px 4px -1px rgb(0 0 0 / 20%)',
    borderRightStyle: 'solid',
    borderRightWidth: 'thin',
    borderRightColor: 'var(--secondary-blue)',
  },
  icon: {
    margin: '0 12px 0 16px',
  },
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  '& .MuiToggleButtonGroup-grouped': {
    color: 'var(--primary-blue)',
    border: 0,
    borderRadius: 0,
    fontSize: '12px',
    padding: '10px',
    margin: '15px',
    justifyContent: 'flex-start',
    '&:hover': {
      boxShadow: '3px 4px 4px -1px rgb(0 0 0 / 20%)',
      borderRadius: 10,
    },
    '&.Mui-selected': {
      color: 'var(--white)',
      backgroundColor: 'var(--primary-blue)',
      borderRadius: 10,
      boxShadow: '3px 4px 4px -1px rgb(0 0 0 / 20%)',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'var(--secondary-blue)',
      borderRadius: 10,
    },
  },
}));
