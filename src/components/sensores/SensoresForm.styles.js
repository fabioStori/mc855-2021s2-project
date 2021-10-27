import { makeStyles } from '@material-ui/core';
import { ClearAll } from '@mui/icons-material';
import { Button, styled } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '20px 40px',
  },
  headWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: '20px',
    textAlign: 'center',
    margin: '10px 0',
  },
}));

export const StyledClearAllIcon = styled(ClearAll)(({ theme }) => ({
  color: 'var(--primary-blue)',
  cursor: 'pointer',
}));

export const StyledClearAllButton = styled(Button)(({ theme }) => ({
  color: 'var(--primary-blue)',
  borderColor: 'var(--primary-blue)',
  width: 'fit-content',
  margin: '0',
  fontSize: '10px',
  height: 'fit-content',
}));

export const StyledPrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--primary-blue)',
  width: 'fit-content',
  margin: '6px',
  height: 'fit-content',
}));

export const StyledSecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--secondary-blue)',
  width: 'fit-content',
  margin: '6px',
  height: 'fit-content',
}));
