import { Grid } from '@mui/material';
import { SideMenu } from 'components';
import PrivateRoute from 'components/private-route/PrivateRoute';
import { Switch, useRouteMatch } from 'react-router-dom';
import { Inicio, Itens, Sensores, Historico } from 'pages';

import styles from './Sistema.module.css';

function Sistema() {

  let { url } = useRouteMatch();

  return (
      <Grid container spacing={0} className={styles.pageContainer} wrap="nowrap">
        <Grid item xs={2} minWidth="170px">
          <SideMenu />
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <PrivateRoute path={`${url}/`} exact={true} component={Inicio} />  
            <PrivateRoute path={`${url}/itens`} component={Itens} />
            <PrivateRoute path={`${url}/sensores`} component={Sensores} />
            <PrivateRoute path={`${url}/historico`} component={Historico} />    
          </Switch>
        </Grid>
      </Grid> 
  );
}

export default Sistema;
