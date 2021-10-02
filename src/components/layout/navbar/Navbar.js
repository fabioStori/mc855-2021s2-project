import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AuthContext from 'contexts/auth-context';
import { useContext } from 'react';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/svg/logo.svg';
import classes from './Navbar.module.css';
import { useStyles } from './Navbar.styles';

export default function Navbar() {
  const styles = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const goToHome = () => {
    history.push('/');
  };

  const signInHandle = () => {
    authContext.signIn();
  };

  const signOutHandle = () => {
    authContext.signOut();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.background}>
        <Toolbar>
          <Button className={styles.logo} onClick={goToHome}>
            <SVG src={logo} />
          </Button>
          <div className={classes.space}></div>
          {authContext.isUserLoggedIn ? (
            <>
              <Button className={styles.button} onClick={signOutHandle}>
                Logout
              </Button>
              <IconButton size="large" color="inherit">
                <AccountCircle className={styles.accountCircle} />
              </IconButton>
            </>
          ) : (
            <Button className={styles.button} onClick={signInHandle}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
