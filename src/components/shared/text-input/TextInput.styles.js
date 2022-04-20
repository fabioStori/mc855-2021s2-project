import { makeStyles } from '@material-ui/core';
import { styled, TextField } from '@mui/material';

export const useStyles = makeStyles(() => ({
  wrapper: {
    margin: '20px 0',
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--primary-blue) !important',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--primary-blue) !important',
  },
}));
