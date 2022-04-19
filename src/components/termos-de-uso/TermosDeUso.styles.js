import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  content: {
    overflowY: 'auto',
    padding: '0 10px 0 0',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--primary-blue)',
      borderRadius: '16px',
    },
  },
  text: {
    margin: '0',
  },
  title: {
    color: 'var(--primary-blue)',
    fontWeight: 500,
    fontSize: '24px',
    marginTop: '0',
  },
}));
