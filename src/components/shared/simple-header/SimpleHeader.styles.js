import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: 'fit-content',
    minHeight: '40px',
    padding: '18px',
    backgroundColor: 'var(--white)',
  },
  title: {
    width: '100%',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    margin: '0',
    textAlign: 'left',
  },
}));
