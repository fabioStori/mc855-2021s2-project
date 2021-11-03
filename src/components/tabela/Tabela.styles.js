import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({ 
 

  pageWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 'calc(100% - 112px)',    
    gap: '20px',
    backgroundColor: 'var(--white)',
    padding: '18px',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },    
  }
}));