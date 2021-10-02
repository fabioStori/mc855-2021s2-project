import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'var(--white)',
  },
  button: {
    color: 'var(--main-blue)',
    padding: '20px',
  },
  logo: {
    color: 'var(--main-blue)',
    padding: '10px',
    textTransform: 'unset',
  },
  accountCircle: {
    color: 'var(--main-blue)',
  },
}));
