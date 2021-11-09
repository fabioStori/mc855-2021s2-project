import { makeStyles } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Button, styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr auto',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'auto 1fr auto',
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

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: 'var(--primary-blue)',
  width: 'fit-content',
  margin: '10px 0',
  height: 'fit-content',
  [theme.breakpoints.up('md')]: {
    margin: '20px 0',
  },
}));
