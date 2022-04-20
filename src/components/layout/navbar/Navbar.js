import { useContext } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import SVG from 'react-inlinesvg';

import { Logo } from 'assets';
import { AuthContext } from '../../../contexts';
import { useStyles } from './Navbar.styles';

export default function Navbar() {
  const styles = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const goToHome = () => {
    history.push('/');
  };

  const signOutHandle = async () => {
    try {
      // eslint-disable-next-line
      if (window.confirm('Você tem certeza que deseja sair da sua conta?')) {
        await authContext.signOut();
        history.push('/login');
      }
    } catch {
      // eslint-disable-next-line
      alert('Erro ao sair da conta');
    }
  };

  return (
    <AppBar position="relative" className={styles.background}>
      <Toolbar>
        <Button className={styles.logo} onClick={goToHome}>
          <SVG src={Logo} />
        </Button>
        <div className={styles.space} />
        {authContext.isUserLoggedIn ? (
          <Button onClick={signOutHandle}>
            <p className={styles.text}>Sair</p>
            <Logout className={styles.icons} />
          </Button>
        ) : null}
        ]
      </Toolbar>
    </AppBar>
  );
}
