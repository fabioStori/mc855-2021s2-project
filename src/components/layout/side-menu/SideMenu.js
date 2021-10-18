import { AppBar } from '@material-ui/core';
import {  
  Home,  
  Devices,
  Sensors,
  History,
  LocalHospital,
} from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { StyledToggleButtonGroup, useStyles } from './SideMenu.styles';

export default function SideMenu() {
  const [selected, setSelected] = useState('/home');
  const styles = useStyles();
  const history = useHistory();
  const location = useLocation();

  const handleSelected = (event, newSelected) => {    
    if (newSelected === null) {
      return;
    }
    setSelected(newSelected);    
    history.push(`/sistema${newSelected}`);    
  };

  useEffect(() => {
    if (location.pathname === '/') {
      setSelected('/home');
    } else {
      setSelected(location.pathname.replace('/sistema', ''));
    }
  }, [location.pathname]);

  return (
    <AppBar position="static" className={styles.background}>
      <StyledToggleButtonGroup
        orientation="vertical"
        size="medium"
        value={selected}
        exclusive
        onChange={handleSelected}
        aria-label="text alignment"
      >
        <ToggleButton value="/" aria-label="pagina-inicial">
          <Home className={styles.icon} />
          Início
        </ToggleButton>
        <ToggleButton value="/itens" aria-label="itens">
          <Devices className={styles.icon} />
          Itens
        </ToggleButton>
        <ToggleButton value="/sensores" aria-label="sensores">
          <Sensors className={styles.icon} />
          Sensores
        </ToggleButton>      
        <ToggleButton value="/historico" aria-label="historico">
          <History className={styles.icon} />
          Histórico
        </ToggleButton>    
      </StyledToggleButtonGroup>
    </AppBar>
  );
}