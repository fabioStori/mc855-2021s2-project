import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'var(--primary-blue)',
    minHeight: '65px',
    height: 'fit-content',
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 0px 4px 1px rgb(0 0 0 / 20%)',
    justifyContent: 'center',
    padding: '15px 60px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      padding: '0 120px',
      flexDirection: 'row',
    },
  },
  text: {
    textAlign: 'center',
    color: 'var(--white)',
    fontSize: '.8rem',
  },
  termosDeUso: {
    textAlign: 'center',
    color: 'var(--white)',
    fontSize: '.8rem',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  logo: {
    '& path': {
      fill: 'var(--white)',
      transform: 'translate(104px, 0px) rotate(90deg)',
    },
    '&.a, .b, .c': {
      fill: 'var(--white)',
    },
  },
}));
