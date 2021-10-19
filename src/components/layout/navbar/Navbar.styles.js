import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'var(--white)',
  },
  button: {
    color: 'var(--primary-blue)',
    padding: '20px',
  },
  logo: {
    color: 'var(--primary-blue)',
    padding: '10px',
    textTransform: 'unset',
  },
  accountCircle: {
    color: 'var(--primary-blue)',
  },
  space: {
    flexGrow: 1,
  },
}));
