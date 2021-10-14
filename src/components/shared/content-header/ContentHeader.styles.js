import { makeStyles } from '@material-ui/core';
import { Autocomplete, Button, styled, TextField } from '@mui/material';

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

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--main-blue)',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '20%',
  },
}));

export const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '40%',
  },
  '& .MuiFormControl-root': {
    margin: 0,
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: 'var(--main-blue)',
    },
}));
