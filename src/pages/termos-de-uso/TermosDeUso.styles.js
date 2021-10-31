import { makeStyles } from '@material-ui/core';
import { Container, styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  pageContainer: {
    height: 'calc(100vh - 64.5px)',
    display: 'flex',
    alignItems: 'center',
  },
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
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: 'fit-content',
  maxHeight: '70vh',
  backgroundColor: 'var(--white)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '48px',
}));
