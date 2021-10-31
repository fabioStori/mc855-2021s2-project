import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: 'calc(100vh - 64.5px)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    height: '640px',
  },
  gridContainer: {
    height: '100%',
  },
}));
