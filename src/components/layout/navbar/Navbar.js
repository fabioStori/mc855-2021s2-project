import { AppBar, Button, Toolbar } from '@material-ui/core';
import { AccountCircle, Logout } from '@mui/icons-material';
import { ButtonBase, IconButton } from '@mui/material';
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

  const goToUsuarios = () => {
    history.push('/usuarios');
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
            <Button onClick={goToUsuarios}>
              <p className={styles.text}>Usuários</p>
              <AccountCircle className={styles.icons} />
            </Button>
            <Button onClick={signOutHandle}>
              <p className={styles.text}>Sair</p>
              <Logout className={styles.icons} />
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
