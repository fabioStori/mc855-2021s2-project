import { makeStyles } from '@material-ui/core';
import { ArrowForwardSharp, Close } from '@mui/icons-material';
import { Drawer, styled } from '@mui/material';

export const useStyles = makeStyles(() => ({
  drawer: {
    flexShrink: 0,
  },
  button: {
    color: 'blue',
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  visible: {
    display: 'block',
    overflowY: 'auto',
  },
  notVisible: {
    display: 'none',
  },
}));

export const StyledArrowForwardSharpIcon = styled(ArrowForwardSharp)(() => ({
  position: 'relative',
  top: '50%',
  left: '-16px',
  padding: '3px',
  fontSize: '18px',
  cursor: 'pointer',
  borderRadius: '50%',
  color: 'var(--primary-blue)',
  backgroundColor: 'var(--white)',
  transition: 'transform .2s ease-out',
  border: '2px solid var(--primary-blue)',
  '&:hover': {
    color: 'var(--white)',
    backgroundColor: 'var(--primary-blue)',
  },
}));

export const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper ': {
    borderLeft: '3px solid var(--primary-blue)',
    height: '100%',
    position: 'initial',
    overflow: 'visible',
    transition: 'width .2s ease-out, background-color .1s ease-out .1s',
    textAlign: 'center',
  },
}));

export const StyledClose = styled(Close)(() => ({
  color: 'var(--primary-blue)',
  cursor: 'pointer',
  marginRight: '20px',
  padding: '1px',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: 'var(--primary-blue)',
    color: 'var(--white)',
  },
}));
