import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: 'calc(100vh - 64.5px)',
    display: 'flex',
  },
  pageWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));
