import { makeStyles } from '@material-ui/core';
import { Autocomplete, Button, styled, TextField } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    width: 'auto',
    gap: '20px',
    backgroundColor: 'var(--white)',
    padding: '18px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  title: {
    width: '100%',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    margin: '0',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto 0 0',
      textAlign: 'left',
      width: 'fit-content',
    },
  },
  icon: {
    color: 'gray',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--primary-blue)',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
  },
}));

export const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'fit-content',
  },
  '& .MuiFormControl-root': {
    margin: 0,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root.Mui-focused ': {
    color: 'var(--primary-blue) !important',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-blue) !important',
  },
}));
