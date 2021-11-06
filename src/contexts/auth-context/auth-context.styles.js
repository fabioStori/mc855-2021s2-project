import { makeStyles } from '@material-ui/core';
import { CircularProgress, styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  circularProgress: {
    color: 'var(--primary-blue)',
  },
}));

export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: 'var(--primary-blue)',
}));
