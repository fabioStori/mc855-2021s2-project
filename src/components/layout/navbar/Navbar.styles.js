import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
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
  icons: {
    color: 'var(--primary-blue)',
  },
  text: {
    color: 'var(--primary-blue)',
    paddingRight: '8px',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
  },
  space: {
    flexGrow: 1,
  },
}));
