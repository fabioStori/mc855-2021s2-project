import { makeStyles } from '@material-ui/core';
import { Autocomplete, styled, TextField } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    width: '100%',
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
      textAlign: 'left',
      width: '40%',
    },
  },
  icon: {
    color: 'gray',
  },
}));

export const StyledAutoComplete = styled(Autocomplete)(() => ({
  width: 'auto',
  '& .MuiFormControl-root': {
    margin: 0,
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiAutocomplete-tag': {
    height: '22px',
  },
  '& .MuiInputLabel-root.Mui-focused ': {
    color: 'var(--primary-blue) !important',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-blue) !important',
  },
}));
