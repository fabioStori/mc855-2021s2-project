import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto auto',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto 1fr auto auto',
      gridTemplateRows: 'auto',
      justifyItems: 'unset',
      columnGap: '18px',
    },
    justifyItems: 'center',
    backgroundColor: 'var(--white)',
    padding: '0 18px',
  },
  title: {
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    textAlign: 'left',
    margin: '20px 0 10px 0',
    [theme.breakpoints.up('md')]: {
      margin: '20px 0',
    },
  },
}));
