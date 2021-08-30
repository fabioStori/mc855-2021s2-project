import Dashboard from 'poc-firebase-auth/components/dashboard/Dashboard';
import ForgotPassword from 'poc-firebase-auth/components/forgot-password/ForgotPassword';
import Login from 'poc-firebase-auth/components/login/Login';
import PrivateRoute from 'poc-firebase-auth/components/private-route/PrivateRoute';
import Signup from 'poc-firebase-auth/components/signup/Signup';
import UpdateProfile from 'poc-firebase-auth/components/update-profile/UpdateProfile';
import { AuthProvider } from 'poc-firebase-auth/contexts/AuthContext';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styles from './FirebaseAuth.module.css';

function FirebaseAuth(props) {
  let match = useRouteMatch();
  console.log('match', match);

  return (
    <AuthProvider>
      <div className={styles.container}>
        <Switch>
          <React.Fragment>
            <div className={styles.content}>
              <Route path={`${match.path}/signup`} component={Signup} />
              <Route path={`${match.path}/login`} component={Login} />
              <Route
                path={`${match.path}/forgot-password`}
                component={ForgotPassword}
              />
              <PrivateRoute
                path={`${match.path}/dashboard`}
                component={Dashboard}
              />
              <PrivateRoute
                path={`${match.path}/update-profile`}
                component={UpdateProfile}
              />
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default FirebaseAuth;
