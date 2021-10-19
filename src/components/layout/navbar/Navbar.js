import { AppBar, Button, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Logo } from 'assets';
import { AuthContext } from 'contexts';
import { useContext } from 'react';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
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

  async function signOutHandle() {
    try {
      if (window.confirm('Você tem certeza que deseja sair da sua conta?')) {
        await authContext.signOut();
        history.push('/login');
      }
    } catch {
      alert('Erro ao sair da conta');
    }
  }

  return (
    <AppBar position="relative" className={styles.background}>
      <Toolbar>
        <Button className={styles.logo} onClick={goToHome}>
          <SVG src={Logo} />
        </Button>
        <div className={styles.space}></div>
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
  );
}
