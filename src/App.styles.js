import { makeStyles } from '@material-ui/core';
import { Alert, styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  appBackground: {
    backgroundColor: 'var(--light-gray)',
  },
  container: {
    height: 'calc(100vh - 64px)',
  },
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  [theme.breakpoints.up(1360)]: {
    display: 'none',
  },
}));
