import { Grid } from '@mui/material';
import { PrivateRoute, SideMenu } from 'components';
import { Historico, Inicio, Itens, Sensores } from 'pages';
import { Switch, useRouteMatch } from 'react-router-dom';
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
          <PrivateRoute path={`/`} exact={true} component={Inicio} />
          <PrivateRoute path={`/itens`} component={Itens} />
          <PrivateRoute path={`/sensores`} component={Sensores} />
          <PrivateRoute path={`/historico`} component={Historico} />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default Sistema;
