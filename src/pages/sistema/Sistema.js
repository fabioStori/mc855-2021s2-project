import { Grid } from '@mui/material';
import { PrivateRoute, SideMenu } from 'components';
import { Historico, Inicio, Itens, Sensores, Usuarios } from 'pages';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './Sistema.module.css';

export default function Sistema() {
  return (
    <Grid container spacing={0} className={styles.pageContainer} wrap="nowrap">
      <Grid item xs={2} minWidth="170px">
        <SideMenu />
      </Grid>
      <Grid item xs={10}>
        <Switch>
          <PrivateRoute path="/" exact component={Inicio} />
          <PrivateRoute path="/itens" exact component={Itens} />
          <PrivateRoute path="/sensores" exact component={Sensores} />
          <PrivateRoute path="/historico" exact component={Historico} />
          <PrivateRoute path="/usuarios" exact component={Usuarios} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}
