import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({ 

  pageWrapper: {    
    alignItems: 'center',
    height: 'calc(100% - 112px)', 
    backgroundColor: 'var(--white)',
    padding: '18px',    
  }
}));