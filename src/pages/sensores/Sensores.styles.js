import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  pageContainer: {
    height: '100%',
    display: 'flex',
  },
  pageWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
}));
