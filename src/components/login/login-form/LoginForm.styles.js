import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: 'var(--white)',
    height: '100%',
  },
  wrapper: {
    height: '100%',
    padding: '40px 0',
  },
  gridWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '20px',
  },
  title: {
    color: 'var(--primary-blue)',
    fontWeight: 500,
    fontSize: '32px',
  },
  termosDeUso: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  description: {
    color: 'var(--dark-gray)',
    fontWeight: 400,
    fontSize: '14px',
  },
  error: {
    color: 'var(--red)',
    fontWeight: 400,
    fontSize: '14px',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
