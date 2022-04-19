import { makeStyles } from '@material-ui/core';
import { styled, TextField } from '@mui/material';

export const useStyles = makeStyles(() => ({
  dateError: {
    color: 'var(--red)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    textAlign: 'center',
    margin: '4px 14px 0 14px',
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  backgroundColor: 'var(--white)',
  height: 'fit-content',
  '.MuiOutlinedInput-input': {
    padding: '8.5px 14px',
  },
  '.MuiInputLabel-root': {
    transform: 'translate(14px, 9px) scale(1)',
  },
  '.MuiInputLabel-root.Mui-focused': {
    transform: 'translate(14px, -9px) scale(.75)',
  },
  '.MuiInputLabel-root.MuiFormLabel-filled': {
    transform: 'translate(14px, -9px) scale(.75)',
  },
  '& .MuiInputLabel-root.Mui-focused ': {
    color: 'var(--primary-blue) !important',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-blue) !important',
  },
}));
