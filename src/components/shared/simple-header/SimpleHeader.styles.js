import { makeStyles } from '@material-ui/core';
import { Autocomplete, Button, styled, TextField } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'fit-content',
    width: '100%',
    gap: '20px',
    backgroundColor: 'var(--white)',
    padding: '18px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  title: {
    width: '100%',
    fontSize: '24px',
    textTransform: 'uppercase',
    fontWeight: 500,
    margin: '0',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      width: '40%',
    },
  },
}));